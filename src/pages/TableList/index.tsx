import { addRule, removeRule, rule, updateRule, addInterface, updateInterface } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Drawer, Input, message, Switch } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormValueType } from './components/UpdateForm';
import CreateModal from './components/CreateModal'
import type { Props } from './components/CreateModal';
import { 
  listInterfaceInfoByPageUsingGET,
   listInterfaceInfoUsingGET, 
   addInterfaceInfoUsingPOST, 
   updateInterfaceInfoUsingPOST, 
   deleteInterfaceInfoUsingPOST,
   offlineInterfaceUsingPOST,
   onlineInterfaceUsingPOST
} from '@/services/openAPI-api/interfaceInfoController';
import UpdateModal from './components/UpdateModal';
import _ from 'lodash';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.RuleListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};

/**
 * @en-US Add node
 * @zh-CN 添加接口信息
 * @param fields
 */
const handleInterfaceAdd = async (fields: API.InterfaceInfo) => {
  const hide = message.loading('正在添加');
  try {
    await addInterface({ ...fields });
    hide();
    //重新刷新

    message.success('添加接口成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败，请重试!');
    return false;
  }
};


/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: Props) => {
  const hide = message.loading('Configuring');
  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();

    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};
/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdateInterface = async (fields: Props) => {
  const hide = message.loading('更新中。。。');
  try {
    await updateInterface({
      name: fields.columns.description,
      desc: fields.desc,
      key: fields.key,
    });
    hide();

    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.RuleListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};
/**
 *  Delete node
 * @zh-CN 删除接口信息
 *
 * @param selectedRows
 */
const handleRemoveInterfaceInfo = async (selectedRows: API.InterfaceInfo) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await deleteInterfaceInfoUsingPOST({
      body: selectedRows,
    });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  // const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  // const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);
  const [currentRow, setCurrentRow] = useState<API.InterfaceInfo>();
  const [selectedRowsState, setSelectedRows] = useState<API.InterfaceInfo[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: <FormattedMessage id="pages.searchTable.titleDesc"
        defaultMessage="接口ID" />,
      dataIndex: 'id',
      valueType: 'textarea',
    },
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.updateForm.ruleName.nameLabel"
          defaultMessage="接口名称"
        />
      ),
      dataIndex: 'name',
      tip: 'The rule name is the unique key',
        render: (dom, entity) => {
          return (
            <a
              onClick={() => {
                setCurrentRow(entity);
                setShowDetail(true);
              }}
            >
              {dom}
            </a>
          );
        },
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleDesc"
        defaultMessage="描述" />,
      dataIndex: 'description',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleDesc"
        defaultMessage="接口" />,
      dataIndex: 'url',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleDesc"
        defaultMessage="请求头" />,
      dataIndex: 'requestHeader',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleDesc"
        defaultMessage="响应头" />,
      dataIndex: 'responseHeader',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleDesc"
        defaultMessage="请求类型" />,
      dataIndex: 'method',
      valueType: 'textarea',
    },
    // {
    //   title: (
    //     <FormattedMessage
    //       id="pages.searchTable.titleCallNo"
    //       defaultMessage="Number of service calls"
    //     />
    //   ),
    //   dataIndex: 'callNo',
    //   sorter: true,
    //   hideInForm: true,
    //   renderText: (val: string) =>
    //     `${val}${intl.formatMessage({
    //       id: 'pages.searchTable.tenThousand',
    //       defaultMessage: ' 万 ',
    //     })}`,
    // },
    {
      title: <FormattedMessage id="pages.searchTable.titleStatus"
        defaultMessage="接口状态" />,
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: {
          text: (
            <FormattedMessage
              id="pages.searchTable.nameStatus.default"
              defaultMessage="关闭"
            />
          ),
          status: 'Default',
        },
        1: {
          text: (
            <FormattedMessage id="pages.searchTable.nameStatus.running"
              defaultMessage="开启" />
          ),
          status: 'Processing',
        },
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleStatus"
      defaultMessage="上线"/>,
      dataIndex: 'status',
      hideInForm: true,
      render: (dom, entity) => {
        if(dom===0){
          return (
            <Switch id="pages.searchTable.titleStatus"
            
            onChange={
              async (checked,event)=>{
                const res = await offlineInterfaceUsingPOST(entity);
                console.log('res-->',event);
                return false;
            }} />
          );
        }else{
          return (
            <Switch id="pages.searchTable.titleStatus"
            defaultChecked
            onChange={(checked,event)=>{
             const res = onlineInterfaceUsingPOST(entity);
              console.log('res-->',event);
            }} />
          );
        }
    
      },
      // valueEnum: {
      //   0: {
      //     text: (
      //       <Switch id="pages.searchTable.titleStatus"
      //       defaultChecked
      //       onChange={
      //         async (checked,event)=>{
      //           // await offlineInterfaceUsingPOST();
      //           console.log("fasf 0 ",checked,event);
      //       }} />
      //     ),
      //   },
      //   1: {
      //     text: (
      //       <Switch id="pages.searchTable.titleStatus"
      //       onChange={(checked,event)=>{
      //           console.log("fasf 1", checked, event);
      //       }} />
      //       ),
      //   },
      // },
    },
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.titleUpdatedAt"
          defaultMessage="更新时间"
        />
      ),
      sorter: true,
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');
        if (`${status}` === '0') {
          return false;
        }
        if (`${status}` === '3') {
          return (
            <Input
              {...rest}
              placeholder={intl.formatMessage({
                id: 'pages.searchTable.exception',
                defaultMessage: 'Please enter the reason for the exception!',
              })}
            />
          );
        }
        return defaultRender(item);
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
          <FormattedMessage id="pages.searchTable.config"
            defaultMessage="修改" />
        </a>,
         <a
          key="config1"
          onClick={() => {
            handleRemoveInterfaceInfo(record);
            setCurrentRow(record);
          }}
        >
          <FormattedMessage id="pages.searchTable.config"
            defaultMessage="删除" />
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
          defaultMessage: 'Enquiry form',
        })}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        request={async (params: U & {
          pageSize?: number;
          current?: number;
          keyword?: string;
        }, sort: Record<string, SortOrder>,
          filter: Record<string, (string | number)[] | null>) => {
          const res = await listInterfaceInfoByPageUsingGET({
            ...params
          });
          if (res?.data) {
            return ({
              data: res?.data.records || [],
              success: true,
              total: res.data.total,
            })
          }
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
              &nbsp;&nbsp;
              <span>
                <FormattedMessage
                  id="pages.searchTable.totalServiceCalls"
                  defaultMessage="Total number of service calls"
                />{' '}
                {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)}{' '}
                <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万" />
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage
              id="pages.searchTable.batchDeletion"
              defaultMessage="Batch deletion"
            />
          </Button>
          <Button type="primary">
            <FormattedMessage
              id="pages.searchTable.batchApproval"
              defaultMessage="Batch approval"
            />
          </Button>
        </FooterToolbar>
      )}
      <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.newRule',
          defaultMessage: 'New rule',
        })}
        width="400px"
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.RuleListItem);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.ruleName"
                  defaultMessage="Rule name is required"
                />
              ),
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormTextArea width="md" name="desc" />
      </ModalForm>
      <CreateModal
        columns={columns}
        onCancel={() => {
          handleModalOpen(false)
        }}
        visible={createModalOpen}
        onSubmit={
          async (columns) => {
            const success = await addInterfaceInfoUsingPOST(columns);
            if (success) {
              handleUpdateModalOpen(false);
              setCurrentRow(undefined);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
      >
      </CreateModal>

/**
      注册组件
      */
      <UpdateModal
        columns={columns}
        visible={updateModalOpen}
        onCancel={() => {
          handleUpdateModalOpen(false)
        }}
        onSubmit={
          async (columns) => {
            const result = await updateInterfaceInfoUsingPOST(columns);
            if (result) {
              //隐藏修改框
              handleUpdateModalOpen(false);
              setCurrentRow(undefined);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
        values={currentRow || {}}
      />


      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;

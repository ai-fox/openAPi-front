import { addInterface } from '@/services/ant-design-pro/api';
import {
  ProColumns,
  ProFormInstance,
  ProTable,
} from '@ant-design/pro-components';
import { Modal } from 'antd';
import { values } from 'lodash';
import React, { useEffect, useRef } from 'react';

/**
 * 定义变量
 */
export type Props = {
  values: API.InterfaceInfo,
  columns: ProColumns<API.InterfaceInfo>[],
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  visible: boolean;
}


const UpdateModal: React.FC<Props> = (props) => {
  const {values, visible, columns, onCancel, onSubmit,} = props;

  //监听数据变化 ---- 类似于vue中watch函数
  const formRef = useRef<ProFormInstance>();
  useEffect(()=>{
    if(formRef){
      formRef.current?.setFieldsValue(values);
    }
  }, [values]);

  
  return  <Modal visible={visible} onCancel={()=> onCancel?.()} >
      <ProTable type="form" columns={columns} 
      formRef={formRef}
      onSubmit={async (value)=>{
        onSubmit?.(value)}}
        ></ProTable>
    </Modal>
  ;
};

export default UpdateModal;

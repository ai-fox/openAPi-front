import { addInterface } from '@/services/ant-design-pro/api';
import {
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { Modal } from 'antd';
import React from 'react';

/**
 * 定义变量
 */
export type Props = {
  columns: ProColumns<API.InterfaceInfo>[],
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  visible: boolean;
}


const CreateModal: React.FC<Props> = (props) => {
  const {visible, columns, onCancel, onSubmit} = props;
  
  return  <Modal visible={visible} onCancel={()=> onCancel?.()} >
      <ProTable type="form" columns={columns} 
      onSubmit={async (columns)=>{
        onSubmit?.(columns)}}
        ></ProTable>
    </Modal>
  ;
};

export default CreateModal;

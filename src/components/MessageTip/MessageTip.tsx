import React from "react";
import { Alert, Space } from 'antd';

/**
 * 定义变量
 */
export type Props = {
  message: '',
  type: 'success',
  description: '',
}

//相当于定义一个类
const MessageTip: React.FC<Props> = (props) =>{
  //引用定义的变量
  const { message, type, description} = props;

  return  <Alert    
      message={message}
      description={description}
      type={type}
      showIcon
    />;
};

export default MessageTip;
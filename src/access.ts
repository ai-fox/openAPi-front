/**
 * 权限文件
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: InitialState | undefined) {
  const { loginUser } = initialState ?? {};
  return {
    canUser: loginUser,
    canAdmin:  loginUser?.userRole === 'admin',
  };
}

    // createTime?: string;
    // description?: string;
    // id?: number;
    // isDelete?: number;
    // method?: string;
    // name?: string;
    // requestHeader?: string;
    // requestParams?: string;
    // responseHeader?: string;
    // status?: number;
    // updateTime?: string;
    // url?: string;
    // userId?: number;
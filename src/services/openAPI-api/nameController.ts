// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getNameByGet GET /api/name */
export async function getNameByGetUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getNameByGetUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<string>('/api/name', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getNameByPost POST /api/name */
export async function getNameByPostUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getNameByPostUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<string>('/api/name', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getUserNameByPost POST /api/user */
export async function getUserNameByPostUsingPOST(body: API.User, options?: { [key: string]: any }) {
  return request<string>('/api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

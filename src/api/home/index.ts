import service from '@/utils/https/index'

// 上传图片
export function sendAll(data:any){
  return service({
    url: `/api/message/sendAll`,
    method: 'post',
    data,
  })
}

// 获取所有用户
export function getUserAll(params:any){
  return service({
    url: `/api/user/getAll`,
    method: 'get',
    params,
  })
}

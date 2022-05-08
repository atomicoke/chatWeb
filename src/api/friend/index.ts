import service from '@/utils/https/index'

// 好友申请
export function friendRequests(data:any){
  return service({
    url: `/api/friend/apply`,
    method: 'post',
    data,
  })
}
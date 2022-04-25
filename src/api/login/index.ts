import service from '@/utils/https/index'

// 注册
export function registerUser(data:any){
  return service({
    url: `/api/auth/singUp`,
    method: 'post',
    data,
  })
}

// 登陆
export function getLogin(data:any){
  return service({
    url: `/api/auth/singIn`,
    method: 'post',
    data,
  })
}

// 获取用户信息
export function getUserInfo(){
  return service({
    url: `/api/user/getUserInfo`,
    method: 'get',
  })
}

// 修改用户信息
export function editSelfInfo(data:any){
  return service({
    url: `/api/user/editSelfInfo`,
    method: 'post',
    data
  })
}

// 退出
export function getLoginOut(){
  return service({
    url: `/api/auth/singOut`,
    method: 'post',
  })
}
import service from '@/utils/https/index'

// 上传图片 私有
export function uploadImage(data:any){
  return service({
    url: `/api/upload/image`,
    method: 'post',
    data,
  })
}

// 上传图片 私有
export function uploadImagePuc(data:any){
  return service({
    url: `/api/upload/pub/image`,
    method: 'post',
    data,
  })
}

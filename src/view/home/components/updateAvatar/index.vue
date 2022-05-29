<template>
  <div class="image-box">
  <a-modal v-model:visible="state.visible" width="550px" title="修改头像" @ok="handleOk" @cancel="handleCancel" destroyOnClose :maskClosable="false">
      <div class="img-cropper-box">
        <VuePictureCropper
        :boxStyle="{
          width: '100%',
          height: '100%',
          backgroundColor: '#f8f8f8',
          margin: 'auto'
        }"
        :img="state.imgUrl"
        :options="{
          viewMode: 1,
          dragMode: 'crop',
          aspectRatio: 16/16,
        }"
      />
      </div>
      <div class="upload-btn">
        <a-upload 
        name="avatar"
        list-type="picture-card"
        class="avatar-uploader"
        :show-upload-list="false"
        action=""
        :before-upload="beforeUpload">
        <a-button>上传图片</a-button>
      </a-upload>
      </div>
      <template #footer>
        <a-button key="back" @click="handleCancel">取消</a-button>
        <a-button key="submit" type="primary" :loading="state.loading" @click="handleOk">确定</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'; 
import {useStore} from '@/store/index'
import VuePictureCropper, { cropper } from 'vue-picture-cropper'

import {
  uploadImagePuc
} from '@/api/public/index'

import {
  editSelfInfo, // 修改用户信息
} from '@/api/login/index'

const store = useStore()
const storeState = store.$state
let prop = defineProps({
  imgUrl:{
    type:String,
    default:''
  },
  visibleUpdate:{
    type:Boolean,
    default:false
  }
})
let emit = defineEmits(['handleOkFuc'])
const unameRef = ref<any>()
const state = reactive({
  visible:prop.visibleUpdate,
  loading:false,
  imgUrl:prop.imgUrl,
  paramsData:<any>{
    id:storeState.userInfo.id,
    uname:"",
    avatar:'',
  }
})

// 取消
const handleCancel = () => {
  state.visible = false
  emit('handleOkFuc')
}

const handleOk =async (e: MouseEvent) => {
  let data = await cropper.getBlob()
  let url = window.URL.createObjectURL(data)
  const fd = new FormData()
  fd.append('file', data)
  state.loading = true
  let resData  = await uploadImagePuc(fd)
  if(resData.code == 0){
    state.paramsData.avatar = resData.data.objectName
    state.paramsData.uname = storeState.userInfo.uname
    store.updateUserAvata(resData.data.accessUrl)
    await editSelfInfo(state.paramsData)
    state.visible = false;
    state.loading = false
    emit('handleOkFuc',resData.data.accessUrl)
  }else{

  }
};

const beforeUpload = (file:any) => {
  let url = window.URL.createObjectURL(file);
  state.imgUrl = url
  return false
}
</script>

<style lang="scss" scoped>
.img-cropper-box{
  width:100%;
  height: 500px;
}
:deep(.ant-upload){
  padding:0!important;
  height:auto;
  width:auto;
  border:none;
  float: none;
  background: #fff;
}
:deep(.avatar-uploader){
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

</style>
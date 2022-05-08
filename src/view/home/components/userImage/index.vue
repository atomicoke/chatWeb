<template>
  <div class="image-box">
    <a-dropdown :trigger="['click']" v-model:visible="state.visibleFalse">
      <a-image  @click.prevent
                :preview="false"
                :width="42"
                :src="state.userInfo.avatar"
              />
    <template #overlay>
      <div class="user-info">
        <div class="user-info-item">
          <div class="user-info-item-left">
            <h3>
              <span>{{state.userInfo.uname}}</span>
              </h3>
            <h3><span>ID:</span><em>{{state.userInfo.idLong}}</em></h3>
            </div>
          <div class="user-info-item-right" title="点击修改">
            <a-image
                  :preview="false"
                  :width="42"
                  :src="state.userInfo.avatar"
                  @click="updateAvatarFuc"
                />
          </div>
        </div>
      </div>  
    </template>
  </a-dropdown>
  <UpdateAvatar :imgUrl="store.avatar" v-if="state.visibleUpdate" :visibleUpdate="state.visibleUpdate" @handleOkFuc="handleOk"/>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref ,nextTick} from 'vue'; 
import avatar from '@/assets/avatar.png'
import {useStore} from '@/store/index'
import UpdateAvatar from '@/view/home/components/updateAvatar/index.vue'

import {
  editSelfInfo, // 修改用户信息
} from '@/api/login/index.ts'

const store = useStore().$state.userInfo
const unameRef = ref<any>()
const state = reactive({
  visibleFalse:false,
  userInfo:{
    uname:store.uname,
    idLong:store.idLong,
    avatar:store.avatar ? store.avatar : avatar
  },
  visibleUpdate:false,
  editFalse:false,
  paramsData:{
    id:store.id,
    uname:"",
  }
})

// 修改头像
const updateAvatarFuc = () => {
  state.visibleUpdate = true
  state.visibleFalse = false
}

const handleOk = (val:any) => {
  if(val){
    state.userInfo.avatar = store.avatar ? store.avatar : avatar
    useStore().updateUserAvata(val)
    console.log(state.userInfo.avatar,val,'state.userInfo.avatar', useStore())
  }
  state.visibleUpdate = false
};

// 修改姓名
const updateUnameFuc = () => {
  state.editFalse = true
  nextTick(()=>{
    unameRef.value.focus()
      console.log(unameRef.value)
  })
}

// 修改姓名
const infoFuc = async (val:any) => {
  let data = await editSelfInfo(state.paramsData)
  state.editFalse = false
}

</script>

<style lang="scss" scoped>
      .image-box{
        cursor: pointer;
      }
      .user-info{
        background:#fff;
        padding:10px 20px 20px 20px;
        border-radius:8px;
        position:relative;
        top:-20px;
        left:20px;
        .user-info-item{
          display:flex;
          .user-info-item-left{
            h3{
              font-size:16px;
              padding-top: 10px;
              em{
                color:#999;
              }
            }
          }
          .user-info-item-right{
            margin-left:20px;
            margin-top: 10px;
              cursor: pointer;
          }
        }
      }
.img-cropper-box{
  width:100%;
  height: 500px;
}
:deep(.ant-upload){
  padding:0!important;
  height:auto;
  width:auto;
  border:none;
  display: block!important;
  float: none;
  margin: 0 auto;
}
.upload-btn{
  padding:20px 0 0 0;

}
.ant-input{
  max-width:110px;
  border: none!important;
  padding:0!important;
  border: 0; // 去除未选中状态边框
  outline: none; // 去除选中状态边框
}
.ant-input:focus {
  border:none;
  box-shadow:none;
}

</style>
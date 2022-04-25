<template>
  <div class="setting-box">
    <a-popover placement="right" trigger="click">
      <template #content>
        <p><a-button type="link" @click="getSettingtFuc">设置</a-button></p>
        <p><a-button type="link" @click="getLoginOutFuc">退出</a-button></p>
      </template>
      <setting-outlined class="setting-icon"/>
    </a-popover>
    <UpdateUserInfo v-if="state.updateUserInfoVisible" :updateUserInfoVisible="state.updateUserInfoVisible" @handleCancelFuc="handleCancelFuc"/>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'; 
import {useStore} from '@/store/index'
import { SettingOutlined } from '@ant-design/icons-vue';
import UpdateUserInfo from '@/view/home/components/updateUserInfo/index.vue'

import {
  getLoginOut, // 退出
} from '@/api/login/index.ts'
import router from '../../../../router';


const store = useStore().$state.userInfo
const state = reactive({
  updateUserInfoVisible:false
})

// 设置信息
const getSettingtFuc = () => {
  state.updateUserInfoVisible = true
}

// 关闭窗口
const handleCancelFuc = () => {
  state.updateUserInfoVisible = false
}

const getLoginOutFuc = async () => {
  let data = await getLoginOut()
  if(data.code == 0){
    localStorage.removeItem('token')
    router.push({
      name:'login'
    })
  }
  console.log(data)
}

</script>

<style lang="scss" scoped>
  .setting-icon{
    color:#fff;
    cursor: pointer;
  }
</style>
<template>
<div class="chat-content-item-box" v-for="item in prop.chatList" :key="item.randomId">
  <h2>{{senTimerFuc(item)}}</h2>
  <div class="chat-content-item chat-content-item-left" v-if="item.leftOrRight == '1'">
    <div class="avatar-box">
      <a-image
        :preview="false"
        :width="36"
        :src="prop.avatarObj.formAvatar ? prop.avatarObj.formAvatar : avatar"
      />
    </div>
      <div class="item-content-box">
        <h6>{{item.fromUname}}</h6>
        <div class="item-content"  v-html="item.content">
        </div> 
        <!-- <div class="item-image">
        </div> -->
      </div>
  </div> 
  <div class="chat-content-item chat-content-item-right" v-if="item.leftOrRight == '2'">
    <div class="avatar-box">
      <a-image
        :preview="false"
        :width="36"
        :src="prop.avatarObj.myAvatar ? prop.avatarObj.myAvatar : avatar"
      />
    </div>
    <div class="item-content-box">
      <h6>{{item.fromUname}}</h6>
      <div class="item-content" v-html="item.content"></div>
    </div>
  </div> 
</div>
</template>

<script setup lang="ts">
import { onMounted, reactive,ref } from 'vue'; 
import {useStore} from '@/store/index'

import avatar from '@/assets/avatar.png'

import {
  timerFormat
} from '@/utils/common/index'

const chatContentDom = ref<any>('')
const store = useStore().$state.userInfo
const prop = defineProps({
  chatList:{
    type:Object,
    default:[]
  },
  avatarObj:{
    type:Object,
    default:''
  }
})
const senTimerFuc = (item:any) => {
  let sendTimerRes = ""
  let sendTimer = timerFormat(new Date(item.sendTime))
  let sendTimerArr = sendTimer.split(' ')
  let nowData = new Date(timerFormat().split(' ')[0]).getTime()
  let sendTimerDate = new Date(sendTimerArr[0]).getTime()
  // console.log(nowData,sendTimerDate)
  if(nowData  ==  sendTimerDate){
    let sendTimerCur = new Date(item.sendTime).getTime()
    let minutesBefore = Math.trunc((Date.now() - sendTimerCur)/1000/60)
    sendTimerRes = sendTimerArr[1]
    if(minutesBefore < 5){
      sendTimerRes = ''
    }
    if(5 < minutesBefore && minutesBefore < 10){
      sendTimerRes = '5分钟之前'
    }
    if(10 < minutesBefore && minutesBefore < 15){
      sendTimerRes = '10分钟之前'
    }
    if(15 < minutesBefore && minutesBefore < 30){
      sendTimerRes = '15分钟之前'
    }
    if(30 < minutesBefore && minutesBefore < 60){
      sendTimerRes = '30分钟之前'
    }
    if(60 < minutesBefore && minutesBefore < 120){
      sendTimerRes = '1小时之前'
    }
  }
  if(sendTimerDate  <  (nowData - 60 * 60 * 24)){
    sendTimerRes = sendTimer
  }
  // console.log(nowData,sendTimerDate)
  return sendTimerRes
}

</script>

<style lang="scss" scoped>
.chat-content-item-box{
  h2{
    text-align:center;
    line-height:2;
    font-size: 14px;
    color:#666;
    font-family: sans-serif
  }
}

.chat-content-item{
    display:flex;
    margin-bottom:20px;
    :deep(.ant-image){
      margin:0 10px
    }
    h6{
      font-size:14px;
      color:#999;
      line-height:1.5;
    }
    .item-content{
      padding:10px;
      border-radius:6px;
      overflow:hidden;
      background:#fff;
      margin-top:10px;
      line-height: 1.5;
    }
    .item-image{
      width:100px;
      height:100px;
      border-radius:6px;
      overflow:hidden;
      cursor:pointer;
      margin-top:5px;
      :deep(.ant-image){
        width:100px;
        height:100px!important;
        margin:0;
      }
    }
  }
  
 .chat-content-item-right{
    flex-direction: row-reverse;
    h6{
      text-align:right;
    }
    .item-content-box{
      text-align: justify;
    }
  }
  .avatar-box{
    flex:none;
  }
  .item-content-box{
    max-width: 50%;
  }
  
</style>
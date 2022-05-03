<template>
  <div class="chat-main-page">
    <div class="chat-main">
      <div class="chat-main-box">
        <div class="chat-main-left">
          <div class="side-left-setting">
            <ImageAvatar />
            <div class="setting-box">
              <Setting />
            </div>
          </div>
          <ChatUserList :chatUserList="state.chatUserList" @selectChatFuc="selectChatFuc" @inputChangeFuc="inputChangeFuc"/>
        </div>
        <div class="chat-main-right" v-if="state.chatTitle != '' ">
          <div class="chat-main-header">
            <div class="chat-header-left">
              <AvatarImage :avatarWh="36" :avatar="state.chatAvatar" :name="state.chatTitle"/><span class="chat-title">{{state.chatTitle}}</span>
            </div>
            <div class="chat-header-right">
              <SettingUpdateFriendInfo />
            </div>
          </div>
          <div class="chat-main-content" ref="chatMainContent">
            <div ref="chatRecordList">
              <ChatRecordList :chatList="state.chatList" :avatarObj="state.avatarObj"/>
            </div>
          </div>
          <SendChatMsg @sendChatMsgFuc="sendChatMsgFuc" ref="sendChatMsgRef"/>
        </div>
        <div class="chat-main-default-box" v-else >
          欢迎来聊天
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive,ref ,computed,nextTick} from 'vue'; 
import {useStore} from '@/store/index'
import { guid } from '@/utils/common/index'
import { message } from 'ant-design-vue';
import avatar from '@/assets/avatar.png'
import ImageAvatar from '@/view/home/components/userImage/index.vue'
import ChatUserList from '@/view/home/components/chatUserList/index.vue'
import ChatRecordList from '@/view/home/components/chatRecord/index.vue'
import Setting from '@/view/home/components/setting/index.vue'
import SendChatMsg from '@/view/home/components/sendMsg/index.vue'
import AvatarImage from '@/view/home/components/avatarImg/index.vue'
import SettingUpdateFriendInfo from '@/view/home/components/updateFriendInfo/index.vue'

import {
  getUserAll, // 获取所有用户
} from '@/api/home/index.ts'
import {
  timerFormat
} from '@/utils/common/index'

const ws = new WebSocket('ws://114.132.249.192:8081/echo?token=' + localStorage.getItem('token'))
const store = computed(() => useStore().userInfo)
const state= reactive({
  chatTitle:'', // 当前用户姓名
  chatAvatar:'', // 当前用户头像
  chatUserListRes:<any>[],
  chatUserList:<any>[],
  chatListAll:<any>[
  ],
  chatList:<any>[],
  chatContent:'', // 
  sessionType:'1', // 发送类型
  toId:'', // 接收人 id 单聊 群聊 有效
  sendFalse:false, // 发送
  avatarObj:{
    formAvatar:'',
    myAvatar:store.value.avatar
  }
})
let chatMainContent = ref()
let chatRecordList = ref()
let sendChatMsgRef = ref()

const sendChatMsgFuc = async (val:any) => {
  let innerText = val
  let uuid = guid()
    let sendMsg = {
                  "randomId": uuid.toString(),
                  "type": "chat",
                  "id":state.toId,
                  "toId":state.toId, 
                  "sessionType": state.sessionType,
                  "fromUname":store.value.uname,
                  "chatMessage": {
                    "content": innerText,
                    "sendTime":timerFormat(new Date()),
                    "leftOrRight":'2',
                    "contentType": 1
                  }
                }
    let addMsg = {
      data:sendMsg
    } 
    addMsgData(addMsg,1)
    nextTick(()=>{
      sendChatMsgRef.value.emptyMsgFuc()
    })
  if(ws){
    ws.onopen = () => {}
     ws.send(JSON.stringify(sendMsg))
    console.log(ws)
    }
}
// 增加消息数据
const addMsgData = (dataRes:any,type:number) => {
  // dataRes 元数据 type 1为发送消息 2为接收消息方
  console.log(dataRes.data,'dataRes.data.')
  if(type == 1){
    let chatDataAll = window.localStorage.getItem('chatDataAll')
    if(!chatDataAll){
      let chatData = []
      dataRes.data.chatMessageList = []
      dataRes.data.chatMessageList.push(dataRes.data.chatMessage)
      chatData.push(dataRes.data)
      window.localStorage.setItem('chatDataAll',JSON.stringify(chatData))
    }else{
      let chatData = JSON.parse(chatDataAll)
      let chatDataIndex = chatData.findIndex((o:any) => o.id == dataRes.data.id)
      if(!chatData[chatDataIndex]){
        dataRes.data.chatMessageList = []
        dataRes.data.chatMessageList.push(dataRes.data.chatMessage)
        chatData.push(dataRes.data)
      }else{
        chatData[chatDataIndex].chatMessageList.push(dataRes.data.chatMessage)
      }
      window.localStorage.setItem('chatDataAll',JSON.stringify(chatData))
    }
  }
  if(type == 2){
    let chatDataAll = window.localStorage.getItem('chatDataAll')
    console.log(dataRes,'dataRes')
    dataRes.data.id = dataRes.data.fromId
    dataRes.data.chatMessage.fromId = dataRes.data.fromId
    dataRes.data.chatMessage.fromUname = dataRes.data.fromUname
    dataRes.data.chatMessage.messageId = dataRes.data.messageId
    dataRes.data.chatMessage.sendTime = dataRes.data.sendTime
    dataRes.data.chatMessage.toId = dataRes.data.toId
    if(state.toId == dataRes.data.fromId){
      dataRes.data.chatMessage.isRead = '1'
    }else{
      dataRes.data.chatMessage.isRead = '0'
    }
    dataRes.data.chatMessage.leftOrRight = '1'
    if(!chatDataAll){
      let chatData = []
      dataRes.data.chatMessageList = []
      dataRes.data.chatMessageList.push(dataRes.data.chatMessage)
      chatData.push(dataRes.data)
      window.localStorage.setItem('chatDataAll',JSON.stringify(chatData))
    }else{
      let chatData = JSON.parse(chatDataAll)
      let chatDataIndex = chatData.findIndex((o:any) => o.id == dataRes.data.id)
      if(!chatData[chatDataIndex]){
        dataRes.data.chatMessageList = []
        dataRes.data.chatMessageList.push(dataRes.data.chatMessage)
        chatData.push(dataRes.data)
      }else{
        chatData[chatDataIndex].chatMessageList.push(dataRes.data.chatMessage)
      }
      window.localStorage.setItem('chatDataAll',JSON.stringify(chatData))
    }
  }
  getChatUserList()
}

// 更新用户的信息
const updateUserData = () => {
  let resListData = JSON.parse(window.localStorage.getItem('chatDataAll') as string)
  if(!resListData){
    return
  }
  state.chatUserList.forEach((o:any) => {
    let readIndex = resListData.findIndex((o1:any) => o1.id == o.id)
    if(readIndex!= -1){
      let count = resListData[readIndex].chatMessageList.filter((o2:any) =>o2.isRead == "0" ).length
      let resArr = resListData[readIndex].chatMessageList
        o.readCunt = count
        o.contantFirst = resArr[resArr.length - 1]
    }
  })
}

// 获取聊天记录
const getChatUserList = () => {
  let resListData = JSON.parse(window.localStorage.getItem('chatDataAll') as string)
  let resIndex =  resListData.findIndex((o:any) => o.id == state.toId)
  if(resIndex != -1){
    state.chatList = resListData[resIndex].chatMessageList
    nextTick(()=>{
      chatMainContent.value.scrollTop = chatRecordList.value.clientHeight
    })
  }
  updateUserData()
}

// 获取所有用户
const getUserAllFuc = async () => {
  let {data} = await getUserAll()
  if(data.length){
    let resListData = JSON.parse(window.localStorage.getItem('chatDataAll') as string)
    state.chatUserListRes = data.filter((o:any)=>o.id != store.value.id)
    state.chatUserListRes.unshift({
      avatar: "",
      gender: 1,
      id: "123456789",
      idLong: '999999999999',
      mobile: '6666666',
      roleKey: "admin",
      uname: "所有人",
      level:"3"
    })
    state.chatUserList = state.chatUserListRes.length ? JSON.parse(JSON.stringify(state.chatUserListRes)) : []
    console.log(resListData,'resListData')
    if(!resListData){
      return
    }
    updateUserData()
  }
}

// 选中聊天对象
const selectChatFuc = (item:any) => {
  // console.log(state.toId,item)
  if(state.toId == item.id){
    return
  }
  state.toId = item.id
  console.log(item.avatar)
  state.chatTitle = item.uname
  state.chatAvatar = item.avatar
  state.avatarObj.formAvatar = item.avatar
  state.avatarObj.myAvatar = store.value.avatar
  if(item.level){
    state.sessionType = "3"
  }else{
    state.sessionType = '1'
  }
  state.chatList = []
  if(state.toId){
    let resListData = JSON.parse(window.localStorage.getItem('chatDataAll') as string)
    if(!resListData){
      return
    }
    resListData.forEach((o:any)=>{
      if(o.id == state.toId){
        o.chatMessageList.forEach((o2:any)=>{
          o2.isRead = '1'
        })
        // console.log( o.chatMessageList)
      }
    })
    window.localStorage.setItem('chatDataAll',JSON.stringify(resListData))
  }
  getChatUserList()
  nextTick(()=>{
    sendChatMsgRef.value.emptyMsgFuc()
  })
}

// 搜索框输入
const inputChangeFuc = (val:string) => {
  let resChatList = state.chatUserListRes.filter(((o:any)=>{
    return o.uname.toLowerCase().indexOf(val) > -1 
  }))
  state.chatUserList = resChatList
  // console.log(resChatList)
}

onMounted(()=>{
  getUserAllFuc()
  if(ws){
  ws.onopen = () => {
  }
  ws.onmessage = (e) => {
    // 在这里写处理函数
    let dataRes = JSON.parse(e.data)
        console.log('返回的数据',dataRes);
        if(dataRes.data && dataRes.data.chatMessage){
          addMsgData(dataRes,2)
        }
    };
  }
})

</script>

<style lang="scss" scoped>
.chat-main-page{
  width: 100wh;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .chat-main{
    width: 1080px;
    height: 800px;
    border-radius: 8px;
    background: #f2f2f2;
    overflow:hidden;
    box-shadow:0 0 15px rgba(0,0,0,.2);
  }
}
.chat-main-box{
  width:100%;
  height:100%;
  display:flex;
  .chat-main-left{
    display:flex;
    flex:none;
    border-right:1px solid #e2e2e2;
    .side-left-setting{
      position: relative;
      width:60px;
      padding:10px;
      background:#666;
      .setting-box{
        position: absolute;
        bottom:10px;
        left:10px;
        right:10px;
        text-align: center;
        font-size: 20px;
        color:#fff;
      }
    }
  }
.chat-main-right{
  width:745px;
  .chat-main-header{
      height:62px;
      padding:10px;
      background:#fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .chat-header-left{
        display: flex;
        align-items: center;
      }
      .chat-title{
        margin-left: 10px;
      }
    }
  }
  .chat-main-content{
    height: 520px;
    padding:20px;
    overflow: auto;
  }
  .chat-main-content::-webkit-scrollbar{
      width:8px;
    }
    .chat-main-content::-webkit-scrollbar{
      width: 8px;
    }
     .chat-main-content::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: #ddd;
    }
    .chat-main-content::-webkit-scrollbar-track {
      border-radius: 0;
      background: #fafafa;
    }

}

.chat-main-content{
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
  }
}

.chat-main-default-box{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: #999;
}

</style>
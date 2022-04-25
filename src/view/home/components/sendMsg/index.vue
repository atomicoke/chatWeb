<template>
<div class="chat-main-text-box">
  <div class="chat-main-text">
    <div class="chat-main-text-content" contenteditable="true" ref="chatContentDom" v-html="state.chatContent" @keydown.enter="sendFuc($event)">
    </div>
  </div>
  <div class="chat-main-text-btn">
    <a-button  type="primary" size="large" @click="sendFuc($event)">发送</a-button>
  </div>
</div>
</template>

<script setup lang="ts">
import { onMounted, reactive,ref} from 'vue'; 
import { message } from 'ant-design-vue';
let emit = defineEmits(["sendChatMsgFuc"]);
const chatContentDom = ref<any>('')
const state = reactive({
  chatContent:''
})
const sendFuc = async (event:any) => {
  let sendMsg = chatContentDom.value.innerHTML
  if(sendMsg.length > 0 ){
    emit('sendChatMsgFuc',sendMsg)
  }else{
    message.error('请输入内容');
  }
  event.preventDefault()
}

const emptyMsgFuc = () => {
  chatContentDom.value.innerHTML = ""
}

defineExpose({
  emptyMsgFuc
})

</script>

<style lang="scss" scoped> 
   .chat-main-text-box{
    border-top:1px solid #e2e2e2;
    padding:20px;
    background:#fff;
    height:220px;
    .chat-main-text{
      padding:10px 0 10px 10px;
      background:#fff;
    }
    .chat-main-text-content{
      width: 720px;
      height:115px;
      overflow:auto;
      outline: none;
      line-height: 1.5;
      font-size: 16px;
    }
    .chat-main-text-content::-webkit-scrollbar{
      width:10px;
    }
    .chat-main-text-content::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: rgba(0,0,0,0.2);
    }
    .chat-main-text-content::-webkit-scrollbar-track {
      border-radius: 0;
      background: #fafafa;
    }
    .chat-main-text-btn{
      padding-top:10px;
      width:100%;
      display:flex;
      justify-content:flex-end;
    }
  }
</style>
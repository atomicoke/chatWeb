<template>
<div class="chat-main-text-box">
  <div class="chat-main-text">
    <div class="chat-main-content" ref="chatContent">
      <div class="chat-main-text-content" contenteditable="true" ref="chatContentDom" v-html="state.chatContent" >
      </div>
    </div>
  </div>
  <div class="chat-main-text-btn">
    <a-button  type="primary" size="mini" @click="sendFuc($event)">发送</a-button>
  </div>
</div>
</template>

<script setup lang="ts">
import { onMounted, reactive,ref} from 'vue'; 
import { message } from 'ant-design-vue';
let emit = defineEmits(["sendChatMsgFuc"]);
const chatContentDom = ref<any>('')
const chatContent = ref<any>('')
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

onMounted(()=>{
  document.onkeydown = function(event:any){
    let obj:any = event.target
    if(event.ctrlKey && event.keyCode == 13){
      chatContentDom.value.innerHTML = chatContentDom.value.innerHTML + '<br/>'
      // 修改光标位置
      if (window.getSelection) { //ie11 10 9 ff safari
        // obj.focus(); //解决ff不获取焦点没法定位问题
        let range:any = window.getSelection(); //建立range
        range.selectAllChildren(obj); //range 选择obj下全部子内容
        range.collapseToEnd(); //光标移至最后
      } else if (document.selection) { 
        //ie10 9 8 7 6 5
        let range = document.selection.createRange(); //建立选择对象
        //var range = document.body.createTextRange();
        range.moveToElementText(obj); //range定位到obj
        range.collapse(false); //光标移至最后
        range.select();
      }
      chatContent.value.scrollTop = chatContentDom.value.clientHeight
      return
    }
    if(event.keyCode == 13){
      sendFuc(event)
    }
  }

})

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
      padding:10px 0 10px 0;
      background:#fff;
    }
    .chat-main-content{
      height:115px;
      overflow:auto;
    }
    .chat-main-text-content{
      width: 100%;
      min-height:115px;
      outline: none;
      line-height: 1.5;
      font-size: 16px;
    }
    .chat-main-content::-webkit-scrollbar{
      width:6px;
    }
    .chat-main-content::-webkit-scrollbar-thumb {
      border-radius: 6px;
      background: rgba(0,0,0,0.2);
    }
    .chat-main-content::-webkit-scrollbar-track {
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
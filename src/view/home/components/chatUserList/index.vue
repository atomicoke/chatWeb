<template>
  <div class="side-left-list">
    <div class="search-box">
      <a-input v-model:value="state.searchValue" placeholder="搜索" @input="InputChangeFuc"/>
    </div>
    <div class="user-list">
      <div class="side-left-item" :class="state.currentIndex == index ? 'side-left-item-cur' : '' " v-for="(item,index) in prop.chatUserList" :key="item.id" @click="selectChatObj(item,index)">
        <a-badge :count="item.readCunt ? item.readCunt : ''" size="12">
          <AvatarImage :avatar="item.avatar" :name="item.uname"/>
        </a-badge>
        <div class="side-left-item-content">
          <h6><span>{{item.uname}}</span><em>{{ getTimerFuc(item)}}</em></h6>
          <p v-html="item.contantFirst ? item.contantFirst.content : ''"></p>
        </div>
      </div> 
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'; 
import AvatarImage from '@/view/home/components/avatarImg/index.vue'

import {
  timerFormat
} from '@/utils/common/index'

const emit = defineEmits(["selectChatFuc","inputChangeFuc"]);
const prop = defineProps({
  chatUserList:{
    type:Object,
    default:[]
  }
})
const state= reactive({
  chatUserList:<any>[],
  currentIndex:<any>null,
  searchValue:'', // 搜索成员/群
})

// 搜索输入框发生变化
const InputChangeFuc = () => {
  emit('inputChangeFuc',state.searchValue)
}

// 格式化时间
const getTimerFuc = (item:any) => {
  let resTimer = ""
  if(item.contantFirst){
    if(item.contantFirst.sendTime){
      let timer = timerFormat(new Date(item.contantFirst.sendTime),'YY-MM-DD hh:mm:ss')
      resTimer = timer.split(' ')[1]
    }
  }
  return resTimer
}

const selectChatObj = (item:any,index:any) => {
  state.currentIndex = index
  emit('selectChatFuc',item)
}


</script>

<style lang="scss" scoped> 
 .side-left-list{
    width:275px;
    .search-box{
      // height:48px;
      background:#fff;
      padding:15px;
    }
    .side-left-item{
      display:flex;
      width:100%;
      padding:10px;
      border-bottom:1px solid #efefef;
      cursor: pointer;
      :deep(.ant-image){
       flex: none;
        border-radius: 6px;
        overflow: hidden;
      }
      .side-left-item-content{
        width:202px;
        margin-left:10px;
        h6{
          display:flex;
          justify-content:space-between;
          font-weight:normal;
          font-size:16px;
          line-height:16px;
          padding-top:2px;
          span{
            display:block;
            width:100%;
            height:18px;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
          }
          em{
            flex:none;
            color:#999;
            font-size:12px;
          }
        }
        p{
          height:18px;
          line-height:18px;
          overflow: hidden;
          color:#aaa;
          font-size:12px;
        }
      }
    }
    .side-left-item-cur{
      background: #fafafa;
    }
  }
  .user-list{
    height: calc(100% - 63px);
    overflow: auto;
  }
.user-list::-webkit-scrollbar{
  width: 6px;
  background: #c4c4c4;
}
.user-list::-webkit-scrollbar{
width:6px;
}
.user-list::-webkit-scrollbar{
width: 6px;
}
.user-list::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #ddd;
}
.user-list::-webkit-scrollbar-track {
  border-radius: 0;
  background: #fafafa;
}

</style>
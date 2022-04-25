<template>
  <div class="side-left-list">
    <div class="search-box">
      <a-input v-model:value="state.searchValue" placeholder="搜索" @input="InputChangeFuc"/>
    </div>
    <div class="side-left-item" :class="state.currentIndex == index ? 'side-left-item-cur' : '' " v-for="(item,index) in prop.chatUserList" :key="item.id" @click="selectChatObj(item,index)">
    <a-badge :count="item.readCunt ? item.readCunt : ''" size="12">
      <a-image
      v-if="item.avatar"
        :preview="false"
        :width="36"
        :src="item.avatar"
      />
      <div v-else class="not-avatar">
        {{item.uname.slice(0,2)}}
      </div>
      </a-badge>
      <div class="side-left-item-content">
        <h6><span>{{item.uname}}</span><em>{{ getTimerFuc(item)}}</em></h6>
        <p v-html="item.contantFirst ? item.contantFirst.content : ''"></p>
      </div>
    </div>  
  </div>
</template>

<script setup lang="ts">
import { reactive,ref } from 'vue'; 
import avatar from '@/assets/avatar.png'

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
    width:100%;
    .search-box{
      // height:48px;
      background:#fff;
      padding:15px;
    }
    .side-left-item{
      display:flex;
      width:259px;
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
        line-height:18px;
          color:#aaa;
          font-size:12px;
        }
      }
      .not-avatar{
        width: 36px;
        height: 36px;
        overflow: hidden;
        line-height: 36px;
        text-align: center;
        background:#1890ff;
        border-radius: 6px;
        color:#fff;
      }
    }
    .side-left-item-cur{
      background: #fafafa;
    }
  }

</style>
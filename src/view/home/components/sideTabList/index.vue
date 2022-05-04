<template>
  <div class="side-tab-list">
    <div class="side-tab-item" v-for="item in state.sideTabList" :key="item.id" :class="state.curIndex == item.id ? 'side-tab-item-cur' : '' " @click="selectSideTab(item)" :title="item.name">
      <comment-outlined v-if='item.id == 1'/>
      <team-outlined v-if='item.id == 2'/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TeamOutlined,CommentOutlined } from '@ant-design/icons-vue';
import { reactive } from 'vue';
const state = reactive({
  sideTabList:[
    {
      id:1,
      name:'消息'
    },
    {
      id:2,
      name:'好友'
    }
  ],
  curIndex:1,
})

const selectSideTab = (item:any) => {
  state.curIndex = item.id
}

</script>

<style lang="scss" scoped>
.side-tab-list{
    .side-tab-item{
      width:100%;
      text-align: center;
      color:#fff;
      font-size: 20px;
      width: 36px;
      line-height: 36px;
      cursor: pointer;
      border-radius: 6px;
      margin: 10px auto 0 auto;
      &:hover{
        background: #fff;
        color:#1890ff;
      }
    }
    .side-tab-item-cur{
      background: #fff;
      color:#1890ff;
    }
}

</style>
<template>
<a-modal
      ref="modalRef"
      v-model:visible="state.visible"
      centered
      destroyOnClose
      :maskClosable="false"
      :wrap-style="{ overflow: 'hidden' }"
      title="添加好友"
      @ok="handleOk"
      @cancel="cancelFuc"
      :footer="null"
    >
    <div class="friends-main">
        <a-input-search
          v-model:value="state.searchValue"
          placeholder="请输入好友ID"
          style="width: 200px"
          @search="onSearch"
        />
        <div class="friends-list">
          <div class="friends-item">
          </div>
          <div class="friends-empty">
            <a-empty :image="state.simpleImage" description="暂无数据"/>
          </div>
        </div>
    </div>
    </a-modal>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { Empty } from 'ant-design-vue';
const prop = defineProps({
  friendsVisible:{
    type:Boolean,
    default:false
  }
})
const emits = defineEmits(['closeModal'])
const state = reactive({
  visible:prop.friendsVisible,
  searchValue:'',
  simpleImage:Empty.PRESENTED_IMAGE_SIMPLE,
})

// 搜索onSearch
const onSearch = () => {

}

// 确定
const handleOk = () => {
  console.log(66)
  state.visible = false
  emits('closeModal')
}

// 取消
const cancelFuc = () => {
  state.visible = false
  emits('closeModal')
}
</script>

<style lang="scss" scoped>
.ant-input-search{
  width:100%!important;
}
.friends-list{
  height:200px;
}
.friends-empty{
  width:100%;
  height:200px;
  display:flex;
  justify-content: center;
  align-items: center;
}

</style>
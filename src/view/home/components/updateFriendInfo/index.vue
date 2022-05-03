<template>
  <div class="setting-friend-box">
    <ellipsis-outlined />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'; 
import { EllipsisOutlined } from '@ant-design/icons-vue';

</script>

<style lang="scss" scoped>
.setting-friend-box{
  font-size: 24px;
  cursor: pointer;
  &:hover{
    color: #1890ff;
  }
}
</style>
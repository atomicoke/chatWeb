<template>
  <a-image
    v-if="prop.avatar"
    :preview="false"
    :width="prop.avatarWh"
    :height="prop.avatarWh"
    :src="'http://114.132.249.192/a/100?url=' + prop.avatar"
  />
  <div v-else class="not-avatar" :style="{width: prop.avatarWh +'px' , height: prop.avatarWh +'px',lineHeight:prop.avatarWh +'px'}">
    {{prop.name.slice(0,2)}}
  </div>
</template>

<script setup lang="ts">
let prop = defineProps({
  avatar:{
    type:String,
    default:''
  },
  name:{
    type:String,
    default:''
  },
  avatarWh:{
    type:Number,
    default:36
  }
})
// console.log(prop.avatar,'prop.avatar')
</script>

<style lang="scss" scoped> 

.not-avatar{
  overflow: hidden;
  text-align: center;
  background:#1890ff;
  border-radius: 6px;
  color:#fff;
}
:deep(.ant-image){
  border-radius: 6px;
  overflow: hidden;
}
</style>
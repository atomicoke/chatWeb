<template>
  <div class="update-info-box">
    <a-modal v-model:visible="state.updateUserInfoVisible" title="信息修改" @cancel="handleCancel" destroyOnClose :maskClosable="false">
      <a-form
        :model="state.formState"
        name="basic"
        :wrapper-col="{ span: 24 }"
        autocomplete="off"
      >
        <a-form-item
          label="手机"
          v-bind="validateInfos.mobile"
        >
          <a-input v-model:value="state.formState.mobile" :maxlength="11"/>
        </a-form-item>

        <a-form-item
          label="密码"
          v-bind="validateInfos.passwd"
        >
          <a-input-password v-model:value="state.formState.passwd" :maxlength="20"/>
        </a-form-item>

        <a-form-item
          label="性别"
          v-bind="validateInfos.gender"
        >
          <a-select
            ref="select"
            v-model:value="state.formState.gender"
          >
          <a-select-option value="0">未知</a-select-option>
          <a-select-option value="1">男</a-select-option>
          <a-select-option value="2">女</a-select-option>
        </a-select>
        </a-form-item>
      </a-form>
      <template #footer>
          <a-button @click="handleCancel">取消</a-button>
          <a-button type="primary" :loading="state.loading" html-type="submit" @click="handleOk">确定</a-button>
        </template>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive ,toRaw } from 'vue'; 
import {useStore} from '@/store/index'
import { Form } from 'ant-design-vue';

import {
  getLoginOut, // 退出
} from '@/api/login/index.ts'

import {
  editSelfInfo, // 修改用户信息
} from '@/api/login/index.ts'

import router from '../../../../router';

const prop = defineProps({
  updateUserInfoVisible:{
    type:Boolean,
    default:false
  }
})

const emit = defineEmits(['handleCancelFuc'])
const userInfo = useStore().$state.userInfo
const useForm = Form.useForm;
const state = reactive({
  updateUserInfoVisible:prop.updateUserInfoVisible,
  loading:false,
  formState:{
    mobile:userInfo.mobile,
    passwd:"",
    gender:userInfo.gender + '',
  }
})
const rulesRef = reactive({
  mobile: [{ required: true, message: '请输入手机号' }],
  passwd: [{ required: true, message: '请输入新密码' }],
  gender: [{ required: true, message: '请选择性别' }],
});
const { resetFields, validate, validateInfos } = useForm(state.formState, rulesRef);
// 取消
const handleCancel = () => {
  state.updateUserInfoVisible = false
  emit('handleCancelFuc')
}

// 设置信息
const handleOk = () => {
  console.log(state.formState)
  validate()
    .then(async () => {
      state.loading = true
      let data = await editSelfInfo(state.formState)
      if(data. code == 0){
        emit('handleCancelFuc')
      }
      state.loading = false
    })
    .catch(err => {
      console.log('error', err);
    });
}

</script>

<style lang="scss" scoped>
  .setting-icon{
    color:#fff;
    cursor: pointer;
  }
</style>
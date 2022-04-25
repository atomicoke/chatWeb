<template>
  <div class="login-box">
    <div class="login-form-flex">
      <div class="ant-form-box">
        <h3>{{state.btnName}}</h3>
        <a-form
          :model="state.formState"
          name="normal_login"
          :label-col="{ span: 4}"
          class="login-form"
          @finish="onFinish"
        >
          <a-form-item
            label="用户名"
            name="uname"
            :rules="[{ required: true, message: '请输入用户名!' }]"
          >
            <a-input v-model:value="state.formState.uname">
              <template #prefix>
                <UserOutlined class="site-form-item-icon" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item
            label="密码"
            name="passwd"
          >
            <a-input-password v-model:value="state.formState.passwd">
              <template #prefix>
                <LockOutlined class="site-form-item-icon" />
              </template>
            </a-input-password>
          </a-form-item>
          <a-form-item>
            <a-button :disabled="state.disabledLoginBtn" :loading="state.loginRegisterFalse" type="primary" html-type="submit" class="login-form-button">
              {{state.btnName}}
            </a-button>
            <div class="register-form-wrap">
              <a-button type="link" size="large" @click="loginRegisterFuc" >{{state.loginRegister ? "登陆" : "注册"}}</a-button>
            </div>
          </a-form-item>
        </a-form>
      </div>  
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  registerUser, // 注册
  getLogin, // 登陆
} from '@/api/login/index'
import { reactive } from 'vue'; 
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { useStore } from '@/store/index'
import router from '@/router/index'
const state= reactive({
  formState:{
    uname:'',
    passwd:'',
  },
  disabledLoginBtn:false,
  loginRegister:false, // true 注册 false 登陆
  btnName:'登陆',
  loginRegisterFalse:false, // 登陆注册
})

// 验证通过
const onFinish = async() => {
  let resData:any = {}
  state.loginRegisterFalse = true
  // 登陆
  if(!state.loginRegister){
    let data = await getLogin(state.formState)
    resData = data
  }else{
    // 注册用户
    let data = await registerUser(state.formState)
    resData = data
  }
  window.localStorage.setItem('token',resData.data)
  console.log(resData,'resData')
  if(resData.code != 0){
    state.loginRegisterFalse = false
    return
  }
  let store = useStore()
  let data = await store.getUserInfoFuc()
  state.loginRegisterFalse = false
  router.push({
    name:'home'
  })
}

// 登陆注册切换
const loginRegisterFuc = () => {
  state.loginRegister = !state.loginRegister
  state.btnName =  state.loginRegister ?  '注册' : "登陆"
}

</script>

<style lang="scss" scoped>
.login-form-flex{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  .ant-form-box{
    width:400px;
    padding:  20px;
    border-radius: 8px;
    h3{
      line-height: 48px;
      text-align: center;
      font-size: 20px;
    }
  }
  .login-form-button{
    width:100%;
  }
}
.register-form-wrap{
  text-align: center;
}
.login-form-wrap{
  :deep(.ant-form-item-control-input-content){
    display: flex;
    justify-content: space-between;
  }
}
</style>
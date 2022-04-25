// store.ts
import { defineStore } from "pinia";
import {
  // 获取用户信息
  getUserInfo
} from '@/api/login/index'

export const useStore = defineStore("main", {
  state: () => ({
    userInfo:<any>{
      avatar: null,
      gender: 0,
      id: "1511726232457043968",
      mobile: null,
      roleKey: "common",
      uname: "admin"
    }
  }),
  actions: {
    // 获取用户基本信息
    getUserInfoFuc() {
      let that = this
      return new Promise(async function(resolve, reject){
    //做一些异步操作
        let {data} = await getUserInfo()
        that.userInfo = data
        resolve(that.userInfo)
      });
    },
    // 修改用户头像
    updateUserAvata(val:string){
      let that = this
      that.userInfo.avatar = val
      console.log(that.userInfo,'that.userInfo')
    }
  },
});


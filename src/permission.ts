import router from './router/index'

import { useStore } from '@/store/index'

// 保存状态
const releaseRoute: any[] = ['/weChatLogin', '/loginCode']
// 路由前置
router.beforeEach(async (to, from, next) => {
  // console.log(to, 'to', from)
  // 是否放行当前路由
  const getToken: any = localStorage.getItem('token')
  if (getToken && getToken != undefined) {
    if (to.path === "/login") {
      next({
        path: '/'
      });
    }else{
      let store = useStore()
      let data = await store.getUserInfoFuc()
      next()
    }
  } else {
    // console.log(to)
    if (releaseRoute.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      if (to.path != "/login") {
        next(`/login?redirect=${to.fullPath}`);
      }else{
        next()
      }
      // 否则全部重定向到登录页
    }
  }
})
// 路由后置
router.afterEach(() => {

});

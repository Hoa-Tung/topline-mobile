<template>
   <div class="login-warp">
     <van-nav-bar title="登录"/>
      <form action="">
        <van-cell-group>
          <van-field
            v-model="user.mobile"
            required
            clearable
            label="用户名"
            placeholder="请输入手机号"
          />

          <van-field
            v-model="user.password"
            type="password"
            label="密码"
            placeholder="请输入密码"
            required
          />
        </van-cell-group>
        <div class="login-btn-box">
          <van-button
          class="login-btn"
          type="info"
          @click.prevent="handleLogin"
          >登录</van-button>
        </div>
      </form>
   </div>
</template>

<script>
// 导入user.js中的login函数
import { login } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    async handleLogin () {
      try {
        const res = await login(this.user)
        console.log(res)
      } catch (err) {
        console.log(err)
        console.log('登录失败')
      }
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
.login-btn-box {
  padding: 10px;
  .login-btn {
    width: 100%;
  }
}
</style>

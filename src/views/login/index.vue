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
            :error-message="errors.mobile"
          />

          <van-field
            v-model="user.code"
            type="password"
            label="密码"
            placeholder="请输入密码"
            :error-message="errors.code"
            required
          />
        </van-cell-group>
        <div class="login-btn-box">
          <van-button
          class="login-btn"
          type="info"
          :loading="loginLoading"
          loading-text="登录中......."
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
        mobile: '18810232702',
        code: '246810'
      },
      loginLoading: false, // 控制按钮的loading状态
      errors: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    async handleLogin () {
      try {
        // this.loginLoading = true
        const { mobile, code } = this.user
        const errors = this.errors

        if (mobile.length) {
          errors.mobile = ''
        } else {
          errors.mobile = '手机号不能为空'
          return
        }

        if (code.length) {
          errors.code = ''
        } else {
          errors.code = '验证码不能为空'
          return
        }
        // 表单验证通过，发送请求，loading 加载
        this.loginLoading = true

        const data = await login(this.user)
        console.log(data)
        this.$store.commit('setUser', data)
        // 跳转首页
        this.$router.push({
          name: 'home'
        })
      } catch (err) {
        console.log(err)
        console.log('登录失败')
      }
      this.loginLoading = false
    }
  }
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

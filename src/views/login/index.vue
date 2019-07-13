<template>
   <div class="login-warp">
     <van-nav-bar title="登录"/>
      <form action="">
        <!-- <div> -->
          <!-- 多个验证规则 -->
          <!-- <input v-validate="'required|email'" name="email" type="text"> -->
          <!-- 显示错误消息 -->
          <!-- <span>{{ errors.first('email') }}</span> -->
          <!-- 显示多个错误消息 -->
          <!-- <input type="text" name="fieldName" v-validate.continues="'required|alpha|min:5'">
          <ul>
            <li v-for="error in errors.collect('fieldName')">{{ error }}</li>
          </ul> -->
          <!-- <input
            name="email"
            type="email"
            required
            v-validate
            data-vv-as="邮箱"
          >
          <span>{{ errors.first('email') }}</span>
        </div> -->
        <van-cell-group>
          <van-field
            v-model="user.mobile"
            required
            clearable
            label="手机号"
            placeholder="请输入手机号"
            v-validate="'required'"
            name="mobile"
            :error-message="errors.first('mobile')"
          />

          <van-field
            v-model="user.code"
            type="password"
            label="密码"
            placeholder="请输入密码"
            v-validate="'required'"
            name="code"
            :error-message="errors.first('code')"
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
      myErrors: {
        mobile: '',
        code: ''
      }
    }
  },
  created () {
    this.configFromErrorsMessages()
  },
  methods: {
    async handleLogin () {
      try {
        const valid = await this.$validator.validate()
        if (!valid) {
          return
        }
        // this.loginLoading = true
        // const { mobile, code } = this.user
        // 表单验证通过，发送请求，loading 加载
        this.loginLoading = true

        const data = await login(this.user)
        this.$store.commit('setUser', data)
        // 跳转首页
        this.$router.push({
          name: 'home'
        })
      } catch (err) {
        this.$toast.fail('登录失败')
      }
      this.loginLoading = false
    },

    configFromErrorsMessages () {
      const dict = {
        custom: {
          mobile: {
            required: '手机号不能为空'
          },
          code: {
            required: '密码不能为空'
          }
        }
      }

      // Validator.localize('en', dict);
      // or use the instance method
      this.$validator.localize('zh_CN', dict)
    }
  }
}
</script>

<style lang="less" scoped>
.login-btn-box {
  padding: 20px;
  .login-btn {
    width: 100%;
  }
}
</style>

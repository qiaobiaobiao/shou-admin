<template>
  <div class="login">
    <el-form label-position="right"
             label-width="80px"
             :model="loginForm"
             :rules="rules"
             ref="loginFormEl">
      <el-form-item label="用户名"
                    prop="username">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码"
                    prop="password">
        <el-input v-model="loginForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="submitForm">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.loginFormEl.validate((valid) => {
        if (valid) {
          this.login()
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    async login () {
      const loginForm = this.loginForm
      const { data, meta } = (await request({
        url: '/login',
        method: 'POST',
        data: loginForm,
      })).data
      if (meta.status === 400) {
        this.$message.error(meta.msg);
      } else {
        this.$message({
          message: '登陆成功',
          type: 'success'
        });
        window.localStorage.setItem('token', data.token)
        this.$router.replace('/layout')
      }
    }
  }
}
</script>

<style>
.login {
  margin: 300px auto;
  width: 500px;
}
</style>

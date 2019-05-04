<template>
    <el-row :gutter="20">
    <el-col :span="4">
      <img src=""
           alt="哈哈">
    </el-col>
    <el-col :span="16"
            id="zhong">
      电商管理系统
    </el-col>
    <el-col :span="4">
      <el-button type="primary"
                 @click="handleLogout">退出</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
    name:'AppHeader',
    methods: {
    handleLogout () {
      this.$confirm('确定退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 1 清除登录状态
        window.localStorage.removeItem('token')
        // removeToken()
        // 2 跳转到登陆页
        this.$router.replace('/login')
        this.$message({
          type: 'success',
          message: '以退出!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style scoped>
  .el-header {
    padding: 0 0;
  }
  .zhong {
    text-align: center;
    font-size: 50px
  }
  .layout-log {
    background-color: blue;
    height: 40px;
  }
  .layout-biaoti {
    background-color: yellow;
    height: 40px;
  }
  .layout-tuichu {
    background-color: blanchedalmond;
    height: 40px;
    font-size: 20px
  }

</style>

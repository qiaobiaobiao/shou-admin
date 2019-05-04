<template>
  <el-container>
    <el-header>
      <AppHeader></AppHeader>
    </el-header>    
    <el-container>
      <el-aside style="width:200px;height:100%">
        <NavMenu></NavMenu>
      </el-aside>
      <el-main>
        <el-card class="box-card">
          <div slot="header"
               class="clearfix">
            <!-- <AppBreadcrumb :list="[{ label:'首页', path:'/' }, { label:'用户管理' }, { label:'用户列表'}]"  ></AppBreadcrumb> -->
            <AppBreadcrumb :list="getBreadcrumbs()"></AppBreadcrumb>
          </div>
          <!-- layout 的组件渲染到这里 -->
          <router-view></router-view>
        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppHeader from './AppHeader';
import NavMenu from './NavMenu';
import http from '@/utils/request';
export default {
  components:{
    AppHeader,
    NavMenu
  },
  created() {
    console.log('this.$route.matched => ', this.$route.matched)
    http ({
      method:'GET',
      url:'/users',
      data:{
        pagenum:'1',
        pagesize:'5'
      }
    })
  },
  methods: {
    getBreadcrumbs() {
      const list = [{
        path:'/layout',
        label:'首页'
      }]
      this.$route.matched.slice(1).forEach(item=> {
        // console.log(item)
        list.push({label:item.meta.label})
      })
      console.log(list)
      return list
    }
  }
}
</script>

<style scoped>

</style>

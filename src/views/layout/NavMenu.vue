<template>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      :unique-opened="true">
      <el-submenu v-for="first in rights" :key="first.id" :index="first.path">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{ first.authName }}</span>
        </template>
          <el-menu-item v-for="second in first.children" :key="second.id" :index="second.path">{{ second.authName }}</el-menu-item>
      </el-submenu>
      
    </el-menu>
</template>

<script>
import axios from '@/utils/request';
export default {
    name:'NavMenu',
    data () {
      return {
        rights:[]
      }
    },
    created() {
      this.huoquyinghuquanxin()
    },
    methods:{
     async huoquyinghuquanxin() {
        const {data, meta} = await axios({
          method:'GET',
          url:'/menus'
        }).then(res => res.data)
        if (meta.status === 200) {
          this.rights = data
        }
      }
    }
}
</script>

<style>

</style>

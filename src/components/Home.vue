<template>
  <el-container class="home-container">
    <!-- head region -->
    <el-header>
      <div>
        <img src="../assets/heima.png" alt="" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">Log out</el-button>
    </el-header>
    <!-- body regin -->
    <el-container>
      <!-- aside -->
      <el-aside :width="isCollapse?'64px' :'200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- aside menu -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
          :default-active="activePath"
        >
          <!-- level 1 menu -->
          <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
            <!-- template of level 1 menu -->
            <template slot="title">
              <!-- icon -->
              <i :class="iconsObj[item.id]"></i>
              <!-- text -->
              <span>{{item.authName}}</span>
            </template>
            <!-- level 2 menu -->
            <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/'+subItem.path)">
              <template slot="title">
                <!-- icon -->
                <i class="el-icon-menu"></i>
                <!-- text -->
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- main on the right -->
      <el-main>
          <!-- router placeholder -->
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // menu data on the left side
      menulist: [],
      iconsObj: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      },
      // menu is collapse or not
      isCollapse: false,
      // the path of the active link
      activePath: ''
    }
  },
  created() {
    this.getMenuList();
    this.activePath = window.sessionStorage.getItem('activePath');
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // get all the menus
    async getMenuList() {
      const {data: res} = await this.$http.get('menus');
      if(res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.menulist = res.data;
      console.log(res);
    },
    // click button, switch between the collapse and expansion of menu
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    // save the active status of link
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath);
      this.activePath = activePath;
    }
  },
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #333744;
  .el-menu {
      border-right: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
.iconfont{
    margin-right: 10px;
}
.toggle-button {
    background-color: #4A5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}
</style>
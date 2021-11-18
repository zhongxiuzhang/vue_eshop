<template>
    <div class="login_container">
        <div class="login_box">
            <!-- avatar region -->
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="">
            </div>
            <!-- form region -->
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
                <!-- user name -->
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
                </el-form-item>
                <!-- password -->
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
                </el-form-item>
                <!-- password -->
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // bound data object of the login form
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // validation rules of the login form
      loginFormRules: {
        username: [
          { required: true, message: 'Please input user name', trigger: 'blur' },
          { min: 3, max: 10, message: 'Length should be 3 to 10', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please input password', trigger: 'blur' },
          { min: 6, max: 15, message: 'Length should be 6 to 15', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // click reset button, reset login form
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields();
    },
    login () {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;
        const {data: res} = await this.$http.post('login',this.loginForm);
        if(res.meta.status !== 200) return this.$message.error('Log in fails');
        this.$message.success('Log in succeeds');
        // 1. Save the token generated after logging in to the sessionStorage of client
        //  1.1 all the other APIs except for Log in should only be accessed after logging in
        //  1.2 token should only be valid when the website is open, so we save the token in sessionStorage
        // console.log(res);
        window.sessionStorage.setItem('token', res.data.token);
        // 2. navigate to home page via router, the router path is /home
        this.$router.push('/home');

      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container{
    background-color: #2b4b6b;
    height: 100%;
}
.login_box{
    width: 450px;
    height: 300px;
    background-color:#fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
.avatar_box{
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius:50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img{
        width: 100%;
        height:100%;
        border-radius:50%;
        background-color: #eee;
    }
}
.login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}

.btns{
    display:flex;
    justify-content: flex-end;
}
</style>

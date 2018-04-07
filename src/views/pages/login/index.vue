<template>
  <div class="login-container">
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left"
             label-width="0px"
             class="card-box login-form">
      <h3 class="title">
        <img src="../../../assets/img/logo-big.png" style="height: 26px;" alt="logo-ccms-boc">
        CCMS系统登录</h3>
      <el-form-item prop="email">
        <span class="svg-container">
          <wscn-icon-svg icon-class="jiedianyoujian"/>
        </span>
        <el-input name="email" type="text" v-model="loginForm.usrUid" autoComplete="on" class="el-input"
                  :placeholder="$t('index.email')"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <wscn-icon-svg icon-class="mima"/>
        </span>
        <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.usrPwd"
                  autoComplete="on" :placeholder="$t('index.password')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          {{$t('index.login')}}
        </el-button>
      </el-form-item>
      <div class='tips'>admin账号为:admin@boc.com </div>
      <div class='tips'>editor账号:editor@boc.com </div>
      <div class='tips'>密码不小于六位字符 </div>
    </el-form>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import WscnIconSvg from '@/views/components/Icon-svg/wscn-icon-svg'
  import Tips from '@/utils/tipsUtil'
  export default {
    name: 'login',
    components: {WscnIconSvg},
    data () {
      const validatePass = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能小于6位'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          usrUid: '',
          usrPwd: ''
        },
        loginRules: {
          usrPwd: [
            {required: true, trigger: 'blur', validator: validatePass}
          ]
        },
        loading: false,
        showDialog: false
      }
    },
    computed: {
      ...mapGetters([
        'auth_type',
        'token'
      ])
    },
    methods: {
      factorial (obj) {
        if (obj.children && obj.children.length > 0) {
          obj.children.filter(v => {
            return this.factorial(v)
          })
        } else {
//          arrName.push(obj.id)
        }
      },
      handleLogin () {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('LoginByEmail', this.loginForm).then((val) => {
              this.loading = false
              if (val.status === '1') {
                this.$router.push({path: '/'})
                Tips.success(val.msg)
              } else {
                Tips.error(val.msg)
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>

<style>
  .layout-logo-left {
    width: 80%;
    height: 30px;
    border-radius: 3px;
    margin: 10px auto;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 5px;
  }

  .login-container {
    position: relative;
    width: 100%;
    height: 100vh;
    background-color: #2d3a4b;
  }

  .login-container input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
    -webkit-text-fill-color: #fff !important;
  }

  .login-container input {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 12px 5px 12px 15px;
    color: #eeeeee;
    height: 47px;
  }

  .login-container .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
  }

  .login-container .svg-container {
    padding: 6px 5px 6px 15px;
    color: #889aa4;
  }

  .login-container .title {
    font-size: 26px;
    font-weight: 400;
    color: #eeeeee;
    margin: 0px auto 30px auto;
    text-align: center;
    /*font-weight: bold;*/
  }

  .login-container .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }

  .login-container .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }

  .login-container .forget-pwd {
    color: #fff;
  }


</style>

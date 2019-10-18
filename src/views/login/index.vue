<template>
  <div class="login-container">
    <!-- 光粒子特效 -->
    <div id="canvascontainer" ref="can" style="position:absolute;max-width:100%;max-height:95%;overflow: hidden;"></div>
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">情报中心数据管理平台</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >立即登录</el-button>    
    </el-form>
  </div>
</template>

<script>

export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length==0) {
        callback(new Error('Please enter the correct user name'));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      redirect: undefined,
      otherQuery: {}
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true
    }
  },
  created() {
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus();
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus();
    }

    // 添加canvas粒子画布
    container = document.createElement('div');
    this.$refs.can.appendChild(container)
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      10000
    )
    camera.position.z = 1000
    scene = new THREE.Scene()
    particles = new Array()
    var PI2 = Math.PI * 2
    var material = new THREE.ParticleCanvasMaterial({
      color: 0x0078de,
      program: function(context) {
        context.beginPath()
        context.arc(0, 0, 1, 0, PI2, true)
        context.fill()
      }
    })

    var i = 0
    for (var ix = 0; ix < AMOUNTX; ix++) {
      for (var iy = 0; iy < AMOUNTY; iy++) {
        particle = particles[i++] = new THREE.Particle(material)
        particle.position.x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2
        particle.position.z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2
        scene.add(particle)
      }
    }

    renderer = new THREE.CanvasRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    container.appendChild(renderer.domElement)
    document.addEventListener('mousemove', onDocumentMouseMove, false)
    window.addEventListener('resize', onWindowResize, false)
    animate()
  },
  destroyed() {
  },
  methods: {
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (
          (shiftKey && (key >= 'a' && key <= 'z')) ||
          (!shiftKey && (key >= 'A' && key <= 'Z'))
        ) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({
                path: this.redirect || '/',
                query: this.otherQuery
              })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
    
  }
}
var SEPARATION = 100,
  AMOUNTX = 50,
  AMOUNTY = 50

var container
var camera, scene, renderer

var particles,
  particle,
  count = 0

var mouseX = 0,
  mouseY = 0

var windowHalfX = window.innerWidth / 2
var windowHalfY = window.innerHeight / 2

// animate()

function init() {}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2
  windowHalfY = window.innerHeight / 2
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

//

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX
  mouseY = event.clientY - windowHalfY
}

function onDocumentTouchStart(event) {
  if (event.touches.length === 1) {
    event.preventDefault()
    mouseX = event.touches[0].pageX - windowHalfX
    mouseY = event.touches[0].pageY - windowHalfY
  }
}

function onDocumentTouchMove(event) {
  if (event.touches.length === 1) {
    event.preventDefault()
    mouseX = event.touches[0].pageX - windowHalfX
    mouseY = event.touches[0].pageY - windowHalfY
  }
}

//

function animate() {
  requestAnimationFrame(animate)
  render()
}

function render() {
  camera.position.x += (mouseX - camera.position.x) * 0.05
  camera.position.y += (-mouseY - camera.position.y) * 0.05
  camera.lookAt(scene.position)

  var i = 0
  for (var ix = 0; ix < AMOUNTX; ix++) {
    for (var iy = 0; iy < AMOUNTY; iy++) {
      particle = particles[i++]
      particle.position.y =
        Math.sin((ix + count) * 0.3) * 50 + Math.sin((iy + count) * 0.5) * 50
      particle.scale.x = particle.scale.y =
        (Math.sin((ix + count) * 0.3) + 1) * 2 +
        (Math.sin((iy + count) * 0.5) + 1) * 2
    }
  }
  renderer.render(scene, camera)
  count += 0.1
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

@supports (-webkit-mask: none) and (not (cater-color: #fff)) {
  .login-container .el-input input {
    color: #fff;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent ;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color:  #fff;
      height: 47px;
      caret-color: #fff;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #141a48 inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }
}
</style>

<style lang="scss" scoped>
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: #141a48;
  margin: 0px;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>

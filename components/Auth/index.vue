<template>
  <el-dialog
    :visible.sync="showModal"
    :modal="true"
    :close-on-click-modal="false"
    width="380px"
    custom-class="auth-dialog br10"
    @closed="() => {step = 1; isLogin = true}"
  >
    <section
      v-show="step === 1"
      class="auth-main"
    >
      <div>
        <Login
          v-show="isLogin"
          @switch="step = 3"
          @hide="showModal = false"
        />
      </div>
    </section>
  </el-dialog>
</template>

<script>
/* eslint-disable */
import Login from './login'

export default {
  name: 'AuthModal',
  components: {
    Login,
  },
  data() {
    return {
      isLogin: true,
      step: 1,
      showModal: false,
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    showModal(val) {
      this.$emit('input', val)
    },
    value(val) {
      this.showModal = val
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style src="./auth.less" lang="less" scoped>
</style>

<style lang="less">
.el-dialog.auth-dialog {
  background-color: #132D5E;
  .el-dialog__close.el-icon-close {
    color: #fff;
  }
}

.ss-btn {
  button {
    width: 300px;
    background-color: #6236FF;
    border-color: #6236FF;
    &:hover, &:active, &:focus {
      background-color: #6236FF;
      border-color: #6236FF;
    }
  }
}
</style>
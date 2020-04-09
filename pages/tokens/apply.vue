<template>
  <userLayout>
    <template slot="main">
      <h2 class="tag-title">
        Create Your Project
      </h2>
      <el-form  
        ref="form"
        :model="form"
        label-position="top" 
        label-width="80px"
        class="apply-card"
      >
        <el-form-item>
          <p class="dao-add__text">
            Apply for project creation (need 100
            <svg-icon
              icon-class="daos"
              class="icon-dao"
            />
            )
          </p>
        </el-form-item>
        <div class="add-form fl">
          <p>
            NAME THE Project:
          </p>
          <el-input v-model="form.name" />
        </div>
        
        <div class="add-form fl">
          <p>
            DESCRIBE THE Project:
          </p>
          <el-input v-model="form.description" type="textarea" />
        </div>
        <el-form-item>
          <el-button type="primary" @click="createDao">
            SUBMIT
          </el-button>
        </el-form-item>
      </el-form>
    </template>
    <template slot="nav">
      <myAccountNav />
    </template>
  </userLayout>
</template>

<script>
import userLayout from '@/components/user/user_layout.vue'
import myAccountNav from '@/components/my_account/my_account_nav.vue'

export default {
  components: {
    userLayout,
    myAccountNav
  },
  data() {
    return {
      form: {
        name: '',
        description: ''
      },
    }
  },
  created() {
    this.areThereAnyProject()
  },
  methods: {
    // 创建dao
    async createDao() {
      console.log('-----------createProposal start-------------')
      const loading = this.$loading({
        text: '创建中'
      })
      try {
        const expireTime = 30 * 24 * 60 * 60
        const result = await window.unpackContract.create_proposal({
          name: this.form.name, description: this.form.description, expiration_time: expireTime
        })
        console.log('create_proposal', result)
        const value = Buffer.from(result.status.SuccessValue, 'base64').toString()
        const id = JSON.parse(value)
        const txHash = result.transaction.hash
        const blockHash = result.transaction_outcome.block_hash
        const res = await this.$API.createProposal({
          id,
          txHash,
          blockHash
        })
        console.log('createProposal', res)
        loading.close()
        this.$notify.success({
          title: '成功',
          message: '创建成功'
        })
        this.$router.push({ name: 'editminetoken' })
      } catch (error) {
        console.log(error)
        loading.close()
        this.$notify.error({
          title: '失败',
          message: '创建失败'
        })
      }
      console.log('-----------createProposal end-------------')
    },
    // 如果已经有项目了，则跳转到编辑页面
    areThereAnyProject() {
      this.$API.tokenDetail().then(res => {
        if (res.code === 0) {
          this.holdLoading = false
          if (res.data.token) this.$router.push({ name: 'editminetoken' })
        } else this.$message.error(res.message)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.apply-card {
  color: white;
  margin-left: 10px;
  button {
    margin: 10px 0 20px 186px;
    width:300px;
  }
  .icon-dao {
    font-size: 14px;
    color: white;
  }
  .dao-add__text {
    font-size: 14px;
    font-weight: 300;
    line-height: 20px;
    font-weight: bold;
    color: white;
    padding: 0;
    margin: 20px 0 0 0;
  }
  .add-form{
    align-items: baseline;
    margin-bottom: 40px;
    p {
      width: 240px;
      margin: 0;
    }
  }
}
.tag-title {
  font-weight: bold;
  font-size: 20px;
  padding-left: 10px;
  margin: 0;
  color: white;
}
</style>

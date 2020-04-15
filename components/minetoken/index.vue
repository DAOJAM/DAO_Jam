<template>
  <userLayout :need-frame="false">
    <template slot="main">
      <div class="task-main">
        <ProjectTask />
      </div>
      <div class="token-main">
        <minetoken />
      </div>
    </template>
    <template slot="nav">
      <myAccountNav />
    </template>
  </userLayout>
</template>

<script>

import userLayout from '@/components/user/user_layout.vue'
import minetoken from '@/components/edit_minetoken.vue'
import myAccountNav from '@/components/my_account/my_account_nav.vue'
import ProjectTask from '@/components/ProjectTask.vue'

export default {
  components: {
    userLayout,
    myAccountNav,
    minetoken,
    ProjectTask
  },
  data() {
    return {
    }
  }
}
</script>
<style lang="less" scoped>
.task-main {
  background-color: #132D5E;
  padding: 20px;
  border-radius: @br10;
  box-sizing: border-box;
  margin-bottom: 20px;
}
.token-main {
  padding: 20px;
  border-radius: 10px;
  box-sizing: border-box;
  margin-bottom: 120px;
  background-color: #122d5e;
}
</style>
<template>
  <div class="user">
    <g-header></g-header>
    <main class="user-main">
      <div class="user-head">
        <div class="user-avatar">
          <avatar :src="userInfo.avatar"></avatar>
          <h1>{{ userInfo.name }}</h1>
        </div>
        <div class="user-edit">
          <followBtn
            v-if="!isMe(Number($route.params.id))"
            :id="Number($route.params.id)"
            class="follow"
          />
          <router-link v-else :to="{name: 'setting'}">
            <el-button size="small" class="follow edit">
              {{ $t('user.editProfile') }}
            </el-button>
          </router-link>
          <el-button @click="shareModalShow = true" size="small" class="follow2">
            <svg-icon icon-class="share_new" />
            {{ $t('share') }}
          </el-button>
        </div>
      </div>
    </main>
    <Share
      :share-modal-show="shareModalShow"
      :minetoken-user="{nickname: userInfo.name}"
      :page-type="1"
      :img="userInfo.avatar"
      @input="val => shareModalShow = val"
    />
  </div>
</template>


<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import avatar from '@/common/components/avatar/index.vue'
import followBtn from '@/components/follow_btn'
import Share from '@/components/token/token_share.vue'

export default {
  components: {
    avatar,
    followBtn,
    Share
  },
  data() {
    return {
      shareModalShow: false, // share dialog
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    }),
    ...mapGetters(['isMe'])
  },
  mounted() {
    this.refreshUser({ id: this.$route.params.id })
  },
  methods: {
    ...mapActions('user', ['refreshUser', 'followOrUnfollowUser']),
  }
}
</script>

<style lang="less" scoped>
.user {
  padding: 60px 0 0 0;
  min-height: calc(100% - (60px + 200px));
  background-color: #0E2144;
}

.user-main {
  max-width: 1200px;
  padding: 0 20px;
  margin: 0 auto;
}

.user-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 60px;
}
.user-avatar {
  display: flex;
  align-items: center;
  .components-avatar {
    width: 120px;
    height: 120px;
  }
  h1 {
    font-size:48px;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:67px;
    margin-left: 20px;
  }
}
</style>
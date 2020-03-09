<template>
  <div class="token">
    <g-header></g-header>
    <div class="token-main">
      <div class="token-head">
        <div class="head-user">
          <avatar></avatar>
          <div class="head-user__info">
            <h2>XIOO</h2>
            <div class="dao__info__number">
              <div class="dao__info__number__block">
                <svg-icon icon-class="members" class="icon"></svg-icon>
                {{ 0 }}
              </div>
              <div class="dao__info__number__block">
                <svg-icon icon-class="daos" class="icon"></svg-icon>
                {{ 0 }}
              </div>
              <div class="dao__info__number__block">
                <svg-icon icon-class="tickets" class="icon"></svg-icon>
                {{ 0 }}
              </div>
            </div>
          </div>
        </div>
        <span class="head-amount">
          I have: 1000 G & 10234 T
        </span>

      </div>


      <div class="token-list">
        <h2 class="token-title">Brief Introduction</h2>
        <p class="token-brief">
          And when I prophesied, Pelatiah the son of Benaiah died; and I fell on my face and cried out with a loud voice, and I said, Ah, Lord Jehovah! Are You making a full end to the remnant of Israel?And when I prophesied, Pelatiah the son of Benaiah died; and I fell on my face and cried out with a loud voice, and I said, Ah, Lord Jehovah! Are You making a full end to the remnant of Israel?And when I prophesied, Pelatiah the son of Benaiah died; and I fell on my face and cried out with a loud voice, and I said, Ah, Lord Jehovah! 
        </p>
      </div>

      <div class="token-list">
        <h2 class="token-title">Achievement</h2>
        <!-- todo -->
      </div>

      <div class="token-list">
        <h2 class="token-title">DAO Contract Address</h2>
        <!-- todo -->
        cdowvnfodrenveiornvoinreovoerinvfdlksmvpwdfopvmpodfsksvcmpdow
      </div>

      <div class="token-list">
        <h2 class="token-title">Members</h2>
        <!-- todo -->
      </div>


    </div>
  </div>
</template>

<script>
import avatar from '@/common/components/avatar/index.vue'

export default {
  components: {
    avatar
  }  
}
</script>

<style lang="less" scoped>
// common
.token-list {
  margin: 40px 0 0 0;
}
.token-title {
  font-size:24px;
  font-weight:500;
  color:rgba(255,255,255,1);
  line-height:33px;
  padding: 0;
  margin: 0;
}
// common end


.token {
  padding: 60px 0 0 0;
  min-height: calc(100% - (60px + 200px));
  background-color: #0E2144;
}
.token-main {
  max-width: 1200px;
  padding: 0 20px;
  margin: 0 auto;
}


.token-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 60px;
}

.head-user {
    display: flex;
    align-items: center;
  .components-avatar {
    width: 120px;
    height: 120px;
    border-radius: 8px;
  }
}

.head-user__info {
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 20px;

  h2 {
    padding: 0;
    margin: 0;
    font-size:48px;
    font-weight:600;
    color:rgba(255,255,255,1);
    line-height:67px;
  }

  .dao__info__number {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size:20px;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:28px;

    .dao__info__number__block {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-left: 26px;
      &:nth-child(1) {
        margin-left: 0;
      }
    }
    .icon {
      font-size: 30px;
    }
  }
}

.head-amount {
  font-size: 20px;
  font-weight: 500;
  color: rgba(255,255,255,1);
  line-height: 28px;
}



.token-brief {
  padding: 20px 0 0;
  margin: 0;
  font-size:20px;
  font-weight:400;
  color:rgba(255,255,255,1);
  line-height:30px;
}
</style>
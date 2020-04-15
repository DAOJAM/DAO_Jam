<template>
  <div class="stat">
    <g-header />
    <ul class="list">
      <li v-for="(item, index) in leaderboardList" :key="index">
        <!-- 按照 181 工单的要求，屏蔽，现在点击不会跳项目页 -->
        <router-link class="fl ac" :to="{name: 'daos-id', params: { id: item.id }}">
          <div class="fl ac">
            <div class="index-content">
              <span v-if="index >= 3" class="index">{{ index + 1 }}</span>
              <svg-icon v-if="index === 0" class="index-icon" icon-class="leaderboard_one" />
              <svg-icon v-if="index === 1" class="index-icon" icon-class="leaderboard_two" />
              <svg-icon v-if="index === 2" class="index-icon" icon-class="leaderboard_three" />
            </div>
            <c-avatar :src="cover(item.logo)" />
            <span class="name">{{ item.name }}</span>
          </div>
        </router-link>
        <div class="fl ac">
          <div class="number">
            <svg-icon class="icon" icon-class="tickets" />{{ item.weight }}
          </div>
          <div class="number">
            <svg-icon class="icon" icon-class="daot" />{{ item.daot }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import daftPunkWeeknd from '@/assets/img/avatar/daft_punk_weeknd.png'
import daftPunkWeeknd3 from '@/assets/img/avatar/daft_punk_weeknd3.png'

export default {
  components: {
  },
  data() {
    return {
      usersRankFilter: 'All',
      usersRankList: [],
      ticketsRankFilter: 'All',
      ticketsRankList: [],
      leaderboardList: []
    }
  },
  // async asyncData({ $axios }) {},
  created() {
    this.leaderboard()
    for(let i = 0; i < 20; i++) {
      this.usersRankList.push({
        name: 'Daft Punk',
        avatar: daftPunkWeeknd,
        amount: 1200
      })
    }
    
    for(let i = 0; i < 13; i++) {
      this.ticketsRankList.push({
        name: 'MTF',
        avatar: daftPunkWeeknd3,
        amount: 1200
      })
    }
  },
  methods: {
    cover(src) {
      return src ? this.$ossProcess(src, { h: 120 }) : ''
    },
    async leaderboard() {
      await this.$API.leaderboard().then(res => {
        console.log(res)
        this.leaderboardList = res.data
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.stat {
  padding: 100px 0;
  background-color: #0e2144;
  align-content: center;
  min-height: calc(100% - 60px - 100px);
}
.list {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
  list-style: none;
  box-sizing: border-box;

  li {
    background-color: rgba(255, 255, 255, 0.37);
    margin-top: 20px;
    padding: 20px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
    .components-avatar {
      width: 60px;
      height: 60px;
    }
    .index-content {
      width: 90px;
      text-align: center;
    }
    .index {
      font-size: 30px;
      font-weight: bold;
      margin-right: 20px;
      color: #fff;
    }
    .index-icon {
      font-size: 60px;
    margin: 0 40px 0 0;
    }
    .name {
      margin-left: 10px;
      color: #fff;
    }
    .number {
      &:nth-last-child(1) {
        margin-left: 20px;
      }
      font-size: 30px;
      font-weight: 400;
      .icon {
        font-size: 30px;
        margin-right: 6px;
      }
    }
  }
}
</style>

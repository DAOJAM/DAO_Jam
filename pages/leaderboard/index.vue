<template>
  <div class="stat">
    <g-header />
    <div class="ranking">
      <div class="fl nav">
        <h1
          :class="navTag === 'projects' && 'active'"
          @click="navTag = 'projects'"
        >
          Projects ranking
        </h1>
        <h1
          :class="navTag === 'users' && 'active'"
          @click="navTag = 'users'"
        >
          User ranking
        </h1>
      </div>
      <leaderboardList
        v-for="(item, index) in pull"
        v-show="navTag === item.mode"
        :key="index"
        :pull="item"
        :mode="item.mode"
      />
    </div>
  </div>
</template>

<script>
import leaderboardList from '@/components/leaderboard/index.vue'

export default {
  components: {
    leaderboardList
  },
  data() {
    return {
      navTag: 'projects',
      pull: [
        {
          mode: 'projects',
          params: {
            pagesize: 10
          },
          apiUrl: 'leaderboard',
        },
        {
          mode: 'users',
          params: {
            pagesize: 10
          },
          apiUrl: 'leaderboardUserVotes',
        },
      ]
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.stat {
  padding: 100px 0;
  background-color: #0e2144;
  align-content: center;
  min-height: calc(100% - 60px - 260px);
}
.ranking {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
  .nav {
    align-items: center;
    h1 {
      cursor: pointer;
      color: rgba(178, 178, 178, 1);
      padding: 0 0 5px 0;
      margin: 0 0 0 68px;
      display: block;
      font-size: 20px;
      line-height: 28px;
      font-weight: 500;
      box-sizing: border-box;
      border-bottom: 3px solid transparent;
      &:hover {
        color: white;
      }
      &.active {
        color: white;
        border-bottom-color: #6236ff;
      }
      &:nth-child(1) {
        margin-left: 0;
      }
    }
  }
}
</style>

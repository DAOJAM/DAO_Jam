<template>
  <div
    v-loading="loading"
    element-loading-background="#132D5E"
  >
    <ul class="list">
      <li v-if="leaderboardList.length === 0 && !loading">
        There are no projects yet!
        Come in and publish your project.
      </li>
      
      <li
        v-for="(item, index) in leaderboardList"
        :key="index"
        class="fl ac"
        @click="routerLink(item)"
      >
        <div class="fl ac">
          <div class="index-content">
            <span v-if="index >= 3" class="index">{{ index + 1 }}</span>
            <svg-icon v-if="index === 0" class="index-icon" icon-class="leaderboard_one" />
            <svg-icon v-if="index === 1" class="index-icon" icon-class="leaderboard_two" />
            <svg-icon v-if="index === 2" class="index-icon" icon-class="leaderboard_three" />
          </div>
          <c-avatar
            class="avatar"
            :class="mode === 'projects' && 'rounded-rectangle'"
            :src="cover(item)"
          />
          <span class="name">{{ getName(item) }}</span>
        </div>
        <div class="fl ac tickets-data">
          <div class="number">
            <svg-icon class="icon" icon-class="tickets" />{{ item.weight }}
          </div>
          <div class="number">
            <svg-icon class="icon" icon-class="daot" />{{ item.daot }}
          </div>
        </div>
      </li>
    </ul>
    <div class="load-more">
      <buttonLoadMore
        v-show="!loading"
        :type-index="0"
        :params="pull.params"
        :api-url="pull.apiUrl"
        :is-atuo-request="true"
        @buttonLoadMore="paginationData"
      />
    </div>
  </div>
</template>

<script>
import buttonLoadMore from '@/components/button_load_more/index.vue'

export default {
  components: {
    buttonLoadMore,
  },
  props: {
    pull: {
      type: Object,
      required: true
    },
    mode: {
      type: String,
      default: 'projects'
    }
  },
  data() {
    return {
      leaderboardList: [],
      loading: true,
      
    }
  },
  methods: {
    cover(item) {
      const src = this.mode === 'users' ? item.avatar : item.logo
      return src ? this.$ossProcess(src, { h: 120 }) : ''
    },
    routerLink(item) {
      const name = this.mode === 'users' ? 'user-id' : 'daos-id'
      const routeUrl = this.$router.resolve({name, params: { id: item.id }})
      window.open(routeUrl .href, '_blank')
    },
    getName(item) {
      const name = this.mode === 'users' ? item.nickname || item.username : item.name
      return name
    },
    paginationData(res) {
      this.loading = false
      if (res.data && res.data.list) this.leaderboardList = this.leaderboardList.concat(res.data.list)
    }
  }
}
</script>

<style lang="less" scoped>
.list {
  list-style: none;
  box-sizing: border-box;
  padding: 0;
  li {
    cursor: pointer;
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
    transition: all 0.2s;
    &:hover {
      transform: scale(1.02);
    }
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
      max-width: 350px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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
    .avatar {
      min-width: 60px;
      background: #b2b2b2;
      &.rounded-rectangle {
        border-radius: 8px;
      }
    }
  }
}
.load-more {
  height: 160px;
}
@media screen and (max-width: 830px) {
  .list {
    li {
      display: block;
      // .name {
      //   max-width: 100px;
      // }
      .tickets-data {
        margin-top: 20px;
        padding-left: 10px;
      }
    }
  }
}
@media screen and (max-width: 600px) {
  .tickets-data {
    justify-content: space-between;
  }
}
</style>

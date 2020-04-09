<template>
  <div class="vote">
    <div>
      <div class="table-head">
        <div class="table-head-th">
          Username
        </div>
        <div class="table-head-th" style="flex: 0 0 140px;">
          Vote
        </div>
        <div class="table-head-th" style="flex: 0 0 140px;">
          DaoT
        </div>
        <div class="table-head-th" style="flex: 0 0 200px;">
          &nbsp;
        </div>
      </div>
      <div class="table-body">
        <div v-for="(item, index) in voteList" :key="index">
          <div class="table-body-tr">
            <div class="table-body-td">
              <router-link class="fl ac" :to="{name: 'user-id', params: { id: item.uid }}">
                <c-avatar :src="avatar(item.avatar)" />
                <span class="username">{{ item.nickname || item.username }}</span>
              </router-link>
            </div>
            <div class="table-body-td" style="flex: 0 0 140px;">
              <div class="fl ac">
                <svg-icon icon-class="tickets" class="icon" />
                <span class="number">{{ '+' + item.weight }}</span>
              </div>
            </div>
            <div class="table-body-td" style="flex: 0 0 140px;">
              <div class="fl ac">
                <svg-icon icon-class="daot" class="icon" />
                <span class="number">{{ '+' + item.weight }}</span>
              </div>
            </div>
            <div class="table-body-td" style="flex: 0 0 200px;">
              <div class="fl ac"> 
                <span class="toggle" @click="item.status = !item.status">
                  {{ item.status ? 'fold' : 'unfold' }}
                  <svg-icon icon-class="arrow_down" class="toggle-icon" />
                </span>
                <el-button type="primary" size="small" class="vote-btn">
                  VOTE
                </el-button>
              </div>
            </div>
          </div>
          <transition name="fade">
            <div v-show="item.status" class="table-more">
              <div v-for="item in 4" :key="item" class="table-more-tr">
                <div class="table-more-td">
                  1
                </div>
                <div class="table-more-td" style="flex: 0 0 140px;">
                  1
                </div>
                <div class="table-more-td" style="flex: 0 0 140px;">
                  1
                </div>
                <div class="table-more-td near" style="flex: 0 0 200px;">
                  <router-link :to="{name: 'article'}" class="near-btn" target="_blank">
                    Near
                  </router-link>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data() {
    return {
      voteList: [
        {
          nickname: 'TOKEN',
          uid: -1,
          avatar: '',
          weight: 0,
          status: false,
        },
        {
          nickname: 'TOKEN',
          uid: -1,
          avatar: '',
          weight: 0,
          status: false,
        },
        {
          nickname: 'TOKEN',
          uid: -1,
          avatar: '',
          weight: 0,
          status: false,
        },
        {
          nickname: 'TOKEN',
          uid: -1,
          avatar: '',
          weight: 0,
          status: false,
        },
        {
          nickname: 'TOKEN',
          uid: -1,
          avatar: '',
          weight: 0,
          status: false,
        },
      ]
    }
  },
  methods: {
    avatar(src) {
      return src ? this.$ossProcess(src, { h: 90 }) : ''
    },
    time(time) {
      return moment(time).format('YYYY-MM-DD HH:mm:ss')
    },
  }
}
</script>

<style lang="less" scoped>
.vote {
  max-width:884px;
  min-height:520px;
  background:rgba(19,45,94,1);
  border-radius:8px;
  overflow: hidden;
  margin-top: 40px;
  padding: 20px 0;
  box-sizing: border-box;
}

.table-head {
  display: flex;
  align-items: center;
  padding: 0 20px;
  &-th {
    flex: 1;
    font-size: 16px;
    font-weight: 500;
    color: rgba(178, 178, 178, 1);
    line-height: 22px;
  }
}
.table-body {
  &-tr {
    flex: 1;
    display: flex;
    align-items: center;
  }
  &-td {
    flex: 1;
    margin: 10px 0;
    font-size: 16px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 22px;
    .username {
      margin-left: 10px;
      color: rgba(255, 255, 255, 1);
      text-decoration: none;
    }
    .icon {
      font-size: 22px;
      margin-right: 4px;
    }
    .number {
      font-size:16px;
      font-weight:500;
      color:rgba(255,255,255,1);
      line-height:22px;
    }
    .toggle {
      font-size:14px;
      font-weight:500;
      color:rgba(255,255,255,1);
      line-height:20px;
      margin-right: 20px;
      width: 80px;
      text-align: right;
    }
    .toggle-icon {
      font-size: 12px;
      color:rgba(255,255,255,1);
      margin-left: 4px;
    }
    .vote-btn {
      min-width: 90px;
    }
  }

  .table-body-tr {
    padding: 0 20px;
  }
}

.table-more {
  width: 100%;
  background-color: #1C4085;
  &-tr {
    flex: 1;
    display: flex;
    align-items: center;
    padding: 0 20px;
  }
  &-td {
    flex: 1;
    border-bottom: 1px solid #B2B2B2;
    padding: 20px 0;
    font-size:16px;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:22px;
    height: 30px;
    &.near {
      text-align: right;
    }
    .near-btn {
      min-width: 90px;
      font-size: 16px;
      display: inline-block;
      background-color: #fff;
      padding: 4px 10px;
      box-sizing: border-box;
      border-radius:4px;
      text-align: center;
      color: #6236FF;
      font-size:16px;
      font-weight:500;
      line-height:22px;
    }
  }
}

</style>
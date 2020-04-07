<template>
  <div class="stat">
    <g-header />
    <div class="stat-head">
      <div class="stat-content">
        <img
          src="@/assets/img/statistics.png"
          alt="DAO JAM DATA STATISTICS"
          class="head-figure"
        >
        <div class="meter">
          <div class="meter-tag">
            <svg-icon
              class="meter-tag-icon"
              icon-class="lamination"
            />
            Projects: 125
          </div>
          <div class="meter-tag">
            <svg-icon
              class="meter-tag-icon"
              icon-class="voted_users"
            />
            Voted Users：7853
          </div>
          <div class="meter-tag widen">
            <svg-icon
              class="meter-tag-icon"
              icon-class="voted_times"
            />
            Voted Times：14653
          </div>
          <div class="meter-tag">
            <svg-icon
              class="meter-tag-icon"
              icon-class="days_left"
            />
            Days Left：14
          </div>
        </div>
        <div class="line-chart">
          Chart
          <br>
          图表部分后续补充
        </div>
        <div class="rank">
          <div class="fl rank-header">
            <h3>
              Users Rank
              <span>
                The top 20 users of each day's voting split the 1,000 votes proportionally
              </span>
            </h3>
            <el-radio-group
              v-model="usersRankFilter" 
              size="mini"
            >
              <el-radio-button label="All" />
              <el-radio-button label="Today" />
            </el-radio-group>
          </div>
          <div class="fl rank-list">
            <div
              v-for="(usersRank, item) in usersRankList"
              :key="item"
              class="fl rank-list-ntry"
            >
              <p class="ntry-item">
                {{ item + 1 }}
              </p>
              <avatar
                :src="usersRank.avatar"
                class="avatar"
                size="30px"
              />
              <p class="ntry-name">
                {{ usersRank.name }}
              </p>
              <p>
                {{ usersRank.amount }}T
              </p>
            </div>
          </div>
        </div>
        <div class="rank">
          <div class="fl rank-header">
            <h3>
              Project Tickets Rank
            </h3>
            <el-radio-group
              v-model="ticketsRankFilter" 
              size="mini"
            >
              <el-radio-button label="All" />
              <el-radio-button label="Today" />
            </el-radio-group>
          </div>
          <div class="fl rank-list">
            <div
              v-for="(ticketsRank, item) in ticketsRankList"
              :key="item"
              class="fl rank-list-ntry"
            >
              <p class="ntry-item">
                {{ item + 1 }}
              </p>
              <avatar
                :src="ticketsRank.avatar"
                class="avatar"
                size="30px"
                square
              />
              <p class="ntry-name">
                {{ ticketsRank.name }}
              </p>
              <p>
                {{ ticketsRank.amount }}T
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import daftPunkWeeknd from '@/assets/img/avatar/daft_punk_weeknd.png'
import daftPunkWeeknd3 from '@/assets/img/avatar/daft_punk_weeknd3.png'
import avatar from '@/components/avatar/index.vue'

export default {
  components: {
    avatar
  },
  data() {
    return {
      usersRankFilter: 'All',
      usersRankList: [],
      ticketsRankFilter: 'All',
      ticketsRankList: []
    }
  },
  // async asyncData({ $axios }) {},
  created() {
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
  }
}
</script>

<style lang="less" scoped>
.stat {
  padding: 60px 0 0 0;
  background-color: #0e2144;
  align-content: center;
}

.stat-head {
  min-height: 1120px;
  .stat-content {
    max-width: 1160px;
    padding: 40px 20px;
    margin: 0 auto;
    color: white;
  }
}
.head-figure {
  width: 100%;
  margin-bottom: 40px;
}
.meter{
  margin-bottom: 40px;
  display: flex;
  &-tag {
    font-size:20px;
    margin-right: 40px;
    &:nth-child(4n) {
      margin-right: 0;
    }
    &.widen {
      flex: 1;
    }
    &-icon {
      margin-right: 5px;
    }
  }
}
.line-chart {
  height: 468px;
  background-color: #132D5E;
  border-radius:8px;
  padding: 20px;
  font-size:20px;
  margin-bottom: 40px;
}
.rank {
  margin-bottom: 40px;
  &-header {
    margin-bottom: 20px;
    h3 {
      font-size: 20px;
      color: white;
      line-height: 28px;
      flex: 1;
      margin: 0;
      span {
        font-size:14px;
        font-weight:400;
        color:rgba(178,178,178,1);
        line-height:20px;
        margin-left: 5px;
      }
    }
  }
  &-list {
    height: 261px;
    background-color: #132D5E;
    border-radius:8px;
    padding: 10px 0;
    font-size:20px;
    margin-bottom: 40px;
    flex-wrap: wrap;
    flex-direction: column;
    align-content: start;
    &-ntry {
      width: 240px;
      margin: 10px 20px;
      align-items: center;
      p {
        font-size:16px;
        font-weight:400;
        line-height:22px;
        margin: 0px;
        &.ntry-name {
          flex: 1;
        }
        &.ntry-item {
          min-width: 18px;
          text-align: right;
        }
      }
      .avatar {
        margin: 0 10px;
      }
      &:nth-child(1) {
        .ntry-name,.ntry-item {
          color: #F7B500;
        }
      }
      &:nth-child(2) {
        .ntry-name,.ntry-item {
          color: #B2B2B2;
        }
      }
      &:nth-child(3) {
        .ntry-name,.ntry-item {
          color: #C77741;
        }
      }
    }
  }
}

@media screen and (max-width: 1190px) {
  .rank-list {
    height: auto;
  }
  .rank-list-ntry {
    width: -webkit-fill-available;
  }
}
@media screen and (max-width: 1000px) {
  .meter {
    display: block;
  }
  .meter-tag {
    margin-right: 0;
    margin-bottom: 10px;
  }
}
</style>

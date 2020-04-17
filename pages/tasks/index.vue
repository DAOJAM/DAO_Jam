<template>
  <div class="tasks">
    <g-header />
    <div class="tasks-head">
      <div class="tasks-content">
        <h1>Friends & Family of NEAR Hackathon</h1>
        <!-- <img
          src="@/assets/img/mission_select.png"
          alt="DAO JAM DATA STATISTICS"
          class="head-figure"
        > -->
        <div>
          <h3>
            When is it happening?
          </h3>
          <p class="summary">
            Starts on Thursday the 16th at 9pm PST, and submissions are due on Friday the 17th at 4PM PST, judging will take place at 4:30 PM PST and Winners announced at 5 pm PST.
          </p>
          <h3>
            What’s the deal?
          </h3>
          <p class="summary">
            This is the Friends & Family of NEAR hackathon. The goal is to test, use, break, and provide feedback on NEAR.
          </p>
          <h3>
            Who is invited?
          </h3>
          <p class="summary">
            You may invite a friend, contributor, project building on NEAR, ect to help your team hack your way to the finish line!
          </p>
          <h3>
            How can you manage the team?
          </h3>
          <p class="summary">
            That’s up to you! We advise a group discord, or shared slack channel. 
          </p>
          <h3>
            Who are the judges?
          </h3>
          <p class="summary">
            Peter Depaulo, Ashley Crawford….and a mystery Judge!
          </p>
          <h3>
            What do you win?
          </h3>
          <p class="summary">
            Bragging rights and a not broken blockchain.
          </p>
        </div>
        <!-- <div class="mission">
          <h3>
            Mission Selection
          </h3>
          <div class="fl">
            <svg-icon
              icon-class="red_flag"
              class="mission-flag"
            />
            <div class="mission-content">
              <h4>
                Main Mission (Single Choice)
              </h4>
              <dl v-for="(item, index) in tasks.mainTasks" :key="index">
                <dt>
                  <span class="mission-tag">Main Mission{{ index+1 }}: </span>{{ item.title }}
                </dt>
                <dd>{{ item.content }}</dd>
              </dl>
            </div>
          </div>
          
          <div class="fl">
            <svg-icon
              icon-class="yellow_flag"
              class="mission-flag"
            />
            <div class="mission-content">
              <h4>
                Side Mission (Multiple Choice)
              </h4>
              <dl v-for="(item, index) in tasks.sideTasks" :key="index">
                <dt>
                  <span class="mission-tag">Side Mission{{ index+1 }}: </span>{{ item.title }}
                </dt>
                <dd>{{ item.content }}</dd>
              </dl>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import daftPunkWeeknd from '@/assets/img/avatar/daft_punk_weeknd.jpg'
import daftPunkWeeknd3 from '@/assets/img/avatar/daft_punk_weeknd3.jpg'

export default {
  components: {
  },
  data() {
    return {
      usersRankFilter: 'All',
      usersRankList: [],
      ticketsRankFilter: 'All',
      ticketsRankList: [],
      tasks: {} // 任务
    }
  },
  // async asyncData({ $axios }) {},
  created() {
    this.task()
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
    async task() {
      this.$API.task()
        .then(res => {
          if (res.code === 0) {
            let mainTasks = []
            let sideTasks = []
            res.data.map(item => {
              if (Number(item.type) === 0) {
                mainTasks.push(item)
              } else if (Number(item.type) === 1) {
                sideTasks.push(item)
              } else {
                console.log('error', item)
              }
            })
            this.tasks = {
              mainTasks,
              sideTasks
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.tasks {
  padding: 60px 0 0 0;
  background-color: #0e2144;
  align-content: center;
}

.tasks-head {
  min-height: 1120px;
  .tasks-content {
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

h3 {
  font-size: 20px;
  line-height: 28px;
  margin: 0 0 20px;
}

.summary {
  margin: 0 0 40px;
  font-size: 16px;
  font-weight: 400;
  line-height: 30px;
}

.mission {
  &-flag {
    font-size: 22px;
  }
  &-content {
    margin-left: 5px;
    h4 {
      margin: 0 0 20px;
      font-size: 16px;
      line-height: 22px;
    }
    dt {
      margin: 0 0 10px;
      font-size: 16px;
      font-weight: 400;
      line-height: 22px;
    }
    dd {
      margin: 0 0 20px 115px;
      font-size: 14px;
      font-weight: 400;
      color: #B2B2B2;
      line-height: 20px;
      word-break: break-all;
      white-space: pre-wrap;
    }
  }

}

@media screen and (max-width: 900px) {
  .mission-tag {
    display: none;
    opacity: 0;
    visibility: hidden;
  }
  .mission-content {
    dd {
      margin: 0 0 20px 20px;
    }
  }
}
</style>

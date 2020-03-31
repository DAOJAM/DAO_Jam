<template>
  <div class="tasks">
    <g-header />
    <div class="tasks-head">
      <div class="tasks-content">
        <img
          src="@/assets/img/mission_select.png"
          alt="DAO JAM DATA STATISTICS"
          class="head-figure"
        >
        <div>
          <h3>
            What’s The Mission?
          </h3>
          <p class="summary">
            And when I prophesied, Pelatiah the son of Benaiah died; and I fell on my face and cried out with a loud voice,
            and I said, Ah, Lord Jehovah! Are You making a full end to the remnant of Israel?And when I prophesied,
            Pelatiah the son of Benaiah died; and I fell on my face and cried out with a loud voice, and I said, Ah,
            Lord Jehovah! Are You making a full end to the remnant of Israel?And when I prophesied, Pelatiah the son of Benaiah died;
            and I fell on my face and cried out with a loud voice, and I said, Ah, Lord Jehovah!
          </p>
        </div>
        <div class="mission">
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
              <dl>
                <dt>
                  <span class="mission-tag">Main Mission</span> 1: Make a webgame about blockchain elements.
                </dt>
                <dd>
                  It’s blabla blabla, blabla blablabla, blablabla, blabla blablabla
                </dd>
                <dt>
                  <span class="mission-tag">Main Mission</span> 2: Make a project about any theme.
                </dt>
                <dd>
                  It’s blabla blabla, blabla blablabla, blablabla, blabla blablabla
                </dd>
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
              <dl>
                <dt>
                  <span class="mission-tag">Side Mission</span> 1: Make a webgame by Game Creator.
                </dt>
                <dd>
                  It’s blabla blabla, blabla blablabla, blablabla, blabla blablabla
                </dd>
                <dt>
                  <span class="mission-tag">Side Mission</span> 2: Make a project by Nearprotocal.
                </dt>
                <dd>
                  It’s blabla blabla, blabla blablabla, blablabla, blabla blablabla
                </dd>
              </dl>
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

export default {
  components: {
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
.tasks {
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

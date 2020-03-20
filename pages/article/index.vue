<template>
  <div class="home">
    <g-header />
    <div class="home-head">
      <h1 class="home-head__title animated fadeInUp">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAcwAAAApCAMAAACP++kxAAAApVBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+4/eNVAAAANnRSTlMAwXf789wPCxMhBTj4Se0sJuWHGNdMoQIczdJc6UU9MwiTmXNh4PBWvLexfGqsgm9RjmXKpcX3mSu1AAALaElEQVR42u2b53riOhCGDXYAF1wwYAwYF6opoQS4/0s7gQTNSCMRb3L6s9+vXcuovdIUydH+1Wo2td/6X8ialcNhObO03/rPq7G+3rVuaL/1X9fx+qljpP3WX61stH1o+efbQt94wHR87bf+arWC60PDPz9QOVyZlto/LMv0Utsz/43RmNVo4v+d6kxbKPDgaQIvL/HTxgub7vjPH+cWYO4ru9l9ndP+tJz4xGhIh35QvpRO18Ng4TjGuLt6nagG6telMoXofC9MK8isg3qiDdxC2SmDNmfFZfjSHZad3iOuWF9BKfJYTLWITdYcns5+DLM5CD81yGhpD5rqaRVl6ldR+niY9xS9S64gN5Qvj9nF4aob1geaTKOrVD31W92mMF5QEBIrBWWtB8rcRZVNP2pbXkEn7VPRBf2cdd92UHs/hrkMmA4SMKyrC7MyTOMq1XDa0iQ643e2Ulsf08rm+0w2GHnLbX6Xr3AZP+g2LqrzP6uhopfWJ/w531LtPkthAE/6bFrGXI+o6TtrP4Z5gtpGGtXmUbjRvg0TcEqWi7/Ab7xRRK2+vLKV/02YNmc51hQmEOOKdFp0cMSm4vt27qMxN2HTgzqSpXz4OczZc5hZfh+Dk2ffhwnSX0k1r/wLCantoqrsZfI9mAVXZngEpjRMsErK2QtoW7lgkZ1H/R14Bk6z2QVbE/7pMKmSoiwLMsfVYFIVAk3oPlglrEGsriuwfxUmmDtQRw2z24CSiU5gRjv8CLujFhfW3BWBlUZOM3XQyP8GmKAfwAQd5c0rXHO2elbX3KwMkzoO4EJgkugFwOEfpdKBTgU725eu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"
          alt="what is a dao jam?"
        >
      </h1>
      <p class="home-head__des animated fadeInUp">
        A DAO JAM combines the concepts of Game Jam and DAO, offering an unprecedent way for game developers to untie with each other based on a common goal, in a structured yet autonomous way. The event is 100% online, so you can participate as long as you have a machine and internet.
      </p>
      <a
        href="https://discord.gg/tj6aJNG"
        target="_blank"
        class="home-head__sign animated fadeInUp"
      >
        <svg-icon icon-class="discord" />
        JOIN OUR DISCORD
      </a>
    </div>
    <div class="judges">
      <img
        slot="title"
        class="judges-title"
        :src="homeBase64.judegs"
      >
      <div class="judges-content animated-list">
        <div
          v-for="(item, index) in judges"
          :key="index"
          class="judges-block"
        >
          <peopleCard 
            :card="item"
            :style="{animationDelay: index * 0.2 + 's'}"
            class="judges-card animated"
          />
        </div>
      </div>
    </div>

    <div class="sponsors">
      <img
        slot="title"
        class="sponsors-title"
        :src="homeBase64.sponsors"
      >
      <div class="sponsors-content animated-list">
        <div
          v-for="(item, index) in sponsors"
          :key="index"
          class="judges-block"
        >
          <peopleCard 
            :card="item"
            :style="{animationDelay: index * 0.2 + 's'}"
            class="sponsors-card animated"
          />
        </div>
      </div>
    </div>


    <!-- <peopleList
      :list="judges"
      class="animated-list"
    >
      <img
        slot="title"
        class="judges-title"
        :src="homeBase64.judegs"
      >
    </peopleList>
    <peopleList
      :list="sponsors"
      class="animated-list"
    >
      <img
        slot="title"
        class="sponsors-title"
        :src="homeBase64.sponsors"
      >
    </peopleList> -->

    <div class="about animated-list">
      <div class="about-content">
        <img
          class="about-title"
          :src="homeBase64.about"
          alt="about"
        >
        <p class="about-des animated">
          A game jam is a hackathon for video games. It is a gathering of people for the purpose of planning, designing, and creating one or more games within a very short span of time.
          <br><br>
          A DAO (or a Decentralized Autonomous Organizations) is a group of people united by trustless decision-making frameworks, usually built on the blockchain. They combine ideas about cooperativism with newly invented cryptography and networking technology.
          <br><br>
          A DAO JAM combines the concepts of Game Jam and DAO, offering an unprecedent way for game developers to untie with each other based on a common goal, in a structured yet autonomous way. The event is 100% online, so you can participate as long as you have a machine and internet.
        </p>
      </div>
    </div>

    <div class="schedule">
      <div class="schedule-content">
        <img
          class="schedule-title"
          :src="homeBase64.schedule"
        >
        <p class="schedule-des animated">
          (Tentative)April 11th to April 17th, a continous 7x24 hacking experience<br>
          <a href="https://www.matataki.io/p/564">https://www.matataki.io/p/564</a>
        </p>
      </div>
    </div>

    <dao
      :list="daoList"
      class="animated-list"
    >
      <img
        slot="title"
        class="dao-title"
        :src="homeBase64.daos"
        alt="daos"
      >
    </dao>
    <!-- 
    <div class="discord">
      <p>If you want to learn more.</p>
      <p>
        Now join our Discord: <a
          target="_blank"
          href="https://discord.gg/tj6aJNG"
        >https://discord.gg/tj6aJNG</a>
      </p>
    </div> -->
  </div>
</template>

<script>
// import peopleList from '@/components/people_list/index.vue'
import dao from '@/components/dao/index.vue'
import loadScript from '@/utils/load_script'
import homeBase64 from '@/assets/img/home_base64'
import peopleCard from '@/components/people_card'

export default {
  transition: 'page',
  components: {
    // peopleList,
    peopleCard,
    dao
  },
  data() {
    return {
      homeBase64: homeBase64,
      daoLoading: false,
      sponsors: [
        {'name': 'Near', 'photoUrl': 'https://nearprotocol.com/wp-content/themes/near-19/assets/downloads/near_logo_stack_wht.png?t=1567197567'},
        {
          'name': 'DAO Square',
          'photoUrl': 'https://ssimg.frontenduse.top/avatar/2020/02/19/998392f4a28ec5e0aeb64a9e695260e7.png'
        },
        {
          'name': 'DAO Fest',
          'photoUrl': 'https://ssimg.frontenduse.top/article/2020/03/05/f44e212b007a72cd3c65caec9ee9dca3.png'
        },
        {'name': 'Indie Light', 'photoUrl': 'https://ssimg.frontenduse.top/article/2020/03/05/874350184e4ce93a66baabbcffb8862c.png'},
        {'name': 'Meta Cartel', 'photoUrl': 'https://ssimg.frontenduse.top/article/2020/03/05/1ac76e868e2e591e46cc49e2e216ef03.png'},
      ],
      judges: [
        {'name': 'Illia Polosukhin', 'photoUrl': 'https://www.ethdenver.com/wp-content/uploads/2020/01/illia-250x250.jpg'},
        {'name': 'Vincent Niu', 'photoUrl': 'https://www.nft.nyc/hubfs/Vincent-photo.jpg'},
        {'name': 'Tina Zhen', 'photoUrl': 'https://pbs.twimg.com/profile_images/1177965467572428800/mWBN6yqP_400x400.jpg'}
      ],
      daoList: [
        {},{},{},{},{},{},{},{},{},{},{},{},{},{}
      ]
    }
  },
  created() {
    if (process.browser) {
      this.getDaoList()

      this.$nextTick(() => {
        const scriptSrc = [
          'https://cdn.bootcss.com/ScrollMagic/2.0.7/ScrollMagic.min.js',
        ]
        const PromiseLoadScript = scriptSrc.map(i => loadScript(i))
        Promise.all(PromiseLoadScript)
          .then(res => {
            console.log('done', res)
            // eslint-disable-next-line no-undef
            if (ScrollMagic) {
              this.initScrollAnimation()
            }
          })
          .catch(err => {
            console.log('error', err)
          })
      })

    }
  },
  mounted() {

  },
  methods: {
    initScrollAnimation() {
      try {
        // eslint-disable-next-line no-undef
        var controller = new ScrollMagic.Controller()

        let list = document.querySelectorAll('.animated-list')
        list.forEach((el) => {
          let animated = el.querySelectorAll('.animated')
          // eslint-disable-next-line no-undef
          new ScrollMagic.Scene({
            triggerElement: el,
            duration: '100%',
            triggerHook: 1,
            reverse: false
          })
            .setClassToggle(animated, 'fadeInUp')
            .addTo(controller)
        })

      } catch (error) {
        console.log(error)
      }
    },
    getDaoList() {
      this.daoLoading = true
      this.$API.allToken({
        pagesize: 14
      })
        .then(res => {
          if (res.code === 0) {
            this.daoList = res.data.list
          } else {
            console.log(res.message)
          }
        })
        .catch(e => {
          console.log(e)
        })
        .finally(() => {
          this.daoLoading = false
        })
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  padding-top: 60px;
  background-color: #0e2144;
}
.home-head {
  height: 1120px;
  background-color: #0e2144;
  background-image: url(../../assets/img/index_head_bg.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  text-align: center;
  &__title {
    padding: 0;
    margin: 288px 0 0 0;
    color: #fff;
    font-size: 50px;
    font-weight: bolder;
    text-align: center;
    img {
      height: 41px;
    }
  }
  &__des {
    max-width: 620px;
    color: #fff;
    text-align: left;
    margin: 34px auto 0;
    font-size: 20px;
    font-weight: 500;
    line-height: 30px;
  }
  &__sign {
    display: inline-block;
    padding: 0 87px;
    height: 40px;
    background: #6236ff;
    border-radius: 34px;
    font-size: 16px;
    font-weight: 500;
    color: #ffffff;
    line-height: 40px;
    margin: 260px 0 0;
    text-align: center;
    transition: all 0.3s;
    animation-delay: 0.2s;
    &:hover {
      background: mix(#6236ff, #fff, 90%);
    }
  }
}

.judges-title,
.sponsors-title {
  height: 46px;
  margin: 0 auto;
  display: block;
}
.about-title {
  height: 37px;
  margin: 188px auto 0;
  display: block;
}

.dao-title {
  height: 46px;
  margin: 140px auto 0;
  display: block;
}

.schedule-title {
  height: 37px;
  margin: 100px auto 0;
  display: block;
}

.about {
  background: #132d5e;
  overflow: hidden;
  &-content {
    padding: 0 40px;
    max-width: 1200px;
    margin: 0 auto;
  }
  &-des {
    padding: 0;
    max-width: 100%;
    margin: 40px auto 0;

    font-size: 20px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 30px;

    a {
      color: #fff;
      text-decoration: underline;
      font-size: 16px;
    }
  }
}

.schedule {
  background: #132d5e;
  overflow: hidden;
  padding: 0 0 200px;
  &-content {
    padding: 0 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
  &-des {
    padding: 0;
    max-width: 100%;
    margin: 40px auto 0;

    font-size: 20px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 30px;

    a {
      color: #fff;
      text-decoration: underline;
      font-size: 16px;
    }
  }
}

.discord {
  color: #fff;
  text-align: center;
  padding: 40px 0 200px;
  p {
    padding: 0;
    margin: 0;
    font-size: 26px;
    font-weight: 300;
    color: #fff;
    line-height: 40px;
  }
  a {
    color: #fff;
    text-decoration: underline;
  }
}

.judges,
.sponsors {
  padding: 80px 0;
  .judges-content,
  .sponsors-content {
    max-width: 1200px;
    margin: 0 auto;
    &::after {
      display: block;
      content: "";
      width: 0;
      height: 0;
      clear: both;
    }
    .judges-block,
    .sponsors-block {
      width: 20%;
      float: left;
      margin: 40px auto 0;
    }
    .judges-card,
    .sponsors-card {
      margin: 0 auto;
      transition: all 0.3s;
      &:hover {
        transform: translateY(-4px);
      }
    }
  }
}
.judges {
  background-color: #0e2144;
  padding: 0 0 80px;
}
.sponsors {
  background-color: #372ba1;
  padding: 80px 0;
}

@media screen and (max-width: 520px) {
  .home-head__des {
    max-width: 90%;
    font-size: 14px;
  }
  .home-head__title img {
    width: 90%;
    height: auto;
  }

  .judges-title,
  .sponsors-title,
  .about-title,
  .schedule-title {
    height: 36px;
  }

  .dao-title {
    height: auto;
    max-width: 90%;
  }

  .about-des,
  .schedule-des {
    font-size: 16px;
    max-width: 90%;
  }

  .judges .judges-content,
  .sponsors .sponsors-content {
    .judges-block,
    .sponsors-block {
      width: 100%;
    }
  }
}

@media screen and (min-width: 520px) {
  .home-head__des {
    max-width: 70%;
    font-size: 16px;
  }
  .home-head__title img {
    width: 70%;
    height: auto;
  }

  .dao-title {
    height: auto;
    max-width: 90%;
  }

  .judges .judges-content,
  .sponsors .sponsors-content {
    .judges-block,
    .sponsors-block {
      width: 50%;
    }
  }
}

@media screen and (min-width: 768px) {
  .home-head__des {
    max-width: 80%;
    font-size: 18px;
  }
  .dao-title {
    height: 46px;
    max-width: none;
  }


  .judges .judges-content,
  .sponsors .sponsors-content {
    .judges-block,
    .sponsors-block {
      width: 33.333%;
    }
  }
}

@media screen and (min-width: 992px) {
  .home-head__des {
    max-width: 620px;
    font-size: 20px;
  }
  .home-head__title img {
    width: auto;
    height: 41px;
  }

  .judges .judges-content,
  .sponsors .sponsors-content {
    .judges-block,
    .sponsors-block {
      width: 25%;
    }
  }
}

@media screen and (min-width: 1200px) {
  .judges .judges-content,
  .sponsors .sponsors-content {
    .judges-block,
    .sponsors-block {
      width: 20%;
    }
  }
}

@media screen and (min-width: 1920px) {
}
</style>

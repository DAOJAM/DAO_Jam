<template>
  <div class="home">
    <g-header />
    <div class="home-head">
      <h1 class="home-head__title animated fadeInUp">
        <svg-icon
          icon-class="ready_layer_one_hackathon"
          alt="Ready Layer One HACKATHON"
        />
      </h1>
      <p class="home-head__des animated fadeInUp">
        Hack, Submit, Vote, Win!
        <br>
        All running on the blockchain
      </p>
      <a
        target="_blank"
        class="home-head__sign animated fadeInUp"
        @click="newProject"
      >
        {{ hadProject ? 'MY PROJECT' : 'CREATE PROJECT' }}
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
        <div class="about-text">
          <h3>
            What’s a DAO?
          </h3>
          <p><a href="https://en.wikipedia.org/wiki/Decentralized_autonomous_organization" target="_blank">Decentralized autonomous organizations (or DAOs)</a> are typified by the use of blockchain technology to provide a secure digital ledger to track financial interactions across the internet, hardened against forgery by trusted timestamping and dissemination of a distributed database. This approach eliminates the need to involve a mutually acceptable trusted third party.</p>
          <h3>
            How is this different from a traditional hackathon?
          </h3>
          <p>
            Each participating developer and audience can vote on their favorite projects every day, while the system will replenish your votes at the end of each day. The goal is to promote active engagement with the projects being built. The progress of the projects could also be updated at any time, and it is possible to embed a prediction market for the final outcomes of the hackathon projects.
          </p>
          <p>
            We proposed using a <a href="https://en.wikipedia.org/wiki/Quadratic_voting" target="_blank">quadratic voting system</a> to more efficiently mirror population preference (TBD). Through the use of blockchain technology by recording all votes on chain, the DAO Jam also offers a transparent and fair scoring process for the projects. 
          </p>
          <h3>
            Rule
          </h3>
          <p>
            The total ranking of the hacking projects are calculated based on the number of votes received from the audience and judges over the course of the event. Each sponsor can also set their own challenges with rewards. 
          </p>
        </div>
      </div>
    </div>

    <div class="schedule">
      <div class="schedule-content">
        <img
          class="schedule-title"
          :src="homeBase64.schedule"
        >
        <p class="schedule-des animated">
          (Tentative) May 4th, 2020 to May 13th, 2020, a continuous 10x24 hacking experience<br>
          <!-- <a href="https://www.matataki.io/p/564">https://www.matataki.io/p/564</a> -->
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
import { mapGetters } from 'vuex'
// import peopleList from '@/components/people_list/index.vue'
import dao from '@/components/dao/index.vue'
import loadScript from '@/utils/load_script'
import homeBase64 from '@/assets/img/home_base64'
import peopleCard from '@/components/people_card'

import daftPunkImg1 from '@/assets/img/avatar/daft_punk_weeknd.jpg'
import daftPunkImg2 from '@/assets/img/avatar/daft_punk_weeknd2.jpg'
import daftPunkImg3 from '@/assets/img/avatar/daft_punk_weeknd3.jpg'

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
        {'name': 'Smart Punk', 'photoUrl': daftPunkImg3},
        {'name': 'Daft Punk', 'photoUrl': daftPunkImg1},
        {'name': 'Chris Brown', 'photoUrl': daftPunkImg2},
        {'name': 'Smart Punk', 'photoUrl': daftPunkImg3},
        {'name': 'Daft Punk', 'photoUrl': daftPunkImg1},
        {'name': 'Daft Punk', 'photoUrl': daftPunkImg1},
        {'name': 'Daft Punk', 'photoUrl': daftPunkImg1},
        {'name': 'Daft Punk', 'photoUrl': daftPunkImg1},
        {'name': 'Daft Punk', 'photoUrl': daftPunkImg1},
        {'name': 'Daft Punk', 'photoUrl': daftPunkImg1},
        // {'name': 'Near', 'photoUrl': 'https://nearprotocol.com/wp-content/themes/near-19/assets/downloads/near_logo_stack_wht.png?t=1567197567'},
        // {
        //   'name': 'DAO Square',
        //   'photoUrl': 'https://ssimg.frontenduse.top/avatar/2020/02/19/998392f4a28ec5e0aeb64a9e695260e7.png'
        // },
        // {
        //   'name': 'DAO Fest',
        //   'photoUrl': 'https://ssimg.frontenduse.top/article/2020/03/05/f44e212b007a72cd3c65caec9ee9dca3.png'
        // },
        // {'name': 'Indie Light', 'photoUrl': 'https://ssimg.frontenduse.top/article/2020/03/05/874350184e4ce93a66baabbcffb8862c.png'},
        // {'name': 'Meta Cartel', 'photoUrl': 'https://ssimg.frontenduse.top/article/2020/03/05/1ac76e868e2e591e46cc49e2e216ef03.png'},
      ],
      judges: [
        {'name': 'Daft Punk', 'photoUrl': daftPunkImg1},
        {'name': 'Chris Brown', 'photoUrl': daftPunkImg2},
        {'name': 'Smart Punk', 'photoUrl': daftPunkImg3},
        {'name': 'Smart Punk', 'photoUrl': daftPunkImg3},
        {'name': 'Smart Punk', 'photoUrl': daftPunkImg3},
        {'name': 'Smart Punk', 'photoUrl': daftPunkImg3},
        {'name': 'Smart Punk', 'photoUrl': daftPunkImg3},
        {'name': 'Smart Punk', 'photoUrl': daftPunkImg3},
        {'name': 'Smart Punk', 'photoUrl': daftPunkImg3},
        {'name': 'Smart Punk', 'photoUrl': daftPunkImg3},
        // {'name': 'Illia Polosukhin', 'photoUrl': 'https://www.ethdenver.com/wp-content/uploads/2020/01/illia-250x250.jpg'},
        // {'name': 'Vincent Niu', 'photoUrl': 'https://www.nft.nyc/hubfs/Vincent-photo.jpg'},
        // {'name': 'Tina Zhen', 'photoUrl': 'https://pbs.twimg.com/profile_images/1177965467572428800/mWBN6yqP_400x400.jpg'}
      ],
      daoList: [
        {},{},{},{},{},{},{},{},{},{},{},{},{},{}
      ],
      inEmail: '',
      setEmailLoading: false,
      hadProject: false,
      projectId: 0
    }
  },
  computed: {
    ...mapGetters(['isLogined']),
  },
  watch: {
    isLogined(newVal) {
      if(newVal) this.tokenDetail()
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
    if(this.isLogined) this.tokenDetail()
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
    },
    async tokenDetail() {
      const res = await this.$API.tokenDetail()
      if (res.code === 0 && res.data.token) {
        this.hadProject = true
        this.projectId = res.data.token.id
      }
      else this.hadProject = false
    },
    newProject() {
      if(this.isLogined) {
        const routerData = this.hadProject ? {name: 'daos-id', params: {id: this.projectId}} : { name: 'daos-create' }
        this.$router.push(routerData)
      } else {
        this.$store.commit('setLoginModal', true)
        this.$message.warning('Operate after logging in')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  background-color: #0e2144;
  padding: 50px 0 0 0;
}
.home-head {
  height: 1120px;
  background-color: #0e2144;
  background-image: url(../assets/img/index_head_bg.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  text-align: center;
  &__title {
    padding: 0;
    margin: 382px 0 0 0;
    color: #fff;
    font-size: 50px;
    font-weight: bolder;
    text-align: center;
    display: flex;
    justify-content: center;
    svg {
      max-width: 743px;
      flex: 1;
      margin: 0 20px;
    }
  }
  &__des {
    color: #fff;
    text-align: left;
    margin: 45px auto 0;
    font-size: 20px;
    font-weight: 500;
    line-height: 30px;
    text-align: center;
  }
  &__sign {
    margin: 313px 0 0;
    white-space: nowrap;
    display: inline-block;
    padding: 5px 87px;
    height: 40px;
    background: #6236ff;
    border-radius: 34px;
    font-size: 20px;
    font-weight: 500;
    color: #ffffff;
    line-height: 40px;
    text-align: center;
    transition: all 0.3s;
    animation-delay: 0.2s;
    cursor: pointer;
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
.about-text {
  h3 {
    color: #fff;
    padding: 0;
    margin: 40px 0 0 0;
    font-size: 24px;
    font-weight: bold;
  }
  p {
    color: #fff;
    padding: 0;
    margin: 10px 0 0 0;
    font-size: 18px;
    font-weight: 400;
    line-height: 1.4;
    a {
      color: #fff;
      text-decoration: underline;
      font-size: 18px;
      line-height: 1.4;
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

    font-size: 18px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 1.4;

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

@media screen and (max-width: 768px) {
  .home-head__sign {
    padding: 5px 50px;
    font-size: 16px;
    margin: 185px 0 0;
  }
  .home-head__des {
    font-size: 16px;
    margin: 40px 0 0;
  }
  .home-head__title {
    margin: 210px 0 0 0;
  }
}
</style>

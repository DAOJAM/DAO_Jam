<template>
  <div class="home">
    <g-header />
    <div class="home-head">
      <h1 class="home-head__title animated fadeInUp">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAcwAAAApCAMAAACP++kxAAAApVBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+4/eNVAAAANnRSTlMAwXf789wPCxMhBTj4Se0sJuWHGNdMoQIczdJc6UU9MwiTmXNh4PBWvLexfGqsgm9RjmXKpcX3mSu1AAALaElEQVR42u2b53riOhCGDXYAF1wwYAwYF6opoQS4/0s7gQTNSCMRb3L6s9+vXcuovdIUydH+1Wo2td/6X8ialcNhObO03/rPq7G+3rVuaL/1X9fx+qljpP3WX61stH1o+efbQt94wHR87bf+arWC60PDPz9QOVyZlto/LMv0Utsz/43RmNVo4v+d6kxbKPDgaQIvL/HTxgub7vjPH+cWYO4ru9l9ndP+tJz4xGhIh35QvpRO18Ng4TjGuLt6nagG6telMoXofC9MK8isg3qiDdxC2SmDNmfFZfjSHZad3iOuWF9BKfJYTLWITdYcns5+DLM5CD81yGhpD5rqaRVl6ldR+niY9xS9S64gN5Qvj9nF4aob1geaTKOrVD31W92mMF5QEBIrBWWtB8rcRZVNP2pbXkEn7VPRBf2cdd92UHs/hrkMmA4SMKyrC7MyTOMq1XDa0iQ643e2Ulsf08rm+0w2GHnLbX6Xr3AZP+g2LqrzP6uhopfWJ/w531LtPkthAE/6bFrGXI+o6TtrP4Z5gtpGGtXmUbjRvg0TcEqWi7/Ab7xRRK2+vLKV/02YNmc51hQmEOOKdFp0cMSm4vt27qMxN2HTgzqSpXz4OczZc5hZfh+Dk2ffhwnSX0k1r/wLCantoqrsZfI9mAVXZngEpjRMsErK2QtoW7lgkZ1H/R14Bk6z2QVbE/7pMKmSoiwLMsfVYFIVAk3oPlglrEGsriuwfxUmmDtQRw2z24CSiU5gRjv8CLujFhfW3BWBlUZOM3XQyP8GmKAfwAQd5c0rXHO2elbX3KwMkzoO4EJgkugFwOEfpdKBTgU725eu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" alt="what is dao jam?">
      </h1>
      <p class="home-head__des animated fadeInUp">And when I prophesied, Pelatiah the son of Benaiah died; and I fell on my face and cried out with a loud voice, and I said, Ah, Lord Jehovah! Are You making a full end to the remnant of Israel?And when I prophesied, Pelatiah the son of Benaiah died; and I fell on my face and cried out with a loud voice, and I said, Ah, Lord Jehovah! Are You making a full end to the remnant of Israel?</p>
      <a href="#" class="home-head__sign animated fadeInUp">SIGN IN</a>
    </div>
    <peopleList :list="judges" class="animated-list">
      <img class="judges-title animated" slot="title" src="@/assets/img/judges.png" alt="judges">
    </peopleList>
    <peopleList :list="sponsors" class="animated-list">
      <img class="sponsors-title animated " slot="title" src="@/assets/img/sponsors.png" alt="sponsors">
    </peopleList>
    <div class="about animated-list">
      <div class="about-content">
        <img class="about-title animated" src="@/assets/img/about.png" alt="about">
        <p class="about-des animated">
            And when I prophesied, Pelatiah the son of Benaiah died; and I fell on my face and cried out with a loud voice, and I said, Ah, Lord Jehovah! Are You making a full end to the remnant of Israel?And when I prophesied, Pelatiah the son of Benaiah died; and I fell on my face and cried out with a loud voice, and I said, Ah, Lord Jehovah! Are You making a full end to the remnant of Israel?And when I prophesied, Pelatiah the son of Benaiah died; and I fell on my face and cried out with a loud voice, and I said, Ah, Lord Jehovah! Are You making a full end to the remnant of Israel?And when I prophesied, Pelatiah the son of Benaiah died; and I fell on my face and cried out with a loud voice, and I said, Ah, Lord Jehovah! Are You making a full end to the remnant of Israel?And when I prophesied,
        </p>
      </div>
    </div>

    <dao :list="daoList" class="animated-list">
      <img class="dao-title animated" slot="title" src="@/assets/img/moredaos.png" alt="daos">
    </dao>

  </div>
</template>

<script>
import peopleList from '@/components/people_list/index.vue'
import dao from '@/components/dao/index.vue'
import loadScript from '@/utils/load_script'

export default {
  transition: 'page',
  components: {
    peopleList,
    dao
  },
  data() {
    return {
      daoLoading: false,
      sponsors: [
          {'name': 'Near', 'photoUrl': 'https://nearprotocol.com/wp-content/themes/near-19/assets/img/logo.svg?t=1562682928'},
          {
            'name': 'DAO Square',
            'photoUrl': 'https://ssimg.frontenduse.top/avatar/2020/02/19/998392f4a28ec5e0aeb64a9e695260e7.png'
          },
          {
            'name': 'DAO Fest',
            'photoUrl': 'https://assets.website-files.com/5cf656bb29dfdac145d337e0/5cf656bb29dfdafd38d3381a_DAOfest%20id1Artboard%2011set1Transp.png'
          },
          {'name': 'Indie Light', 'photoUrl': 'http://www.indielight.net/App_Themes/Website/images/logo2.png'},
          {'name': 'Meta Cartel', 'photoUrl': 'https://www.ethdenver.com/wp-content/uploads/2020/02/meta_chillcopy.png'},
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
        var controller = new ScrollMagic.Controller()

        let list = document.querySelectorAll('.animated-list')
        list.forEach((el, i) => {
          let animated = el.querySelectorAll('.animated')
          let scene = new ScrollMagic.Scene({
            triggerElement: el,
            duration: '100%',
            triggerHook: 1
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
  margin-top: 60px;
}
.home-head {
  height: 1120px;
  background-color: #0E2144;
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
    transition: all .3s;
    animation-delay: 0.2s;
    &:hover {
      background: mix(#6236ff, #fff, 90%);
    }
  }
}

.judges-title {
  max-width: 544px;
  margin: 148px auto 0;
  display: block;
}
.sponsors-title {
  max-width: 589px;
  margin: 148px auto 0;
  display: block;
}
.about-title {
  max-width: 211px;
  margin: 148px auto 0;
  display: block;
}
.dao-title {
  max-width: 490px;
  margin: 148px auto 0;
  display: block;
}

.about {
  background: #0E2144;
  overflow: hidden;
  padding: 0 0 200px;
  &-content {
    padding: 0 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
  &-des {
    font-size:20px;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:50px;
    padding: 0;
    max-width: 100%;
    margin: 60px auto 0;
  }
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

  .judges-title {
    max-width: (544px * 0.4);
  }
  .sponsors-title {
    max-width: (589px * 0.4);
  }
  .about-title {
    max-width: (211px * 0.4);
  }
  .dao-title {
    max-width: (490px * 0.4);
  }

  .about-des {
    font-size: 14px;
    max-width: 90%;
    line-height: 36px;
    font-weight: 400;
    animation-delay: 0.2s;
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

  .judges-title {
    max-width: (544px * 0.5);
  }
  .sponsors-title {
    max-width: (589px * 0.5);
  }
  .about-title {
    max-width: (211px * 0.5);
  }
  .dao-title {
    max-width: (490px * 0.5);
  }
  .about-des {
    font-size: 16px;
    max-width: 80%;
    line-height: 46px;
    font-weight: 500;
  }
}

@media screen and (min-width: 768px) {
  .home-head__des {
    max-width: 80%;
    font-size: 18px;
  }

  .judges-title {
    max-width: (544px * 0.6);
  }
  .sponsors-title {
    max-width: (589px * 0.6);
  }
  .about-title {
    max-width: (211px * 0.6);
  }
  .dao-title {
    max-width: (490px * 0.6);
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
}

@media screen and (min-width: 1200px) {
  .judges-title {
    max-width: (544px * 0.7);
  }
  .sponsors-title {
    max-width: (589px * 0.7);
  }
  .about-title {
    max-width: (211px * 0.7);
  }
  .dao-title {
    max-width: (490px * 0.7);
  }
  .about-des {
    font-size: 18px;
  }
}

@media screen and (min-width: 1920px) {
  .judges-title {
    max-width: 544px;
  }
  .sponsors-title {
    max-width: 589px;
  }
  .about-title {
    max-width: 211px;
  }
  .dao-title {
    max-width: 490px;
  }

  .about-des {
    max-width: 100%;
    font-size: 20px;
    line-height:50px;
  }
}
</style>
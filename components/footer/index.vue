<template>
  <footer class="footer">
    <div class="footer-social">
      <div
        v-for="item in socialList"
        :key="item.name"
        class="footer-social__block"
        :class="item.name"
      >
        <a
          :href="item.link"
          target="_blank"
          rel="noopener"
        >
          <svg-icon
            :icon-class="item.icon"
            class="icon"
          />
        </a>
      </div>
    </div>
    <p class="footer-copyright">
      Copyright © DAO JAM
    </p>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      socialList: [
        {
          name: 'twitter',
          icon: 'twitter',
          link: 'https://twitter.com/realdaojam'
        },
        {
          name: 'discord',
          icon: 'discord1',
          link: 'https://discord.gg/tj6aJNG'
        }
      ]
    }
  }
}
</script>


<style lang="less" scoped>
.footer {
  background: #372ba1;
  padding: 0;
  text-align: center;
  box-sizing: border-box;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.footer-social {
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.footer-social__block {
    width: 40px;
    height: 40px;
  border-radius: 50%;
  overflow: hidden;
  color: #fff;
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 40px;
  transition: all 0.3s;
  &:nth-child(1) {
    margin-left: 0;
  }
  a {
    color: #fff;
  }
  .icon {
    font-size: 24px;
  }
  &.weixin {
    background: #00c800;
    &:hover {
      background: mix(#00c800, #fff, 90%);
    }
  }
  &.weibo {
    background: #ea5d5c;
    &:hover {
      background: mix(#ea5d5c, #fff, 90%);
    }
  }
  &.twitter {
    background: #78cbef;
    &:hover {
      background: mix(#78cbef, #fff, 90%);
    }
  }
  &.facebook {
    background: #3c599b;
    &:hover {
      background: mix(#3c599b, #fff, 90%);
    }
  }
  &.discord {
    background: #738bd8;
    &:hover {
      background: mix(#738bd8, #fff, 90%);
    }
  }
}
.footer-copyright {
  text-align: center;
  padding: 0;
  margin: 0;
  font-size: 16px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 22px;
}

@media screen and (max-width: 520px) {
  .footer-copyright {
    font-size: 12px;
  }
}

@media screen and (min-width: 520px) {
}

@media screen and (min-width: 992px) {
  
}

@media screen and (min-width: 1920px) {
}
</style>
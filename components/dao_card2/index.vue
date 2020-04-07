<template>
  <div>
    <n-link
      :to="{name: 'daos-id', params: {id: card.pid}}"
      target="_blank"
    >
      <div class="dao-block">
        <div class="dao-block__cover">
          <img
            :src="card.cover ? cover(card.cover) : 'https://blog.ulifestyle.com.hk/blogger/s030186/wp-content/blogs.dir/0/12177/files/2018/02/10.jpg'"
            alt="cover"
          >
        </div>
        <div class="dao-block__main">
          <div class="dao-block__head">
            <avatar :src="cover(card.logo)" />
            <div class="dao-block__head__info">
              <div class="fl ac jsb">
                <h3>{{ card.name || '&nbsp;' }}</h3>
                <el-tooltip
                  class="pentagram"
                  effect="dark"
                  :content="card.pentagram ? '取消收藏该项目' : '收藏该项目'"
                  placement="top"
                >
                  <a href="javascript:;">
                    <span @click="setBookmark">
                      <svg-icon
                        v-if="card.pentagram"
                        class="icon-pentagram"
                        icon-class="pentagram_active"
                      />
                      <svg-icon
                        v-else
                        class="icon-pentagram"
                        icon-class="pentagram"
                      />
                    </span>
                  </a>
                </el-tooltip>
              </div>
              <div class="dao-block__info__number dao-number__one">
                <div class="dao__info__number__block">
                  <svg-icon
                    icon-class="members"
                    class="icon"
                  />
                  {{ card.member || 0 }}
                </div>
                <div class="dao__info__number__block">
                  <svg-icon
                    icon-class="tickets"
                    class="icon"
                  />
                  {{ card.weight || 0 }}
                </div>
                <div class="dao__info__number__block">
                  <svg-icon
                    icon-class="daot"
                    class="icon"
                  />
                  {{ card.daot || 0 }}
                </div>
              </div>
            </div>
          </div>
          <div class="dao-block__info__number dao-number__two">
            <div class="dao__info__number__block">
              <svg-icon
                icon-class="members"
                class="icon"
              />
              {{ card.member }}
            </div>
            <div class="dao__info__number__block">
              <svg-icon
                icon-class="tickets"
                class="icon"
              />
              {{ totalSupply(card.total_supply, card.decimals, -1) }}
            </div>
            <div class="dao__info__number__block">
              <svg-icon
                icon-class="daot"
                class="icon"
              />
              {{ formatDecimal(card.liquidity, card.decimals, -1) }}
            </div>
          </div>
          <div class="dao-block__brief">
            {{ card.introduction || '暂无' }}
          </div>
        </div>
      </div>
    </n-link>
  </div>
</template>

<script>
import avatar from '@/common/components/avatar/index.vue'
import { mapGetters } from 'vuex'
import { precision } from '@/utils/precisionConversion'

export default {
  components: {
    avatar,
  },
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(['isLogined'])
  },
  methods: {
    // 转换k
    totalSupply(val, decimals, decimal) {
      let amount = this.formatDecimal(val, decimals, decimal)
      return amount < 10000 ? amount : amount / 1000 + 'K'
    },
    formatDecimal(val, decimals, decimal) {
      const amount = precision(val || 0, 'CNY', decimals)
      // 不会有使用0位小数的传参进来
      if (decimal) return this.$publishMethods.formatDecimal(amount, decimal)
      else return amount
    },
    cover (src) {
      if (!src) return ''
      return src ? this.$ossProcess(src) : ''
    },
    async setBookmark() {
      if(!this.isLogined) return this.$store.commit('setLoginModal', true)
      try {
        if (!this.card.pentagram) {
          const res = await this.$API.addTokenBookmark(this.card.id)
          if (res.code === 0) {
            this.$message.success('添加星标')
            this.$set(this.card, 'pentagram', true)
            this.$emit('switchStar', true)
          }
          else this.$message.error(res.message)
        } else {
          const res2 = await this.$API.unTokenbookmark(this.card.id)
          if (res2.code === 0) {
            this.$set(this.card, 'pentagram', false)
            this.$message.success('取消星标')
            this.$emit('switchStar', false)
          }
          else this.$message.error(res2.message)
        }
      } catch (err) {
        console.error('ToggleBookmark err', err)
        this.$message.error('无法修改星标状态')
        if (err.response.status === 401) {
          this.$store.commit('setLoginModal', true)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.dao-block {
  // min-height: 240px;
  border-radius: 16px;
  box-sizing: border-box;
  color: #fff;
  position: relative;
  z-index: 1;
  overflow: hidden;
  transition: all .2s;
  cursor: pointer;
  // background: rgba(98,54,255,0.3);

  background: rgba(98,54,255,0.1);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  .components-avatar {
    width: 60px;
    height: 60px;
    border-radius: 8px;
    flex: 0 0 60px;
  }
  &:hover {
    background:rgba(98,54,255,1);
  }
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: inherit;
    filter: blur(10px);
    z-index: -1;
    margin: -30px;
  }
}

.dao-block__main {
  padding: 20px;
}
.dao-block__cover {
  height: 90px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.dao-block__head {
  display: flex;
  align-items: center;
}

.dao-block__head__info {
  width: 100%;
  height: 60px;
  margin: 0 0 0 10px;
  box-sizing: border-box;
  overflow: hidden;
  h3 {
    text-align: left;
    padding: 0;
    margin: 0;
    font-size:24px;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:33px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.dao-block__info__number {
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size:16px;
  font-weight:400;
  color:rgba(255,255,255,1);
  line-height:22px;
  margin-top: 6px;
  .dao__info__number__block {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .icon {
    font-size: 22px;
  }
}

.dao-block__brief {
  padding: 0;
  margin: 10px 0 0 0;
  color: #000;
  font-size:16px;
  font-weight:400;
  color:rgba(255,255,255,1);
  line-height:22px;
  height: (22px * 4);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
  text-align: left;
}

// .dao-footer {
//   text-align: right;
// }

// .dao-btn {
//   display: inline-block;
//   padding: 0 20px;
//   margin: 10px 0 0 0;
//   height:30px;
//   background:rgba(255,255,255,1);
//   border-radius:34px;
//   font-size:16px;
//   font-weight:500;
//   color:rgba(98,54,255,1);
//   line-height: 30px;
//   text-align: center;
//   transition: all .2s;
//   &:hover {
//     background: mix(rgba(255,255,255,1), #000, 90%);
//   }
// }

.dao-number__two {
  display: none;
  opacity: 0;
  visibility: hidden;
}

.icon-pentagram {
  margin-left: 10px;
}



@media screen and (max-width: 520px) {

  .dao-number__one {
    display: none;
    opacity: 0;
    visibility: hidden;
  }
  .dao-number__two {
    display: flex;
    opacity: 1;
    visibility: initial;
  }
  .dao-footer {
    display: none;
    opacity: 0;
    visibility: hidden;
  }


  .dao-head {
    margin-top: 40px;
    h2 {
      font-size:22px;
      font-weight:400;
    }
  }


  .dao-col {
    width: 100%;
    margin-top: 20px;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  .dao-block__head__info h3 {
    font-size: 16px;
    line-height: 22px;
    font-weight: 400;
  }

  .dao-block__brief {
    font-size: 14px;
  }
}

@media screen and (min-width: 520px) and (max-width: 768px) {
  .dao-col {
    width: calc(50% - (10px));
    margin-top: 20px;
    &:nth-of-type(odd) {
      margin-left: 0;
      margin-right: 10px;
    }
    &:nth-of-type(even) {
      margin-left: 10px;
      margin-right: 0;
    }
  }

  .dao-block__head__info h3 {
    font-size: 16px;
    line-height: 22px;
  }

  .dao-block__brief {
    font-size: 14px;
  }
}

@media screen and (min-width: 768px) and (max-width: 992px) {
  .dao-content {
    max-width: 85%;
  }
  .dao-col {
    width: calc(33.333% - (40px / 3));
    margin-top: 20px;
    &:nth-of-type(3n+2) {
      margin-left: 20px;
      margin-right: 20px;
    }
  }
  .dao-block__head__info h3 {
    font-size: 16px;
    line-height: 22px;
  }
}
@media screen and (min-width: 520px) and (max-width: 992px) {
  .dao-number__one {
    display: none;
    opacity: 0;
    visibility: hidden;
  }
  .dao-number__two {
    display: flex;
    opacity: 1;
    visibility: initial;
  }
  .dao-footer {
    display: none;
    opacity: 0;
    visibility: hidden;
  }
}

@media screen and (min-width: 768px) and (max-width: 1200px) {
  .dao-block__head__info {
    height: 50px;
  }
  .dao-block .components-avatar {
    width: 50px;
    height: 50px;
    flex: 0 0 50px;
  }
  .dao-block__info__number {
    font-size: 14px;
    line-height: 20px;
    .icon {
      font-size: 16px;
    }
  }

  .dao-block__brief {
    font-size: 14px;
    line-height: 20px;
    height: (20px * 4);
  }
  // .dao-btn {
  //   height: 28px;
  //   font-size: 14px;
  //   line-height: 28px;
  // }
}

@media screen and (min-width: 992px) and (max-width: 1200px) {
  .dao-content {
    max-width: 80%;
  }
  .dao-block__head__info h3 {
    font-size: 18px;
    line-height: 24px;
  }
}
</style>
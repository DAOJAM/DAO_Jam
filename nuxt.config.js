import path from 'path'
import webpack from 'webpack'
import SpriteLoaderPlugin from 'svg-sprite-loader/plugin'
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

import i18n from './plugins/i18n'

import env from './env'
function genENV() {
  const keys = Object.keys(env.production)
  const result = {}
  keys.forEach((item) => {
    result[item] = env[process.env.NODE_ENV][item]
  })
  return result
}

function resolve(dir) {
  return path.join(__dirname, dir)
}

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    // title: process.env.npm_package_name || '',
    title: 'DAO Jam',
    meta: [
      { hid: 'robots', name: 'robots', property: 'robots', content: 'index,follow' },
      { hid: 'copyright', name: 'copyright', property: 'copyright', content: 'Copyright © 2018-2020 ANDOROMEDA pte ltd.' },
      { hid: 'description', name: 'description', content: 'DAO Jam combines the concepts of Game Jam and DAO, offering an unprecedent way for game developers to untie with each other based on a common goal, in a structured yet autonomous way.' },
      { hid: 'keywords', name: 'keywords', content: '岛娘,小岛美奈子,唐飞虎,DAOJAM,GAME JAM,ANDOROMEDA,Near,Near Protocol,去中心化,DApp,ETH' },
      /* <!--  Meta for Twitter Card --> */
      { hid: 'twitter:card', name: 'twitter:card', property: 'twitter:card', content: 'summary' },
      { hid: 'twitter:site', name: 'twitter:site', property: 'twitter:site', content: 'DAOJAM' },
      { hid: 'twitter:title', property: 'twitter:title', content: 'DAO Jam' },
      { hid: 'twitter:image', name: 'twitter:image', property: 'twitter:image', content: 'https://ssimg.frontenduse.top/article/2020/04/07/90dc8d81582e395c7e25108c931d6aa7.png' },
      { hid: 'twitter:description', name: 'description', property: 'twitter:description', content: 'DAO Jam combines the concepts of Game Jam and DAO, offering an unprecedent way for game developers to untie with each other based on a common goal, in a structured yet autonomous way.' },
      /* <!--  Meta for OpenGraph --> */
      { hid: 'og:type', name: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:site_name', name: 'og:site_name', property: 'og:site_name', content: 'DAO Jam' },
      { hid: 'og:title', property: 'og:title', content: 'DAO Jam' },
      { hid: 'og:image', name: 'og:image', property: 'og:image', content: 'https://ssimg.frontenduse.top/article/2020/04/07/90dc8d81582e395c7e25108c931d6aa7.png' },
      { hid: 'og:description', name: 'description', property: 'og:description', content: 'DAO Jam combines the concepts of Game Jam and DAO, offering an unprecedent way for game developers to untie with each other based on a common goal, in a structured yet autonomous way.' },
      { hid: 'og:type', name: 'og:type', property: 'og:type', content: 'article' }
      /* end */
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: '/html2canvas.min.js' },
      { src: '/qrcode.min.js' },
      { src: '/gt.js' }
      // { src: '/gsap.min.js' },
      // { src: '/ScrollMagic.min.js' },
      // { src: '/animation.gsap.min.js' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: '#542DE0'
  },
  /*
  ** Global CSS
  */
  css: [
    'normalize.css',
    'element-ui/lib/theme-chalk/index.css',
    './assets/css/index.less'
  ],
  router: {
    // middleware: 'lang'
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/axios',
    '~/plugins/combined-inject.js',
    // '~/plugins/element-ui',
    '~/plugins/vue_plugins.js',
    '~/plugins/vue_components.js',
    // '~/plugins/i18n.js',
    '~/plugins/components.js',
    '@/plugins/vue_directive.js',
    { src: '~/plugins/broadcastchannel.js', mode: 'client' },
    { src: '~/plugins/router.js', mode: 'client', ssr: false },
    { src: '@/plugins/element-ui', ssr: true },
    { src: '@/plugins/vue-mavon-editor', ssr: false },
    { src: '~/plugins/vue_scroll_reveal.js', ssr: false },
    // { src: '~/plugins/fundebug.js', ssr: false },
    { src: '~/plugins/sentry.js', ssr: false }
  ],
  generate: {
    // routes: [
    //   '/', '/en'
    // ]
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
    '@nuxtjs/pwa',
    ['nuxt-i18n', i18n]
  ],
  styleResources: {
    less: './assets/css/global.less'
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    cache: true,
    parallel: true,
    // CSS提取
    // extractCSS: true,
    /*
    ** You can extend webpack config here
    */
    extend(config, { isDev, isClient }) {
      config.node = {
        fs: 'empty'
      }
      if (isDev) {
        config.devtool = isClient ? 'source-map' : 'inline-source-map'
      }
      // set svg-sprite-loader
      if (isClient) {
        config.module.rules.forEach((rule) => { // 移除默认处理svg的配置
          if (~rule.test.source.indexOf('|svg')) {
            rule.exclude = [resolve('icons/svg')]
          }
        })

        config.module.rules.push(
          { // 使用svg
            test: /\.svg$/,
            loader: 'svg-sprite-loader',
            include: [resolve('icons/svg')], // include => 只处理指定的文件夹下的文件
            options: {
              symbolId: 'icon-[name]'
            }
          })
        // console.log(config.module.rules)
      // set svg-sprite-loader end
      }
    },
    plugins: [
      new SpriteLoaderPlugin(), // set svg-sprite-loader
      new webpack.ContextReplacementPlugin(
        /moment[/\\]locale$/,
        /zh-cn/
      )
      // new BundleAnalyzerPlugin()
    ]
  },
  server: {
    port: 8080, // default: 3000
    host: '0.0.0.0'
  },
  pwa: {
    manifest: {
      name: 'DAOJam',
      gcm_sender_id: '1011435306795'
    },
    workbox: {

    }
  },
  env: genENV()
}

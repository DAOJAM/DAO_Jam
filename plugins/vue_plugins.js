import Vue from 'vue'
import clampy from '@clampy-js/vue-clampy'
import VueClipboard from 'vue-clipboard2'
import { ContentLoader } from 'vue-content-loader'

import moment from 'moment'
import '@/icons'

import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'

Vue.prototype.moment = moment
moment.locale('zh-CN')
Vue.use(clampy)
Vue.use(VueClipboard)

Vue.component(ContentLoader) // svg component

Vue.use(Viewer)
// directives 未使用
// export default {
//   name: 'app',
//   directives: {
//     clampy
//   }
// };
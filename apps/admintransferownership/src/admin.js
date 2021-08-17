import Vue from 'vue'
import { getRequestToken } from '@nextcloud/auth'
import { generateFilePath } from '@nextcloud/router'

import AdminSettings from './components/AdminSettings'

// eslint-disable-next-line camelcase
__webpack_nonce__ = btoa(getRequestToken())
// eslint-disable-next-line camelcase
__webpack_public_path__ = generateFilePath('admintransferownership', '', 'js/')

Vue.prototype.t = t

const View = Vue.extend(AdminSettings)
new View().$mount('#transfer-settings')

import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)




import actions from './actions'
import cate from './modules/cate' 
import goods from "./modules/goods"

import {state,mutations,getters} from './mutations'
import specs from './modules/specs'
import banner from './modules/banner' 

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    modules:{
        cate,
        specs,
        goods,
        banner
    }

})
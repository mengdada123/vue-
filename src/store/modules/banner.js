import {reqbannerList} from '../../utils/http'


// 初始化
const state = {
    list:[]
}


// 负责修改list列表
const mutations={
    changeList(state,arr){
        state.list = arr
    }
}


// 处理修改list的逻辑
const actions={
    // actions里面都是方法，处理逻辑的
    reqList(context){
        reqbannerList().then(res=>{
            console.log(res.data.list)
            // 调用mutation中的changeList方法
            context.commit('changeList',res.data.list)
        })

    }
}

const getters = {
    list(state){
        return state.list
    }
}


export default {
    state,
    mutations,
    actions,
    getters,
    // 开辟命名空间，使其模块化
    namespaced: true
}

import qs from 'qs'

import axios from 'axios'

let baseUrl = '/aa'
import Vue from 'vue'
Vue.prototype.$imgPre="http://localhost:3000"


axios.interceptors.response.use(res=>{
    console.log('本次请求地址是：'+res.config.url);
    console.log(res);
    return res
})

// 添加
export const reqMenuAdd=(form)=>{
    return axios({
        url:baseUrl+"/api/menuadd",
        method:"post",
        data:qs.stringify(form)
    })
}


export const reqMenuList=()=>{ 
    return axios({ 
        url:baseUrl+"/api/menulist", method:"get",
         params:{
              istree:true 
 } }) }

 export const reqMenuDel=(id)=>{
    return axios({
        url:baseUrl+"/api/menudelete",
        method:"post",
        data:qs.stringify({
            id:id
        })
    })
}

export const reqMenuDetail=(id)=>{
    return axios({
        url:baseUrl+"/api/menuinfo",
        method:"get",
        params:{
            id:id
        }
    })
}

export const reqMenuUpdate=(form)=>{
    return axios({
        url:baseUrl+"/api/menuedit",
        method:"post",
        data:qs.stringify(form)
    })
}



// ========角色区域=======
export const reqRoleAdd=(user)=>{ 
    return axios({ 
        url:baseUrl+"/api/roleadd",
         method:"post", 
         data:qs.stringify(user)
 }) }
 

 export const reqRoleList = () => {
    return axios({
        url: baseUrl + "/api/rolelist",
        method: "get",
    })
}


export const reqRoleDel = (id) => {
    return axios({
        url: baseUrl + "/api/roledelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}
export const reqRoleDetail = id => {
    return axios({
        url: baseUrl + "/api/roleinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

export const reqRoleUpdate = user => {
    return axios({
        url: baseUrl + "/api/roleedit",
        method: "post",
        data:qs.stringify(user)
    })
}


export const reqUserDetail = uid => {
    return axios({
        url: baseUrl + "/api/userinfo",
        method: "get",
        params: {
            uid: uid
        }
    })
}

// ======管理员接口=======


export const reqUserAdd = (user)=>{
    return axios({
        url: baseUrl + "/api/useradd",
        method: "post",
        data: qs.stringify(user)
    })

}
export const reqUserList = (p) => {
    return axios({
        url: baseUrl + "/api/userlist",
        method: "get",
        params: p
    })
}



//26.删除
export const reqUserDel = (uid) => {
    return axios({
        url: baseUrl + "/api/userdelete",
        method: "post",
        data: qs.stringify({
            uid: uid
        })
    })
}




// 38.修改
export const reqUserUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/useredit",
        method: "post",
        data: qs.stringify(user)
    })
}


// 52 总数
export const reqUserCount = () => {
    return axios({
        url: baseUrl + "/api/usercount",
        method: "get",

    })
}

//1.登录
export const reqLogin = (user) => {
    return axios({
        url: baseUrl + "/api/userlogin",
        method: "post",
        data: qs.stringify(user)
    })
}

// 分类接口

// 添加文件
export const reqcateAdd =(user)=>{
    let d = new FormData()
    for(let key in user){
        d.append(key,user[key])
    }

    return axios({
        url: baseUrl + '/api/cateadd',
        method:'post',
        data:d
    })
}

export const reqcateList = (p) => {
    return axios({
        url: baseUrl + "/api/catelist",
        method: "get",
        params: p
    })
}

export const reqcateDel = (id) => {
    return axios({
        url: baseUrl + "/api/catedelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}

export const reqcateDetail = (id) =>{
    return axios({
        url:baseUrl +'/api/cateinfo',
        method:'get',
        params:{
            id:id
        }

    })
}
// ========= 规格 ========
// 8.添加 文件
export const reqspecsAdd = (user) => {
 
    return axios({
        url: baseUrl + "/api/specsadd",
        method: "post",
        data:qs.stringify(user)
    })
}

//18.列表 p={page:1,size:10}
export const reqspecsList = (p) => {
    return axios({
        url: baseUrl + "/api/specslist",
        method: "get",
        params: p
    })
}

//26.删除
export const reqspecsDel = (id) => {
    return axios({
        url: baseUrl + "/api/specsdelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}

// 33.详情
export const reqspecsDetail = id => {
    return axios({
        url: baseUrl + "/api/specsinfo",
        method: "get",
        params: {
            id: id
        }
    })
}



// 38.修改 文件
export const reqspecsUpdate = (user) => {
   
    return axios({
        url: baseUrl + "/api/specsedit",
        method: "post",
        data: qs.stringify(user)
    })
}
export const reqspecsCount = () => {
   
    return axios({
        url: baseUrl + "/api/specscount",
        method: "get",
    })
}

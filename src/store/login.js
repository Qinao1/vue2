// 登录页面相关配置
import axios from 'axios'

export default {
    namespaced: true,//命名空间，默认是flase
    // 准备actions--用于响应组件中的动作
    actions: {
        change(context, value) {
            context.commit('CHANGE',value)
        }
    },
    // 用于操作数据
    mutations: {
        CHANGE(state,value){
            state.logins = !value
        }
    },
    // 用于储存数据
    state: {
        //关闭登录注册页
        logins: true,
    },
    // 用于加个state
    getters: {
    },
}
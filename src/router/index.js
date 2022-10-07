//该文件专门用于创建整个应用的路由器
import VueRouter from "vue-router";
// 进入组件
import PersonList from '../pages/PersonList'
import PersonnelDistribution from '../pages/PersonnelDistribution'

// 创建并暴露一个路由器
const router = new VueRouter({
    mode:'hash',//默认是hash //哈希值 history
    routes: [
        {
            name: 'renyuanliebiao',
            path: '/PersonList',
            component: PersonList,
            meta: { isAuth: true,title: '人员列表' }
        },
        {
            name: 'renyuanfenbu',
            path: '/PersonnelDistribution',
            component: PersonnelDistribution,
            meta: { isAuth: true,title: '人员分布' }
        }
        
    ]
})

export default router
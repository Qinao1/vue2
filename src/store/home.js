import axios from 'axios'
export default {
    namespaced: true,//命名空间，默认是flase
    // 准备actions--用于响应组件中的动作
    actions: {
        qingqiu(context){
            axios.get("/api/mews").then(
                (response) => {
                    context.commit('QINGQIU',response.data.title)
                    
                },
                (error) => {
                  console.log("请求失败了", error.message);
                }
              );
        }
        
    },
    // 用于操作数据
    mutations: {
        QINGQIU(state,value){
            state.tableData=value
        }
    },
    // 用于储存数据
    state: {
        // personlist的数据
        tableData:[]
    },
    // 用于加工state
    getters: {
        man(state){
            
            console.log(state.tableData,'变化了');
             let a=state.tableData.filter(function(value,index){
                return  value.gender == "男"
           })
           return a.length
        },  
        woman(state){
             let a=state.tableData.filter(function(value,index){
                return  value.gender == "女"
           })
           return a.length
        }  
    },
}
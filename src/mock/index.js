import Mock from 'mockjs'
/* const data=Mock.mock({
    name:'@cword(3,10)'
}) */
// const data=Mock.mock({
//     /* title:'@ctitle(5)',
//     sentence:'@csentence' */
//     'list|8-20':[
//         {nam: '@cname()',
//         address:'@city(true)',
//         id:'@increment(1)'
//     }
//     ]
// })
const { list } = Mock.mock({
    'list|100-300': [
        {
            "id": "@id(2)",
            "date":'@date("yyyy-MM-dd")',
            "name": "@cname(2,3)",
            "gender|1":['男','女'],
            "address":"@county(true)",
            "nowaddress":"@province()",
            'phone': "177777777777"
        }
    ]
})
const {id }=Mock.mock({
    "id":{
        "id": "@id(2)",
        "nowaddress":"@province()",
    }
})
Mock.mock('/api/mews', 'get', () => {
    return {
        status: 200,
        userName:'张三',
        passWord:'11',
        title: list,
        ids:id
    }
})
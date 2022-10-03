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
    'list|20-50': [
        {
            "id": "@id(2)",
            "name": "@cname(2)"
        }
    ]


})
Mock.mock('/api/mews', 'get', () => {
    return {
        status: 200,
        userName:'张三',
        passWord:'11',
        title: list,
    }
})
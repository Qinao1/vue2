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
// 定义get请求
Mock.mock('/spi/mews', 'get', {
    status: 200,
    meg: '获取数据成功'
})
// console.log(data);
// 定义拦截post请求
/* Mock.mock('/api/mews','post',{
    status:200,
    meg:'获取数据成功'
}) */
Mock.mock('/api/mews', 'post', () => {
    return {
        status: 200,
        meg: '获取数据成功'
    }
})
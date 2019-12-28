const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(jsonServer.bodyParser);
// server.use(jsonServer.rewriter({
//     '/api/*': '/$1',
//     '/blog/:resource/:id/show': '/:resource/:id'
// }))

// 在此添加自定义的路由
server.get('/echo', (req, res) => {
    res.jsonp(req.query)
});


server.post('/authorized', (req, res) => {
    if (req.body.username === 'admin' && req.body.userpwd === 'qGmtERMivHBKt6EgXzMoGEXXCG8') {
        res.jsonp({
            code: 1,
            msg: '登录成功',
            auth_token: 'sadgfdsaw42sdfs'
        })
    } else {
        res.jsonp({
            code: 8,
            msg: '登录失败！用户名或密码不正确！'
        })
    }
});


// 给post的请求返回创建时间的属性
server.use((req, res, next) => {
    if (req.method === 'POST') {
        req.body.createdAt = Date.now()
    }
    next();
});

// //这是挂在用户校验的中间件
server.use((req, res, next) => {
    // isAuthorized就是你自己校验的逻辑
    if (req.get('Authorization')) { // add your authorization logic here
        next(); // continue to JSON Server router
    } else {
        res.status(401).jsonp({
            code: 7, //7是未登录
            msg: '没有登录，不能访问'
        })
    }
})


router.render = (req, res) => {

    res.jsonp({
        code: 1,
        msg: 'ok',
        data: res.locals.data
    })

}

server.use('/api', router);

server.listen(3000, () => {
    console.log('JSON Server is running')
})
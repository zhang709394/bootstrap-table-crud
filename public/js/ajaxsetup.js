//执行了设置之后，后续的ajax请求，都会有一下默认设置
$.ajaxSetup({
    headers: {
        'Authorization': Cookies.get('auth_token'),
        'zts': 'aicoder.com',
    },
    statusCode: {
        '401': function (status, xhr) {
            //用户没有登录直接访问/api/接口
            // $.messager.show({
            //     timeout: 1500,
            //     title: '提示消息',
            //     msg: '请先登录!2秒后自动跳转到登录页面',
            //     closable: true
            // });
            setInterval(function () {
                window.location.href = './login.html'
            }, 2000);

            alert('请先登录!2秒后自动跳转到登录页面');

        }
    }
})

$(function() {
    localStorage.clear();
    $('.loginBtn').click(function() {
        localStorage.setItem("maternalusername", $('.username').val());
        if (true) {
            HttpRequstForPost(httpUrl.login, 'json', {
                // "username": $('.username').val(),
                // "password": $('.password').val(),
                "username": '18801370533',
                "password": '123456',
            }, function sucFn(data){
                if (data.status == 20200) {
                    var name = data.name;
                    var firstSignIn = data.firstSignIn;
                    var highRiskGradesTable = data.highRiskGradesTable;
                    localStorage.setItem("maternalname", name);
                    localStorage.setItem("maternalfirstSignIn", firstSignIn);
                    localStorage.setItem("maternalhighRiskGradesTable", highRiskGradesTable);
                    window.location.href = '/maternal-ipad/index/index.html';
                }else if(data.status == 20207) {
                    layer.msg('密码不正确');
                }
                else {
                    layer.msg('登录失败');
                }
            },
            function errfn(err) {
                 layer.msg('操作失败，请稍后重试');
                layer.msg('登录失败');
            });
          
        } else {
            if ($('.username').val() == '') {
                layer.msg('请填写用户名');
            } else if (!RegExpObj.Reg_TelNo.test($('.username').val())) {
                layer.msg('用户名格式错误');
            } else if ($('.password').val() == '') {
                layer.msg('请填写密码');
            } else if (!RegExpObj.Reg_PassWord.test($('.password').val())) {
                layer.msg('密码格式错误');
            } else {
                // 发送参数 username 用户名 password 密码
                // 接收参数
                HttpRequstForPost(httpUrl.login, 'json', {
                    "username": '18801370533',
                    "password": '123456',
                }, function sucFn(data) {
                    if (data.status == 20200) {
                        var name = data.name;
                        var firstSignIn = data.firstSignIn;
                        var highRiskGradesTable = data.highRiskGradesTable;
                        localStorage.setItem("maternalfirstSignIn", firstSignIn);
                        localStorage.setItem("maternalname", name);
                        localStorage.setItem("maternalhighRiskGradesTable", highRiskGradesTable);
                        window.location.href = '/maternal-ipad/index/index.html';
                    } else if (data.status == 20207) {
                        layer.msg('密码不正确');
                    }else {
                        layer.msg('登录失败');
                    }
                },
                    function errfn(err) {
                         layer.msg('操作失败，请稍后重试');
                        layer.msg('登录失败');
                    });
            }
        }
    });
});

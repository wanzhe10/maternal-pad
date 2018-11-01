$(function () {
    var maternalfirstSignIn = localStorage.getItem('maternalfirstSignIn');
    var maternalusername = localStorage.getItem('maternalusername');
    // console.log(maternalfirstSignIn == 0)
    if (maternalfirstSignIn == 0) {
        $('.userName').val(maternalusername)
        $('#shadow').css('display','block');
        $('#changePasswordLayer').css('display','block');
    }
    $('.name').html(localStorage.getItem('maternalname'));
    // 验证原始密码
    $('.originalPassword').blur(function () {
        if ($('.originalPassword').val().length == 0) {
            layer.msg('原始密码不能为空')
            $(this).addClass('borderColor');
        } else if ($('.originalPassword').val() !== '123456') {
            layer.msg('原始密码错误')
            $(this).addClass('borderColor');
        }else {
            $(this).removeClass('borderColor');
        }
    }).focus(function () {
        $(this).removeClass('borderColor');
    });
    // 验证密码
    $('.newPassword').blur(function () {
        if ($('.newPassword').val().length == 0) { 
            layer.msg('密码不能为空')
            $(this).addClass('borderColor');
        } else if (!RegExpObj.Reg_PassWord.test($('.newPassword').val())) {
            layer.msg('8-16位含数字/字母2种组合');
            $(this).addClass('borderColor');
        } else{
            $(this).removeClass('borderColor');
        }
    }).focus(function () {
        $(this).removeClass('borderColor');
    });

    //验证确认密码
    $('.affirmPassword').blur(function () {
        if ($('.affirmPassword').val().length == 0) {
            layer.msg('密码不能为空')
            $(this).addClass('borderColor');
        } else if (!RegExpObj.Reg_PassWord.test($('.affirmPassword').val())) {
            layer.msg('8-16位含数字/字母2种组合');
            $(this).addClass('borderColor');
        } else if ($('.affirmPassword').val() !== $('.newPassword').val() ) {
            layer.msg('两次密码输入不一致');
            $(this).addClass('borderColor');
        } else {
            $(this).removeClass('borderColor');
        }
    }).focus(function () {
        $(this).removeClass('borderColor');
    });
    $('.yasBtn').click(function(){
        if ($('.originalPassword').val() == '') {
            layer.msg('原始密码不能为空')
        } else if ($('.originalPassword').val() !== '123456') {
            layer.msg('原始密码错误')
            $(this).addClass('borderColor');
        }else if ($('.newPassword').val().length == 0) {
            layer.msg('密码不能为空')
            $(this).addClass('borderColor');
        } else if (!RegExpObj.Reg_PassWord.test($('.newPassword').val())) {
            layer.msg('8-16位含数字/字母2种组合');
            $(this).addClass('borderColor');
        } else if ($('.affirmPassword').val().length == 0) {
            layer.msg('密码不能为空')
            $(this).addClass('borderColor');
        } else if (!RegExpObj.Reg_PassWord.test($('.affirmPassword').val())) {
            layer.msg('8-16位含数字/字母2种组合');
            $(this).addClass('borderColor');
        } else if ($('.affirmPassword').val() !== $('.newPassword').val()) {
            layer.msg('两次密码输入不一致');
            $(this).addClass('borderColor');
        } else {
            HttpRequstForPost(httpUrl.updateSelfPassword, 'json', {
                "oldPassword": $(".originalPassword").val(),
                "newPassword": $(".affirmPassword").val(),
                "token": token,

            }, function sucFn(data) {
                // console.log(data)
                if (data.status == 20200) {
                    layer.msg("修改成功");
                    $('#shadow').css('display', 'none');
                    $('#changePasswordLayer').css('display', 'none');
                   localStorage.removeItem('maternalfirstSignIn');
                } else {
                    layer.msg("修改失败");
                }
            },
                function errfn(err) {
                    layer.msg('操作失败，请稍后重试');
                });

        }
    })
    $('.folder ').click(function(){
        localStorage.setItem('pageNum','1');
    });

})

/*
 * @Author: wanjunliang 
 * @Date: 2018-09-25 16:03:44 
 * @Last Modified by: wanjunliang
 * @Last Modified time: 2018-10-30 14:24:01
 * 新增产后42天记录页js 
 */

$(function(){
    var xData = [];
    var yData = [];
    // 患者信息-start
    var patientInfo = myLocal.getItem("maternalrecordData");
    // console.log(patientInfo)
    var padCheckForWeekBeanList = []; //模板数组
    var fileAllArr = []; //所有图片原始资源
    var doctorImg = ''; // 医生签名
    var doctorImgArr = []; // 医生签名
    var feedingType = 0; //喂养方式
      // 阻止屏幕滑动
    var handle = function (event) {
        event.preventDefault();
    }
      // 点击空白处软键盘消失
    $('main').click(function () {
        objBlur('main', 300);
        $('.touchBox').hide();
        $('.recordhideBox').hide();
        $('.presentrecordhideBox').hide();
    });
    layui.use(['layer', 'form', 'element', 'laydate'], function () {
        var layer = layui.layer,
            form = layui.form,
            element = layui.element,
            laydate = layui.laydate;
        form.render();
        laydate.render({
            elem: '#test1' //指定元素
            , value: new Date()
        });
        // 孕妇接触毒物时间
        laydate.render({
            elem: '#test2'
            , theme: '#68b7e7'
            , position: 'fixed'
            , btns: ['clear']
            , trigger: 'click'
            , min: minDate()
        });
        // 设置最小可选的日期
        function minDate() {
            var now = new Date();
            return now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
        }
    });

        /* ------------------校验 star--------------------- */
    //产后天数
    $('.degree').blur(function () {
        if ($('.degree').val().length == 0) { } else if ($('.degree').val() < 40 || $('.degree').val() > 60) {
            layer.msg('产后天数取值范围40~60， 请修改');
            $(this).addClass('borderColor');
        }else {
            $(this).removeClass('borderColor');
        }
    }).focus(function () {
        $(this).removeClass('borderColor');
    });
    //一半检查 -血压 -高压
    $('.hyperpiesia').blur(function () {
        if ($('.hyperpiesia').val().length == 0) { } else if ($('.hyperpiesia').val() < 0 || $('.hyperpiesia').val() > 300) {
            layer.msg('高压取值范围 0 ~ 300， 请修改');
            $(this).addClass('borderColor');
        } else if (parseInt($('.lowTension').val()) > parseInt($('.hyperpiesia').val())) {
            layer.msg('低压不能大于高压')
            $(this).addClass('borderColor');
        } else {
            $(this).removeClass('borderColor');
        }
    }).focus(function () {
        $(this).removeClass('borderColor');
    });
    //一般检查 -血压 -低压
    $('.lowTension').blur(function () {
        if ($('.lowTension').val().length == 0) { } else if ($('.lowTension').val() < 0 || $('.lowTension').val() > 300) {
            layer.msg('低压取值范围 0 ~ 300， 请修改')
            $(this).addClass('borderColor');
        } else if (parseInt($('.lowTension').val()) > parseInt($('.hyperpiesia').val())) {
            layer.msg('低压不能大于高压')
            $(this).addClass('borderColor');
        } else {
            $(this).removeClass('borderColor');
        }
    }).focus(function () {
        $(this).removeClass('borderColor');
    });
    //一般检查 -体重
    $('.weight').blur(function () {
        if ($('.weight').val().length == 0) { } else if ($('.weight').val() < 30 || $('.weight').val() > 200) {
            layer.msg('体重取值范围 30 ~ 200， 请修改')
            $(this).addClass('borderColor');
        } else {
            $(this).removeClass('borderColor');
        }
    }).focus(function () {
        $(this).removeClass('borderColor');
    });
    //婴儿情况 -婴儿体重
    $('.babyweight').blur(function () {
        if ($('.babyweight').val().length == 0) { } else if ($('.babyweight').val() < 0 || $('.babyweight').val() > 100) {
            layer.msg('婴儿体重取值范围 0 ~ 100， 请修改')
            $(this).addClass('borderColor');
        } else {
            $(this).removeClass('borderColor');
        }
    }).focus(function () {
        $(this).removeClass('borderColor');
    });
    //婴儿情况 -婴儿身长
    $('.babyheight').blur(function () {
        if ($('.babyheight').val().length == 0) { } else if ($('.babyheight').val() < 0 || $('.babyheight').val() > 100) {
            layer.msg('婴儿身长取值范围 0 ~ 100， 请修改')
            $(this).addClass('borderColor');
        } else {
            $(this).removeClass('borderColor');
        }
    }).focus(function () {
        $(this).removeClass('borderColor');
    });
/* ------------------校验 end--------------------- */

    // 喂养方式
    $('.breastMilk').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        feedingType =1;
    });
    $('.mixture').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        feedingType = 2;
    });
    $('.artificial').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        feedingType = 3;
    });
    //  医生签名弹框
    $('.doctorSignature').click(function () {
        $('.doctorPopout').show();
        $('.shade').show();
        document.body.addEventListener('touchmove', handle, false);
        new lineCanvas({
            el: $(".doctorPopout").find(".doctorBoard")[0], //绘制canvas的父级div
            clearEl: $(".doctorPopout").find(".doctorAgain")[0], //清除按钮
            saveEl: $(".doctorPopout").find(".doctorYesBtn")[0], //保存按钮
            linewidth: 5, //线条粗细，选填
            color: "#000", //线条颜色，选填
            imagePathArr: doctorImgArr,   // src数据源
        }, function (data, tempArr) {
            doctorImg = data;
            doctorImgArr = tempArr;
            $(".doctorBoard > canvas").remove();
            $('.doctorPopout').hide();
            $('.shade').hide();
            // 允许屏幕滑动
            document.body.removeEventListener('touchmove', handle, false);
            $('.doctorSignature').css({
                'background': 'url("' + doctorImg + '")',
                'backgroundSize': '5.575rem 3.025rem'
            });
        });
    });
    // 关闭医生签名
    $(".doctorPopout").find('.clone,.callBack').click(function () {
        $('.doctorPopout').hide();
        $('.shade').hide();
        // 允许屏幕滑动
        document.body.removeEventListener('touchmove', handle, false);
        $(".doctorBoard > canvas").remove();
    });
  
    // 校验弹窗再看一下和确定按钮
    $('.verifyAlertLooks,.verifyAlertConfirm').click(function () {
        $('.shade').hide();
        $('.verifyAlert').hide();
        $('html,body').removeClass('noscroll');
    });
    $('.accomplish').click(function () {
        var background = $('.doctorSignature').attr("style");
        if ($('.degree').val() == '') {
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请输入产后天数');
            $('html,body').addClass('noscroll');
        } else if ($('.degree').val() < 40 || $('.degree').val() > 60) {
            layer.msg('产后天数取值范围40~60， 请修改');
            $(this).addClass('borderColor');
        } else if ($('.hyperpiesia').val() == '') {
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请输入高压');
            $('html,body').addClass('noscroll');
        } else if ($('.hyperpiesia').val() < 0 || $('.hyperpiesia').val() > 300) { //高压取值范围
            layer.msg('高压取值范围 0 ~ 300， 请修改')
        } else if ($('.lowTension ').val() == '') {
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请输入低压');
            $('html,body').addClass('noscroll');
        } else if ($('.lowTension').val() < 0 || $('.lowTension').val() > 300) { //低压取值范围
            layer.msg('低压取值范围 0 ~ 300， 请修改')
        } else if (parseInt($('.lowTension').val()) > parseInt($('.hyperpiesia').val())) {
            layer.msg('低压不能大于高压')
        } else if ($('.weight').val() == '') { 
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请输入体重');
            $('html,body').addClass('noscroll');
        } else if ($('.weight').val() < 30 || $('.weight').val() > 200) {  //体重取值范围
            layer.msg('体重取值范围 30 ~ 200， 请修改')
        } else if ($('.babyweight').val() == '') { //婴儿体重
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请输入婴儿体重');
            $('html,body').addClass('noscroll');
        } else if ($('.babyweight').val() < 0 || $('.babyweight').val() > 100) { //体重取值范围
            layer.msg('婴儿体重取值范围 0 ~ 100， 请修改')
        } else if ($('.babyheight').val() == '') { //婴儿身长
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请输入婴儿身长');
            $('html,body').addClass('noscroll');
        } else if ($('.babyheight').val() < 0 || $('.babyheight').val() > 100) { //体重取值范围
            layer.msg('婴儿身长取值范围 0 ~ 100， 请修改')
        } else if ($('.babyheight').val() < 0 || $('.babyheight').val() > 100) { //体重取值范围
            layer.msg('婴儿身长取值范围 0 ~ 100， 请修改')
        } else if (!$('.ChoiceBox ').children('div').hasClass('active')) {
            layer.msg('请选择喂养方式')
        } else if ($('.guideTheProcessing').val() == '') {
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请输入指导与处理 ');
            $('html,body').addClass('noscroll');
        } else if (background == undefined) {
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请填写签名 ');
            $('html,body').addClass('noscroll');
        }
         else{
            var data = new FormData();
            data.append('patientCenterId', patientInfo.id);
            data.append('checkDay', $('.degree').val()); //天数
            data.append('baseBloodPressureHigh', $('.hyperpiesia').val()); //高压
            data.append('baseBloodPressureLow', $('.lowTension ').val());   //低压
            data.append('baseWeight', $('.weight').val());// 体重
            data.append('baseLatex', $('.milk  option:selected').attr('value')); //乳汁 0 未见异常-默认 1.异常
            data.append('baseBreast', $('.breast  option:selected').attr('value')); //乳房 0 未见异常-默认 1.异常
            data.append('baseNipple', $('.papilla  option:selected').attr('value')); //乳头 0 未见异常-默认 1.异常
            data.append('gynecologyVulva', $('.vulva  option:selected').attr('value')); //妇科检查-外阴 0 未见异常-默认 1.异常
            data.append('gynecologyVagina', $('.vagina  option:selected').attr('value')); //妇科检查-阴道 0 未见异常-默认 1.异常
            data.append('gynecologyCervical', $('.cervix  option:selected').attr('value')); //妇科检查-宫颈 0 未见异常-默认 1.异常
            data.append('gynecologyUterus', $('.uterus  option:selected').attr('value')); //妇科检查-子宫 0 未见异常-默认 1.异常
            data.append('gynecologyLochia', $('.lochia  option:selected').attr('value')); //妇科检查-恶露 0 未见异常-默认 1.异常
            data.append('gynecologyAttachmentOnBothSides', $('.BSO  option:selected').attr('value')); //妇科检查-双侧附件 0 未见异常-默认 1.异常	
            data.append('babyWeight', $('.babyweight ').val());   //婴儿情况-体重 kg
            data.append('babyHigh', $('.babyheight').val());// 婴儿情况-身长 cm
            data.append('babyChest', $('.chest  option:selected').attr('value')); //婴儿情况-胸部 0 未见异常-默认 1.异常
            data.append('babyHeart', $('.heart  option:selected').attr('value')); //婴儿情况-心 0 未见异常-默认 1.异常
            data.append('babyLungs', $('.lung  option:selected').attr('value')); //婴儿情况-肺 0 未见异常-默认 1.异常
            data.append('feedingType', feedingType); //喂养方式
            data.append('malaise', $('.malaise').val()); //新生儿评估
            data.append('guideTheProcessing', $('.guideTheProcessing').val()); //新生儿评估
            data.append("doctorImage", base64ToBlob(doctorImg), 'doctorImg' + '.png');
            data.append('patientName', patientInfo.checkName); //新生儿评估
            data.append("token", token);
            
            HttpRequstFromDataForPost(httpUrl.postpartumNew, 'json', data, function sucFn(data) {
                // console.log(data)
                if (data.status == 20200) {
                    // console.log('成功')
                    window.location = '/maternal-ipad/center/center.html'
                } else if (data.status == 20250) {
                    window.location = '/maternal-ipad/login/login.html';
                } else if (data.status == 20207) {
                    layer.msg('新建复检记录失败，请稍后重试');
                }
            },
                function errfn(err) {
                });
        } 
    });



    // 放弃本次编辑
    $(".abandon").click(function () {
        var _$ = layui.jquery;
        layer.open({
            type: 1,
            title: '',
            area: ['18.5rem', '10rem'],
            closeBtn: false,
            shade: [0.7, '#000000'],
            shadeClose: false,
            scrollbar: false,
            content: _$('.promptContent'),
        });
    })
    $(".promptContent").find(".yesBtn").click(function () {
       window.location = '/maternal-ipad/center/center.html';
    })
    $(".promptContent").find(".noBtn").click(function () {
        layer.closeAll();
        $(".promptContent").hide();
    });
});

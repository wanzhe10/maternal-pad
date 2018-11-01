/*
 * @Author: wanjunliang 
 * @Date: 2018-09-25 16:02:18 
 * @Last Modified by: wanjunliang
 * @Last Modified time: 2018-09-25 16:03:31
 * 新增复检记录页js
 */

$(function () {
    var xData = [];
    var yData = [];
    // 患者信息-start
    var patientInfo = myLocal.getItem("maternalrecordData");
    var padCheckForWeekBeanList = []; //模板数组
    var fileAllArr = []; //所有图片原始资源
    var doctorImg = ''; // 医生签名
    var doctorImgArr = []; // 医生签名
    $(".name").html(patientInfo.checkName); // 姓名
    $(".checkNumber").val(patientInfo.checkNumber); // 就诊卡号
    $(".age").html(patientInfo.checkAge + '岁'); // 年龄
    $(".checkIdCard").val(patientInfo.checkIdCard); // 证件号
    $(".filingDate").val(patientInfo.filingDate); // 建档时间
    $(".checkTelephone").val(patientInfo.checkTelephone); // 基本信息-联系电话
    $(".checkBirthdayDate").val(patientInfo.checkBirthdayDate); // 基本信息-出生日期
    $(".checkLastWeight").val(patientInfo.checkLastWeight + 'kg'); // 基本信息-孕前体重
    $(".parturitionDetailHistory").val(patientInfo.parturitionDetailHistory); // 孕产史
    $(".parturitionDetailFamilyHistory").val(patientInfo.parturitionDetailFamilyHistory); // 家族史
    $('.gestationalWeek').val(patientInfo.newAgeOfMenarche);
    var totalNumArr = eval('(' + patientInfo.highRiskTotalNum + ')');
    $(".highRiskDetails").val("绿色（" + totalNumArr.green + "）项   黄色（" + totalNumArr.yellow + "）项  橙色（" + totalNumArr.orange + "）项  红色（" + totalNumArr.red + "）项  紫色（" + totalNumArr.purple + "）项"); // 高危因素
    // 体格检查-血型 0.O型-默认 1.A型 2.B型 3.AB型 4.RH型
    switch (patientInfo.healthAssayBloodType) {
        case '0':
            $(".healthAssayBloodType").val("O型");
            break;
        case '1':
            $(".healthAssayBloodType").val("A型");
            break;
        case '2':
            $(".healthAssayBloodType").val("B型 ");
            break;
        case '3':
            $(".healthAssayBloodType").val("AB型");
            break;
        case '4':
            $(".healthAssayBloodType").val("RH型");
            break;
    }
    // 患者信息-end
    //
    // 复检次数 取url里面?后面的值
    $('.degree').val(window.location.href.split("?")[1])
    // console.log(window.location.href.split("?")[1])

    // 点击空白处软键盘消失
    $('main').click(function () {
        objBlur('main', 300);
        $('.touchBox').hide();
        $('.recordhideBox').hide();
        $('.presentrecordhideBox').hide();
    });

    /* ------验证复检新增数据 str---------- */
    //体格检查 -体重
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
    //体格检查 -血压 -高压
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
    //体格检查 -血压 -低压
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
    //体格检查 -宫高
    $('.fundalHeight').blur(function () {
        if ($('.fundalHeight').val().length == 0) { } else if ($('.fundalHeight').val() < 16 || $('.fundalHeight').val() > 40) {
            layer.msg('宫高取值范围 16 ~ 40， 请修改')
            $(this).addClass('borderColor');
        } else {
            $(this).removeClass('borderColor');
        }
    }).focus(function () {
        $(this).removeClass('borderColor');
    });
    //体格检查 -腹围
    $('.waistline').blur(function () {
        if ($('.waistline').val() < 50 || $('.waistline').val() > 100) {
            layer.msg('腹围取值范围 50 ~ 100， 请修改')
            $(this).addClass('borderColor');
        } else {
            $(this).removeClass('borderColor');
        }
    }).focus(function () {
        $(this).removeClass('borderColor');
    });
      /* ------验证复检新增数据 end---------- */


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
            ,min: minDate()
        });
        // 设置最小可选的日期
        function minDate() {
            var now = new Date();
            return now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
        }
    });
   
    // 拍照上传 添加图片
    $("#upimg4").change(function () {
        var uploadFile = $("#upimg4")[0].files; // 某一块添加时的原始数据
        var _html = '';
        var fileLength = 0;
        var reader = new FileReader();
        reader.readAsDataURL(uploadFile[fileLength]);
        reader.onload = function (e) {
            if (e.target.result) {
                // // 过滤重复
                var flag = true;
                // for (var i = 0; i < fileAllArr.length; i++) {
                //     if (fileAllArr[i].name == uploadFile[fileLength].name) {
                //         flag = false;
                //     }
                // } 
                // $(".malaise").val(tempName+"");
                // $(".guideTheProcessing").val(tempName1 + "");
                // var flag = true;
                if (flag) {
                    if (/(.png|.jpg|.jpeg)$/gi.test(uploadFile[fileLength].name)) {
                        // fileAllArr.push({
                        //     "name": uploadFile[fileLength].name,
                        //     "value": uploadFile[fileLength],
                        // });
                        $(".imgBox").append('<div class="imgBocFile newImg" name="' + uploadFile[fileLength].name + '"><img class="lookBigImg" src="' + e.target.result + '" bigSrc="' + e.target.result + '">\
                        <img src="/maternal-ipad/added/dele.png" alt="删除" class="delFileBtn newDel"></div>');
                        render(uploadFile[fileLength].name, e.target.result);
                        // console.log(fileAllArr)
                    } else {
                        layer.msg('请上传png/jpg类型的文件');
                    }
                } else {
                }
                if (fileLength < uploadFile.length) {
                    fileLength++;
                    reader.readAsDataURL(uploadFile[fileLength]);
                }
            
            }
        }
    });
    // 压缩图片
    var MAX_HEIGHT = 1250;
    function render(picname, src) {
        // 创建一个 Image 对象
        var image = new Image();
        // 绑定 load 事件处理器，加载完成后执行
        image.onload = function () {
            // 获取 canvas DOM 对象
            var canvas = document.createElement("canvas");
            // 如果高度超标
            if (image.height > MAX_HEIGHT && image.height >= image.width) {
                // 宽度等比例缩放 *=
                image.width *= MAX_HEIGHT / image.height;
                image.height = MAX_HEIGHT;
            }
            //考录到用户上传的有可能是横屏图片同样过滤下宽度的图片。
            if (image.width > MAX_HEIGHT && image.width > image.height) {
                // 宽度等比例缩放 *=
                image.height *= MAX_HEIGHT / image.width;
                image.width = MAX_HEIGHT;
            }
            // 获取 canvas的 2d 画布对象,
            var ctx = canvas.getContext("2d");
            // canvas清屏，并设置为上面宽高
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // 重置canvas宽高
            canvas.width = image.width;
            canvas.height = image.height;
            // 将图像绘制到canvas上
            ctx.drawImage(image, 0, 0, image.width, image.height);
            // !!! 注意，image 没有加入到 dom之中
            //    document.getElementById('img').src = canvas.toDataURL("image/png");
            var blob = canvas.toDataURL("image/jpeg",0.8);
            //将转换结果放在要上传的图片数组里
            fileAllArr.push({ "name": picname, "value": blob });
        };
        image.src = src;
    };

    // 删除图片
    $('.imgBox').delegate('.newDel', 'click', function () {
        $(this).parent('.imgBocFile').remove();
        for (var i = 0; i < fileAllArr.length; i++) {
            if ($(this).parent('.imgBocFile').attr('name') == fileAllArr[i].name) {
                fileAllArr.splice(i, 1);
            }
        }
    });
    //  预约记录弹框
    $('.subscribeBtn').click(function () {
        if ($('.subscribe').val()== '') {
            layer.msg('请先预约下次日期');
        }else{
            $('.shade').show();
            $('.recordPopup').show();
            $('html,body').addClass('noscroll');
        }
    
    });
    // 预约记录弹窗的切换
    // $('.recordPopup_left_ul').on('click', 'li', function () {
       
    // })
    $('.recheck').click(function () {
        $(this).addClass('active2').siblings().removeClass('active2');
    })
 

    $('.recordPopup_left_ul').on('click', 'li', function () {
        $(this).addClass('active').siblings().removeClass('active');
        var padCheckArr = padCheckForWeekBeanList[$(this).attr('number') - 1];
        // console.log(padCheckArr);
        $('.recordPopupName').html(padCheckArr.name);
        $('.gestationalWeekStart').html(padCheckArr.gestationalWeekStart);
        $('.gestationalWeekEnd').html(padCheckArr.gestationalWeekEnd);
        $('.checkDetail').html(padCheckArr.checkDetail);
        $('.remarks').html(padCheckArr.remarks);
        if (padCheckArr.types == 0) {
            $('.remarks_false').show();
            $('.remarks_true').hide();
        } else {
            $('.remarks_false').hide();
            $('.remarks_true').show();
        }
        if ($(this).hasClass('active')) {
            $(this).siblings().children('p').css('color', '#333');
            $(this).children('p').css('color', '#68b7e7');
        }
    });
    $('.recordPopuBtn').click(function () {
        // console.log(1)
        $('.shade').hide();
        $('.recordPopup').hide();
        $('html,body').removeClass('noscroll');
        $('.subscribeBtn').html($('.recordPopupName').html());
    });
    HttpRequstForPost(httpUrl.templateInquire, 'json',{
        "token": token
    }, function sucFn(data) {
        // console.log(data)
        if (data.status == 20200) {
            padCheckForWeekBeanList = data.padCheckForWeekBeanList;
            var _html = '';
            for (var i = 0; i < padCheckForWeekBeanList.length; i++) {
                if (i == 0) {
                    _html = "<li number= '" + padCheckForWeekBeanList[0].number + "' class= 'active'  weekId = '" + padCheckForWeekBeanList[0].id+"'>\
                    <p>" + padCheckForWeekBeanList[0].name + "</p>\
                    <p> " + '孕' + padCheckForWeekBeanList[0].gestationalWeekStart + '-' + padCheckForWeekBeanList[0].gestationalWeekEnd + '周' + " </p>\
                </li>"
                } else {
                    _html = "<li number= '" + padCheckForWeekBeanList[i].number + "' weekId = '" + padCheckForWeekBeanList[i].id +"'>\
                    <p>" + padCheckForWeekBeanList[i].name + "</p>\
                    <p> " + '孕' + padCheckForWeekBeanList[i].gestationalWeekStart + '-' + padCheckForWeekBeanList[i].gestationalWeekEnd + '周' + " </p>\
                </li>"
                }

                $('.recordPopup_left_ul').append(_html);
            }
            $('.recordPopupName').html(padCheckForWeekBeanList[0].name);
            $('.gestationalWeekStart').html(padCheckForWeekBeanList[0].gestationalWeekStart);
            $('.gestationalWeekEnd').html(padCheckForWeekBeanList[0].gestationalWeekEnd);
            $('.checkDetail').html(padCheckForWeekBeanList[0].checkDetail);
            $('.remarks').html(padCheckForWeekBeanList[0].remarks);

            if (padCheckForWeekBeanList[0].types == '0') {
                $('.remarks_false').show();
                $('.remarks_true').hide();
            } else {
                $('.remarks_false').hide();
                $('.remarks_true').show();
            }

        } else if (data.status == 20250) {
            window.location = '/maternal-ipad/login/login.html';
        }
    },
        function errfn(err) {
             layer.msg('操作失败，请稍后重试');
        });
    // 阻止屏幕滑动
    var handle = function (event) {
        event.preventDefault();
    }
    // 医生签名弹框
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
        }, function (data,tempArr) {
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
    // 导入模板
    // 自觉不适导入模板

    $('.importDatabase1').click(function () {
        $('.stencilLayer').show();
        // $('html,body').addClass('noscroll');
        $('.templateFont').html('自觉不适');
        //禁止屏幕滑动
        document.body.addEventListener('touchmove', handle, false);
        HttpRequstForPost(httpUrl.templateMalaise, 'json',{
            "token": token, 
        },function sucFn(data) {
            // console.log(data)
            if (data.status == 20200) {
                var templateMalaiseBeanList = data.templateMalaiseBeanList;
                var _html = '';
                for (var i = 0; i < templateMalaiseBeanList.length; i++) {
                    _html += "  <a class='topicItem' href='javascript:;' id = ' " + templateMalaiseBeanList[i].id + "'>" + templateMalaiseBeanList[i].details + "</a>"

                }
                $('.stencilLayer_select').html(_html);
            } else if (data.status == 20250) {
                window.location = '/maternal-ipad/login/login.html';
            }
        },
            function errfn(err) {
                 layer.msg('操作失败，请稍后重试');
            });
    });
    $('.importTemplate').click(function () {
        if ($('.templateFont').html() == '自觉不适') {
            var malaiseTxt = $('.stencilLayer_select').find('.topicItem.active').html();
            $('.malaise').val(malaiseTxt);
            $('.stencilLayer').hide();
            // 允许屏幕滑动
            document.body.removeEventListener('touchmove', handle, false);

        } else {
            var guideTheProcessingTxt = $('.stencilLayer_select').find('.topicItem.active').html();
            $('.guideTheProcessing').val(guideTheProcessingTxt);
            $('.stencilLayer').hide();
            // 允许屏幕滑动
            document.body.removeEventListener('touchmove', handle, false);
        }
    });
    // 指导处理意见
    $('.importDatabase2').click(function () {
        $('.stencilLayer').show();
        // $('html,body').addClass('noscroll');
        $('.templateFont').html('指导处理意见');
        //禁止屏幕滑动
        document.body.addEventListener('touchmove', handle, false);
        HttpRequstForPost(httpUrl.instruction, 'json',{
            "token": token,
        }, function sucFn(data) {
            // console.log(data)
            if (data.status == 20200) {
                var templateDisposeBeanList = data.templateDisposeBeanList;
                var _html = '';
                for (var i = 0; i < templateDisposeBeanList.length; i++) {
                    _html += "  <a class='topicItem' href='javascript:;' id = ' " + templateDisposeBeanList[i].id + "'>" + templateDisposeBeanList[i].details + "</a>"
                }
                $('.stencilLayer_select').html(_html);
            } else if (data.status == 20250) {
                window.location = '/maternal-ipad/login/login.html';
            }
        },
            function errfn(err) {
                 layer.msg('操作失败，请稍后重试');
            });
    });
    $('.gobackBtn').click(function () {
        $('.stencilLayer').hide();
        // $('html,body').removeClass('noscroll');
    });
    $('.stencilLayer_clone').click(function () {
        $('.stencilLayer').hide();
        // 允许屏幕滑动
        document.body.removeEventListener('touchmove', handle, false);
    
        // $('html,body').removeClass('noscroll');
    });

    // 模板选项
    $('.stencilLayer_select').on('click', 'a', function () {
        $(this).addClass('active').siblings().removeClass('active');
    })

    // 校验弹窗按钮
    $('.verifyAlertLooks,.verifyAlertConfirm').click(function () {
        $('.shade').hide();
        $('.verifyAlert').hide();
        $('html,body').removeClass('noscroll');
    })

    $('.accomplish').click(function () {
        var background = $('.doctorSignature').attr("style");
        if ($('.gestationalWeek').val() == '') {
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请输入孕周');
            $('html,body').addClass('noscroll');
        } else if ($('.gestationalWeek').val() > 42) { //体重取值范围
            layer.msg('孕周输入不正确')
        } else if ($('.weight').val() == '') {
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请输入体重');
            $('html,body').addClass('noscroll');
        } else if ($('.weight').val() < 30 || $('.weight').val() > 200) { //体重取值范围
            layer.msg('体重取值范围 30 ~ 200， 请修改')
        }else if ($('.hyperpiesia').val() == '') {
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请输入高压');
            $('html,body').addClass('noscroll');
        } else if ($('.hyperpiesia').val() < 0 || $('.hyperpiesia').val() > 300) { //高压取值范围
            layer.msg('高压取值范围 0 ~ 300， 请修改')
        }else if ($('.lowTension ').val() == '') {
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请输入低压');
            $('html,body').addClass('noscroll');
        } else if ($('.lowTension').val() < 0 || $('.lowTension').val() > 300) { //低压取值范围
            layer.msg('低压取值范围 0 ~ 300， 请修改')
        } else if (parseInt($('.lowTension').val()) > parseInt($('.hyperpiesia').val())) {
            layer.msg('低压不能大于高压')
        } else if ($('.fundalHeight ').val() == '') {
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请输入宫高');
            $('html,body').addClass('noscroll');
        } else if ($('.fundalHeight').val() < 16 || $('.fundalHeight').val() > 40) { //宫高取值范围
            layer.msg('宫高取值范围 16 ~ 40， 请修改')
        } else if ($('.waistline ').val() == '') {
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请输入腹围');
            $('html,body').addClass('noscroll');
        } else if ($('.waistline').val() < 50 || $('.waistline').val() > 100) { //腹围取值范围
            layer.msg('腹围取值范围 50 ~ 100， 请修改')
        }   else if ($('.subscribe ').val() == '') {
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请输入预约下次时间');
            $('html,body').addClass('noscroll');
        } else if ($('.subscribeBtn').html() == '预约记录') {
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请选择预约记录');
            $('html,body').addClass('noscroll');
        }else if ($('.malaise ').val() == '') {
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请输入自觉不适');
            $('html,body').addClass('noscroll');
        } else if ($('.guideTheProcessing ').val() == '') {
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请输入指导处理意见 ');
            $('html,body').addClass('noscroll');
        } else if ($('.guideTheProcessing ').val() == '') {
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请输入指导处理意见 ');
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
            data.append('healthCheckId', patientInfo.healthCheckId);
            data.append('patientName', patientInfo.checkName);
            data.append('ordinalNumber', $('.degree').val()); //序号
            data.append('checkDate', $('.checkDate').val());
            data.append('gestationalWeek', $('.gestationalWeek').val());
            data.append('bodyWeight', $('.weight').val());
            data.append('bloodPressureHigh', $('.hyperpiesia').val());
            data.append('bloodPressureLow', $('.lowTension ').val());
            data.append('highPalace', $('.fundalHeight').val());
            data.append('abdominalGirth', $('.waistline').val());
            data.append('makeAppointmentTime', $('.subscribe').val() + ' 10:00');
            data.append("position", $('.position  option:selected').attr('value')); //胎方位
            data.append("presentation", $('.presentation  option:selected').attr('value')); //先露
            data.append("cardiac", $('.cardiac  option:selected').attr('value')); //胎心率
            data.append("cohesion", $('.cohesion  option:selected').attr('value')); //衔接
            data.append("urineProtein", $('.urineProtein  option:selected').attr('value')); //尿蛋白
            data.append("edema", $('.edema  option:selected').attr('value')); //浮肿
            data.append("malaise", $('.malaise').val());
            data.append("guideTheProcessing", $('.guideTheProcessing').val());
            for (var i = 0; i < fileAllArr.length; i++) {
                data.append("imageFile", base64ToBlob(fileAllArr[i].value), fileAllArr[i].name);

            }
            data.append("doctorImager", base64ToBlob(doctorImg), 'doctorImg' + '.png');
            data.append("name", padCheckForWeekBeanList[$(".recordPopup_left_ul li.active").attr("number") - 1].name);
            data.append("number", padCheckForWeekBeanList[$(".recordPopup_left_ul li.active").attr("number") - 1].number);
            data.append("gestationalWeekStart", padCheckForWeekBeanList[$(".recordPopup_left_ul li.active").attr("number") - 1].gestationalWeekStart);
            data.append("gestationalWeekEnd", padCheckForWeekBeanList[$(".recordPopup_left_ul li.active").attr("number") - 1].gestationalWeekEnd);
            data.append("checkDetail", padCheckForWeekBeanList[$(".recordPopup_left_ul li.active").attr("number") - 1].checkDetail);
            data.append("remarks", padCheckForWeekBeanList[$(".recordPopup_left_ul li.active").attr("number") - 1].remarks);
            data.append("weekId", padCheckForWeekBeanList[$(".recordPopup_left_ul li.active").attr("number") - 1].id);
            data.append("newAgeOfMenarche", patientInfo.newAgeOfMenarche);
            data.append("newAgeOfMenarcheDay", patientInfo.newAgeOfMenarcheDay);
            data.append("token", token);
            HttpRequstFromDataForPost(httpUrl.addRecord, 'json', data, function sucFn(data) {
                // console.log(data)
                if (data.status == 20200) {
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

        // 查看大图-start
        $(".imgBox").delegate(".lookBigImg", "click", function (e) {
            $('.lookBigImgaes').show();
            $('.shade').show();
            $(".lookBigImgaes").find('img').attr("src", $(this).attr("bigSrc"));
            document.body.addEventListener('touchmove', handle, false);
            e.stopPropagation();
        });
    $(".lookBigImgaes").click(function () {
        $(this).hide();
        $('.shade').hide();
        document.body.removeEventListener('touchmove', handle, false);
        });

    /* 查看BMI值按钮操作 */
    // 渲染 BMI 图表
    function renderChart(xData, yData) {
        var xTempData = [];
        for (let index = 13; index < 43; index++) {
            xTempData.push(index)
        }
        var myChart = echarts.init($("#chartmain")[0]);
        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '标题'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                },
                // formatter: function (params) {
                //         return params.seriesName + ' : [ ' + params.value[0] + ', ' + params.value[1] + ' ]';
                //     }
            },
            grid: {
                left: '2%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [{
                nameLocation: 'center',
                type: 'category',
                boundaryGap: false,
                axisLabel: {
                    interval: 0,
                    formatter: function (value) {
                        var tempInt = value * 1;
                        if (tempInt % 2 == 0 || tempInt == 13)//如果类目项的文字大于3,
                        {
                            return value;
                        } else {
                            return "";
                        }
                    }

                },
                data: xTempData
            }],
            yAxis: [{
                type: 'value',
                nameLocation: 'center',
                // ,
                min: 10,
                max: 50,
                splitNumber: 8
            }],

            toolbox: {
                show: true,
                orient: 'vertical',
                itemSize: 1,
                itemGap: 2
            },
            series: [{
                type: 'line',
                stack: '',
                color: "#77cae5",
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                data: yData
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    };

    $('.BMLValue').click(function () {
        var tempData = [];
        $('.BMIlayer').show();
        HttpRequstForPost(httpUrl.patientBMI, 'json', {
            "centerId": myLocal.getItem("maternalsrecordData").id,
            "token": token,
        }, function sucFn(data) {
            if (data.status == 20200) {
                var patientBMIBeanList = data.patientBMIBeanList;
                var a;
                for (let i = 0; i < patientBMIBeanList.length; i++) {
                    var tempArr = [];
                    a = JSON.parse(patientBMIBeanList[i].newAgeOfMenarche)
                    a = a * 1 - 13;
                    tempArr.push(a);
                    tempArr.push(patientBMIBeanList[i].details);
                    tempData.push(tempArr);
                    // tempData.splice(a, 1, patientBMIBeanList[i].details);
                }
                renderChart(xData, tempData);
            } else if (data.status == 20250) {
                window.location = '/maternal-ipad/login/login.html';
            } else {
                // $(".assessBox").html('');
            }
        }, function errfn(err) {
             layer.msg('操作失败，请稍后重试');
        });
    });
    $('.bmiCloneBtn').click(function () {
        $('.BMIlayer').hide();
        xData = [];
        yData = [];
    });
    /* BMI值 -end */
});
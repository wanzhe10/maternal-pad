/*
 * @Author: wanjunliang
 * @Date: 2018-07-12 11:44:10
 * @Last Modified by: wanjunliang
 * @Last Modified time: 2018-10-30 14:23:56
 */
$(function () {
    var smokingRadio = ''; // 支烟
    var poison = 0; //接触毒物
    var centerId = '';
    var contactToxicDate = ''; // 时间
    var contactToxicName = ''; //接触毒物名称
    var contactRadioactiveRays = ''; //接触放射性
    var fiveArr = [];    //5分数组
    var tenArr = []; //10分数组
    var twentyArr = [];  //20分数组
    var purpleArr = []; // 紫色数组
    var historyListArr = []; //孕产史数组
    var deleteHistory = []; //孕产史删除数组
    var patientImg = ''; // 患者签名
    var doctorImg = ''; // 医生签名
    var patientImgArr = []; // 患者签名
    var doctorImgArr = []; // 医生签名

    // 点击空白处软键盘消失
    $('.content').click(function () {
        objBlur('content', 300);
        $('.touchBox').hide();
        $('.hideBox').hide();
        $('.recordhideBox').hide();
        $('.presentrecordhideBox').hide();
    });

    // 下一步按钮的显示隐藏
    $('.womenInformationLi1 ').click(function () {
        $('.nextStep1').show();
        $('.nextStepOne').hide();

    });
    $('.womenInformationLi2 ').click(function () {
        $('.nextStep1').hide();
        $('.nextStepOne').show();
    });
    $('.newRecordLi1').click(function () {
        $('.nextStep2').show();
        $('.nextStepTwo').hide();
        if (!$(this).attr('id')) {
            $('.degreeAffirm').hide();
        } else {
            $('.degreeAffirm').show();
        }
    });
    $('.newRecordLi2').click(function () {
        $('.nextStep2').hide();
        $('.nextStepTwo').show();
    });
    // teb切换
    $('.leftBox>ul>li').click(function () {
        var index = $(this).index();
        $(this).siblings().children('span').removeClass('active');
        $(this).children('span').addClass('active');
        $('.content').eq(index).show().siblings().hide();
        $(".iocn").css("top", index * 3 + 1 + "rem");
        $(this).siblings().find('.icon2').hide();
        $(this).find('.icon2').show();
    });

    $('.womenInformationLi').click(function () {
        $("html,body").animate({ scrollTop: 0 }, 0);
        $('.management').html('新建档案');
    });
    $('.newRecordLi').click(function () {
        $("html,body").animate({ scrollTop: 0 }, 0);
        $('.management').html('初诊记录');
        if ($('.newRecordLi1').attr('id')) {
            $('.degreeAffirm').show();
        } else {
            $('.degreeAffirm').hide();
        }
    });

    $('.assessmentLi').click(function () {
        $("html,body").animate({ scrollTop: 0 }, 0);
        $('.management').html('高危评估');
    });
    $('.affirmLi').click(function () {
        $("html,body").animate({ scrollTop: 0 }, 0);
        $('.management').html('签字确认');
    });
    // 返回
    $('.backBtn').click(function () {
        window.history.back(-1);
    })

    // 阻止屏幕滑动
    var handle = function (event) {
        event.preventDefault();
    }
    // 患者签名弹框
    $('.patientSignature').click(function () {
        $('.patientPopout').show();
        $('.shadow').show();
        document.body.addEventListener('touchmove', handle, false);
        new lineCanvas({
            el: $(".patientPopout").find(".board")[0], //绘制canvas的父级div
            clearEl: $(".patientPopout").find(".patientAgain")[0], //清除按钮
            saveEl: $(".patientPopout").find(".yesBtn")[0], //保存按钮
            linewidth: 5, //线条粗细，选填
            color: "#000", //线条颜色，选填
            imagePathArr: patientImgArr,   // src数据源
        }, function (data, tempArr) {
            if (tempArr.length == 0) {
                return;
            }
            patientImg = data;
            patientImgArr = tempArr;
            $(".board > canvas").remove();
            layer.closeAll();
            $('.patientPopout').hide();
            $('.shadow').hide();
            // 允许屏幕滑动
            document.body.removeEventListener('touchmove', handle, false);
            $('.patientSignature').css({ 'background': 'url("' + patientImg + '")', 'backgroundSize': '12.5rem 6.75rem' });
        });

    });
    // 关闭患者签名
    $(".patientPopout").find('.clone,.callBack').click(function () {
        $('.patientPopout').hide();
        $('.shadow').hide();
        $(".board > canvas").remove();
        document.body.removeEventListener('touchmove', handle, false);
    });

    // 医生签名弹框
    $('.doctorSignature').click(function () {
        $('.doctorPopout').show();
        $('.shadow').show();
        document.body.addEventListener('touchmove', handle, false);
        new lineCanvas({
            el: $(".doctorPopout").find(".doctorBoard")[0], //绘制canvas的父级div
            clearEl: $(".doctorPopout").find(".doctorAgain")[0], //清除按钮
            saveEl: $(".doctorPopout").find(".doctorYesBtn")[0], //保存按钮
            linewidth: 5, //线条粗细，选填
            color: "#000", //线条颜色，选填
            imagePathArr: doctorImgArr,   // src数据源
            // background: "#ffffff" //线条背景，选填
        }, function (data, tempArr) {
            doctorImg = data;
            doctorImgArr = tempArr;
            $(".doctorBoard > canvas").remove();
            layer.closeAll();
            $('.doctorPopout').hide();
            $('.shadow').hide();
            // 允许屏幕滑动
            document.body.removeEventListener('touchmove', handle, false);
            $('.doctorSignature').css({
                'background': 'url("' + doctorImg + '")',
                'backgroundSize': '12.5rem 6.75rem'
            });
        });
    });
    // 关闭医生签名
    $(".doctorPopout").find('.clone,.callBack').click(function () {
        $('.doctorPopout').hide();
        $('.shadow').hide();
        // 允许屏幕滑动
        document.body.removeEventListener('touchmove', handle, false);
        $(".doctorBoard > canvas").remove();
    });


    layui.use(['layer', 'form', 'element', 'laydate'], function () {
        var layer = layui.layer,
            form = layui.form,
            element = layui.element,
            laydate = layui.laydate;
        form.render();
        // 初诊日期
        laydate.render({
            elem: '#test2' //指定元素
            , value: new Date()
        });
        // 末次月经
        laydate.render({
            elem: '#test3'
            // , show: true //直接显示
            , theme: '#68b7e7'
            , position: 'fixed'
            , btns: ['clear', 'confirm']
            , done: function (value, date) {
                var tempMouth = date.month;
                if (tempMouth.length < 2) {
                    tempMouth = "0" + tempMouth;
                }
                $('.lastMenstruation').val(date.year + '-' + tempMouth + '-' + date.date)
                var oldDate = new Date(date.year + '/' + date.month + '/' + date.date).getTime();
                // console.log(oldDate)
                var newDate = new Date().getTime();
                var countDay = parseInt((newDate - oldDate) / 1000 / 3600 / 24);
                var weeks = parseInt(countDay / 7); // 孕周
                var day = countDay % 7; // 孕天
                var expectedDate = new Date(oldDate + 3600 * 24 * 1000 * 280);
                var expectedText = expectedDate.getFullYear() + '-' + doubleZero(expectedDate.getMonth() + 1) + '-' + doubleZero(expectedDate.getDate());
                $(".dueDate").val(expectedText);
                $('.newAgeOfMenarche').val(weeks);
                $('.newAgeOfMenarcheDay').val(day);
            }
        });
        // 孕妇接触放射性时间
        laydate.render({
            elem: '#test4'
            // , show: true //直接显示
            , theme: '#68b7e7'
            , position: 'fixed'
            , btns: ['clear', 'confirm']

        });
        // 孕妇接触毒物时间
        laydate.render({
            elem: '#test5'
            // , show: true //直接显示
            , theme: '#68b7e7'
            , position: 'fixed'
            , btns: ['clear']
            , trigger: 'click'
        });
        // 自动计算预产期
        function doubleZero(num) {
            return num < 10 ? '0' + num : num;
        }
        /* ********************************时间滚轮star****************************** */
        var showDateDom = $('.firstCheckDate');
        // 初始化时间
        var now = new Date();
        var nowYear = now.getFullYear();
        var nowMonth = now.getMonth() + 1;
        var nowDate = now.getDate();
        showDateDom.attr('data-year', nowYear);
        showDateDom.attr('data-month', nowMonth);
        showDateDom.attr('data-date', nowDate);
        showDateDom.val(nowYear + '-' + nowMonth + '-' + nowDate);
        // 数据初始化
        function formatYear(nowYear) {
            var arr = [];
            for (var i = nowYear - 15; i <= nowYear; i++) {
                arr.push({
                    id: i + '',
                    value: i + '年'
                });
            }
            return arr;
        }
        function formatMonth() {
            var arr = [];
            for (var i = 1; i <= 12; i++) {
                arr.push({
                    // id: i < 10 ? '0' + i + '' : i + '',
                    id: i + '',
                    value: i + '月'
                });
            }
            return arr;
        }
        function formatDate(count) {
            var arr = [];
            for (var i = 1; i <= count; i++) {
                arr.push({
                    id: i < 10 ? '0' + i + '' : i + '',
                    value: i + '日'
                });
            }
            return arr;
        }
        var yearData = function (callback) {
            // settimeout只是模拟异步请求，真实情况可以去掉
            // setTimeout(function() {
            callback(formatYear(nowYear))
            // }, 2000)
        }
        var monthData = function (year, callback) {
            // settimeout只是模拟异步请求，真实情况可以去掉
            // setTimeout(function() {
            callback(formatMonth());
            // }, 2000);
        };
        var dateData = function (year, month, callback) {
            // settimeout只是模拟异步请求，真实情况可以去掉
            // setTimeout(function() {
            if (/^(1|3|5|7|8|10|12)$/.test(month)) {
                callback(formatDate(31));
            }
            else if (/^(4|6|9|11)$/.test(month)) {
                callback(formatDate(30));
            }
            else if (/^2$/.test(month)) {
                if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
                    callback(formatDate(29));
                }
                else {
                    callback(formatDate(28));
                }
            }
            else {
                throw new Error('month is illegal');
            }
        };
     
    

        // 孕产史的滚轮
        $('.dynamicTable').on('click', 'tr', function () {
            if ($('.pregnancyNum option:selected').attr('value') == 0) {
                $('.tableShade').show();
            }else{
                dynamicTableFu($(this));
            }
          
        });
        // 孕产史封装
        function dynamicTableFu(obj) {
            var oneLevelId = showDateDom.attr('data-year');
            var twoLevelId = showDateDom.attr('data-month');
            var ThreeLevelId = ageOfMenarche[0].id;
            var FourLevelId = age[0].id + '岁';
            var FiveLevelId = productionAbortion[0].id;
            var SixLevelId = sex[0].id;
            var sevenLevelId = babyHealthType[0].id;
            var SevenSelect = new IosSelect(7,
                [yearData, monthData, ageOfMenarche, age, productionAbortion, sex, babyHealthType],
                {
                    title: '胎次' + obj.attr('number'),
                    itemHeight: 35,
                    oneLevelId: oneLevelId,
                    twoLevelId: twoLevelId,
                    ThreeLevelId: ThreeLevelId,
                    FourLevelId: FourLevelId,
                    FiveLevelId: FiveLevelId,
                    SixLevelId: SixLevelId,
                    sevenLevelId: sevenLevelId,
                    // SevenSelect: SevenSelect,
                    showLoading: true,
                    oneLevelTitle: '时间-年',
                    twoLevelTitle: '时间-月',
                    threeLevelTitle: '孕周',
                    fourLevelTitle: '年龄',
                    fiveLevelTitle: '分娩方式',
                    sixLevelTitle: '性别',
                    sevenLevelTitle: '健否',
                    callback: function (year, month, ageOfMenarche, age, productionAbortion, sex, babyHealthType) {
                        var tempMouth = month.id;
                        if (tempMouth.length < 2) {
                            tempMouth = "0" + tempMouth;
                        }
                        obj.find(".productionDate").html(year.id + '-' + tempMouth);
                        obj.find(".ageOfMenarche").html(ageOfMenarche.value);
                        obj.find(".productionOfAge").html(age.id);
                        obj.find(".productionAbortion").html(productionAbortion.value);
                        obj.find(".babySex").html(sex.value);
                        obj.find(".babyHealthType").html(babyHealthType.value);
                    }
                });
        };
        $('.dynamicTable').on('click', '.remarks', function (ev) {
            //js阻止事件冒泡
            var oEvent = ev || event;
            // oEvent.cancelBubble = true;
            oEvent.stopPropagation();
        });


        laydate.render({
            elem: '.test' //指定元素
        });

        // 接触放射性select选择
        form.on('select(contactRadioactiveRays)', function (data) {
            contactRadioactiveRays = data.value;
            if (contactRadioactiveRays == '1') {
                $('.contactRadioactiveRaysDate').css('background', '#fff').removeAttr("disabled");
            } else {
                $('.contactRadioactiveRaysDate').css('background', '#ccc').attr("disabled", "disabled");
            }
        });
        // 配偶信息吸烟的单选框
        form.on('radio(smoking)', function (data) {
            var smoking = data.value;
            //  smokingRadio = smoking
            if (smoking == '0') {
                $('.cigaretteNUm').removeClass('bgcF').addClass('bgcC');
                $('.cigaretteNUm').val('');
            } else {
                $('.cigaretteNUm').removeClass('bgcC').addClass('bgcF');
            }
        });
        // 配偶吸烟室输入点击事件
        $('.cigaretteNUm').click(function () {
            $(this).removeClass('bgcC').addClass('bgcF');
            $("input[name=smoking][value='0']").removeAttr("checked");
            $("input[name=smoking][value='1']").prop("checked", true);
            form.render();
        })
        //   配偶信息家族史
        form.on('radio(history1)', function (data) {
            var history = data.value;
            if (history == '否') {
                $('.inquire').removeClass('bgcF').addClass('bgcC').val('');
                $('.spouse_box3_bottom .disease').hide();
                $('.hideBox').hide();

            } else {
                $('.inquire').removeClass('bgcC').addClass('bgcF');
                $('.spouse_box3_bottom .disease').show();
            }
            // console.log(history)
        });
        $('.inquire').click(function () {
            $(this).removeClass('bgcC').addClass('bgcF');
            $("input[name=history1][value='否']").removeAttr("checked");
            $("input[name=history1][value='是']").prop("checked", true);
            form.render()
        })
        // 孕产信息家族史
        form.on('radio(history2)', function (data) {
            var history = data.value;
            if (history == '否') {
                $('.recordInquire').removeClass('bgcF').addClass('bgcC').val('');
                $('.recordBox4_3 .disease').hide();
                $('.recordhideBox').hide();
            } else {
                $('.recordInquire').removeClass('bgcC').addClass('bgcF');
                $('.recordBox4_3 .disease').show();
            }
            // console.log(history)
        });
        $('.recordInquire').click(function () {
            $(this).removeClass('bgcC').addClass('bgcF');
            $("input[name=history2][value='否']").removeAttr("checked");
            $("input[name=history2][value='是']").prop("checked", true);
            form.render()
        })
        //孕产信息现病史
        form.on('radio(presentIllness)', function (data) {
            var history = data.value;
            if (history == '否') {
                $('.presentrecordInquire').removeClass('bgcF').addClass('bgcC').val('');
                $('.presentdisease').hide();
                $('.presentrecordhideBox').hide();
            } else {
                $('.presentrecordInquire').removeClass('bgcC').addClass('bgcF');
                $('.presentdisease').show();
            }
        });
        //    点击现病史输入框 ，获得焦点，本身可以编辑
        $('.presentrecordInquire').click(function () {
            $(this).removeClass('bgcC').addClass('bgcF');
            $("input[name=presentIllness][value='否']").removeAttr("checked");
            $("input[name=presentIllness][value='是']").prop("checked", true);
            form.render()
        })
        //   接触毒物
        form.on('radio(contact)', function (data) {
            var contact = data.value;
            if (contact == '0') {
                $('.contactToxicName').removeClass('bgcF').addClass('bgcC').val('');
                $('.contactToxicDate').removeClass('bgcF').addClass('bgcC').val('');
                $('.touchdisease').hide();
            } else {
                $('.contactToxicName').removeClass('bgcC').addClass('bgcF');
                $('.contactToxicDate').removeClass('bgcC').addClass('bgcF');
                $('.touchdisease').show();
            }
            // console.log(contact)
        });
        // 点击接触毒物的输入框，焦点到是 本身可以编辑
        $('.contactToxicName').click(function () {
            $(this).removeClass('bgcC').addClass('bgcF');
            $("input[name=contact][value='0']").removeAttr("checked");
            $("input[name=contact][value='1']").prop("checked", true);
            form.render()
        })
        $('#test5').click(function () {
            $(this).removeClass('bgcC').addClass('bgcF');
            $("input[name=contact][value='0']").removeAttr("checked");
            $("input[name=contact][value='1']").prop("checked", true);
            form.render()
        })
        //   病毒感染
        form.on('radio(virus)', function (data) {
            var virus = data.value;
            if (virus == '1') {
                $('.shutter').hide();
            } else {
                $('.shutter').show();
                $('.chunks').removeClass('active');
            }
            // console.log(virus)
        });
        // 病毒感染点击病因切换是否
        $('.chunks').click(function () {
            // console.log($(this))
            $("input[name=virus][value='0']").removeAttr("checked");
            $("input[name=virus][value='1']").prop("checked", true);
            form.render()
        })
        //  输入怀孕次数自动生成表格
        var tempPregnancyNum = 0;
        form.on('select(pregnancyNum)', function (data) {
            var vaule = $('.pregnancyNum option:selected').attr('value')
            var i = tempPregnancyNum * 1;
            if (tempPregnancyNum - vaule > 0) {
                while (i - vaule > 0) {
                    var tempDegree = "." + "degree" + i;
                    var tempTR = $(tempDegree);
                    var tempTRId = tempTR.attr("name");
                    if (tempTRId != "") {
                        deleteHistory.push(tempTRId);
                    }
                    tempTR.remove();
                    i--;
                }
                tempPregnancyNum = vaule;
                return;
            }
            var _html
            for (i; i < vaule; i++) {
                var degree = i + 1;
                var tempDegree = "degree" + degree;
                _html += " <tr name = ''  class = " + tempDegree + " number = " + degree + ">\
                                <td class='number inputWire'>"+ degree + "\
                                </td>\
                                <td class = 'ageOfMenarche '> \
                                </td>\
                                <td class = 'productionDate inputWire' > \
                                </td>\
                                <td class='productionOfAge inputWire'>\
                                </td>\
                                <td class='productionAbortion'>\
                                </td>\
                                <td class='babySex'>\
                                </td>\
                                <td class='babyHealthType'>\
                                </td>\
                                <td class='inputWire'>\
                                <input type='text'  placeholder='无' class = 'remarks'>\
                                </td>\
                                </tr>";

            }
            $(".kang").append(_html);
            tempPregnancyNum = vaule;
        });
    });

    /* --------------------所有输入框校验star--------------------- */
    // 验证孕妇基本信息中文名字
    $('.pregnantName').blur(function () {
        if ($('.pregnantName').val().length == 0) { } else if (!RegExpObj.Reg_Name.test($('.pregnantName').val())) {
            $(this).siblings('.errorIon').show();
            $(this).siblings('.redFont').show();
        } else {
            $(this).siblings('.errorIon').hide();
            $(this).siblings('.redFont').hide();
        }
    }).focus(function () {
        $(this).siblings('.errorIon').hide();
        $(this).siblings('.redFont').hide();
    });
    // 验证孕妇基本信息就诊卡号
    $('.pregnantFN').blur(function () {
        if ($('.pregnantFN').val().length == 0) {

        } else if (!RegExpObj.Reg_figure.test($('.pregnantFN').val())) {
            $(this).siblings('.errorIon').show();
            $(this).siblings('.redFont').show();
        } else {
            $(this).siblings('.errorIon').hide();
            $(this).siblings('.redFont').hide();
        }
    }).focus(function () {
        $(this).siblings('.errorIon').hide();
        $(this).siblings('.redFont').hide();
    });
    // 验证孕妇基本信息身份证号
    $('.pregnantIdCard').blur(function () {
        if ($('.pregnantIdCard').val().length == 0) { } else if (!RegExpObj.Reg_IDCardNo.test($('.pregnantIdCard').val())) {
            $(this).siblings('.errorIon').show();
            $(this).siblings('.redFont').show();
        } else {
            $(this).siblings('.errorIon').hide();
            $(this).siblings('.redFont').hide();
            discriCard($(this).val());
        }
    }).focus(function () {
        $(this).siblings('.errorIon').hide();
        $(this).siblings('.redFont').hide();
    });
    // 验证孕妇基本信息手机号
    $('.pregnantPhone').blur(function () {
        if ($('.pregnantPhone').val().length == 0) { } else if (!RegExpObj.Reg_TelNo.test($('.pregnantPhone').val())) {
            $(this).siblings('.errorIon').show();
            $(this).siblings('.redFont').show();
        } else {
            $(this).siblings('.errorIon').hide();
            $(this).siblings('.redFont').hide();
        }
    }).focus(function () {
        $(this).siblings('.errorIon').hide();
        $(this).siblings('.redFont').hide();
    });
    // 验证孕妇基本信息结婚年龄
    $('.pregnantMarriageAge').blur(function () {
        if ($('.pregnantMarriageAge').val().length == 0) { } else if (!RegExpObj.Reg_figure.test($('.pregnantMarriageAge').val())) {
            $(this).siblings('.redFont').show();
        } else {
            $(this).siblings('.redFont').hide();
        }
    }).focus(function () {
        $(this).siblings('.redFont').hide();
    });
    // 验证孕妇基本信息孕前体重
    $('.pregnantWeight').blur(function () {
        if ($('.pregnantWeight').val().length == 0) { } else if (!RegExpObj.Reg_figure.test($('.pregnantWeight').val())) {
            $(this).siblings('.redFont').show();
        } else {
            $(this).siblings('.redFont').hide();
        }
    }).focus(function () {
        $(this).siblings('.redFont').hide();
    });
    // 验证配偶信息中文名字
    $('.spouseName').blur(function () {
        if ($('.spouseName').val().length == 0) { } else if (!RegExpObj.Reg_Name.test($('.spouseName').val())) {
            $(this).siblings('.errorIon').show();
            $(this).siblings('.redFont').show();
        } else {
            $(this).siblings('.errorIon').hide();
            $(this).siblings('.redFont').hide();
        }
    }).focus(function () {
        $(this).siblings('.errorIon').hide();
        $(this).siblings('.redFont').hide();
    });
    // 验证配偶信息身份证号
    $('.spouseIdCard').blur(function () {
        if ($('.spouseIdCard').val().length == 0) { } else if (!RegExpObj.Reg_IDCardNo.test($('.spouseIdCard').val())) {
            $(this).siblings('.errorIon').show();
            $(this).siblings('.redFont').show();
        } else {
            $(this).siblings('.errorIon').hide();
            $(this).siblings('.redFont').hide();
            mateCard($(this).val());
        }
    }).focus(function () {
        $(this).siblings('.errorIon').hide();
        $(this).siblings('.redFont').hide();

    });
    // 验证配偶信息手机号
    $('.spousePhone').blur(function () {
        if ($('.spousePhone').val().length == 0) { } else if (!RegExpObj.Reg_TelNo.test($('.spousePhone').val())) {
            $(this).siblings('.errorIon').show();
            $(this).siblings('.redFont').show();
        } else {
            $(this).siblings('.errorIon').hide();
            $(this).siblings('.redFont').hide();
        }
    }).focus(function () {
        $(this).siblings('.errorIon').hide();
        $(this).siblings('.redFont').hide();
    });
    // 验证配偶信息结婚年龄
    $('.spouseMarriageAge').blur(function () {
        if ($('.spouseMarriageAge').val().length == 0) { } else if (!RegExpObj.Reg_figure.test($('.spouseMarriageAge').val())) {
            $(this).siblings('.redFont').show();
        } else {
            $(this).siblings('.redFont').hide();
        }
    }).focus(function () {
        $(this).siblings('.redFont').hide();
    });
    // 验证配偶信息孕前体重
    $('.spouseAge').blur(function () {
        if ($('.spouseAge').val().length == 0) { } else if (!RegExpObj.Reg_figure.test($('.spouseAge').val())) {
            $(this).siblings('.redFont').show();
        } else {
            $(this).siblings('.redFont').hide();
        }
    }).focus(function () {
        $(this).siblings('.redFont').hide();
    });
    //体格检查 -血压 -高压
    $('.hyperpiesia').blur(function () {
        if ($('.hyperpiesia').val().length == 0) { } else if ($('.hyperpiesia').val() < 0 || $('.hyperpiesia').val() > 300) {
            layer.msg('高压取值范围 0 ~ 300， 请修改');
            $(this).addClass('borderColor');
        } else if (parseInt($('.lowTension').val()) > parseInt($('.hyperpiesia').val())) {
            layer.msg('低压不能大于高压')
            $(this).addClass('borderColor');
        }  else {
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
    //体格检查 -身高
    $('.height').blur(function () {
        if ($('.height').val().length == 0) { } else if ($('.height').val() < 130 || $('.height').val() > 200) {
            layer.msg('身高取值范围 130 ~ 200， 请修改')
            $(this).addClass('borderColor');
        } else {
            $(this).removeClass('borderColor');
        }
    }).focus(function () {
        $(this).removeClass('borderColor');
    });
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
    //体格检查 -宫高
    $('.obstetricsHeight').blur(function () {
        if ($('.obstetricsHeight').val().length == 0) { } else if ($('.obstetricsHeight').val() < 16 || $('.obstetricsHeight').val() > 40) {
            layer.msg('宫高取值范围 16 ~ 40， 请修改')
            $(this).addClass('borderColor');
        } else {
            $(this).removeClass('borderColor');
        }
    }).focus(function () {
        $(this).removeClass('borderColor');
    });
    //体格检查 -腹围
    $('.obstetricsAbdominalGirth').blur(function () {
        if ($('.obstetricsAbdominalGirth').val() < 50 || $('.obstetricsAbdominalGirth').val() > 100) {
            layer.msg('腹围取值范围 50 ~ 100， 请修改')
            $(this).addClass('borderColor');
        } else {
            $(this).removeClass('borderColor');
        }
    }).focus(function () {
        $(this).removeClass('borderColor');
    });
    //体格检查 -血红蛋白
    $('.assayHemoglobin').blur(function () {
        if ($('.assayHemoglobin').val() < 80 || $('.assayHemoglobin').val() > 200) {
            layer.msg('血红蛋白取值范围 80 ~ 200， 请修改')
            $(this).addClass('borderColor');
        } else {
            $(this).removeClass('borderColor');
        }
    }).focus(function () {
        $(this).removeClass('borderColor');
    });
    //体格检查 -胎心率
    $('.obstetricsFetalHeart').blur(function () {
        if ($('.obstetricsFetalHeart').val() < 90 || $('.obstetricsFetalHeart').val() > 200) {
            layer.msg('胎心率取值范围 90 ~ 200， 请修改')
            $(this).addClass('borderColor');
        } else {
            $(this).removeClass('borderColor');
        }
    }).focus(function () {
        $(this).removeClass('borderColor');
    });
        /* --------------------所有输入框校验end--------------------- */

    /* ***************************配偶信息家族史查询star************************* */
    $('.inquire').on('input', function (e) {
        familyHistoryLocation($('.inquire').val(),
            function responseDet(repDataArr) {
                var _html = '';
                if (repDataArr == null || repDataArr.length == 0) {
                    $('.hideBox').hide();
                } else {
                    for (var i = 0; i < repDataArr.length; i++) {
                        _html += '<li name="' + repDataArr[i] + '">' + repDataArr[i] + '</li>'
                    }
                    $('.hideBox').show().html(_html);
                }
            },
            function responseErr(params) {
                layer.msg('操作失败，请稍后重试');
            });
    });
    $('.hideBox').on('click', 'li', function () {
        var str = $(this).attr('name');
        var patientHistoryNum = '';
        for (var i = 0; i < $('.patientHistory').length; i++) {
           
            patientHistoryNum += $('.patientHistory').eq(i).text() + '、';
            if (patientHistoryNum.indexOf(str) !== -1) {
               layer.msg('请勿重复选择')
                $('.hideBox').hide();
                $('.inquire').val('');
               return false;
            }
        }
        var _html = '<div>\
            <span class="patientHistory">'+ $(this).attr('name') + '</span>\
                <i class="deteleIcon"></i>\
                </div>';
        $('.spouse_box3_bottom .disease').append(_html);
        $('.hideBox').hide();
        $('.inquire').val('');
    });
    // 家族史点击叉号删除块
    $('.disease').on('click', '.deteleIcon', function () {
        $(this).parent('div').remove();
    });
    /* ***************************配偶信息家族史查询end************************* */

    /* *******************************孕产信息接触毒物Star************************ */
    $('.contactToxicName').on('input', function (e) {
        HttpRequstForPost(httpUrl.poisonTemplate, 'json', {
            'paramDetails': $('.contactToxicName').val(),
            "token": token,
        }, function sucFn(data) {
            if (data.status == 20200) {
                var arr = data.padPoisonTemplateBeanList;
                var _html = '';
                for (var i = 0; i < arr.length; i++) {
                    _html += '<li name="' + arr[i].classGrade + '">' + arr[i].name + '</li>'
                }
                $('.touchBox').show().html(_html);
            } else if (data.status == 20250) {
                window.location = '/maternal-ipad/login/login.html';
            } else if (data.status == 20207) {
                layer.msg('操作失败，请稍后重试');
            } else {
                $('.touchBox').hide();
            }
        },
            function errfn(err) {
                layer.msg('操作失败，请稍后重试');
                layer.msg('操作失败');
            });
    });

    $('.touchBox').on('click', 'li', function () {
         var str = $(this).html();
        var paramDetailsNum = '';
        for (var i = 0; i < $('.contactPoison').length; i++) {
            paramDetailsNum += $('.contactPoison').eq(i).text() + '++';
            if (paramDetailsNum.indexOf(str) !== -1) {
                layer.msg('请勿重复选择')
                $('.touchBox').hide();
                $('.contactToxicName').val('');
                return false;
            }
        }
        var _html = '<div>\
            <span class="contactPoison">'+ $(this).html() + '</span>\
                <i class="deteleIcon"></i>\
                </div>';
        $('.touchdisease').append(_html);
        $('.touchBox').hide();
        $('.contactToxicName').val('');
    });
    // 接触毒物点击叉号删除块
    $('.touchdisease').on('click', '.deteleIcon', function () {
        $(this).parent('div').remove();
    });
    /* *******************************孕产信息接触毒物end************************ */
    /* ***************************孕产信息家族史star************************* */
    $('.recordInquire').on('input', function (e) {
        familyHistoryLocation($('.recordInquire').val(),
            function responseDet(repDataArr) {
                if (repDataArr == null || repDataArr.length == 0) {
                    $('.recordhideBox').hide()
                } else {
                    var _html = '';
                    for (var i = 0; i < repDataArr.length; i++) {
                        _html += '<li name="' + repDataArr[i] + '">' + repDataArr[i] + '</li>'
                    }
                    $('.recordhideBox').show().html(_html);
                }
            },
            function responseErr(params) {
                layer.msg('操作失败，请稍后重试');
            });
    });

    $('.recordhideBox').on('click', 'li', function () {
        var str = $(this).html();
        var recordPatientHistoryNum = '';
        for (var i = 0; i < $('.recordPatientHistory').length; i++) {
            recordPatientHistoryNum += $('.recordPatientHistory').eq(i).text() + '++';
            if (recordPatientHistoryNum.indexOf(str) !== -1) {
                layer.msg('请勿重复选择')
                $('.recordhideBox').hide();
                $('.recordInquire').val('');
                return false;
            }
        }
        var _html = '<div>\
            <span class="recordPatientHistory">'+ $(this).attr('name') + '</span>\
                <i class="deteleIcon"></i>\
                </div>';
        $('.recordBox4_3 .disease').append(_html);
        $('.recordhideBox').hide();
        $('.recordInquire').val('');
    });
    // 家族史点击叉号删除块
    $('.disease').on('click', '.deteleIcon', function () {
        $(this).parent('div').remove();
    });
    /* *********************孕产信息家族史end******************************************** */
    /* ********************孕产信息现病史stat********************************************* */
    $('.presentrecordInquire').on('input', function (e) {
        familyHistoryLocation($('.presentrecordInquire').val(),
            function responseDet(repDataArr) {
                if (repDataArr == null || repDataArr.length == 0) {
                    $('.presentrecordhideBox').hide();
                } else {
                    var _html = '';
                    for (var i = 0; i < repDataArr.length; i++) {
                        _html += '<li name="' + repDataArr[i] + '">' + repDataArr[i] + '</li>'
                    }
                    $('.presentrecordhideBox').show().html(_html);
                }
            },
            function responseErr(params) {
                layer.msg('操作失败，请稍后重试');
            });


    });
    $('.presentrecordhideBox').on('click', 'li', function () {
        var str = $(this).html();
        var presentIllnessNum = '';
        for (var i = 0; i < $('.presentIllness').length; i++) {
            presentIllnessNum += $('.presentIllness').eq(i).text() + '++';
            if (presentIllnessNum.indexOf(str) !== -1) {
                layer.msg('请勿重复选择')
                $('.presentrecordhideBox').hide();
                $('.presentrecordInquire').val('');
                return false;
            }
        }
        var _html = '<div>\
            <span class="presentIllness">'+ $(this).attr('name') + '</span>\
                <i class="deteleIcon"></i>\
                </div>';
        $('.recordBox4_4 .presentdisease').append(_html);
        $('.presentrecordhideBox').hide();
        $('.presentrecordInquire').val('');
    });
    // 家族史点击叉号删除块
    $('.presentdisease').on('click', '.deteleIcon', function () {
        $(this).parent('div').remove();
    });
    /* ***************************孕产信息家族史end************************* */

    /* ***************孕妇基本信息部分开始**************************** */

    // 民族下拉框
    var nationHtml = '';
    for (var key in nationality) {
        nationHtml += "<option value='" + nationality[key].name + "'>" + nationality[key].name + "</option>";
    }
    $('.nation').html(nationHtml)
    layui.use('form', function () {
        var form = layui.form;
        form.render();
    });

    // 户口所在地
    // 地区选择-start
    $(".areaSelect").click(function () {
        var example = new IosSelect(3, [iosProvinces, iosCitys, iosCountys], {
            title: '地址选择省市县',
            headerHeight: 2, // 组件标题栏高度
            itemHeight: 2, // 每个元素的高度
            itemShowCount: 5, // 每一列显示元素个数，超出将隐藏
            cssUnit: 'rem',
            relation: [1, 1],
            addClassName: 'selectStyle', // 选择器样式订制
            oneLevelId: $(".areaInput").attr('selectOneObjId'),
            twoLevelId: $(".areaInput").attr('selectTwoObjId'),
            threeLevelId: $(".areaInput").attr('selectThreeObjId'),
            callback: function (selectOneObj, selectTwoObj, selectThreeObj) {
                $(".areaInput").val(selectOneObj.value + selectTwoObj.value + selectThreeObj.value);
                $(".areaInput").attr({
                    'selectOneObj': selectOneObj.value,
                    'selectTwoObj': selectTwoObj.value,
                    'selectThreeObj': selectThreeObj.value,
                    'selectOneObjId': selectOneObj.id,
                    'selectTwoObjId': selectTwoObj.id,
                    'selectThreeObjId': selectThreeObj.id
                })
            }
        });
    })
    // 地区选择-end

    // 现住址
    // 地区选择-start
    $(".residenceAddress").click(function () {
        var example = new IosSelect(3, [iosProvinces, iosCitys, iosCountys], {
            title: '地址选择省市县',
            headerHeight: 2, // 组件标题栏高度
            itemHeight: 2, // 每个元素的高度
            itemShowCount: 5, // 每一列显示元素个数，超出将隐藏
            cssUnit: 'rem',
            relation: [1, 1],
            addClassName: 'selectStyle', // 选择器样式订制
            oneLevelId: $(".areaInput2").attr('selectOneObjId'),
            twoLevelId: $(".areaInput2").attr('selectTwoObjId'),
            threeLevelId: $(".areaInput2").attr('selectThreeObjId'),
            callback: function (selectOneObj, selectTwoObj, selectThreeObj) {
                $(".areaInput2").val(selectOneObj.value + selectTwoObj.value + selectThreeObj.value)
                $(".areaInput2").attr({
                    'selectOneObj': selectOneObj.value,
                    'selectTwoObj': selectTwoObj.value,
                    'selectThreeObj': selectThreeObj.value,
                    'selectOneObjId': selectOneObj.id,
                    'selectTwoObjId': selectTwoObj.id,
                    'selectThreeObjId': selectThreeObj.id

                })
            }
        });
    })
    // 地区选择-end

    /* ***********************************************孕妇基本信息 star*************************************************************/
    //  孕妇基本信息-新增 v1/web/pad/patientCheck/insertForFiling
    $('.nextStep1').click(function () {
        // 校验
        //孕妇姓名
        if ($('.pregnantName').val().length == 0) {
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请输入孕妇姓名');
            $('html,body').addClass('noscroll');
        } else if (!RegExpObj.Reg_Name.test($('.pregnantName').val())) {
            $('.pregnantName').siblings('.errorIon').show();
            $('.pregnantName').siblings('.redFont').show();
        } else if ($('.pregnantFN').val().length == 0) { // 就诊卡号
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请输入就诊卡号');
            $('html,body').addClass('noscroll');
        } else if (!RegExpObj.Reg_figure.test($('.pregnantFN').val())) {
            $('.pregnantFN').siblings('.errorIon').show();
            $('.pregnantFN').siblings('.redFont').show();
        } else if ($('.pregnantIdCard').val().length == 0) { //身份证号
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请输入身份证号');
            $('html,body').addClass('noscroll');
        } else if (!RegExpObj.Reg_IDCardNo.test($('.pregnantIdCard').val())) {
            $('.pregnantIdCard').siblings('.errorIon').show();
            $('.pregnantIdCard').siblings('.redFont').show();
        } else if ($('.pregnantPhone').val().length == 0) { //手机号
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请输入手机号');
            $('html,body').addClass('noscroll');
        } else if (!RegExpObj.Reg_TelNo.test($('.pregnantPhone').val())) {
            $('.pregnantPhone').siblings('.errorIon').show();
            $('.pregnantPhone').siblings('.redFont').show();
        } else if (!$('#test1').val()) { //出生年月
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请选择出生年月');
            $('html,body').addClass('noscroll');
        } else if ($('.pregnantMarriageAge').val().length == 0) { //结婚年龄
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请输入结婚年龄');
            $('html,body').addClass('noscroll');
        } else if (!RegExpObj.Reg_figure.test($('.pregnantMarriageAge').val())) {
            $('.pregnantMarriageAge').siblings('.redFont').show();
        } else if ($('.pregnantWeight').val().length == 0) { //孕前体重
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请输入孕前体重');
            $('html,body').addClass('noscroll');
        } else if ($('.pregnantWeight').val() < 30 || $('.pregnantWeight').val() > 200) { //体重取值范围
            layer.msg('体重取值范围 30 ~ 200， 请修改')
        } else if (!RegExpObj.Reg_figure.test($('.pregnantWeight').val())) {
            $('.pregnantWeight').siblings('.redFont').show();
        } else if ($('.work').val().length == 0) { //工作单位名称
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请输入工作单位名称');
            $('html,body').addClass('noscroll');
        } else if ($('.areaInput').val().length == 0) { //户口所在地
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请选择户口所在地');
            $('html,body').addClass('noscroll');
        } else if ($('.areaInput2').val().length == 0) { //现住地址
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请选择现住地址');
            $('html,body').addClass('noscroll');
        } else if ($('.presentAddress').val().length == 0) { //现住地址详细地址
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请输入现住详情地址');
            $('html,body').addClass('noscroll');
        } else {
            var sex = 1;
            if ($('.birth_sex') == '女') {
                sex = 1;
            } else {
                sex = 2;
            }
            // var msg = layer.msg('处理中，请稍候', {
            //     icon: 16,
            //     shade: 0.4,
            //     time: false //取消自动关闭
            // });
            // 判断是否存在 id 如果不存在是新增接口
            if (!$('.pregnantName').attr('id')) {
                HttpRequstForPost(httpUrl.insertForFiling, 'json', {
                    "name": $('.pregnantName').val(),
                    "number": $('.pregnantFN').val(),
                    "idCardType": $('.idCardType option:selected').attr('value'),
                    "idCard": $('.pregnantIdCard').val(),
                    "telephone": $('.pregnantPhone').val(),
                    "birthdayDate": $('.pregnantDateBirth').val(),
                    "age": $('.birth_age').html(),
                    "sex": sex, //性别
                    "education": $('.education option:selected').attr('value'), //教育程度
                    "marryAge": $('.pregnantMarriageAge').val(),
                    "nation": $('.nation option:selected').attr('value'), //民族
                    "lastWeight": $('.pregnantWeight').val(),
                    "contraception": $('.contraception option:selected').attr('value'), //避孕
                    "job": $('.job option:selected').attr('value'), //工作
                    "marryType": $('.marryType option:selected').attr('value'),
                    "marryCheck": $('.marryCheck option:selected').attr('value'), //婚检
                    "jobCompanyName": $('.work').val(),
                    "idCardAddressProvince": $(".areaInput").attr('selectOneObj'), //户口所在地-省
                    "idCardAddressCity": $(".areaInput").attr('selectTwoObj'), //户口所在地-市
                    "idCardAddressCounty": $(".areaInput").attr('selectThreeObj'), //户口所在地-县
                    "newAddressProvince": $(".areaInput2").attr('selectOneObj'), //现住址-省
                    "newAddressCity": $(".areaInput2").attr('selectTwoObj'), //现住址-市
                    'newAddressCounty': $('.areaInput2').attr('selectThreeObj'), //现住址-县
                    "newAddressRemarks": $('.presentAddress').val(), //现住址-其他
                    "token": token,
                }, function sucFn(data) {
                    if (data.status == 20200) {
                        $('.womenInformationLi1').attr('womenidentifying', '1'); //孕妇标识
                        centerId = data.id;
                        $('.pregnantName').attr('id', data.checkId);
                        $('.spouse').addClass('layui-show');
                        $('.essential').removeClass('layui-show');
                        $('.womenInformationLi1').removeClass('layui-this');
                        $('.womenInformationLi2').addClass('layui-this');
                        $('.nextStep1').hide();
                        $('.nextStepOne').show();
                        $('.spouseSite').val($('.presentAddress').val());
                        $('.areaInput3').val($('.areaInput2').val());
                        $('.areaInput3').attr('selectOneObj', $('.areaInput2').attr('selectOneObj'));
                        $('.areaInput3').attr('selectTwoObj', $('.areaInput2').attr('selectTwoObj'));
                        $('.areaInput3').attr('selectThreeObj', $('.areaInput2').attr('selectThreeObj'));
                    } else if (data.status == 20250) {
                        window.location = '/maternal-ipad/login/login.html';
                    } else if (data.status == 20207) {
                        layer.msg('操作失败，请稍后重试');
                    } else {

                    }
                },
                    function errfn(err) {

                    });
            } else {
                // 如果存在 是修改接口
                HttpRequstForPost(httpUrl.updateForFiling, 'json', {
                    "patientCenterId": centerId, //配偶id
                    "id": $('.pregnantName').attr('id'), //基本信息id
                    "name": $('.pregnantName').val(),
                    // "number": $('.pregnantFN').val(),
                    "idCardType": $('.idCardType option:selected').attr('value'),
                    "idCard": $('.pregnantIdCard').val(),
                    "telephone": $('.pregnantPhone').val(),
                    "birthdayDate": $('.pregnantDateBirth').val(),
                    "age": $('.birth_age').html(),
                    "sex": sex, //性别
                    "education": $('.education option:selected').attr('value'), //教育程度
                    "marryAge": $('.pregnantMarriageAge').val(),
                    "nation": $('.nation option:selected').attr('value'), //民族
                    "lastWeight": $('.pregnantWeight').val(),
                    "contraception": $('.contraception option:selected').attr('value'), //避孕
                    "job": $('.job option:selected').attr('value'), //工作
                    "marryType": $('.marryType option:selected').attr('value'),
                    "marryCheck": $('.marryCheck option:selected').attr('value'), //婚检
                    "jobCompanyName": $('.work').val(),
                    "idCardAddressProvince": $(".areaInput").attr('selectOneObj'), //户口所在地-省
                    "idCardAddressCity": $(".areaInput").attr('selectTwoObj'), //户口所在地-市
                    "idCardAddressCounty": $(".areaInput").attr('selectThreeObj'), //户口所在地-县
                    "newAddressProvince": $(".areaInput2").attr('selectOneObj'), //现住址-省
                    "newAddressCity": $(".areaInput2").attr('selectTwoObj'), //现住址-市
                    'newAddressCounty': $('.areaInput2').attr('selectThreeObj'), //现住址-县
                    "newAddressRemarks": $('.presentAddress').val(), //现住址-其他
                    "token": token,
                }, function sucFn(data) {
                    if (data.status == 20200) {
                        $('.spouse').addClass('layui-show');
                        $('.essential').removeClass('layui-show');
                        $('.womenInformationLi1').removeClass('layui-this');
                        $('.womenInformationLi2').addClass('layui-this');
                        $('.nextStep1').hide();
                        $('.nextStepOne').show();
                        $('.womenInformationLi1').attr('womenidentifying', '1'); //孕妇标识
                        $('.spouseSite').val($('.presentAddress').val());
                        $('.areaInput3').val($('.areaInput2').val());
                        $('.areaInput3').val($('.areaInput2').val());
                        $('.areaInput3').attr('selectOneObj', $('.areaInput2').attr('selectOneObj'));
                        $('.areaInput3').attr('selectTwoObj', $('.areaInput2').attr('selectTwoObj'));
                        $('.areaInput3').attr('selectThreeObj', $('.areaInput2').attr('selectThreeObj'));
                    } else if (data.status == 20207) {
                        layer.msg('操作失败，请稍后重试');
                    } else if (data.status == 20250) {
                        window.location = '/maternal-ipad/login/login.html';
                    } else {

                    }
                },
                    function errfn(err) {
                    });
            };
        }
    });
    /* ***********************孕妇基本信息结束********************************** */

    /* **********************配偶一般信息开始************************************** */

    // 现住址
    // 现住址
    // 地区选择-start
    $(".spouseResidenceAddress").click(function () {
        var example = new IosSelect(3, [iosProvinces, iosCitys, iosCountys], {
            title: '地址选择省市县',
            headerHeight: 2, // 组件标题栏高度
            itemHeight: 2, // 每个元素的高度
            itemShowCount: 5, // 每一列显示元素个数，超出将隐藏
            cssUnit: 'rem',
            relation: [1, 1],
            addClassName: 'selectStyle', // 选择器样式订制
            oneLevelId: iosProvinces[0].id,
            oneLevelId: $(".areaInput3").attr('selectOneObjId'),
            twoLevelId: $(".areaInput3").attr('selectTwoObjId'),
            threeLevelId: $(".areaInput3").attr('selectThreeObjId'),
            callback: function (selectOneObj, selectTwoObj, selectThreeObj) {
                $(".areaInput3").val(selectOneObj.value + selectTwoObj.value + selectThreeObj.value)
                $(".areaInput3").attr({
                    'selectOneObj': selectOneObj.value,
                    'selectTwoObj': selectTwoObj.value,
                    'selectThreeObj': selectThreeObj.value,
                    'selectOneObjId': selectOneObj.id,
                    'selectTwoObjId': selectTwoObj.id,
                    'selectThreeObjId': selectThreeObj.id
                })
            }
        });
    })
    $('.nextStepOne').click(function () {
        if ($('.womenInformationLi1').attr('womenidentifying') == 0) {
            layer.msg('请完善孕妇基本信息');
            return false;
        }
        //   吸烟 如果输入框不可编辑传0 如果可编辑传输入的值
        if ($('.cigaretteNUm').hasClass('bgcC')) {
            smokingRadio = 0;
        } else {
            smokingRadio = $('.cigaretteNUm').val();
        }
        // 家族史整理数据
        var patientHistory = '';
        if ($('.inquire').hasClass('bgcC')) {
            patientHistory = '';
        } else {
            for (var i = 0; i < $('.patientHistory').length; i++) {
                patientHistory += $('.patientHistory').eq(i).text() + '、';
            }
        }
        // console.log(patientHistory)
        if ($('.spouseName').val().length == 0) { //配偶姓名
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请输入配偶姓名');
            $('html,body').addClass('noscroll');
        } else if ($('.spousePhone').val().length == 0) { // 验证配偶信息手机号
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请输入手机号');
            $('html,body').addClass('noscroll');
        } else if (!RegExpObj.Reg_Name.test($('.spouseName').val())) {
            $(this).siblings('.errorIon').show();
            $(this).siblings('.redFont').show();
        } else if ($('.spouseIdCard').val().length == 0) { // 验证配偶信息身份证号
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请输入身份证号');
            $('html,body').addClass('noscroll');
        } else if (!RegExpObj.Reg_IDCardNo.test($('.spouseIdCard').val())) {
            $(this).siblings('.errorIon').show();
            $(this).siblings('.redFont').show();
        } else if (!RegExpObj.Reg_TelNo.test($('.spousePhone').val())) {
            $(this).siblings('.errorIon').show();
            $(this).siblings('.redFont').show();
        } else if ($('.spouseMarriageAge').val().length == 0) { // 验证配偶信息结婚年龄
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请输入结婚年龄');
            $('html,body').addClass('noscroll');
        } else if (!RegExpObj.Reg_figure.test($('.spouseMarriageAge').val())) {
            $(this).siblings('.redFont').show();
        } else if ($('.spouseAge').val().length == 0) { //配偶年龄
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请输入配偶年龄');
            $('html,body').addClass('noscroll');
        } else if (!RegExpObj.Reg_figure.test($('.spouseAge').val())) {
            $(this).siblings('.redFont').show();
        } else if ($('.cigaretteNUm').hasClass("bgcF") && $('.cigaretteNUm').val().length == 0) { //吸烟数量
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请输入吸烟数量/日');
            $('html,body').addClass('noscroll');
        } else if ($('.inquire').hasClass("bgcF") == true && patientHistory == '') { //家族史
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请选择家族史');
            $('html,body').addClass('noscroll');
        } else if ($('.areaInput3').val().length == 0) { //现住地址
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请选择现住地址');
            $('html,body').addClass('noscroll');
        } else if ($('.spouseSite').val().length == 0) { //现住地址详细地址
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请输入现住详情地址');
            $('html,body').addClass('noscroll');
        } else {
            //   不存在返回的id 调新增接口
            if (!$('.spouseName').attr('id')) {
                HttpRequstForPost(httpUrl.spouseInsertForFiling, 'json', {
                    "patientCenterId": centerId, //配偶id
                    "name": $('.spouseName').val(),
                    "idCardType": $('.spouseIdCardType option:selected').attr('value'), //证件类型
                    "idCard": $('.spouseIdCard').val(),
                    "age": $('.spouseAge').val(), //配偶年龄
                    "telephone": $('.spousePhone').val(),
                    "healthType": $('.healthType option:selected').attr('value'), //健康状况
                    "education": $('.spouseEducation option:selected').attr('value'), //教育程度
                    "job": $('.spouseJob option:selected').attr('value'), //工作
                    "marryAge": $('.spouseMarriageAge').val(), //结婚年龄
                    "marryType": $('.spouseMarryType option:selected').attr('value'), //婚姻状况
                    "marryCheck": $('.spouseMarryCheck option:selected').attr('value'), //婚检
                    "smoke": smokingRadio, //吸烟
                    "drink": $('.spouse_box3_top input[name="drink"]:checked').attr('value'), //喝酒
                    "patientHistory": patientHistory, //家族史
                    "newAddressProvince": $(".areaInput3").attr('selectoneobj'), //现住址-省
                    "newAddressCity": $(".areaInput3").attr('selectTwoObj'), //现住址-市
                    'newAddressCounty': $(".areaInput3").attr('selectThreeObj'), //现住址-区
                    "newAddressRemarks": $('.spouseSite').val(), //现住址-其他
                    "token": token,
                }, function sucFn(data) {
                    if (data.status == 20200) {
                        $('.spouseName').attr('id', data.id);
                        $('.womenInformation').hide();
                        $('.newRecord').show();
                        $('.newRecordLi').children('span').addClass('active').parent().siblings().children('span').removeClass('active');;
                        $('.newRecordLi').children('.icon2').show().parent().siblings().find('.icon2').hide();
                        $(".iocn").css("top", 1 * 3 + 1 + "rem");
                        $('.management').html('初诊记录');
                        $('.womenInformationLi2 ').attr('spouseidentifying', '1');
                    } else if (data.status == 20207) {
                        layer.msg('操作失败，请稍后重试');
                    } else if (data.status == 20250) {
                        window.location = '/maternal-ipad/login/login.html';
                    } else {

                    }
                },
                    function errfn(err) {
                    });
            } else {
                HttpRequstForPost(httpUrl.SpouseInformationModification, 'json', {
                    "patientCenterId": centerId, //配偶id
                    "id": $('.spouseName').attr('id'), //配偶id
                    "name": $('.spouseName').val(),
                    "idCardType": $('.spouseIdCardType option:selected').attr('value'), //证件类型
                    "idCard": $('.spouseIdCard').val(),
                    "age": $('.spouseAge').val(), //配偶年龄
                    "telephone": $('.spousePhone').val(),
                    "healthType": $('.healthType option:selected').attr('value'), //健康状况
                    "education": $('.spouseEducation option:selected').attr('value'), //教育程度
                    "job": $('.spouseJob option:selected').attr('value'), //工作
                    "marryAge": $('.spouseMarriageAge').val(), //结婚年龄
                    "marryType": $('.spouseMarryType option:selected').attr('value'), //婚姻状况
                    "marryCheck": $('.spouseMarryCheck option:selected').attr('value'), //婚检
                    "smoke": smokingRadio, //吸烟
                    "drink": $('.spouse_box3_top input[name="drink"]:checked').attr('value'), //喝酒
                    "patientHistory": patientHistory, //家族史
                    "newAddressProvince": $(".areaInput3").attr('selectOneObj'), //现住址-省
                    "newAddressCity": $(".areaInput3").attr('selectTwoObj'), //现住址-市
                    'newAddressCounty': $(".areaInput3").attr('selectThreeObj'), //现住址-区
                    "newAddressRemarks": $('.spouseSite').val(), //现住址-其他
                    "token": token,
                }, function sucFn(data) {
                    if (data.status == 20200) {
                        $('.womenInformation').hide();
                        $('.newRecord').show();
                        $('.newRecordLi').children('span').addClass('active').parent().siblings().children('span').removeClass('active');;
                        $('.newRecordLi').children('.icon2').show().parent().siblings().find('.icon2').hide();
                        $(".iocn").css("top", 1 * 3 + 1 + "rem");
                        $('.management').html('初诊记录');
                        $('.womenInformationLi2 ').attr('spouseidentifying', '1');
                    } else if (data.status == 20207) {
                        layer.msg('操作失败，请稍后重试');
                    } else if (data.status == 20250) {
                        window.location = '/maternal-ipad/login/login.html';
                    } else {

                    }
                },
                    function errfn(err) {
                    });
            }
        }

    });
    /* *********************配偶一般信息信息结束********************************** */

    /* ******************************孕产信息开始********************************************* */
    /******* 孕产信息的静态表格结束 ***********/

    //   病毒感染的div点击变色
    $('.chunks').click(function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');

        } else {
            $(this).addClass('active');
        }
    });
    // 孕检信息下一步按钮
    $('.nextStep2').click(function () {
        // if ($('.womenInformationLi1').attr('womenidentifying') == 0) {
        //     layer.msg('请完善孕妇基本信息');
        //     return false;
        // } else if ($('.womenInformationLi2').attr('spouseidentifying') == 0) {
        //     layer.msg('请完善配偶一般信息');
        //     return false;
        // }
        //   病毒感染
        var virusInfectionOther = '';
        if ($('.chunks').hasClass('active')) {
            for (var i = 0; i < $('.chunks.active').length; i++) {
                virusInfectionOther += $('.chunks.active').eq(i).text() + '、';
            }
        } else {
            virusInfectionOther = '';
        }
        //     收集接触毒物div内容
        var paramDetails = '';
        if ($('.contactToxicName').hasClass('bgcC')) {
            poison = 0;
            paramDetails = ''
            contactToxicDate = '';
        } else {
            poison = 1;
            for (var i = 0; i < $('.contactPoison').length; i++) {
                paramDetails += $('.contactPoison').eq(i).text() + '++';
                contactToxicDate = $('.contactToxicDate').val();
            }
        }
        //     收集家族史的div内容
        var recordPatientHistory = '';
        if ($('.recordInquire').hasClass('bgcC')) {
            recordPatientHistory = ''
        } else {
            for (var i = 0; i < $('.recordPatientHistory').length; i++) {
                recordPatientHistory += $('.recordPatientHistory').eq(i).text() + '、';
            }
        }
        //     收集现病史div内容
        var presentIllness = '';
        if ($('.presentrecordInquire').hasClass('bgcC')) {
            presentIllness = ''
        } else {
            for (var i = 0; i < $('.presentIllness').length; i++) {
                presentIllness += $('.presentIllness').eq(i).text() + '、';
            }
        }
        //  //   怀孕史静态表格收集数据
        historyListArr.length = 0;
        for (var i = 0; i < $(".kang > tr").length; i++) {
            var ageOfMenarche = ''; //孕周
            if ($(".kang > tr").eq(i).find(".ageOfMenarche").html() == '早产') {
                ageOfMenarche = 0;
            } else if ($(".kang > tr").eq(i).find(".ageOfMenarche").html() == '足月妊娠') {
                ageOfMenarche = 1;
            } else if ($(".kang > tr").eq(i).find(".ageOfMenarche").html() == '过期妊娠') {
                ageOfMenarche = 2;
            } else {
                continue;
            }
            // 分娩方式
            var productionAbortion = '';
            if ($(".kang > tr").eq(i).find(".productionAbortion").html() == '自然') {
                productionAbortion = 0;
            } else if ($(".kang > tr").eq(i).find(".productionAbortion").html() == '剖宫产') {
                productionAbortion = 1;
            } else {
                continue;
            }
            var babySex = '';
            if ($(".kang > tr").eq(i).find(".babySex").html() == '男') {
                babySex = 0;
            } else if ($(".kang > tr").eq(i).find(".babySex").html() == '女') {
                babySex = 1;
            } else {
                continue;
            }
            var babyHealthType = '';
            if ($(".kang > tr").eq(i).find(".babyHealthType").html() == '健康') {
                babyHealthType = 0;
            } else if ($(".kang > tr").eq(i).find(".babyHealthType").html() == '死亡') {
                babyHealthType = 1;
            } else {
                continue;
            }
            var remarks = '';
            if ($(".kang > tr").eq(i).find(".remarks").val() == '') {
                remarks = '无';
            } else {
                remarks = $(".kang > tr").eq(i).find(".remarks").val()

            }
            historyListArr.push({
                "patientCenterId": centerId,
                'number': $(".kang > tr").eq(i).attr('number'),
                'productionDate': $(".kang > tr").eq(i).find(".productionDate").html() + '-' + '00',
                'pregnantType': ageOfMenarche,
                'productionAbortion': productionAbortion,
                'productionOfAge': $(".kang > tr").eq(i).find(".productionOfAge").html(),
                'babySex': babySex,
                'babyHealthType': babyHealthType,
                'remarks': remarks,
                'id': $(".kang > tr").eq(i).attr('name'),
            })
        }
        if (!$('.firstCheckDate').val()) { //初诊日期
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请选择初诊日期');
            $('html,body').addClass('noscroll');
        } else if (!$('.lastMenstruation').val()) { //末次月经
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请选择末次月经');
            $('html,body').addClass('noscroll');
        } else if ($('.newAgeOfMenarche').val().length == 0) { //孕周
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请输入孕周');
            $('html,body').addClass('noscroll');
        } else if ($('.menstrualHistoryAge').val().length == 0) { //初潮
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请输入初潮');
            $('html,body').addClass('noscroll');
        } else if ($('.menstrualHistoryDay').val().length == 0) { //周期
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请输入周期');
            $('html,body').addClass('noscroll');
        } else if (contactRadioactiveRays == '1' && !$('.contactRadioactiveRaysDate').val()) { //接触放射性时间
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请选择接触放射性时间');
            $('html,body').addClass('noscroll');
        } else if (poison == '1' && paramDetails == '') { //接触毒物名称
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请输入接触毒物名称');
            $('html,body').addClass('noscroll');
        } else if (poison == '1' && !$('.contactToxicDate').val()) { //接触毒物名称
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请选择接触毒物时间');
            $('html,body').addClass('noscroll');
        } else if ($('.recordInquire').hasClass("bgcF") && recordPatientHistory == '') { //家族史
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('家族史');
            $('html,body').addClass('noscroll');
        }
        else {

            // 孕产信息   v1/web/pad/patientParturitionDetail/insertForFiling
            // 判断孕产信息没有id 是新增接口
            if (!$('.newRecordLi1').attr('id')) {
                HttpRequstForPost(httpUrl.pregnancyInsertForFiling, 'json', {
                    "patientCenterId": centerId, //配偶id
                    "firstCheckDate": $('.firstCheckDate').val(), //初诊日期 展开
                    "lastMenstruation": $('.lastMenstruation').val(), //末次月经
                    "dueDate": $('.dueDate').val(), //预产期
                    "newAgeOfMenarche": $('.newAgeOfMenarche').val(), //现孕周
                    "newAgeOfMenarcheDay": $('.newAgeOfMenarche').val(), //现孕周 - 天
                    "menstrualHistoryAge": $('.menstrualHistoryAge').val(), // 初潮 - 岁
                    "menstrualHistoryDay": $('.menstrualHistoryDay').val(), // 月经史 - 周次
                    "pregnancyNumber": $('.pregnancyNum option:selected').attr('value'), //怀孕次数
                    "morningSickness": $('.morningSickness  option:selected').attr('value'), //早孕反应程度
                    "ketosis": $('.ketosis  option:selected').attr('value'), //酮症
                    "parturitionFrontPharmacy": $('.parturitionFrontPharmacy  option:selected').attr('value'), //孕前是否用药
                    "animalContact": $('.animalContact  option:selected').attr('value'), //宠物接触
                    "contactRadioactiveRays": $('.contactRadioactiveRays  option:selected').attr('value'), //接触放射线
                    "contactRadioactiveRaysDate": $('.contactRadioactiveRaysDate').val(), //接触放射线 - 时间 展开
                    /* 以下问题 */
                    "contactToxic": poison, //接触毒物
                    "contactToxicName": paramDetails, //接触毒物 - 名称
                    "contactToxicDate": contactToxicDate, //接触毒物 - 时间 展开
                    "virusInfection": $('.recordBox4_2 input[name="virus"]:checked').attr('value'), //病毒感染
                    "virusInfectionOther": virusInfectionOther, //病毒感染 - 其他
                    "familyHistory": recordPatientHistory, //家族史
                    "nowHistory": presentIllness, //现病史
                    'historyList': JSON.stringify(historyListArr),
                    "token": token,
                }, function sucFn(data) {
                    if (data.status == 20200) {
                        deleteHistory = [];
                        $('.newRecordLi1').attr('id', data.id);
                        $('.assessBox').addClass('layui-show');
                        $('.recordBox').removeClass('layui-show');
                        $('.newRecordLi1').removeClass('layui-this');
                        $('.newRecordLi2').addClass('layui-this');
                        $('.nextStep2').hide();
                        $('.nextStepTwo').show();
                        $('.newRecordLi1').attr('pregnancyidentifying', '1');

                        // inquireHistoryGestation: IP + "v1/web/pad/patientParturitionDetailHistory/findList", //B3 孕检信息-孕产史-查询孕产史
                        HttpRequstForPost(httpUrl.inquireHistoryGestation, 'json', {
                            'patientCenterId': centerId,
                            "token": token,
                        }, function sucFn(data) {
                            if (data.status == 20200) {
                                var motherhood = data.patientParturitionDetailHistoryBeanList;
                                // var mothTime = motherhood[i].productionDate.substring(0,7);

                                var _html = '';
                                for (var i = 0; i < motherhood.length; i++) {
                                    var tempDegree = "degree" + motherhood[i].number;
                                    _html += " <tr class = " + tempDegree + " name = '" + motherhood[i].id + "'  number = '" + motherhood[i].number + "'>\
                                        <td class='number inputWire'>"+ motherhood[i].number + "</td>"
                                    if (motherhood[i].pregnantType == 0) {
                                        _html += "<td class = 'ageOfMenarche '>早产</td>"
                                    } else if (motherhood[i].pregnantType == 1) {
                                        _html += "<td class = 'ageOfMenarche'>足月妊娠</td>"
                                    } else {
                                        _html += "<td class = 'ageOfMenarche'>过期妊娠</td>"
                                    }
                                    _html += "<td class = 'productionDate inputWire'>" + motherhood[i].productionDate.substring(0, 7) + "</td>\
                                            <td class='productionOfAge inputWire'>"+ motherhood[i].productionOfAge + "</td>"
                                    if (motherhood[i].productionAbortion == 0) {
                                        _html += "<td class='productionAbortion'>自然</td>"
                                    } else {
                                        _html += "<td class='productionAbortion'>剖宫产</td>"
                                    }
                                    if (motherhood[i].babySex == 0) {
                                        _html += "<td class='babySex'>男</td>"
                                    } else {
                                        _html += "<td class='babySex'>女</td>"
                                    }
                                    if (motherhood[i].babyHealthType == 0) {
                                        _html += "<td class='babyHealthType'>健康</td>"
                                    } else {
                                        _html += "<td class='babyHealthType'>死亡</td>"
                                    }
                                    _html += "<td class='remarks inputWire'>\
                                             <input type='text'  value='"+ motherhood[i].remarks + "'></td>\
                                        </tr>";
                                }
                                $(".kang").html(_html);
                            } else if (data.status == 20250) {
                                window.location = '/maternal-ipad/login/login.html';
                            } else if (data.status == 20207) {
                                layer.msg('操作失败，请稍后重试');
                            } else {

                            }
                        },
                            function errfn(err) {
                            });
                    } else if (data.status == 20250) {
                        window.location = '/maternal-ipad/login/login.html';
                    } else {
                        deleteHistory = [];
                    }
                },
                    function errfn(err) {
                    });
            } else {
                HttpRequstForPost(httpUrl.pregnancyModification, 'json', {
                    "patientCenterId": centerId, //配偶id
                    "id": $('.newRecordLi1').attr('id'), //配偶id
                    "firstCheckDate": $('.firstCheckDate').val(), //初诊日期 展开
                    "lastMenstruation": $('.lastMenstruation').val(), //末次月经
                    "dueDate": $('.dueDate').val(), //预产期
                    "newAgeOfMenarche": $('.newAgeOfMenarche').val(), //现孕周
                    "newAgeOfMenarcheDay": $('.newAgeOfMenarche').val(), //现孕周 - 天
                    "menstrualHistoryAge": $('.menstrualHistoryAge').val(), // 初潮 - 岁
                    "menstrualHistoryDay": $('.menstrualHistoryDay').val(), // 月经史 - 周次
                    "pregnancyNumber": $('.pregnancyNum').val(), //怀孕次数
                    "morningSickness": $('.morningSickness  option:selected').attr('value'), //早孕反应程度
                    "ketosis": $('.ketosis  option:selected').attr('value'), //酮症
                    "parturitionFrontPharmacy": $('.parturitionFrontPharmacy  option:selected').attr('value'), //孕前是否用药
                    "animalContact": $('.animalContact  option:selected').attr('value'), //宠物接触
                    "contactRadioactiveRays": $('.contactRadioactiveRays  option:selected').attr('value'), //接触放射线
                    "contactRadioactiveRaysDate": $('.contactRadioactiveRaysDate').val(), //接触放射线 - 时间 展开
                    /* 以下问题 */
                    "contactToxic": poison, //接触毒物
                    "contactToxicName": paramDetails, //接触毒物 - 名称
                    "contactToxicDate": contactToxicDate, //接触毒物 - 时间 展开
                    "virusInfection": $('.recordBox4_2 input[name="virus"]:checked').attr('value'), //病毒感染
                    "virusInfectionOther": virusInfectionOther, //病毒感染 - 其他
                    "familyHistory": recordPatientHistory, //家族史
                    "nowHistory": presentIllness, //现病史
                    "token": token,
                    "historyList": JSON.stringify(historyListArr),
                    "deleteList": JSON.stringify(deleteHistory),
                }, function sucFn(data) {
                    if (data.status == 20200) {
                        deleteHistory = [];
                        $('.assessBox').addClass('layui-show');
                        $('.recordBox').removeClass('layui-show');
                        $('.newRecordLi1').removeClass('layui-this');
                        $('.newRecordLi2').addClass('layui-this');
                        $('.nextStep2').hide();
                        $('.nextStepTwo').show();
                        $('.newRecordLi1').attr('pregnancyidentifying', '1');
                        HttpRequstForPost(httpUrl.inquireHistoryGestation, 'json', {
                            'patientCenterId': centerId,
                            "token": token,
                        }, function sucFn(data) {
                            if (data.status == 20200) {
                                var motherhood = data.patientParturitionDetailHistoryBeanList;
                                // var mothTime = motherhood[i].productionDate.substring(0,7);

                                var _html = '';
                                for (var i = 0; i < motherhood.length; i++) {
                                    var tempDegree = "degree" + motherhood[i].number;
                                    _html += " <tr class = " + tempDegree + " name = '" + motherhood[i].id + "'  number = '" + motherhood[i].number + "'>\
                                            <td class='number inputWire'>"+ motherhood[i].number + "</td>"
                                    if (motherhood[i].pregnantType == 0) {
                                        _html += "<td class = 'ageOfMenarche '>早产</td>"
                                    } else if (motherhood[i].pregnantType == 1) {
                                        _html += "<td class = 'ageOfMenarche'>足月妊娠</td>"
                                    } else {
                                        _html += "<td class = 'ageOfMenarche'>过期妊娠</td>"
                                    }
                                    _html += "<td class = 'productionDate inputWire'>" + motherhood[i].productionDate.substring(0, 7) + "</td>\
                                            <td class='productionOfAge inputWire'>"+ motherhood[i].productionOfAge + "</td>"
                                    if (motherhood[i].productionAbortion == 0) {
                                        _html += "<td class='productionAbortion'>自然</td>"
                                    } else {
                                        _html += "<td class='productionAbortion'>剖宫产</td>"
                                    }
                                    if (motherhood[i].babySex == 0) {
                                        _html += "<td class='babySex'>男</td>"
                                    } else {
                                        _html += "<td class='babySex'>女</td>"
                                    }
                                    if (motherhood[i].babyHealthType == 0) {
                                        _html += "<td class='babyHealthType'>健康</td>"
                                    } else {
                                        _html += "<td class='babyHealthType'>死亡</td>"
                                    }
                                    _html += "<td class='remarks inputWire'>\
                                             <input type='text'  value='"+ motherhood[i].remarks + "'>\
                                             </td>\
                                        </tr>";
                                }
                                $(".kang").html(_html);
                            } else if (data.status == 20250) {
                                window.location = '/maternal-ipad/login/login.html';
                            } else if (data.status == 20207) {
                                layer.msg('操作失败，请稍后重试');
                            } else {

                            }
                        },
                            function errfn(err) {
                            });
                    } else if (data.status == 20250) {
                        window.location = '/maternal-ipad/login/login.html';
                        deleteHistory = [];
                    } else if (data.status == 20207) {
                        layer.msg('操作失败，请稍后重试');
                        deleteHistory = [];
                    } else {
                        deleteHistory = [];
                    }
                },
                    function errfn(err) {
                    });
            }
        }
    });
    /* ******************孕产信息结束********************************* */
    /* **********************体格检查开始********************************** */
    $('.nextStepTwo').click(function () {
        if ($('.womenInformationLi1').attr('womenidentifying') == 0) {
            layer.msg('请完善孕妇基本信息');
            return false;
        } else if ($('.womenInformationLi2').attr('spouseidentifying') == 0) {
            layer.msg('请完善配偶一般信息');
            return false;
        } else if ($('.newRecordLi1').attr('pregnancyidentifying') == 0) {
            layer.msg('请完善孕产信息');
            return false;
        }
        if ($('.hyperpiesia').val().length == 0) { //高压
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请输入高压');
            $('html,body').addClass('noscroll');
        } else if ($('.hyperpiesia').val() < 0 || $('.hyperpiesia').val() > 300) { //高压取值范围
            layer.msg('高压取值范围 0 ~ 300， 请修改')
        } else if ($('.lowTension').val().length == 0) { //低压
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请输入低压');
            $('html,body').addClass('noscroll');
        } else if ($('.lowTension').val() < 0 || $('.lowTension').val() > 300) { //低压取值范围
            layer.msg('低压取值范围 0 ~ 300， 请修改')
        } else if (parseInt($('.lowTension').val()) > parseInt($('.hyperpiesia').val())) {
            layer.msg('低压不能大于高压')
        } else if ($('.height').val().length == 0) { //身高
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请输入身高');
            $('html,body').addClass('noscroll');
        } else if ($('.height').val() < 130 || $('.height').val() > 200) { //身高取值范围
            layer.msg('身高取值范围 130 ~ 200， 请修改')
        } else if ($('.weight').val().length == 0) { //体重
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请输入体重');
            $('html,body').addClass('noscroll');
        } else if ($('.weight').val() < 30 || $('.weight').val() > 200) { //体重取值范围
            layer.msg('体重取值范围 30 ~ 200， 请修改')
        } else if ($('.assayUrineProtein').val().length == 0) { //尿蛋白
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请输入尿蛋白');
            $('html,body').addClass('noscroll');
        } else if ($('.assayHemoglobin').val().length == 0) { //血红蛋白
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请输入血红蛋白');
            $('html,body').addClass('noscroll');
        } else if ($('.assayBloodPlatelet').val().length == 0) { //血小板
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请输入血小板');
            $('html,body').addClass('noscroll');
        } else if ($('.obstetricsHeight').val().length == 0) { //宫高
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请输入宫高');
            $('html,body').addClass('noscroll');
        } else if ($('.obstetricsHeight').val() < 16 || $('.obstetricsHeight').val() > 40) { //宫高取值范围
            layer.msg('宫高取值范围 16 ~ 40， 请修改')
        } else if ($('.obstetricsAbdominalGirth').val().length == 0) { //腹围
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请输入腹围');
            $('html,body').addClass('noscroll');
        } else if ($('.obstetricsAbdominalGirth').val() < 50 || $('.obstetricsAbdominalGirth').val() > 100) { //腹围取值范围
            layer.msg('腹围取值范围 50 ~ 100， 请修改')
        } else if ($('.obstetricsFetalHeart').val().length == 0) { //胎心率
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请输入胎心率');
            $('html,body').addClass('noscroll');
        } else if ($('.obstetricsTransversePelvicDiameter').val().length == 0) { //盆骨出口横径
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请输入盆骨出口横径');
            $('html,body').addClass('noscroll');
        } else if ($('.primaryDiagnosis').val().length == 0) { //诊断
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请输入诊断 ');
            $('html,body').addClass('noscroll');
        } else if ($('.disposal').val().length == 0) { //处置
            $('.shade').show();
            $('.verifyAlert').show();
            $('.reminder').html('请输入处置');
            $('html,body').addClass('noscroll');
        } else {
            if (!$('.newRecordLi2').attr('id')) {
                HttpRequstForPost(httpUrl.physiqueInsertForFiling, 'json', {
                    "patientCenterId": centerId, //配偶id
                    "baseBloodPressureHigh": $('.hyperpiesia').val(), //收缩压
                    "baseBloodPressureLow": $('.lowTension').val(), // 舒张压
                    "baseHeight": $('.height').val(), //身高
                    "baseWeight": $('.weight').val(), //体重
                    "baseSpinalLimbsDeformity": $('.baseSpinalLimbsDeformity  option:selected').attr('value'), //脊柱
                    "baseSpinalLimbsEdema": $('.baseSpinalLimbsEdema  option:selected').attr('value'), //四肢水肿
                    "baseHeartRate": $('.baseHeartRate  option:selected').attr('value'), // 心率
                    "baseLung": $('.baseLung  option:selected').attr('value'), //肺部
                    "baseAbdomenLiver": $('.baseAbdomenLiver  option:selected').attr('value'), //肝
                    "baseAbdomenSpleen": $('.baseAbdomenSpleen  option:selected').attr('value'), //脾
                    "baseBreasts": $('.baseBreasts  option:selected').attr('value'), //乳房
                    "baseNipple": $('.baseNipple  option:selected').attr('value'), //乳头
                    "obstetricsVulva": $('.obstetricsVulva  option:selected').attr('value'), //外阴
                    "obstetricsVagina": $('.obstetricsVagina  option:selected').attr('value'), //阴道
                    "obstetricsCervix": $('.obstetricsCervix  option:selected').attr('value'), //宫颈
                    "obstetricsCorpus": $('.obstetricsCorpus  option:selected').attr('value'), //宫体
                    "obstetricsPairsAttachment": $('.obstetricsPairsAttachment  option:selected').attr('value'), //双附件
                    "assayUrineProtein": $('.assayUrineProtein').val(), //尿蛋白
                    "assayHemoglobin": $('.assayHemoglobin').val(), //血红蛋白
                    "assayBloodPlatelet": $('.assayBloodPlatelet').val(), //血小板
                    "assayBloodType": $('.assayBloodType  option:selected').attr('value'), //血型
                    "obstetricsHeight": $('.obstetricsHeight').val(), //宫高
                    "obstetricsAbdominalGirth": $('.obstetricsAbdominalGirth').val(), //腹围
                    "obstetricsFirstDew": $('.obstetricsFirstDew  option:selected').attr('value'), //先露
                    "obstetricsPlacental": $('.obstetricsPlacental  option:selected').attr('value'), //胎方位
                    "obstetricsFetalHeart": $('.obstetricsFetalHeart').val(), //胎心率
                    "obstetricsTransversePelvicDiameter": $('.obstetricsTransversePelvicDiameter').val(), //盆骨出口横径
                    "primaryDiagnosis": $('.primaryDiagnosis').val(), //诊断
                    "disposal": $('.disposal').val(), //处置
                    "token": token,
                }, function sucFn(data) {
                    if (data.status == 20200) {
                        $('.newRecordLi2 ').attr('id', data.id);
                        $('.nextStepTwo').parent().hide().siblings('.assessment').show();
                        $('.assessmentLi').children('span').addClass('active').parent().siblings().children('span').removeClass('active');
                        $('.assessmentLi').children('.icon2').show().parent().siblings().find('.icon2').hide();;
                        $(".iocn").css("top", 2 * 3 + 1 + "rem");
                        $('.management').html('高危评估');
                        $('.newRecordLi2').attr('physiqueidentifying', '1');
                    } else if (data.status == 20250) {
                        window.location = '/maternal-ipad/login/login.html';
                    } else if (data.status == 20207) {
                        layer.msg('操作失败，请稍后重试');
                    } else {

                    }
                },
                    function errfn(err) {
                    });
            } else {
                // modificationPhysique: IP + "v1/web/pad/patientHealthCheck/updateForFiling", //B4 体格检查-更新
                HttpRequstForPost(httpUrl.modificationPhysique, 'json', {
                    "patientCenterId": centerId, //配偶id
                    "id": $('.newRecordLi2').attr('id'), //配偶id
                    "baseBloodPressureHigh": $('.hyperpiesia').val(), //收缩压
                    "baseBloodPressureLow": $('.lowTension').val(), // 舒张压
                    "baseHeight": $('.height').val(), //身高
                    "baseWeight": $('.weight').val(), //体重
                    "baseSpinalLimbsDeformity": $('.baseSpinalLimbsDeformity  option:selected').attr('value'), //脊柱
                    "baseSpinalLimbsEdema": $('.baseSpinalLimbsEdema  option:selected').attr('value'), //四肢水肿
                    "baseHeartRate": $('.baseHeartRate  option:selected').attr('value'), // 心率
                    "baseLung": $('.baseLung  option:selected').attr('value'), //肺部
                    "baseAbdomenLiver": $('.baseAbdomenLiver  option:selected').attr('value'), //肝
                    "baseAbdomenSpleen": $('.baseAbdomenSpleen  option:selected').attr('value'), //脾
                    "baseBreasts": $('.baseBreasts  option:selected').attr('value'), //乳房
                    "baseNipple": $('.baseNipple  option:selected').attr('value'), //乳头
                    "obstetricsVulva": $('.obstetricsVulva  option:selected').attr('value'), //外阴
                    "obstetricsVagina": $('.obstetricsVagina  option:selected').attr('value'), //阴道
                    "obstetricsCervix": $('.obstetricsCervix  option:selected').attr('value'), //宫颈
                    "obstetricsCorpus": $('.obstetricsCorpus  option:selected').attr('value'), //宫体
                    "obstetricsPairsAttachment": $('.obstetricsPairsAttachment  option:selected').attr('value'), //双附件
                    "assayUrineProtein": $('.assayUrineProtein').val(), //尿蛋白
                    "assayHemoglobin": $('.assayHemoglobin').val(), //血红蛋白
                    "assayBloodPlatelet": $('.assayBloodPlatelet').val(), //血小板
                    "assayBloodType": $('.assayBloodType  option:selected').attr('value'), //血型
                    "obstetricsHeight": $('.obstetricsHeight').val(), //宫高
                    "obstetricsAbdominalGirth": $('.obstetricsAbdominalGirth').val(), //腹围
                    "obstetricsFirstDew": $('.obstetricsFirstDew  option:selected').attr('value'), //先露
                    "obstetricsPlacental": $('.obstetricsPlacental  option:selected').attr('value'), //胎方位
                    "obstetricsFetalHeart": $('.obstetricsFetalHeart').val(), //胎心率
                    "obstetricsTransversePelvicDiameter": $('.obstetricsTransversePelvicDiameter').val(), //盆骨出口横径
                    "primaryDiagnosis": $('.primaryDiagnosis').val(), //诊断
                    "disposal": $('.disposal').val(), //处置
                    "token": token,
                }, function sucFn(data) {

                    if (data.status == 20200) {
                        $('.newRecordLi2 ').attr('id', data.id);
                        $('.nextStepTwo').parent().hide().siblings('.assessment').show();
                        $('.assessmentLi').children('span').addClass('active').parent().siblings().children('span').removeClass('active');
                        $('.assessmentLi').children('.icon2').show().parent().siblings().find('.icon2').hide();;
                        $(".iocn").css("top", 2 * 3 + 1 + "rem");
                        $('.management').html('高危评估');
                        $('.newRecordLi2').attr('physiqueidentifying', '1');
                    } else {
                        layer.msg('登录失败');
                    }
                },
                    function errfn(err) {
                    });
            }
        }
    })
    /* **********************体格检查结束********************************* */
    /* *************************高危评估 签证 确认 开始******************************* */
    // 获取高危评估题
    HttpRequstForPost(httpUrl.findTreeList, 'json', {
        "templateId": localStorage.getItem("maternalhighRiskGradesTable"),
        "token": token,
    }, function sucFn(data) {
        // console.log(data)
        if (data.status == 20200) {
            var tempArr = data.highRiskGradeCatalogueBeanList;
            var _html = '';
            for (var i = 0; i < tempArr.length; i++) {
                if (tempArr[i].sonList.length == 0) {
                    _html += '<h2 class="tilteText">' + tempArr[i].details + '</h2>';
                    var topicArr = tempArr[i].highRiskGradeTemplateDetailBeanList;
                    if (topicArr[0].cellSuperType == 0) {
                        var fiveHtml = '<div class="assessmentBox">\
                            <div class="topicBox">';
                        var tenHtml = '<div class="assessmentBox">\
                            <div class="topicBox">';
                        var twentyHtml = '<div class="assessmentBox">\
                            <div class="topicBox">';
                        for (var j = 0; j < topicArr.length; j++) {
                            if (topicArr[j].cellGrades == 5) {
                                fiveHtml += '<a class="topicItem" href="javascript:;" name="' + topicArr[j].cellId + '" cellGrades="' + topicArr[j].cellGrades + '">' + topicArr[j].cellDetails + '</a>';
                            } else if (topicArr[j].cellGrades == 10) {
                                tenHtml += '<a class="topicItem" href="javascript:;" name="' + topicArr[j].cellId + '" cellGrades="' + topicArr[j].cellGrades + '">' + topicArr[j].cellDetails + '</a>';
                            } else if (topicArr[j].cellGrades == 20) {
                                twentyHtml += '<a class="topicItem" href="javascript:;" name="' + topicArr[j].cellId + '" cellGrades="' + topicArr[j].cellGrades + '">' + topicArr[j].cellDetails + '</a>';
                            }
                        }
                        fiveHtml += '</div><div class="scoreBox"><p>5分</p><p>黄色</p></div></div>';
                        tenHtml += '</div><div class="scoreBox"><p>10分</p><p>橙色</p></div></div>';
                        twentyHtml += '</div><div class="scoreBox"><p>20分</p><p>红色</p></div></div>';
                        _html = _html + fiveHtml + tenHtml + twentyHtml;
                    } else {
                        var purpleHtml = '<div class="assessmentBox">\
                            <div class="topicBox">';
                        for (var j = 0; j < topicArr.length; j++) {
                            purpleHtml += '<a class="purpleItem" href="javascript:;" name="' + topicArr[j].cellId + '">' + topicArr[j].cellDetails + '</a>';
                        }
                        purpleHtml += '</div><div class="scoreBox"><p>紫色</p></div></div>';
                        _html = _html + purpleHtml;
                    }

                } else {
                    var assessArr = tempArr[i].sonList;
                    // 孕产期合并症-tab切换
                    _html += '<h3 class="tilteText">' + tempArr[i].details + '</h3>';
                    var navHtml = '<div class="navContent">';
                    var bodyHtml = '<div class="bodyContent">';
                    for (var j = 0; j < assessArr.length; j++) {
                        navHtml += '<a class="' + (j == 0 ? "active" : "") + '" href="javascript:;">' + assessArr[j].details.replace(/['疾病'|'系统疾病']/g, '') + '</a>';
                        bodyHtml += '<div class="item ' + (j == 0 ? "active" : "") + '">'
                        var _topicArr = assessArr[j].highRiskGradeTemplateDetailBeanList;
                        var _fiveHtml = '<div class="assessmentBox itemBox">\
                                    <div class="topicBox">';
                        var _tenHtml = '<div class="assessmentBox itemBox">\
                                    <div class="topicBox">';
                        var _twentyHtml = '<div class="assessmentBox itemBox">\
                                    <div class="topicBox">';
                        for (var z = 0; z < _topicArr.length; z++) {
                            if (_topicArr[z].cellGrades == 5) {
                                _fiveHtml += '<a class="topicItem" href="javascript:;" name="' + _topicArr[z].cellId + '" cellGrades="' + _topicArr[z].cellGrades + '">' + _topicArr[z].cellDetails + '</a>';
                            } else if (_topicArr[z].cellGrades == 10) {
                                _tenHtml += '<a class="topicItem" href="javascript:;" name="' + _topicArr[z].cellId + '" cellGrades="' + _topicArr[z].cellGrades + '">' + _topicArr[z].cellDetails + '</a>';
                            } else if (_topicArr[z].cellGrades == 20) {
                                _twentyHtml += '<a class="topicItem" href="javascript:;" name="' + _topicArr[z].cellId + '" cellGrades="' + _topicArr[z].cellGrades + '">' + _topicArr[z].cellDetails + '</a>';
                            }
                        }
                        _fiveHtml += '</div><div class="scoreBox"><p>5分</p><p>黄色</p></div></div>';
                        _tenHtml += '</div><div class="scoreBox"><p>10分</p><p>橙色</p></div></div>';
                        _twentyHtml += '</div><div class="scoreBox"><p>20分</p><p>红色</p></div></div>';
                        bodyHtml = bodyHtml + _fiveHtml + _tenHtml + _twentyHtml;
                        bodyHtml += '</div>';
                    }
                    navHtml += '</div>';
                    bodyHtml += '</div>';
                    _html = _html + navHtml + bodyHtml;
                }
            }
            $(".assessmentContent").html(_html);
        } else if (data.status == 20250) {
            window.location = '/maternal-ipad/login/login.html';
        } else {
            $(".assessmentContent").html('');
        }
    },
        function errfn(err) {
            layer.msg('操作失败，请稍后重试');
        });
    // tab切换
    $(".assessmentContent").delegate(".navContent > a", 'click', function () {
        var _index = $(this).index();
        $(this).addClass("active").siblings("a").removeClass("active");
        $(".bodyContent .item").hide().eq(_index).show();
    })
    $(".assessmentContent").delegate(".topicItem", "click", function () {
        $(this).toggleClass("active");
    })
    $(".assessmentContent").delegate(".purpleItem", "click", function () {
        $(this).toggleClass("active");
    })
    // 高危评估下一步
    $('.nextStep3').click(function () {
        if ($('.womenInformationLi1').attr('womenidentifying') == 0) {
            layer.msg('请完善孕妇基本信息');
            return false;
        } else if ($('.womenInformationLi2').attr('spouseidentifying') == 0) {
            layer.msg('请完善配偶一般信息');
            return false;
        } else if ($('.newRecordLi1').attr('pregnancyidentifying') == 0) {
            layer.msg('请完善孕产信息');
            return false;
        } else if ($('.newRecordLi2').attr('physiqueidentifying') == 0) {
            layer.msg('请完善体格检查');
            return false;
        }
        var objArr = $(".topicItem.active");
        fiveArr = [];
        tenArr = [];
        twentyArr = [];
        purpleArr = []; // 紫色数组
        for (var i = 0; i < objArr.length; i++) {
            if (objArr.eq(i).attr("cellgrades") == 5) {
                fiveArr.push(objArr.eq(i).html());
            } else if (objArr.eq(i).attr("cellgrades") == 10) {
                tenArr.push(objArr.eq(i).html());
            } else if (objArr.eq(i).attr("cellgrades") == 20) {
                twentyArr.push(objArr.eq(i).html());
            }
        }
        var purpleObjArr = $(".purpleItem.active");
        for (var i = 0; i < purpleObjArr.length; i++) {
            purpleArr.push(purpleObjArr.eq(i).html())
        }
        if (purpleArr.length > 0) {
            $("#riskItem").html("传染病").removeClass().addClass("level4");
        } else if (twentyArr.length > 0) {
            $("#riskItem").html("高风险").removeClass().addClass('level3');
        } else if (tenArr.length > 0) {
            $("#riskItem").html("较高风险").removeClass().addClass("level2");
        } else if (fiveArr.length > 0) {
            $("#riskItem").html("一般风险").removeClass().addClass('level1');
        } else {
            $("#riskItem").html("低风险").removeClass().addClass('level0');
        }
        $('.fiveLength').html(fiveArr.length);
        $('.tenLength').html(tenArr.length);
        $('.twentyLength').html(twentyArr.length);
        $('.purpleLength').html(purpleArr.length);
        for (var i = 0; i < fiveArr.length; i++) {
            $('.yellowDiv').append('<p>' + fiveArr[i] + '</p>')
        }
        for (var i = 0; i < tenArr.length; i++) {
            $('.orangeDiv').append('<p>' + tenArr[i] + '</p>')
        }
        for (var i = 0; i < twentyArr.length; i++) {
            $('.redDiv').append('<p>' + twentyArr[i] + '</p>')
        }
        for (var i = 0; i < purpleArr.length; i++) {
            $('.purpleDiv').html('<p>' + purpleArr[i] + '</p>')
        }
        $('.totalPoints').html(fiveArr.length * 5 + tenArr.length * 10 + twentyArr.length * 20);
        $(this).parent().hide().siblings('.affirm').show();
        $('.affirmLi').children('span').addClass('active').parent().siblings().children('span').removeClass('active');;
        $('.affirmLi').children('.icon2').show().parent().siblings().find('.icon2').hide();;
        $(".iocn").css("top", 3 * 3 + 1 + "rem");
        $('.management').html('签字确认');
    });
    // 点击左侧高危评估，清除签字确认评估详情里的内容
    $('.assessmentLi').click(function () {
        $('.greenDiv').html('');
        $('.yellowDiv').html('');
        $('.orangeDiv').html('');
        $('.redDiv').html('');
        $('.purpleDiv').html('');
    });
    $(".accomplish").click(function () {
        if ($('.womenInformationLi1').attr('womenidentifying') == 0) {
            layer.msg('请完善孕妇基本信息');
            return false;
        } else if ($('.womenInformationLi2').attr('spouseidentifying') == 0) {
            layer.msg('请完善配偶一般信息');
            return false;
        } else if ($('.newRecordLi1').attr('pregnancyidentifying') == 0) {
            layer.msg('请完善孕产信息');
            return false;
        } else if ($('.newRecordLi2').attr('physiqueidentifying') == 0) {
            layer.msg('请完善体格检查');
            return false;
        } else if (patientImg == '' || patientImg == null) {
            alert(1)
            layer.msg('请填写孕妇签名')
            return false;
        } else if (doctorImg == '' || doctorImg==null ) {
            layer.msg('请填写医生签名')
            return false;
        }
        var gradeType = 0;
        if (purpleArr.length > 0) {
            gradeType = 4;
        } else if (twentyArr.length > 0) {
            gradeType = 3;
        } else if (tenArr.length > 0) {
            gradeType = 2;
        } else if (fiveArr.length > 0) {
            gradeType = 1;
        } else {
            gradeType = 0;
        }
        var _newsJson = {
            "green": 0,
            "yellow": $('.fiveLength').html(),
            "orange": $('.tenLength').html(),
            "red": $('.twentyLength').html(),
            "purple": $('.purpleLength').html()
        }
        var _detailsJson = {
            "green": [],
            "yellow": fiveArr,
            "orange": tenArr,
            "red": twentyArr,
            "purple": purpleArr
        }
        // 高危评估 v1/web/pad/patientHighRiskGrade/insertAndImage
        var postData = new FormData();
        postData.append("patientCenterId", centerId); // centerID
        postData.append("patientName", $('.pregnantName').val()); // 患者姓名
        postData.append("highRiskGradeTemplateId", localStorage.getItem('maternalhighRiskGradesTable')); // 高危模板id
        postData.append("checkNumber", $('.pregnancyNum').val()); // 次数
        postData.append("newAgeOfMenarche", $('.newAgeOfMenarche').val()); // 孕周
        postData.append("newAgeOfMenarcheDay", $('.newAgeOfMenarcheDay').val()); // 孕天
        postData.append("totalNum", JSON.stringify(_newsJson)); // 评估信息
        postData.append("totalPoints", $('.totalPoints').html()); // 评分
        postData.append("patientImg", base64ToBlob(patientImg), 'patientImg' + '.png'); // 患者签名
        postData.append("doctorImg", base64ToBlob(doctorImg), 'doctorImg' + '.png'); // 医生签名
        postData.append("details", JSON.stringify(_detailsJson)); // 评估详情
        postData.append("gradeType", gradeType); // 0. 绿色 1. 黄色 2. 橙色 3. 红色 4. 紫色
        var remark = '';
        if ($('.remark').val() == '') {
            remark = '无';
        } else {
            remark = $('.remark').val();
        }
        postData.append("remarks", remark); // 备注
        postData.append("high", $('.height').val()); // 身高
        postData.append("weight", $('.weight').val()); //体重
        postData.append("token", token);
        HttpRequstFromDataForPost(httpUrl.signatureConfirmationForFiling, 'json', postData, function sucFn(data) {
            //console.log(data)
            if (data.status == 20200) {
                window.location = "/maternal-ipad/management/management.html";
            } else if (data.status == 20207) {
                layer.msg('操作失败，请稍后重试');
            } else if (data.status == 20250) {
                window.location = '/maternal-ipad/login/login.html';
            } else {

            }
        },
            function errfn(err) {
            });
    });
    /* ******************高危评估结束********************************** */
    // 校验弹窗按钮
    $('.verifyAlertLooks,.verifyAlertConfirm').click(function () {
        $('.shade').hide();
        $('.verifyAlert').hide();
        $('html,body').removeClass('noscroll');
    })
    // 输入框叉号点击清空输入框内容，提示和本身隐藏
    $('.errorIon').click(function () {
        // console.log($(this).siblings('input').val())
        $(this).siblings('input').val('').siblings('.redFont').hide();
        $(this).hide();
    })
    // 点击左侧回顶部
    $("leftBox ul li").click(function () {
        $(".content").animate({ scrollTop: 2000 }, 1000);
    });


    /* ********************诊断模板star******************* */

    $('.template1').click(function () {
        var modle1 = JSON.parse(localStorage.getItem("maternalmodle1"));
        if (modle1 == null || modle1 == '') {
            var msg = layer.msg('处理中，请稍候', {
                icon: 16,
                shade: 0.4,
                time: false //取消自动关闭
            });
            $('.stencilLayer').show();
            // $('html,body').addClass('noscroll');
            $('.templateFont').html('诊断');
            //禁止屏幕滑动
            document.body.addEventListener('touchmove', handle, false);
            HttpRequstForPost(httpUrl.templateDiagnose, 'json', {
                "token": token,
            }, function sucFn(data) {
                if (data.status == 20200) {
                    var templateMalaiseBeanList = data.templateDiagnoseBeanList;
                    localStorage.setItem('maternalmodle1', JSON.stringify(templateMalaiseBeanList));
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
                    //layer.msg('操作失败，请稍后重试');
                });
        } else {
            $('.stencilLayer').show();
            // $('html,body').addClass('noscroll');
            $('.templateFont').html('诊断');
            //禁止屏幕滑动
            document.body.addEventListener('touchmove', handle, false);
            var _html = '';
            for (var i = 0; i < modle1.length; i++) {
                _html += "  <a class='topicItem' href='javascript:;' id = ' " + modle1[i].id + "'>" + modle1[i].details + "</a>"

            }
            $('.stencilLayer_select').html(_html);
        }

    });
    $('.importTemplate').click(function () {
        if ($('.templateFont').html() == '诊断') {
            var malaiseTxt = $('.stencilLayer_select').find('.topicItem.active').html();
            $('.primaryDiagnosis').val(malaiseTxt);
            $('.stencilLayer').hide();
            // 允许屏幕滑动
            document.body.removeEventListener('touchmove', handle, false);

        } else {
            var guideTheProcessingTxt = $('.stencilLayer_select').find('.topicItem.active').html();
            $('.disposal').val(guideTheProcessingTxt);
            $('.stencilLayer').hide();
            // 允许屏幕滑动
            document.body.removeEventListener('touchmove', handle, false);
        }
    });

    $('.template2').click(function () {
        var modle2 = JSON.parse(localStorage.getItem("maternalmodle2"));
        if (modle2 == null || modle2 == '') {
            $('.stencilLayer').show();
            // $('html,body').addClass('noscroll');
            $('.templateFont').html('处置');
            //禁止屏幕滑动
            document.body.addEventListener('touchmove', handle, false);
            HttpRequstForPost(httpUrl.instruction, 'json', {
                "token": token,
            }, function sucFn(data) {
                if (data.status == 20200) {
                    var templateDisposeBeanList = data.templateDisposeBeanList;
                    localStorage.setItem('maternalmodle2', JSON.stringify(templateDisposeBeanList));
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
        } else {
            $('.stencilLayer').show();
            // $('html,body').addClass('noscroll');
            $('.templateFont').html('处置');
            //禁止屏幕滑动
            document.body.addEventListener('touchmove', handle, false);
            var _html = '';
            for (var i = 0; i < modle2.length; i++) {
                _html += "  <a class='topicItem' href='javascript:;' id = ' " + modle2[i].id + "'>" + modle2[i].details + "</a>"
            }
            $('.stencilLayer_select').html(_html);

        }

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
    });
    /* *******************诊断模板end********************* */

});

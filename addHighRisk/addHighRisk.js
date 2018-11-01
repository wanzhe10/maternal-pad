$(function() {
    var fiveArr = []; //5分数组
    var tenArr = []; //10分数组
    var twentyArr = []; //20分数组
    var purpleArr = []; // 紫色数组
    var patientImg = ''; // 患者签名
    var doctorImg = ''; // 医生签名
    var patientImgArr = []; // 患者签名
    var doctorImgArr = []; // 医生签名
    // 点击空白处软键盘消失
    $('.contaienr').click(function () {
        objBlur('content', 300);
    });
    // 左侧切换-start
    $(".navContent > a").click(function() {
        var _index = $(this).index();
        $(this).addClass("active").siblings("a").removeClass("active");
        $(".contaienr .content").hide().eq(_index).show();
        // dataDispose();
    })
    $('.assessmentBtn').click(function () {
        $('.greenDiv').html('');
        $('.yellowDiv').html('');
        $('.orangeDiv').html('');
        $('.redDiv').html('');
        $('.purpleDiv').html('');
    });
    // 左侧切换-end

    // 获取高危评估题
    HttpRequstForPost(httpUrl.findTreeList, 'json', {
        "templateId": localStorage.getItem("maternalhighRiskGradesTable"),
        "token": token,
    },function sucFn(data) {
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
    $(".assessmentContent").delegate(".navContent > a", 'click', function() {
        var _index = $(this).index();
        $(this).addClass("active").siblings("a").removeClass("active");
        $(".bodyContent .item").hide().eq(_index).show();
    })
    $(".assessmentContent").delegate(".topicItem", "click", function() {
        $(this).toggleClass("active");
    })
    $(".assessmentContent").delegate(".purpleItem", "click", function() {
        $(this).toggleClass("active");
    })

    $(".nextStep3").click(function() {
        // 左侧tab切换
        $(".navContent > a").eq(1).click();
        dataDispose();
    })

    function dataDispose() {
        fiveArr = [];
        tenArr = [];
        twentyArr = [];
        purpleArr = [];
        var fiveHtml = ''; // 五分字符串
        var tenHtml = ''; // 十分字符串
        var twentyHtml = ''; // 20分 字符串
        var purpleHtml = ''; // 紫色 字符串
        var objArr = $(".topicItem.active");
        var purpleObjArr = $(".purpleItem.active");
        for (var i = 0; i < objArr.length; i++) {
            if (objArr.eq(i).attr("cellgrades") == 5) {
                fiveArr.push(objArr.eq(i).html());
                fiveHtml += objArr.eq(i).html();
            } else if (objArr.eq(i).attr("cellgrades") == 10) {
                tenArr.push(objArr.eq(i).html());
                tenHtml += objArr.eq(i).html();
            } else if (objArr.eq(i).attr("cellgrades") == 20) {
                twentyArr.push(objArr.eq(i).html());
                twentyHtml += objArr.eq(i).html();
            }
        }
        for (var i = 0; i < purpleObjArr.length; i++) {
            purpleArr.push(purpleObjArr.eq(i).html())
            purpleHtml += purpleObjArr.eq(i).html();
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
        $(".countNum").html(fiveArr.length * 5 + tenArr.length * 10 + twentyArr.length * 20);
        $(".fiveNum").html(fiveArr.length);
        $(".tenNum").html(tenArr.length);
        $(".twentyNum").html(twentyArr.length);
        $(".purpleNum").html(purpleArr.length);
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
            $('.purpleDiv').append('<p>' + purpleArr[i] + '</p>')
        } 
    }

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

    $(".goBackBtn").click(function () {
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
    })
    // 完成-btn
    $(".accomplish").click(function() {
        // cons.log(doctorImgArr);
        // return;
        if (patientImg == '' || patientImg == null) {
            layer.msg('请填写孕妇签名')
            return false;
        } else if (doctorImg == '' || doctorImg ==null ) {
            layer.msg('请填写医生签名')
            return false;
        }else{
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
            var numJSON = {
                "green": 0,
                "yellow": fiveArr.length,
                "orange": tenArr.length,
                "red": twentyArr.length,
                "purple": purpleArr.length
            }
            var detailsJSON = {
                "green": [],
                "yellow": fiveArr,
                "orange": tenArr,
                "red": twentyArr,
                "purple": purpleArr
            }
           
            // 新增高危评估记录
            var postData = new FormData();
            postData.append("patientCenterId", myLocal.getItem('maternalrecordData').id); // CenterId
            postData.append("patientName", myLocal.getItem('maternalrecordData').checkName); // 患者名字
            postData.append("highRiskGradeTemplateId", localStorage.getItem("maternalhighRiskGradesTable")); // 高危模板id
            postData.append("checkNumber", location.href.split('?')[1]); // 次数
            postData.append("newAgeOfMenarche", myLocal.getItem('maternalrecordData').newAgeOfMenarche); // 孕周
            postData.append("newAgeOfMenarcheDay", myLocal.getItem('maternalrecordData').newAgeOfMenarcheDay); // 孕周-天
            postData.append("totalNum", JSON.stringify(numJSON)); // 评估信息
            postData.append("totalPoints", $('.countNum').html()); // 评分
            postData.append("patientImg", base64ToBlob(patientImg),'patientImg.png'); // 患者签名
            postData.append("doctorImg", base64ToBlob(doctorImg),'doctorImg.png'); // 医生签名
            postData.append("details", JSON.stringify(detailsJSON)); // 评估详情
            postData.append("gradeType", gradeType); // 0.绿色 1.黄色 2.橙色 3.红色 4.紫色
            postData.append("remarks", $(".remark").val()); // 备注
            postData.append("token", token);
            HttpRequstFromDataForPost(httpUrl.insertAndImage, 'json', postData, function sucFn(data) {
                if (data.status == 20200) {
                    window.location = '/maternal-ipad/center/center.html';
                } else if (data.status == 20250) {
                    window.location = '/maternal-ipad/login/login.html';
                } else {
                    layer.msg("新建高危记录失败")
                    // console.log(1)
                }
            },
                function errfn(err) {
                    
            });
        }
     
    })
})

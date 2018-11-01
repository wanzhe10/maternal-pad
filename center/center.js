$(function () {
    var xData = [];
    var yData = [];
    // 阻止屏幕滑动
    var handle = function (event) {
        event.preventDefault();
    }
    // 患者信息-start
    var patientInfo = myLocal.getItem("maternalrecordData");
    // console.log(patientInfo)
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
    var totalNumArr = eval('(' + localStorage.getItem('maternalgardenIcon') + ')');
    // console.log(totalNumArr)
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
    // 查询复检列表 -star
    var patientArr = [];
    HttpRequstForPost(httpUrl.findListByCenterId, 'json', {
        'centerId': patientInfo.id,
        "token": token,
    }, function sucFn(data) {
        // console.log(data)
        if (data.status == 20200) {
            patientArr = data.patientSecondCheckBeans;
            var _html = '';
            for (var i = 0; i < patientArr.length; i++) {
                var imgObj = eval("(" + patientArr[i].doctorImg + ")");
                _html += '<table class="recordTable">\
                        <thead>\
                            <tr>\
                                <th class="clearfix" colspan="5">\
                                    <span class="bias1">'+ patientArr[i].checkDate.split(" ")[0] + '</span>\
                                    <span class="bias2">6-13周</span>\
                                    <span>'+ "第" + patientArr[i].ordinalNumber + "次产检" + '</span>\
                                    <a href="javascript:;" index="' + i + '" class="mgr50 recordDetailsBtn">查看详情></a>\
                                </th>\
                            </tr>\
                        </thead>\
                        <tbody>\
                            <tr>\
                                <td>血&nbsp;压:\
                                    <span>'+ patientArr[i].bloodPressureHigh + ' /' + patientArr[i].bloodPressureLow + '</span>\
                                    <span class="unit">mmHg</span>\
                                </td>\
                                <td>体&nbsp;重:\
                                    <span>'+ patientArr[i].bodyWeight + '</span>\
                                    <span class="unit">kg</span>\
                                </td>\
                                <td>宫&nbsp;高:\
                                    <span>'+ patientArr[i].highPalace + '</span>\
                                    <span class="unit">cm</span>\
                                </td>\
                                <td>腹&nbsp;围:\
                                    <span>'+ patientArr[i].abdominalGirth + '</span>\
                                    <span class="unit">cm</span>\
                                </td>'
                if (patientArr[i].position == 0) {
                    _html += '<td>胎方位:\
                                    <span>未填写</span>\
                                </td>'
                } else if (patientArr[i].position == 1) {
                    _html += '<td>胎方位:\
                                    <span>枕左前位</span>\
                                </td>'
                } else if (patientArr[i].position == 2) {
                    _html += '<td>胎方位:\
                                    <span>枕右横位</span>\
                                </td>'
                } else {
                    _html += '<td>胎方位:\
                                    <span>枕右前位</span>\
                                </td>'
                }
                _html += ' </tr>'
                _html += '<tr>'
                if (patientArr[i].position == 0) {
                    _html += '<td>先&nbsp;露:\
                                 <span>未填写</span>\
                                   </td>'
                } else if (patientArr[i].position == 1) {
                    _html += '<td>先&nbsp;露:\
                                 <span>头先露</span>\
                                   </td>'
                } else {
                    _html += '<td>先&nbsp;露:\
                                 <span>臀先露</span>\
                                   </td>'
                }
                if (patientArr[i].position == 0) {
                    _html += ' <td>胎心率:<span>未填写</span></td>'

                } else if (patientArr[i].position == 1) {
                    _html += ' <td>胎心率:<span>正常</span></td>'
                } else {
                    _html += ' <td>胎心率:<span>异常</span></td>'
                }
                if (patientArr[i].cohesion == 0) {
                    _html += ' <td>衔&nbsp;接:<span>未衔接</span></td>'
                } else {
                    _html += ' <td>衔&nbsp;接:<span>已衔接</span></td>'

                }
                if (patientArr[i].edema == 0) {
                    _html += ' <td>浮&nbsp;肿:<span>无</span></td>'

                } else if (patientArr[i].edema == 1) {
                    _html += ' <td>浮&nbsp;肿:<span>轻</span></td>'


                } else if (patientArr[i].edema == 2) {
                    _html += ' <td>浮&nbsp;肿:<span>中</span></td>'


                } else if (patientArr[i].edema == 3) {
                    _html += ' <td>浮&nbsp;肿:<span>重</span></td>'

                }
                if (patientArr[i].urineProtein == 0) {
                    _html += ' <td>尿蛋白:<span>正常</span></td>'

                } else if (patientArr[i].urineProtein == 1) {
                    _html += ' <td>尿蛋白:<span>+1</span></td>'

                } else if (patientArr[i].urineProtein == 2) {
                    _html += ' <td>尿蛋白:<span>+2</span></td>'

                } else {
                    _html += ' <td>尿蛋白:<span>+3</span></td>'
                }
                _html += '</tr>'

                _html += '<tr>\
                                <td colspan="5">\
                                    <div class="resordTable_div">\
                                        <label>自觉不适:</label>\
                                        <input type="text" class="resordTableInput1 resordTableInput" readonly="readonly" value="'+ patientArr[i].malaise + '" onfocus="this.blur()">\
                                    </div>\
                                    <div class="resordTable_div">\
                                        <label>指导处理意见:</label>\
                                        <input type="text" class="resordTableInput2 resordTableInput" readonly="readonly" value="'+ patientArr[i].guideTheProcessing + '" onfocus="this.blur()">\
                                    </div>\
                                    <div class="resordTable_div clearfix">\
                                        <label>预约下次日期及时间:</label>\
                                        <input type="text" class="resordTableInput3 resordTableInput" readonly="readonly" value="'+ patientArr[i].makeAppointmentTime + '" onfocus="this.blur()">\
                                        <div class="operationDoctor">\
                                           <span>操作医生 : </span><img class="loockBigImg" bigSrc="' + imgIp + imgObj.maxImageURL + '" src="' + imgIp + imgObj.minImageURL + '" alt="">\
                                        </div>\
                                    </div>\
                            </tr>\
                        </tbody>\
                    </table>'

            }
            $('.recordBox').html(_html);
        } else if (data.status == 20209) {
            
        } else if (data.status == 20250) {
            // window.location = '/maternal-ipad/login/login.html';
        } else {
            $('.recordBox').html('');
        }
    },
        function errfn(err) {
             layer.msg('操作失败，请稍后重试');
        });
    // 查看大图-start
    $(".recordBox").delegate(".loockBigImg", "click", function () {
        $('.bigImgContent').show();
        $('.shadow').show();
        document.body.addEventListener('touchmove', handle, false);
        $(".bigImgContent").find('img').attr("src", $(this).attr("bigSrc"));
    })
    $(".bigImgContent").find("a").click(function () {
        layer.closeAll();
        $(".bigImgContent").hide();
        $('.shadow').hide();
        // 允许屏幕滑动
        document.body.removeEventListener('touchmove', handle, false);
    })
    // 查看大图-end
    // 查看详情
    $(".recordBox").delegate(".recordDetailsBtn", "click", function () {
        myLocal.setItem('maternalrecordDetails', patientArr[$(this).attr("index")])
        window.location = "/maternal-ipad/particulars/examineParticulars.html";
    })
    // 查询复检列表 -end
    // 查询高危列表-start
    var highRiskArr = []; // 高危列表数据数组
    HttpRequstForPost(httpUrl.highRiskfindList, 'json', {
        "centerId": myLocal.getItem("maternalrecordData").id,
        "token": token,
    }, function sucFn(data) {
        // console.log(data)
        if (data.status == 20200) {
            highRiskArr = data.padPatientHighRiskGradeBeanList;
            var _html = '';
            for (var i = 0; i < highRiskArr.length; i++) {
                var detailsArr = eval("(" + highRiskArr[i].details + ")");
                var totalNumArr = eval("(" + highRiskArr[i].totalNum + ")");
                _html += '<div class="assessItem">\
                        <div class="titleBox">\
                            <p><span class="createDate">' + highRiskArr[i].createDate + '</span>|<span class="weeksDay">' + highRiskArr[i].newAgeOfMenarche + '周' + (highRiskArr[i].newAgeOfMenarcheDay ? '+' + highRiskArr[i].newAgeOfMenarcheDay + '天' : '') + '</span>|<span class="indexSeveral">第' + highRiskArr[i].checkNumber + '次评估</span>'
                if (detailsArr.purple.length > 0) {
                    _html += '<span class="riskItem level4">传染病</span></p>'
                } else if (detailsArr.red.length > 0) {
                    _html += '<span class="riskItem level3">高风险</span></p>'
                } else if (detailsArr.orange.length > 0) {
                    _html += '<span class="riskItem level2">较高风险</span></p>'
                } else if (detailsArr.yellow.length > 0) {
                    _html += '<span class="riskItem level1">一般风险</span></p>'
                } else {
                    _html += '<span class="riskItem level0">低风险</span></p>'
                }
                _html += ' <a class="detailsBtn" index="' + i + '" href="javascript:;">查看详情></a>\
                        </div>\
                        <div class="content">\
                            <h2>评估信息</h2>\
                            <p><span>绿色（' + totalNumArr.green + '）项</span><span>黄色（' + totalNumArr.yellow + '）项</span><span>橙色（' + totalNumArr.orange + '）项</span><span>红色（' + totalNumArr.red + '）项</span><span>紫色（' + totalNumArr.purple + '）项</span></p>'
                if (detailsArr.purple.length > 0) {
                    _html += '<p><span>紫色(传染病) :</span><span class="text purpleText">'
                    for (let j = 0; j < detailsArr.purple.length; j++) {
                        _html += detailsArr.purple[j] + '<br>'
                    }
                    _html += '</span></p>'
                } else if (detailsArr.red.length > 0) {
                    _html += '<p><span>红色(高风险) :</span><span class="text redText">'
                    for (let j = 0; j < detailsArr.red.length; j++) {
                        // var '<p>' + detailsArr.orange[i] + '</p>'
                        // console.log(detailsArr.yellow[j])
                        _html += detailsArr.red[j] + '<br>'
                    }
                    _html += '</span></p>'
                } else if (detailsArr.orange.length > 0) {
                    _html += '<p><span>橙色(较高风险) :</span><span class="text orangeText">'
                    for (let j = 0; j < detailsArr.orange.length; j++) {
                        _html += detailsArr.orange[j] + '<br>'
                    }
                    _html += '</span></p>'
                } else if (detailsArr.yellow.length > 0) {
                    _html += '<p><span>黄色(一般风险) :</span><span class="text yellowText">'
                    for (let j = 0; j < detailsArr.yellow.length; j++) {
                        // var '<p>' + detailsArr.orange[i] + '</p>'
                        // console.log(detailsArr.yellow[j])
                        _html += detailsArr.yellow[j] + '<br>'
                    }
                    _html += '</span></p>'

                } else {
                    _html += '<p><span>绿色(低风险) :</span><span class="text greenText">'
                    for (let j = 0; j < detailsArr.green.length; j++) {
                        // var '<p>' + detailsArr.orange[i] + '</p>'
                        // console.log(detailsArr.yellow[j])
                        _html += detailsArr.green[j] + '<br>'
                    }
                    _html += '</span></p>'
                }
                _html += '<h2>备注信息</h2>\
                            <p class="remarksText">' + highRiskArr[i].remarks + '</p>\
                        </div>\
                        <div class="doctorSignature">\
                             <span>评估医生 : </span><img class="signatureImg" bigSrc="' + imgIp + highRiskArr[i].patientDoctorSignatureImage + '" src="' + imgIp + highRiskArr[i].patientDoctorSignatureImageMin + '" alt="">\
                        </div>\
                    </div>';
            }
            $(".assessBox").html(_html);
        }
        //  else if (data.status == 20250) {
        //     window.location = '/maternal-ipad/login/login.html';
        // } else {
        //     // $(".assessBox").html('');
        // }
    },
        function errfn(err) {
             layer.msg('操作失败，请稍后重试');
        });
    $(".assessBox").delegate(".detailsBtn", "click", function () {
        myLocal.setItem('maternalhighRiskDetails', highRiskArr[$(this).attr("index")]);
        window.location = '/maternal-ipad/particulars/assessmentParticulars.html';
    });
    // 查询高危列表-end
    // 查看大图-start
    $(".assessBox").delegate(".signatureImg", "click", function () {
        $('.bigImgContent').show();
        $('.shadow').show();
        $(".bigImgContent").find('img').attr("src", $(this).attr("bigSrc"));
        // 禁止屏幕滚动 
        document.body.addEventListener('touchmove', handle, false);
    })
    $(".bigImgContent").find("a").click(function () {
        $(".bigImgContent").hide();
        $('.shadow').hide();
        // 允许屏幕滑动
        document.body.removeEventListener('touchmove', handle, false);
    })
    // 查看大图-end
    layui.use('element', function () {
        var element = layui.element;
    });
    $('.backBtn').click(function () {
        window.location = '/maternal-ipad/management/management.html';
    });
    // 新增记录按钮
    $('.increased').click(function () {
        if ($('.recheck').hasClass('layui-this')) {
            window.location = '/maternal-ipad/added/addExamineParticulars.html?' + (patientArr.length + 1);
        } else if ($('.evaluate').hasClass('layui-this')) {
            window.location = '/maternal-ipad/addHighRisk/addHighRisk.html?' + (highRiskArr.length + 1);
        }
    });
    // 产后42天检查记录按钮点击
    $('.record').click(function(){
        $('.increased').hide();
        // 产后42天 42天之前不可以点击 图标显示
        var pregnant = localStorage.getItem('maternalpregnant');
        var reg = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
        var regular = pregnant.match(reg);  //正则删除不行，不知道为什么要必须在
        var pregnantYeay = RegExp.$1;
        var pregnantWeek = RegExp.$2;
        var pregnantDay = RegExp.$3;
        var oldDate = new Date(pregnantYeay + '/' + pregnantWeek + '/' + pregnantDay).getTime();
        var newDate = new Date().getTime();
        var expectedDate = new Date(oldDate + 3600 * 24 * 1000 * 42);
        var difference = expectedDate.getTime();
        function doubleZero(num) {
            return num < 10 ? '0' + num : num;
        }
        if (difference > newDate) {
            $('.increased2').hide();
        }else{
            $('.increased2').show();
            if ($('.increased2').show() && $('.increased2').hasClass('active') == false) {
                $('.notAvailable').show();
                $('.noneData3').hide();
            } 
        }
    });
    $('.evaluate').click(function () {
        $('.increased').show();
        $('.increased2').hide();
    });
    $('.recheck').click(function () {
        $('.increased').show();
        $('.increased2').hide();
    });
    $('.increased2').click(function(){
        if ($(this).hasClass('active')) {
                layer.msg('已有数据，请勿重复填写')
        }else{
            window.location = '/maternal-ipad/addFortyTwo/addFortyTwo.html';
        }
    })

    // 查询产后42天列表-start
    var postpartum = []; // 高危列表数据数组
    HttpRequstForPost(httpUrl.postpartumInquire, 'json', {
        "patientCenterId": myLocal.getItem("maternalrecordData").id,
        "token": token,
    }, function sucFn(data) {
        // console.log(data)
        postpartum  = data;
        if (data.status == 20200) {
            $('.checkDate').html(data.checkDate);
            $('.checkDay').html(data.checkDay+'天');
            if (data.feedingType == 1) {
                $('.feedingType').html('母乳');
            } else if (data.feedingType == 2) {
                $('.feedingType').html('混合');
            }else{
                $('.feedingType').html('人工喂养');
            }
            $('.baseBloodPressureHigh').html(data.baseBloodPressureHigh + '/' + data.baseBloodPressureLow );
            $('.baseWeight').html(data.baseWeight);
            // 乳房
            if (data.baseBreast == 0) {
                $('.baseBreast').html('未见异常');
            }else{
                $('.baseBreast').html('异常');
            }
             // 乳头
            if (data.baseNipple == 0) {
                $('.baseNipple').html('未见异常');
            } else {
                $('.baseNipple').html('异常');
            }
             // 乳汁
            if (data.baseLatex == 0) {
                $('.baseLatex').html('未见异常');
            } else {
                $('.baseLatex').html('异常');
            }

            // 外阴
            if (data.gynecologyVulva == 0) {
                $('.gynecologyVulva').html('未见异常');
            } else {
                $('.gynecologyVulva').html('异常');
            }  // 阴道
            if (data.gynecologyVagina == 0) {
                $('.gynecologyVagina').html('未见异常');
            } else {
                $('.gynecologyVagina').html('异常');
            }  // 宫颈
            if (data.gynecologyCervical == 0) {
                $('.gynecologyCervical').html('未见异常');
            } else {
                $('.gynecologyCervical').html('异常');
            }  // 子宫
            if (data.gynecologyUterus == 0) {
                $('.gynecologyUterus').html('未见异常');
            } else {
                $('.gynecologyUterus').html('异常');
            } //双侧附件
            if (data.gynecologyAttachmentOnBothSides == 0) {
                $('.gynecologyAttachmentOnBothSides').html('未见异常');
            } else {
                $('.gynecologyAttachmentOnBothSides').html('异常');
            } // 恶露
            if (data.gynecologyLochia == 0) {
                $('.gynecologyLochia').html('未见异常');
            } else {
                $('.gynecologyLochia').html('异常');
            }
            $('.babyWeight').val(data.babyWeight);
            $('.babyHigh').val(data.babyHigh);
            // 胸部
            if (data.babyChest == 0) {
                $('.babyChest').html('未见异常');
            } else {
                $('.babyChest').html('异常');
            }  // 心
            if (data.babyHeart == 0) {
                $('.babyHeart').html('未见异常');
            } else {
                $('.babyHeart').html('异常');
            }  // 肺
            if (data.babyLungs == 0) {
                $('.babyLungs').html('未见异常');
            } else {
                $('.babyLungs').html('异常');
            } 
            $('.noneData3').hide();
            $('.notAvailable').hide();
            $('.increased2').addClass('active');
        } 
        else if (data.status == 20250) {
            window.location = '/maternal-ipad/login/login.html';
        } else if (data.status == 20209) {
            $('.postpartum').html('').css('border','none');
            // window.location = '/maternal-ipad/login/login.html';
        } 
    },
        function errfn(err) {
            layer.msg('操作失败，请稍后重试');
        });
    $(".fortyTwoBox").delegate(".fortyTwoBtn", "click", function () {
        myLocal.setItem('maternalfortyTwoParticulars', postpartum);
        window.location = '/maternal-ipad/addFortyTwo/fortyTwoParticulars.html';
    });
    // 查询产后42天列表-end
    
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
                axisLabel:{
                    interval: 0,
                    formatter: function (value) {
                        var tempInt = value*1;
                        if (tempInt % 2 == 0 || tempInt == 13)//如果类目项的文字大于3,
                        {
                            return value;
                        }else {
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
            "centerId": myLocal.getItem("maternalrecordData").id,
            "token": token,
        }, function sucFn(data) {
            if (data.status == 20200) {
                var patientBMIBeanList = data.patientBMIBeanList;
                var a;
                for (let i = 0; i < patientBMIBeanList.length; i++) {
                    var tempArr = [];
                    a = JSON.parse(patientBMIBeanList[i].newAgeOfMenarche)
                    a = a*1-13;
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
        },function errfn(err) {
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

$(function() {
    var xData = [];
    var yData = [];
    // 患者信息-start
    var patientInfo = myLocal.getItem("maternalrecordData");
    console.log(patientInfo)
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
    // 阻止屏幕滑动
    var handle = function (event) {
        event.preventDefault();
    }
    // 高危详情-start
    var data = myLocal.getItem('maternalhighRiskDetails');
    var NumArr = eval('(' + data.totalNum + ')');
    localStorage.setItem('maternalgardenIcon', JSON.stringify(NumArr))
    $(".highRiskDetails").val("绿色（" + NumArr.green + "）项   黄色（" + NumArr.yellow + "）项  橙色（" + NumArr.orange + "）项  红色（" + NumArr.red + "）项  紫色（" + NumArr.purple + "）项"); // 高危因素
    $(".createDate").html(data.createDate); // 创建时间
    $(".weeksDay").html(data.newAgeOfMenarche + '周' + (data.newAgeOfMenarcheDay ? '+' + data.newAgeOfMenarcheDay + '天' : ''));
    $(".checkNumber").html(data.checkNumber);
    var totalNumArr = eval("(" + data.totalNum + ")");
    var detailsArr = eval("(" + data.details + ")");
    
    if (detailsArr.purple.length > 0) {
        $(".riskItem").html("传染病").addClass("level4");
    } else if (detailsArr.red.length > 0) {
        $(".riskItem").html("高风险").addClass('level3');
    } else if (detailsArr.orange.length > 0) {
        $(".riskItem").html("较高风险").addClass("level2");
    } else if (detailsArr.yellow.length > 0) {
        $(".riskItem").html("一般风险").addClass('level1');
    } else {
        $(".riskItem").html("低风险").addClass('level0');
    }
    for (let i = 0; i < detailsArr.yellow.length; i++) {
            $(".yellowText").append('<p>' + detailsArr.yellow[i] + '</p>')
    }
    for (let i = 0; i < detailsArr.orange.length; i++) {
            $(".orangeText").append('<p>' + detailsArr.orange[i] + '</p>')
    }
    for (let i = 0; i < detailsArr.red.length; i++) {
        $(".redText").append('<p>' + detailsArr.red[i] + '</p>')
    }
    for (let i = 0; i < detailsArr.purple.length; i++) {
        $(".purpleText").append('<p>' + detailsArr.purple[i] + '</p>')
    }
    $(".countNum").html(totalNumArr.yellow * 5 + totalNumArr.orange * 10 + totalNumArr.red * 20 + '分');
    $(".patientImg").attr("src", imgIp + data.patientSignatureImageMin).attr("bigSrc", imgIp + data.patientSignatureImage)
    $(".doctorImg").attr("src", imgIp + data.patientDoctorSignatureImageMin).attr("bigSrc", imgIp + data.patientDoctorSignatureImage)
    // 高危详情-end
    // 完成按钮
    $(".finish").click(function() {
        window.location = '/maternal-ipad/center/center.html';
    })
    // 查看大图-start
    $(".assessBox").delegate(".signatureImg", "click", function() {
        $('.bigImgContent').show();
        $('.shadow').show();
        $(".bigImgContent").find('img').attr("src", $(this).attr("bigSrc"));
        //禁止屏幕滑动
        document.body.addEventListener('touchmove', handle, false);
      
    });
    $(".bigImgContent").find("a").click(function() {
        layer.closeAll();
        $(".bigImgContent").hide();
        $('.shadow').hide();
        // // 允许屏幕滑动
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
            "centerId": myLocal.getItem("maternalrecordData").id,
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
})

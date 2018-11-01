$(function () {
    var xData = [];
    var yData = [];
    // 阻止屏幕滑动
    var handle = function (event) {
        event.preventDefault();
    }
    // 患者信息-start
    var patientInfo = myLocal.getItem("maternalrecordData");
    console.log(patientInfo)
    var data = myLocal.getItem("maternalrecordDetails");
    var padCheckForWeekBeanList = []; //模板数组
    var fileAllArr = []; //所有图片原始资源
    var fileOldArr = [];// 删除的文件路径
    // var delefileArr = [] ; //删除加载后的图片的地址
    // var remainingFileArr = []; //剩下的图片的地址
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
    var totalNumArr = eval('(' + patientInfo.highRiskTotalNum + ')');
    $(".highRiskDetails").val("绿色（" + totalNumArr.green + "）项   黄色（" + totalNumArr.yellow + "）项  橙色（" + totalNumArr.orange + "）项  红色（" + totalNumArr.red + "）项  紫色（" + totalNumArr.purple + "）项"); // 高危因素
    layui.use('form', function () {
        var form = layui.form;
        form.render();
    });
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
    // 内容
    console.log(data);
    $('.choiceTime').val(data.checkDate);
    $('.degree').val(data.ordinalNumber);
    $('.gestationalWeek').val(data.gestationalWeek);
    $('.weight').val(data.bodyWeight);
    $('.hyperpiesia').val(data.bloodPressureHigh);
    $('.lowTension').val(data.bloodPressureLow);
    $('.fundalHeight').val(data.highPalace);
    $('.waistline').val(data.abdominalGirth);
    $('.subscribe').val(data.makeAppointmentTime);
    if (data.position == 0) {
        $('.position').html('未填写')
    } else if (data.position == 1) {
        $('.position').html('枕左前位')
    } else if (data.position == 2) {
        $('.position').html('枕右横位')
    } else {
        $('.position').html('枕右前位')
    }
    if (data.presentation == 0) {
        $('.presentation').html('未填写')
    } else if (data.presentation == 1) {
        $('.presentation').html('头先露')
    } else {
        $('.presentation').html('臀先露')
    }
    if (data.cardiac == 0) {
        $('.cardiac').html('未填写')
    } else if (data.cardiac == 1) {
        $('.cardiac').html('正常')
    } else {
        $('.cardiac').html('异常')
    }
    if (data.cohesion == 0) {
        $('.cohesion').html('未衔接')
    } else if (data.cohesion == 1) {
        $('.cohesion').html('已衔接')
    }else{
        $('.cohesion').html('未填写')
    }
    if (data.edema == 0) {
        $('.edema').html('无')
    } else if (data.edema == 1) {
        $('.edema').html('轻')

    } else if (data.edema == 2) {
        $('.edema').html('中')
    } else {
        $('.edema').html('重')
    }
    if (data.urineProtein == 0) {
        $('.urineProtein').html('正常')
    } else if (data.urineProtein == 1) {
        $('.urineProtein').html('+1')
    } else if (data.urineProtein == 2) {
        $('.urineProtein').html('+2')
    } else {
        $('.urineProtein').html('+3')
    }
    $('.discomfort').val(data.malaise);
    $('.handling').val(data.guideTheProcessing);
    var imgObj = eval("(" + data.doctorImg + ")");
    $(".loockBigImg").attr("src", imgIp + imgObj.minImageURL).attr("bigSrc", imgIp + imgObj.maxImageURL)

    layui.use(['layer', 'form', 'element', 'laydate'], function () {
        var layer = layui.layer,
            form = layui.form,
            element = layui.element,
            laydate = layui.laydate;
        form.render();
        //……
        //你的代码都应该写在这里面
        laydate.render({
            elem: '#test1', //指定元素,
        });
        //日期时间选择器
        laydate.render({
            elem: '#test2',
            type: 'datetime'
        });

    });
  

    // 图片展示
    if (data.imageList == '') {
        imgArray = '';
    }else{
        var imgArray = eval("(" + data.imageList + ")");
    }
    var _imgArray = '';
    for (var i = 0; i < imgArray.length; i++) {
        _imgArray += "<div class='imgBocFile oldImg' imgData='" + JSON.stringify(imgArray[i])+"'>"
        _imgArray += '<img class="imgArrayList lookBigImg" src="' + imgIp + imgArray[i].minImageURL + '" alt=""  bigSrc= "' + imgIp + imgArray[i].maxImageURL + '">\
                        <img src="/maternal-ipad/added/dele.png" alt="删除" class="delFileBtn oldDel"></div>'
    }
    $('.imgBox').append(_imgArray);
 

    // 拍照上传 添加图片
    $("#upimg4").change(function () {
        var uploadFile = $("#upimg4")[0].files; // 某一块添加时的原始数据
        var _html ='';
        var fileLength = 0;
        var reader = new FileReader();
        reader.readAsDataURL(uploadFile[fileLength]);
        reader.onload = function (e) {
            if (e.target.result) {
                // 过滤重复
                var flag = true;
                for (var i = 0; i < fileAllArr.length; i++) {
                    if (fileAllArr[i].name == uploadFile[fileLength].name) {
                        flag = false;
                    }
                }
                if (flag) {
                    if (/(.png|.jpg|.jpeg)$/gi.test(uploadFile[fileLength].name)) {
                        // fileAllArr.push({
                        //     "name": uploadFile[fileLength].name,
                        //     "value": uploadFile[fileLength],
                        // });
                        $(".imgBox").append('<div class="imgBocFile newImg" name="' + uploadFile[fileLength].name + '"><img class="lookBigImg" src="' + e.target.result + '" bigSrc="' + e.target.result + '">\
                        <img src="/maternal-ipad/added/dele.png" alt="删除" class="delFileBtn newDel"></div>');
                        render(uploadFile[fileLength].name, e.target.result);

                    } else {
                        layer.msg('请上传png/jpg类型的文件');
                    }
                }else{

                }
                fileLength++;
                if (fileLength < uploadFile.length) {
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
            var blob = canvas.toDataURL("image/jpeg");
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
    // 删除已有的图片
    $(".imgBox").delegate(".oldDel", "click", function () {
        var delImgData = eval("(" + $(this).parent(".oldImg").attr("imgData") + ")");
        console.log(delImgData);
        fileOldArr.push(delImgData.maxImageURL);
        fileOldArr.push(delImgData.minImageURL);
        $(this).parent(".oldImg").remove();
    })
    // 修改图片
    // id           	编号	
    // patientCenterId		centerId	
    // patientName		患者姓名	
    // deleteImageURLList		删除文件url	
    // imageList	修改后的图片地址 - 前台处理	
    // addImageFile	[file]	新增文件
    $('.accomplish').click(function () {
        var fileData = new FormData();
        fileData.append('patientCenterId', data.patientCenterId);
        fileData.append('id', data.id);
        fileData.append('patientName', patientInfo.checkName);
        fileData.append('ordinalNumber', data.ordinalNumber);
        // 删除文件url
        fileData.append('deleteImageURLList', JSON.stringify(fileOldArr));
        // imageList 修改后的图片地址 - 前台处理	
        fileData.append('imageList', data.imageList);
        fileData.append('token', token);
        // 新增的图片
        for (var i = 0; i < fileAllArr.length; i++) {
            fileData.append("addImageFile", base64ToBlob(fileAllArr[i].value), fileAllArr[i].name);
        }
        HttpRequstFromDataForPost(httpUrl.modificationUpdate, 'json', fileData, function sucFn(data) {
            if (data.status == 20200) {
                layer.msg('修改成功');
                window.location = '/maternal-ipad/center/center.html';
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

    $('.comeBack').click(function(){
        window.location = '/maternal-ipad/center/center.html';
    });

    // 查看大图-start
    $(".imgBox").delegate(".lookBigImg", "click", function () {
        $('.lookBigImgaes').show();
        $(".lookBigImgaes").find('img').attr("src", $(this).attr("bigSrc"));
        document.body.addEventListener('touchmove', handle, false);
        // e.stopPropagation();
    });
    $(".lookBigImgaes").click(function () {
        $(this).hide();
        document.body.removeEventListener('touchmove', handle, false);
    });

    // 阻止屏幕滑动
    var handle = function (event) {
        event.preventDefault();
    }
    // 操作医生的查看大图-start
    $(".operationDoctor").delegate(".signatureImg", "click", function () {
        $('.bigImgContent').show();
        $('.shadow').show();
        $(".bigImgContent").find('img').attr("src", $(this).attr("bigSrc"));
        //禁止屏幕滑动
        document.body.addEventListener('touchmove', handle, false);
    });
    $(".bigImgContent").find("a").click(function () {
        layer.closeAll();
        $(".bigImgContent").hide();
        $('.shadow').hide();
        // // 允许屏幕滑动
        document.body.removeEventListener('touchmove', handle, false);
    });
    // 查看大图-end

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
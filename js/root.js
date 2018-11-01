// var IP = 'http://192.168.0.6:8763/'
// var imgIp = 'http://192.168.0.6:8763'; //图片ip地址

// var IP = 'http://192.168.0.6:8080/pregnant/'
// var imgIp = 'http://192.168.0.6:8080/pregnant'; //图片ip地址

// var IP = 'http://192.168.0.172:8763/'
// var imgIp = 'http://192.168.0.172:8763/'; //图片ip地址

// var IP = 'http://www.wcqxzs.com:8763/';
// var imgIp = 'http://www.wcqxzs.com:8763'; //图片ip地址

var IP =  'http://www.wcqxzs.com/pregnant/';
var imgIp =  'http://www.wcqxzs.com/pregnant';




var RegExpObj = {
    Reg_IDCardNo: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/, // 身份证
    Reg_TelNo: /^1[3|4|5|7|8]\d{9}$/, // 手机号
    Reg_PassWord: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/, // 登录密码
    Reg_Number: /^\d{6}$/, // 验证数字
    Reg_figure: /^\d+(\.\d+)?$/, //验证带小数点的数字
    Reg_Name: /^[\u4e00-\u9fa5]{2,6}$/, //验证名字
    Reg_Text: /[0-9a-zA-Z\u4e00-\u9fa5`~!@#$^&*\\()=|{}':;',\\\\.<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%+_]/,
    Reg_email: /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/, //邮箱
};
// $(function () {
    // if(!$.cookie('token')){
    //     if (window.location.pathname != '/union/login/login.html'){
    //         window.location = '/union/login/login.html';
    //     }
    // }

// })


var httpUrl = {
    login: IP + "v1/web/pad/login", // 登录接口
    countForFiling: IP + "v1/web/pad/patientCenter/countForFiling", //档案列表 - 查询数量
    findListWithParamForFiling: IP + "v1/web/pad/patientCenter/findListWithParamForFiling", // 档列表查询
    insertForFiling: IP + "v1/web/pad/patientCheck/insertForFiling", //  B1 基本信息-新增
    updateForFiling: IP + "v1/web/pad/patientCheck/updateForFiling", // B1 基本信息-修改
    essentialInquire: IP + "v1/web/pad/patientCheck/findForFiling", // B1 基本信息-查询
    spouseInsertForFiling: IP + "v1/web/pad/patientHusbands/insertForFiling", // B2 配偶信息-新增
    SpouseInformationModification: IP + "v1/web/pad/patientHusbands/updateForFiling", // B2 配偶信息-更新
    mateNewsInquire: IP + "v1/web/pad/patientHusbands/findForFiling", // B2 配偶信息-查询
    pregnancyInsertForFiling: IP + "v1/web/pad/patientParturitionDetail/insertForFiling", // B3 孕检信息-添加（包含孕产史）
    pregnancyModification: IP + "v1/web/pad/patientParturitionDetail/updateForFiling", //B3 孕检信息-修改（不包含孕产史）
    pregnantWomenCheck: IP + "v1/web/pad/patientParturitionDetail/findForFiling", //B3 孕妇检查-查询
    historyGestation: IP + "v1/web/pad/patientParturitionDetailHistory/updateForFiling", //B3 孕检信息-孕产史-修改
    inquireHistoryGestation: IP + "v1/web/pad/patientParturitionDetailHistory/findList", //B3 孕检信息-孕产史-查询孕产史
    signatureConfirmationForFiling: IP + "v1/web/pad/patientCenter/signatureConfirmationForFiling", //B6 档案-保存为已建档案状态 包含第一次高危评估结果
    physiqueInsertForFiling: IP + "v1/web/pad/patientHealthCheck/insertForFiling", // B4 体格检查-新增
    modificationPhysique: IP + "v1/web/pad/patientHealthCheck/updateForFiling", //B4 体格检查-更新
    findById: IP + "v1/web/pad/patientHealthCheck/findById", //B4 体格检查-查询-通过id
    insertAndImage: IP + "v1/web/pad/patientHighRiskGrade/insertAndImage", //  高危评估表新增
    findSelfHospital: IP + "v1/web/pad/hospital/findSelfHospital", // D1 查询本院信息
    updateSelfHospital: IP + "v1/web/pad/hospital/updateSelfHospital", // D1 修改
    findList: IP + "v1/web/pad/deptSimple/findList", // D2 科室查询列表
    update: IP + "v1/web/pad/deptSimple/update", //D2 科室修改
    insertDept: IP + "v1/web/pad/deptSimple/insert", // D2 添加科室
    findTreeList: IP + "v1/web/pad/highRiskGradeTemplateDetail/findTreeList", // B5 高危评估表-获取tree结构数据
    updateSelf: IP + "v1/web/pad/doctor/updateSelf", // D5 修改自己信息
    findSelf: IP + "v1/web/pad/doctor/findSelf", // D5 查询个人信息
    findSelfDoctorList: IP + "v1/web/pad/doctor/findSelfDoctorList", // D3 查询列表
    insert: IP + "v1/web/pad/doctor/insert", // D3 添加用户
    updateOtherPassword: IP + "v1/web/pad/doctor/updateOtherPassword", // D3 重置他人密码-默认密码为123456
    updateDoctor: IP + "v1/web/pad/doctor/update", //D3 人员修改
    updateSelfPassword: IP + "v1/web/pad/doctor/updateSelfPassword", // D6 修改自己密码-修改成功需重新登录
    updateTitle: IP + "v1/web/pad/occupation/update", // D4 修改职称
    findListTitle: IP + "v1/web/pad/occupation/findList", // D4 查询职称列表
    insertTitle: IP + "v1/web/pad/occupation/insert", // D4 职称添加
    signOut: IP + "v1/web/pad/signOut", // 登出
    addRecord: IP + "v1/web/pad/patientSecondCheck/insert", // C1 添加复检记录
    findListByCenterId: IP + "v1/web/pad/patientSecondCheck/findListByCenterId", // C1 查询复检记录 根据centerId
    modificationUpdate: IP + "v1/web/pad/patientSecondCheck/update", //C1 复检记录-修改-只修改文件
    highRiskfindList: IP + "v1/web/pad/patientHighRiskGrade/findList", // C2 高危评估记录-查询列表
    templateInquire: IP + "v1/web/pad/checkForWeek/findList", // C1 预约复检模版查询
    templateMalaise: IP + "v1/web/pad/templateMalaise/findList", // temp 自觉不适-查询列表
    instruction: IP + "v1/web/pad/templateDispose/findList", // temp 指导意见-查询列表
    findListForSpellName: IP + "v1/web/pad/anamnesisIllness/findListForSpellName", // temp 疾病史/家族史
    poisonTemplate: IP + "v1/web/pad/poisonTemplate/findListForLike", //temp 接触毒物查询
    patientBMI: IP + "v1/web/pad/patientBMI/findListByCenterId", //E1 BMI查询列表
    templateDiagnose: IP + "v1/web/pad/templateDiagnose/findList", // temp 诊断-查询
    postpartumNew: IP + "v1/web/pad/patientFourtyTwo/insert", //F1 产后四十二天-新增
    postpartumInquire: IP + "v1/web/pad/patientFourtyTwo/findByCenterId", // F2 产后42天查询
    countEntityWithWeekDateAndFilingType: IP + "v1/web/pad/patientCenter/countEntityWithWeekDateAndFilingType", // G1 孕周查询 包含总数和第一页数据
    countEntityWithMakeAppointmentTime: IP + "v1/web/pad/patientCenter/countEntityWithMakeAppointmentTime", // G2 就诊查询 包含总数和第一页数据
    countEntityForOthers: IP + "v1/web/pad/patientCenter/countEntityForOthers", // G3 查询其他-按条件检索
    countEntityNumberForOthers: IP + "v1/web/pad/patientCenter/countEntityNumberForOthers", //G3 查询其他-统计数量
   
   
};

//判断是否为苹果
var isIPHONE = navigator.userAgent.toUpperCase().indexOf('IPHONE') != -1;
// 元素失去焦点隐藏iphone的软键盘
function objBlur(id, time) {
    if (typeof id != 'string') throw new Error('objBlur()参数错误');
    var obj = document.getElementById(id),
        time = time || 300,
        docTouchend = function (event) {
            if (event.target != obj) {
                setTimeout(function () {
                    obj.blur();
                    document.removeEventListener('touchend', docTouchend, false);
                }, time);
            }
        };
    if (obj) {
        obj.addEventListener('focus', function () {
            document.addEventListener('touchend', docTouchend, false);
        }, false);
    } else {
        // throw new Error('objBlur()没有找到元素');
    }
}

if (isIPHONE) {
    var input = new objBlur('input');
    input = null;
}

// 输入身份证号自动计算年龄 性别 idCard
function discriCard(UUserCard) {
    // var unit = '岁'; // 单位
    var num = 0; // 值
    if (UUserCard.length == 18) {
        //获取出生日期
        var userYear = UUserCard.substring(6, 10);
        var userMonth = UUserCard.substring(10, 12);
        var userDay = UUserCard.substring(12, 14);
        $('.pregnantDateBirth').val(userYear +'-'+ userMonth+'-' + userDay);
        //获取性别
        if (parseInt(UUserCard.substr(16, 1)) % 2 == 1) {
            $('.birth_sex').html('男');
        } else {
            $('.birth_sex').html('女');
        }
    } else {
        var userYear = 19 + UUserCard.substring(6, 8);
        var userMonth = UUserCard.substring(8, 10);
        var userDay = UUserCard.substring(10, 12);
        //获取性别
        if (parseInt(UUserCard.substring(14, 15)) % 2 == 1) {
            $('.birth_sex').html('男');
        } else {
            $('.birth_sex').html('女');
        }
    }
    var myDate = new Date();
    var year = myDate.getFullYear(); // 当前年份
    var month = myDate.getMonth() + 1; // 当前月份
    var day = myDate.getDate(); // 当前号数
    if (year - userYear > 0) {
        num = year - userYear;
        unit = '岁';
    } else if (month - userMonth > 0) {
        num = month - userMonth;
        unit = '月';
    } else if (day - userDay >= 0) {
        num = day - userDay;
        unit = '天';
    } else {
        layer.msg('输入内容格式有误，请修改');
    }
    $('.birth_age').html(num);
}
function mateCard(UUserCard) {
    // var unit = '岁'; // 单位
    var num = 0; // 值
    if (UUserCard.length == 18) {
        //获取出生日期
        var userYear = UUserCard.substring(6, 10);
        var userMonth = UUserCard.substring(10, 12);
        var userDay = UUserCard.substring(12, 14);
    } 
    var myDate = new Date();
    var year = myDate.getFullYear(); // 当前年份
    var month = myDate.getMonth() + 1; // 当前月份
    var day = myDate.getDate(); // 当前号数
    if (year - userYear > 0) {
        num = year - userYear;
        unit = '岁';
    }
    $('.spouseAge').val(num);
}
var token = window.localStorage.getItem('maternaltoken');

function HttpRequstForPost(httpUrl, dataType, dataFrom, sucFn, errFn) {
    // var tempFormdata = new FormData();
    // tempFormdata.append("username","18801370533");
    // tempFormdata.append("password", "123456");
    // // if (token == "" && httpUrl != httpUrl.login) {
    // //     window.location.href = '/maternal-ipad/login/login.html';
    // // } else if (token != "" && httpUrl != httpUrl.login ) {
        
    // // }
    var msg = layer.msg('处理中，请稍候', {
        icon: 16,
        shade: 0.4,
        time: false //取消自动关闭
    });
    $.ajax({
        type: 'POST',
        url: httpUrl,
        xhrFields: {
            withCredentials: false
        },
        dataType: dataType,
        data: dataFrom,
        success: function (data) {
            if (httpUrl == (IP + 'v1/web/pad/login') && data.status == 20200) {
                token = data.token;
                window.localStorage.setItem('maternaltoken', token);
            }
            if (data.status == 20250) {
                window.location = '/maternal-ipad/login/login.html';
                return;
            }
            layer.close(msg);
            sucFn(data);
        },
        error: function (err) {
            layer.close(msg);
            layer.msg('操作失败，请稍后重试');
            errFn(err);
        },
    });
}

function HttpRequstFromDataForPost(httpUrl, dataType, dataFrom, sucFn, errFn) {
    // var tempFormdata = new FormData();
    // tempFormdata.append("username","18801370533");
    // tempFormdata.append("password", "123456");
    // // if (token == "" && httpUrl != httpUrl.login) {
    // //     window.location.href = '/maternal-ipad/login/login.html';
    // // } else if (token != "" && httpUrl != httpUrl.login ) {

    // // }
    var msg = layer.msg('处理中，请稍候', {
        icon: 16,
        shade: 0.4,
        time: false //取消自动关闭
    });
    $.ajax({
        type: 'POST',
        url: httpUrl,
        xhrFields: {
            withCredentials: false
        },
        dataType: dataType,
        data: dataFrom,
        contentType: false,
        processData: false,
        success: function (data) {
            layer.close(msg);
            if (httpUrl == (IP + 'v1/web/pad/login') && data.status == 20200) {
                token = data.token;
                window.localStorage.setItem('maternaltoken', token);
            }
            sucFn(data);
        },
        error: function (err) {
            layer.close(msg);
            layer.msg('操作失败，请稍后重试');
            errFn(err);
        },
    });
}

function HttpRequstForGet(httpUrl, dataType, sucFn, errFn) {
    var msg = layer.msg('处理中，请稍候', {
        icon: 16,
        shade: 0.4,
        time: false //取消自动关闭
    });
    $.ajax({
        type: 'GET',
        url: httpUrl,
        xhrFields: {
            withCredentials: false
        },
        dataType: dataType,
        success: function (data) {
            layer.close(msg);
            if (data.status == 20250) {
                window.location = '/maternal-ipad/login/login.html';
                return;
            }
            sucFn(data);
        },
        error: function (err) {
            layer.close(msg);
            layer.msg('操作失败，请稍后重试');
            errFn(err);
        },
    });
}
// 签名
function lineCanvas(obj, fn) {
    var tempArr = [];
    this.linewidth = 1;
    this.color = "#000000";
    this.background = "#ffffff";
    for (var i in obj) {
        this[i] = obj[i];
    };
    this.canvas = document.createElement("canvas");
    this.el.appendChild(this.canvas);
    this.cxt = this.canvas.getContext("2d");
    this.canvas.width = this.el.clientWidth;
    this.canvas.height = this.el.clientHeight;
    this.cxt.fillStyle = this.background;
    this.cxt.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.cxt.strokeStyle = this.color;
    this.cxt.lineWidth = this.linewidth;
    this.cxt.lineCap = "round";
    var tempArr = obj['imagePathArr'];
    if (tempArr != null || tempArr.length != 0) {
        this.cxt.beginPath();
        var tempPath;
        var pathType;
        var pathX;
        var pathY;
        for (i = 0; i < tempArr.length; i++) {
            tempPath = tempArr[i];
            pathType = tempPath.pathType;
            pathX = tempPath.x;
            pathY = tempPath.y;
            if (pathType == 'beginPath') {
                this.cxt.beginPath();
                this.cxt.moveTo(pathX, pathY);
            } else if (pathType == 'lineTo') {
                this.cxt.lineTo(pathX, pathY);
                this.cxt.stroke();
            }
        }
        this.cxt.closePath();
    }
    //开始绘制
    this.canvas.addEventListener("touchstart", function (e) {
        this.cxt.beginPath();
        this.cxt.moveTo(e.changedTouches[0].pageX - $(this.el).offset().left, e.changedTouches[0].pageY - $(this.el).offset().top);
        tempArr.push({ 'pathType': 'beginPath', 'x': (e.changedTouches[0].pageX - $(this.el).offset().left), 'y': (e.changedTouches[0].pageY - $(this.el).offset().top) });
    }.bind(this), false);

    //绘制中
    this.canvas.addEventListener("touchmove", function (e) {
        this.cxt.lineTo(e.changedTouches[0].pageX - $(this.el).offset().left, e.changedTouches[0].pageY - $(this.el).offset().top);
        tempArr.push({ 'pathType': 'lineTo', 'x': (e.changedTouches[0].pageX - $(this.el).offset().left), 'y': (e.changedTouches[0].pageY - $(this.el).offset().top) });
        this.cxt.stroke();
    }.bind(this), false);

    //结束绘制
    this.canvas.addEventListener("touchend", function () {
        this.cxt.closePath();
    }.bind(this), false);

    //清除画布
    this.clearEl.addEventListener("click", function () {
        tempArr.length = 0;
        this.cxt.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.background = "#ffffff";
    }.bind(this), false);
    //保存图片，直接转base64
        // 确保要保存的图片都加载完成再执行canvas.toDataURL('image/png')  
        this.saveEl.addEventListener("click", function () {
            if (tempArr.length == 0) {
                fn(null, tempArr);
                return;
            }
            var imgBase64 = this.canvas.toDataURL('image/png', 0.8);
            fn(imgBase64, tempArr);
        }.bind(this), false);
};
function base64ToBlob(urlData) {
    var arr = urlData.split(',');
    var mime = arr[0].match(/:(.*?);/)[1] || 'image/png';
    // 去掉url的头，并转化为byte
    var bytes = window.atob(arr[1]);
    // 处理异常,将ascii码小于0的转换为大于0
    var ab = new ArrayBuffer(bytes.length);
    // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
    var ia = new Uint8Array(ab);
    // console.log(mime);
    for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }
    var doctorImageName = new Blob([ab], {
        type: mime
    });
    return doctorImageName;
}


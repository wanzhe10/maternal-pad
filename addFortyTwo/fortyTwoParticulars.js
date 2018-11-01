
$(function(){
    var xData = [];
    var yData = [];
    // 患者信息-start
    var fortyTwoParticulars = myLocal.getItem("maternalfortyTwoParticulars");
    // console.log(fortyTwoParticulars)
    var padCheckForWeekBeanList = []; //模板数组
    var fileAllArr = []; //所有图片原始资源
    var doctorImg = ''; // 医生签名
    var doctorImgArr = []; // 医生签名
    $('.checkDate').val(fortyTwoParticulars.checkDate);
    $('.degree').val(fortyTwoParticulars.checkDay);
    $('.hyperpiesia').val(fortyTwoParticulars.baseBloodPressureHigh);
    $('.lowTension').val(fortyTwoParticulars.baseBloodPressureLow);
    $('.weight').val(fortyTwoParticulars.baseWeight);
    // 乳房
    if (fortyTwoParticulars.baseBreast == 0) {
        $('.baseBreast').html('未见异常');
    } else {
        $('.baseBreast').html('异常');
    }
    // 乳头
    if (fortyTwoParticulars.baseNipple == 0) {
        $('.baseNipple').html('未见异常');
    } else {
        $('.baseNipple').html('异常');
    }
    // 乳汁
    if (fortyTwoParticulars.baseLatex == 0) {
        $('.baseLatex').html('未见异常');
    } else {
        $('.baseLatex').html('异常');
    }

    // 外阴
    if (fortyTwoParticulars.gynecologyVulva == 0) {
        $('.gynecologyVulva').html('未见异常');
    } else {
        $('.gynecologyVulva').html('异常');
    }  // 阴道
    if (fortyTwoParticulars.gynecologyVagina == 0) {
        $('.gynecologyVagina').html('未见异常');
    } else {
        $('.gynecologyVagina').html('异常');
    }  // 宫颈
    if (fortyTwoParticulars.gynecologyCervical == 0) {
        $('.gynecologyCervical').html('未见异常');
    } else {
        $('.gynecologyCervical').html('异常');
    }  // 子宫
    if (fortyTwoParticulars.gynecologyUterus == 0) {
        $('.gynecologyUterus').html('未见异常');
    } else {
        $('.gynecologyUterus').html('异常');
    }  //双侧附件
    if (fortyTwoParticulars.gynecologyAttachmentOnBothSides == 0) {
        $('.gynecologyAttachmentOnBothSides').html('未见异常');
    } else {
        $('.gynecologyAttachmentOnBothSides').html('异常');
    } // 恶露
    if (fortyTwoParticulars.gynecologyLochia == 0) {
        $('.gynecologyLochia').html('未见异常');
    } else {
        $('.gynecologyLochia').html('异常');
    }
    $('.babyweight').val(fortyTwoParticulars.babyWeight);
    $('.babyheight').val(fortyTwoParticulars.babyHigh);
    // 胸部
    if (fortyTwoParticulars.babyChest == 0) {
        $('.babyChest').html('未见异常');
    } else {
        $('.babyChest').html('异常');
    }  // 心
    if (fortyTwoParticulars.babyHeart == 0) {
        $('.babyHeart').html('未见异常');
    } else {
        $('.babyHeart').html('异常');
    }  // 肺
    if (fortyTwoParticulars.babyLungs == 0) {
        $('.babyLungs').html('未见异常');
    } else {
        $('.babyLungs').html('异常');
    } 
    // 喂养方式
    if (fortyTwoParticulars.feedingType == 1) {
        $('.breastMilk').addClass('active');

    } else if (fortyTwoParticulars.feedingType == 2) {
        $('.mixture').addClass('active');

    } else {
        $('.artificial').addClass('active');
    }

    $('.malaise').val(fortyTwoParticulars.malaise);
    $('.guideTheProcessing').val(fortyTwoParticulars.guideTheProcessing);
    var imgObj = eval("(" + fortyTwoParticulars.doctorImg + ")");
    // console.log(imgObj)
    $(".minImageURL").attr("src", imgIp + imgObj.minImageURL).attr("bigSrc", imgIp + imgObj.maxImageURL)


    // 阻止屏幕滑动
    var handle = function (event) {
        event.preventDefault();
    }
    // 操作医生的查看大图-start
    $(".minImageURL").click(function () {
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
   

    // 放弃本次编辑
    $(".accomplish").click(function () {
        window.location = '/maternal-ipad/center/center.html';
    });
});

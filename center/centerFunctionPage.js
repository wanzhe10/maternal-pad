/*
 * @Author: wanjunliang 
 * @Date: 2018-07-12 11:44:10 
 * @Last Modified by: wanjunliang
 * @Last Modified time: 2018-10-30 14:23:56
 */

$(function () {
    // var smoking = '';
    var smokingRadio = ''; // 支烟
    var poison = ''; //接触毒物
    var centerId = '';
    var contactToxicDate = ''; // 时间
    var contactToxicName = ''; //接触毒物名称
    var contactRadioactiveRays = ''; //接触放射性
    // var virusInfectionOther = '' //病毒其他
    var fiveArr = []; //5分数组
    var tenArr = []; //10分数组
    var twentyArr = []; //20分数组
    var purpleArr = []; // 紫色数组
    var patientImg = ''; // 患者签名
    var doctorImg = ''; // 医生签名
    // var totalNum = myLocal.getItem('highRiskDetails');
    var totalNum = myLocal.getItem('maternalrecordData');
    // console.log(totalNum);
    // var NumArr = eval('(' + totalNum.highRiskTotalNum + ')');
    var NumArr = eval('(' + localStorage.getItem('maternalgardenIcon')+ ')');

    // console.log(NumArr)
    if (NumArr.purple >0) {
        $('.preview').html('传染病').addClass('level4');
    } else if (NumArr.red > 0){
        $('.preview').html('高风险').addClass('level3');
    } else if (NumArr.orange > 0){
        $('.preview').html('较高风险').addClass('level2');
    } else if (NumArr.yellow > 0) {
        $('.preview').html('一般风险').addClass('level1');
    } else if (NumArr.green > 0) {
        $('.preview').html('低风险').addClass('level0');
    }

    var recordData = JSON.parse(localStorage.getItem('maternalrecordData'))
    centerId = recordData.id;

    // 孕妇基本信息查询
    HttpRequstForPost(httpUrl.essentialInquire, 'json', {
        'id': recordData.checkId,
        "token": token,
    }, function sucFn(data){
        // console.log(data);
            if (data.status == 20200) {
                $('.pregnantName').attr('id', data.id);
                $('.pregnantName').html(data.name);
                $('.name').html(data.name);
                $('.pregnantFN').html(data.number);
                $('.pregnantPhone').html(data.telephone);
                $('.pregnantIdCard').html(data.idCard);
                if (data.idCardType == '0') {
                    $('.idType').html('身份证');
                } else {
                    $('.idType').html('护照');
                }
                $('.pregnantDateBirth').html(data.birthdayDate);
                $('.pregnantMarriageAge').html(data.marryAge +'岁');
                $('.birth_age').html(data.age +'岁');
                if (data.sex == 0) {
                    $('.birth_sex').html('男');
                }else{
                    $('.birth_sex').html('女');
                }
                $('.pregnantWeight').html(data.lastWeight+'kg');
                // 结婚证状况
                if (data.marryType == '0') {
                    $('.marryType').html('初婚');
                } else if (data.marryType == '1') {
                    $('.marryType').html('再婚');
                } else {
                    $('.marryType').html('其他');
                }
                // 婚检
                if (data.marryCheck == '0') {
                    $('.marryCheck').html('无');
                } else if (data.marryCheck == '1') {
                    $('.marryCheck').html('有');
                }
                //   近半年避孕方式
                if (data.contraception == '0') {
                    $('.contraception').html('未避孕');
                } else if (data.contraception == '1') {
                    $('.contraception').html('口服避孕药');
                } else if (data.contraception == '2') {
                    $('.contraception').html('避孕套');
                } else if (data.contraception == '3') {
                    $('.contraception').html('避孕膜');
                } else {
                    $('.contraception').html('其他');
                }
                // 文化程度
                if (data.education == '0') {
                    $('.education').html('硕士以上');
                } else if (data.education == '1') {
                    $('.education').html('本科');
                } else if (data.education == '2') {
                    $('.education').html('大专');
                } else if (data.education == '3') {
                    $('.education').html('中专及高中');
                } else if (data.education == '4') {
                    $('.education').html('初中');
                } else {
                    $('.education').html('文盲');
                }
                $('.nation').html(data.nation);
                // 职业
                if (data.job == '0') {
                    $('.job').html('无');
                } else if (data.job == '1') {
                    $('.job').html('农、牧、渔');
                } else if (data.job == '2') {
                    $('.job').html('干部、职员');
                } else if (data.job == '3') {
                    $('.job').html('医院、科技');
                } else if (data.job == '4') {
                    $('.job').html('工人');
                } else if (data.job == '5') {
                    $('.job').html('个体');
                } else {
                    $('.job').html('家务');
                }
                $('.work').html(data.jobCompanyName);
                $('.areaInput').html(data.idCardAddressProvince + data.idCardAddressCity + data.idCardAddressCounty);
                $('.registeredLocation').html(data.idCardAddressRemarks);
                $('.areaInput2').html(data.newAddressProvince + data.newAddressCity + data.newAddressCounty);
                $('.presentAddress').html(data.newAddressRemarks);
                layui.use('form', function () {
                    var form = layui.form;
                    form.render();
                });
            } else if (data.status == 20250) {
                window.location = '/maternal-ipad/login/login.html';
            } else {

            }
        },
        function errfn(err) {
             //layer.msg('操作失败，请稍后重试');
        });
        // 配偶本信息查询
    $('.newRecordLi').click(function(){
        $('.supeDisease').html('');
        HttpRequstForPost(httpUrl.mateNewsInquire, 'json', {
            'id': recordData.husbandsId,
            "token": token,
        },function sucFn(data) {
            // console.log(data);
                if (data.status == 20200) {
                    $('.spouseName').attr('id', data.id);
                    $('.spouseName').html(data.name);
                    //    身份类型
                    if (data.idCardType == '0') {
                        $('.idType2').html('身份证号');
                    } else {
                        $('.idType2').html('护照');
                    }
                    $('.spouseIdCard').html(data.idCard);
                    $('.spouseAge').html(data.age);
                    $('.spousePhone').html(data.telephone);
                    // 健康状况
                    if (data.healthType == '0') {
                        $('.healthType').html('健康');
                    } else if (data.healthType == '1') {
                        $('.healthType').html('一般');
                    } else {
                        $('.healthType').html('较弱');
                    }
                    // 文化程度
                    if (data.education == '0') {
                        $('.spouseEducation').html('硕士以上');
                    } else if (data.education == '1') {
                        $('.spouseEducation').html('本科');
                    } else if (data.education == '2') {
                        $('.spouseEducation').html('大专');
                    } else if (data.education == '3') {
                        $('.spouseEducation').html('中专及高中');
                    } else if (data.education == '4') {
                        $('.spouseEducation').html('初中');
                    } else {
                        $('.spouseEducation').html('文盲');
                    }
                    // 职业
                    if (data.job == '0') {
                        $('.spouseJob').html('无');
                    } else if (data.job == '1') {
                        $('.spouseJob').html('农、牧、渔');
                    } else if (data.job == '2') {
                        $('.spouseJob').html('干部、职员');
                    } else if (data.job == '3') {
                        $('.spouseJob').html('医院、科技');
                    } else if (data.job == '4') {
                        $('.spouseJob').html('工人');
                    } else if (data.job == '5') {
                        $('.spouseJob').html('个体');
                    } else {
                        $('.spouseJob').html('家务');
                    }
                    $('.spouseMarriageAge').html(data.marryAge + '岁');
                    $('.spouseAge').html(data.age + '岁');
                    // 结婚证状况
                    if (data.marryType == '0') {
                        $('.spouseMarryType').html('初婚');
                    } else if (data.marryType == '1') {
                        $('.spouseMarryType').html('再婚');
                    } else {
                        $('.spouseMarryType').html('其他');
                    }
                    // 婚检
                    if (data.marryCheck == '0') {
                        $('.spouseMarryCheck').html('无');
                    } else if (data.marryCheck == '1') {
                        $('.spouseMarryCheck').html('有');
                    }
                    if (data.smoke == '0') {
                        $('.cigaretteNUm').html('无');
                    } else {
                        $('.cigaretteNUm').html(data.smoke + '支/日');
                    }
                    if (data.drink == '0') {
                        $('.drink').html('否');
                    } else if (data.drink == '1') {
                        $('.drink').html('偶尔');
                    } else {
                        $('.drink').html('经常');
                    }
                    if (data.patientHistory == '') {
                        $('.patientHistory').html('无');
                    } else {
                        $('.patientHistory').html(data.patientHistory);
                    }
                    $('.areaInput3').html(data.newAddressProvince + data.newAddressCity + data.newAddressCounty);
                    $('.spouseSite').html(data.newAddressRemarks);
                } else if (data.status == 20250) {
                    window.location = '/maternal-ipad/login/login.html';
                }
            },
            function errfn(err) {
                 //layer.msg('操作失败，请稍后重试');
            });
    });
     // 孕产信息查询
    $('.assessmentLi').click(function(){
        $('.touchdisease').html('');
        $('.disease').html('');
        $('.presentdisease').html('');
        HttpRequstForPost(httpUrl.pregnantWomenCheck, 'json', {
            'id': recordData.parturitionDetailId,
            'patientCenterId': centerId,
            "token": token,
        },function sucFn(data) {
                // console.log(data)
                if (data.status == 20200) {
                    $('.firstCheckDate').html  (data.firstCheckDate);
                    $('.lastMenstruation').html(data.lastMenstruation);
                    $('.dueDate').html(data.dueDate);
                    $('.gestationalWeek').html(data.newAgeOfMenarche +'+'+ data.newAgeOfMenarcheDay + '周');
                    $('.menstrualHistory').html('初潮，' + data.menstrualHistoryAge + '岁' + '-' + '周期，' + data.menstrualHistoryDay+'天');
                    $('.pregnancyNum').html(data.pregnancyNumber+'次');
                    // 孕期用药
                    if (data.parturitionFrontPharmacy == '0') {
                        $('.parturitionFrontPharmacy').html('否');
                    } else {
                        $('.parturitionFrontPharmacy').html('是');
                    }
                    // 尿酮体
                    if (data.ketosis == '0') {
                        $('.ketosis').html('否');
                    } else {
                        $('.ketosis').html('是');
                    }
                    // 孕前反应
                    if (data.morningSickness == '0') {
                        $('.morningSickness').html('轻');
                    } else if (data.morningSickness == '1') {
                        $('.morningSickness').html('中');
                    } else if (data.morningSickness == '2') {
                        $('.morningSickness').html('重');
                    }else{
                        $('.morningSickness').html('无');
                    }
                    // 宠物接触
                    if (data.animalContact == '0') {
                        $('.animalContact').html('否');
                    } else {
                        $('.animalContact').html('是');
                    }
                    // 接触放射性
                    if (data.contactRadioactiveRays == '0') {
                        $('.contactRadioactiveRays').html('否');
                    } else {
                        $('.contactRadioactiveRays').html('是' + '/' + data.contactRadioactiveRaysDate);
                    }
                    // 接触毒物
                    if (data.contactToxicName == '') {
                        $('.contactToxicDate').html('无');
                    } else {
                        var contactToxicName = data.contactToxicName;
                        var str2 = contactToxicName.replace(/\++/g, '、');
                        $('.contactToxicDate').html(str2);
                        }
                    // 病毒感染？？？？？？？？
                    if (data.virusInfectionOther == '') {
                        $('.virus').html('无');
                    } else {
                        $('.virus').html(data.virusInfectionOther);
                    }
                    //  家族史
                    if (data.familyHistory == '') {
                        $('.recordInquire').html('无');
                    } else {
                        $('.recordInquire').html(data.familyHistory);
                    }
                    //  现病史
                    if (data.nowHistory == '') {
                        $('.presentrecordInquire').html('无');
                    } else {
                        $('.presentrecordInquire').html(data.nowHistory);
                    }
                    var historyList = data.patientParturitionDetailHistoryBeanList;
                    var _history = '';
                    for (var i = 0; i < historyList.length; i++) {
                        _history += " <tr name = '" + historyList[i].id + "'>\
                                <td class='number inputWire'>" + historyList[i].number + "\
                                </td>"
                        if (historyList[i].pregnantType == 0) {
                            _history += "<td class = 'ageOfMenarche'>早产</td>"    
                        } else if (historyList[i].pregnantType == 1) {
                            _history += "<td class = 'ageOfMenarche'>足月妊娠</td>"    
                        }else{
                            _history += "<td class = 'ageOfMenarche'>过期妊娠</td>" 
                        }
                        _history +="<td class = 'productionDate inputWire' > " + historyList[i].productionDate + "\
                                </td>\
                                <td class='productionOfAge inputWire'>" + historyList[i].productionOfAge + "\
                                </td>"
                        if (historyList[i].productionAbortion == 0) {
                            _history += "   <td class='productionAbortion'>自然</td>"
                                }else{
                            _history += "   <td class='productionAbortion'>剖宫产</td>"
                                }
                        if (historyList[i].babySex == 0) {
                            _history += "   <td class='babySex'>男</td>"
                        } else {
                            _history += "   <td class='babySex'>女</td>"
                        }
                        if (historyList[i].babyHealthType == 0) {
                            _history += "   <td class='babyHealthType'>健康</td>"
                        } else {
                            _history += "   <td class='babyHealthType'>死亡</td>"
                        }
                            _history+="<td class='remarks inputWire'>\
                                   <input type='text'  value='" + historyList[i].remarks + "'readonly='readonly' onfocus='this.blur();'>\
                                </td>\
                                </tr>"

                    }
                    $(".kang").html(_history);
                    layui.use('form', function () {
                        var form = layui.form;
                        form.render();
                    });


                } else if (data.status == 20250) {
                    window.location = '/maternal-ipad/login/login.html';
                } else {

                }
            },
            function errfn(err) {
                 //layer.msg('操作失败，请稍后重试');
            });
    });
        // 体格检查查询
    $('.affirmLi').click(function(){
        HttpRequstForPost(httpUrl.findById, 'json', {
            'id': recordData.healthCheckId,
            "token": token,
        }, function sucFn(data) {
                // console.log(data)
                if (data.status == 20200) {
                    $('.pressure').html(data.baseBloodPressureHigh +'/' + data.baseBloodPressureLow + 'mmHg');
                    $('.height').html(data.baseHeight+'cm');
                    $('.weight').html(data.baseWeight+'kg');
                    $('.assayUrineProtein').html(data.assayUrineProtein);
                    $('.assayHemoglobin').html(data.assayHemoglobin);
                    $('.assayBloodPlatelet').html(data.assayBloodPlatelet);
                    $('.obstetricsHeight').html(data.obstetricsHeight+'cm');
                    $('.obstetricsAbdominalGirth').html(data.obstetricsAbdominalGirth+'cm');
                    $('.obstetricsFetalHeart').html(data.obstetricsFetalHeart +'次/分');
                    $('.obstetricsTransversePelvicDiameter').html(data.obstetricsTransversePelvicDiameter+'cm');
                    //   心率 
                    if (data.baseHeartRate == '0') {
                        $('.baseHeartRate').html('正常');
                    } else {
                        $('.baseHeartRate').html('异常');
                    }
                    //   肺 
                    if (data.baseLung == '0') {
                        $('.baseLung').html('正常');
                    } else {
                        $('.baseLung').html('异常');
                    }
                    //   肝
                    if (data.baseAbdomenLiver == '0') {
                        $('.baseAbdomenLiver').html('正常');
                    } else {
                        $('.baseAbdomenLiver').html('异常');
                    }
                    //  脾 
                    if (data.baseAbdomenSpleen == '0') {
                        $('.baseAbdomenSpleen').html('正常');
                    } else {
                        $('.baseAbdomenSpleen').html('异常');
                    }
                    //  脊柱 
                    if (data.baseSpinalLimbsDeformity == '0') {
                        $('.baseSpinalLimbsDeformity').html('正常');
                    } else {
                        $('.baseSpinalLimbsDeformity').html('畸形');
                    }
                    //  乳房 
                    if (data.baseBreasts == '0') {
                        $('.baseBreasts').html('丰满');
                    } else {
                        $('.baseBreasts').html('扁平');
                    }
                    //  乳头 
                    if (data.baseNipple == '0') {
                        $('.baseNipple').html('凸');
                    } else {
                        $('.baseNipple').html('凹');
                    }
                    //  四肢水肿
                    if (data.baseSpinalLimbsEdema == '0') {
                        $('.baseSpinalLimbsEdema').html('无');
                    } else if (data.baseSpinalLimbsEdema == '1') {
                        $('.baseSpinalLimbsEdema').html('轻');
                    } else if (data.baseSpinalLimbsEdema == '2') {
                        $('.baseSpinalLimbsEdema').html('中');
                    } else {
                        $('.baseSpinalLimbsEdema').html('重');
                    }
                    //  外阴 
                    if (data.obstetricsVulva == '0') {
                        $('.obstetricsVulva').html('正常');
                    } else {
                        $('.obstetricsVulva').html('异常');
                    }
                    //  阴道
                    if (data.obstetricsVagina == '0') {
                        $('.obstetricsVagina').html('正常');
                    } else {
                        $('.obstetricsVagina').html('异常');
                    }
                    //  宫颈 
                    if (data.obstetricsCervix == '0') {
                        $('.obstetricsCervix').html('正常');
                    } else {
                        $('.obstetricsCervix').html('异常');
                    }
                    //  宫体 
                    if (data.obstetricsCorpus == '0') {
                        $('.obstetricsCorpus').html('正常');
                    } else {
                        $('.obstetricsCorpus').html('异常');
                    }
                    //  附件
                    if (data.obstetricsPairsAttachment == '0') {
                        $('.obstetricsPairsAttachment').html('正常');
                    } else {
                        $('.obstetricsPairsAttachment').html('异常');
                    }
                    //  血型
                    if (data.assayBloodType == '0') {
                        $('.assayBloodType').html('O型');
                    } else if (data.assayBloodType == '1') {
                        $('.assayBloodType').html('A型');
                    } else if (data.assayBloodType == '2') {
                        $('.assayBloodType').html('B型');
                    } else if (data.assayBloodType == '3') {
                        $('.assayBloodType').html('AB型');
                    } else {
                        $('.assayBloodType').html('RH型');
                    }
                    //  先露
                    if (data.obstetricsFirstDew == '0') {
                        $('.obstetricsFirstDew').html('未填写');
                    } else if (data.obstetricsFirstDew == '1') {
                        $('.obstetricsFirstDew').html('先头露');
                    } else {
                        $('.obstetricsFirstDew').html('臀先露');
                    }
                    // 胎方位
                    if (data.obstetricsPlacental == '0') {
                        $('.obstetricsPlacental').html('未填写');
                    } else if (data.obstetricsPlacental == '1') {
                        $('.obstetricsPlacental').html('枕左前位');
                    } else if (data.obstetricsPlacental == '2') {
                        $('.obstetricsPlacental').html('枕右横位');
                    } else {
                        $('.obstetricsPlacental').html('枕右前位');
                    }
                    $('.primaryDiagnosis').html(data.primaryDiagnosis);
                    $('.disposal').html(data.disposal);
                } else if (data.status == 20250) {
                    window.location = '/maternal-ipad/login/login.html';
                } 
            },
            function errfn(err) {
                 layer.msg('操作失败，请稍后重试');
            });
    })
    // teb切换
    $('.leftBox>ul>li').click(function () {
        var index = $(this).index();
        $(this).siblings().children('span').removeClass('active');
        $(this).children('span').addClass('active');
        $('.content').eq(index).show().siblings().hide();
        $(".iocn").css("top", 9.8 + index * 3 + 1 + "rem");
        $(this).siblings().find('.icon2').hide();
        $(this).find('.icon2').show();
    });
});
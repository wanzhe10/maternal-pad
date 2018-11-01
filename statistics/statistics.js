$(function () {
        var startDateStr='';	//建档起始时间
        var endDateStr='';	//建档截止时间
        var startWeek='';//孕周开始时间
        var endWeek='';//孕周截止时间
        var smallAge='';//孕妇年龄start
        var bigAge='';//孕妇年龄end
        var marryType='';//婚姻状况 0 初婚 - 默认 1 再婚 2其他
        var countType='';//检索类型 0 产检率 1.产前筛查率 2.高危孕妇管理 3.高血压疾病
    var pageNum = ''; //页数
    var pageCell = '';//数量 页
    var total = ''; //总数
    var xData = [];
    var yData = [];
    var parameter2 = $('.pageNum option:selected').attr('value'); //用到的选择下拉中的值

    layui.use(['layer', 'form', 'element', 'laydate', 'laypage'], function () {
        var layer = layui.layer,
            form = layui.form,
            element = layui.element,
            laydate = layui.laydate;
            laypage = layui.laypage;
        laypage.render({
            elem: 'test1'
            , count: total //数据总数
            , theme: '#68b7e7'
            , limit: parameter2// 每页的条数
            , prev: '<i class="layui-icon">&#xe603</i>'
            , next: '<i class="layui-icon">&#xe602</i>'
            , jump: function (obj, first) {
                pageNum = obj.curr;
                //首次不执行
                if (!first) {
                    //do something
                } else {
                    if ($('.fiveRate').hasClass('active')) {
                        headerNews();
                        countEntityForOthers(startDateStr, endDateStr, startWeek, endWeek, smallAge, bigAge, marryType, 0, pageNum  , parameter2);
                     } else if ($('.antenatal').hasClass('active')) {
                        countEntityForOthers(startDateStr, endDateStr, startWeek, endWeek, smallAge, bigAge, marryType, 1, pageNum  , parameter2);
                    } else if ($('.heighRisk').hasClass('active')) {
                        countEntityForOthers(startDateStr, endDateStr, startWeek, endWeek, smallAge, bigAge, marryType, 2, pageNum  , parameter2);
                    } else if ($('.morbidity').hasClass('active')) {
                        countEntityForOthers(startDateStr, endDateStr, startWeek, endWeek, smallAge, bigAge, marryType, 3, pageNum  , parameter2);
                    }
                }
            }
        });
        form.on('select(pageNum)', function (data) {
            parameter = data.value;
            parameter2 = parameter;
            if ($('.fiveRate').hasClass('active')) {
                headerNews();
                countEntityForOthers(startDateStr, endDateStr, startWeek, endWeek, smallAge, bigAge, marryType, 0, 1, parameter2);
            } else if ($('.antenatal').hasClass('active')) {
                countEntityForOthers(startDateStr, endDateStr, startWeek, endWeek, smallAge, bigAge, marryType, 1, 1, parameter2);
            } else if ($('.heighRisk').hasClass('active')) {
                countEntityForOthers(startDateStr, endDateStr, startWeek, endWeek, smallAge, bigAge, marryType, 2, 1, parameter2);
            } else if ($('.morbidity').hasClass('active')) {
                countEntityForOthers(startDateStr, endDateStr, startWeek, endWeek, smallAge, bigAge, marryType, 3, 1, parameter2);
            }
        });
        //日期范围
        laydate.render({
            elem: '#test6'
            , theme: '#68b7e7'
            , position: 'fixed'
            , btns: ['clear', 'confirm']
        });
        laydate.render({
            elem: '#test7'
            , theme: '#68b7e7'
            , position: 'fixed'
            , btns: ['clear', 'confirm']
           ,max:0
        });
        // 孕周范围
        var _weekScope = '';
        for (let i = 13; i <= 42; i++) {
            _weekScope += "<option value='" + i + "'>" + i + "</option>";
        }
        $('.weekBegin').append(_weekScope);
        $('.weekEnd').append(_weekScope);

        // 年龄范围
        var _ageScope = '';
        for (let i = 18; i <= 50; i++) {
            _ageScope += "<option value='" + i + "'>" + i + "</option>";
        }
        $('.ageBegin').append(_ageScope);
        $('.ageEnd').append(_ageScope);
        form.render();
    });

// 统计首页显示
    $('.headline').click(function(){
        $('.dataIndex').show();
        $('.particulars').hide();
    });
    // 统计详情页
    $('.main_left ul').click(function(){
        $('.dataIndex').hide();
        $('.particulars').show();
    });
    $('.thisWeek').click(function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active'); 
        }else{
            $(this).addClass('active');
            $('.thisMouth').removeClass('active');
            $('.thisYear').removeClass('active');
        }
    })
    $('.thisMouth').click(function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).addClass('active');
            $('.thisWeek').removeClass('active');
            $('.thisYear').removeClass('active');
        }
    })
    $('.thisYear').click(function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).addClass('active');
            $('.thisMouth').removeClass('active');
            $('.thisWeek').removeClass('active');
        }
    });

    // 左边li切换
    $('.main_left').on('click','li',function(){
        $(this).addClass('active').siblings().removeClass('active');
    });

    // 已建档数据点击
    $('.documented').click(function(){
        window.location = '/maternal-ipad/BuildFile/BuildFile.html';
    });
    // 今日复检统计点击
    $('.taday').click(function () {
        window.location = '/maternal-ipad/today/today.html';
    });

    $('.bedNum').click(function(){
        window.location = '/maternal-ipad/badNum/badNum.html';
    });

    // 返回首页
    $('.backIndex').click(function () {
        window.location = '/maternal-ipad/index/index.html';
    });
    
// 本月的时间
    function getMouthDate() {
        var date = new Date;
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        month = (month < 10 ? "0" + month : month);
        var day = date.getDate();
        day = (day < 10 ? "0" + day : day);
        var starDate = (year.toString() + '-' + month.toString() + '-' + '01');
        var mydate = (year.toString() + '-' + month.toString() + '-' + day.toString());
        $('#test6').val(starDate);
        $('#test7').val(mydate);
};
    // 本周的时间
    function getBeforeDate(n) {
        var n = n;
        var d = new Date();
        var year = d.getFullYear();
        var mon = d.getMonth() + 1;
        var month = d.getMonth() + 1;
        var day = d.getDate();
        var days = d.getDate();
        if (day <= n) {
            if (mon > 1) {
                mon = mon - 1;
            }
            else {
                year = year - 1;
                mon = 12;
            }
        }
        d.setDate(d.getDate() - n);
        year = d.getFullYear();
        mon = d.getMonth() + 1;
        day = d.getDate();
        s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
        var mydate = (year.toString() + '-' + month.toString() + '-' + days.toString());
        $('#test6').val(s);
        $('#test7').val(mydate);
    };

    // 
        var now = new Date(); //当前日期
        var nowDay = now.getDate(); //当前日
        var months = now.getMonth() + 1; //当前月
        var nowMonth = now.getMonth(); //当前月
        var nowYear = now.getYear(); //当前年
        nowYear += (nowYear < 2000) ? 1900 : 0; //
        var mydateLasttime =(nowYear.toString() + '-' + months.toString() + '-' + nowDay.toString());
    //格式化日期：yyyy-MM-dd
    function formatDate(date) {
        var myyear = date.getFullYear();
        var mymonth = date.getMonth() + 1;
        var myweekday = date.getDate();
        if (mymonth < 10) {
            mymonth = "0" + mymonth;
        }
        if (myweekday < 10) {
            myweekday = "0" + myweekday;
        }
        return (myyear + "-" + mymonth + "-" + myweekday);
    }
    //获得本季度的开始月份
    function getQuarterStartMonth() {
        var quarterStartMonth = 0;
        if (nowMonth < 3) {
            quarterStartMonth = 0;
        }
        if (2 < nowMonth && nowMonth < 6) {
            quarterStartMonth = 3;
        }
        if (5 < nowMonth && nowMonth < 9) {
            quarterStartMonth = 6;
        }
        if (nowMonth > 8) {
            quarterStartMonth = 9;
        }
        return quarterStartMonth;
    }
    //获得本季度的开始日期
    function getQuarterStartDate() {
        var quarterStartDate = new Date(nowYear, getQuarterStartMonth(), 1);
        $('#test6').val(formatDate(quarterStartDate));
        console.log(formatDate(quarterStartDate))
        $('#test7').val(mydateLasttime);
    }
    // 本周按钮
    $('.thisWeek').click(function(){
        if ($(this).hasClass('active')) {
            getBeforeDate(7)
        }else{
            $('#test6').val('');
            $('#test7').val('');
        }
    }); 
    // 本月按钮
    $('.thisMouth').click(function () {
        if ($(this).hasClass('active')) {
            getMouthDate();
        } else {
            $('#test6').val('');
            $('#test7').val('');
        }
    });
    // 本季按钮
    $('.thisYear').click(function () {
        if ($(this).hasClass('active')) {
            getQuarterStartDate();
        } else {
            $('#test6').val('');
            $('#test7').val('');
        }
    });
    $('#test6,#test7').click(function(){
        $('.thisWeek,.thisMouth,.thisYear').removeClass('active');
    });

   
    // G3 查询其他-按条件检索
    function countEntityForOthers(startDateStr, endDateStr, startWeek, endWeek, smallAge, bigAge, marryType, countType, pageNum, pageCell) {
        // token 
        // startDateStr	建档起始时间
        // endDateStr	建档截止时间
        // startWeek	孕周开始时间
        // endWeek	孕周截止时间
        // smallAge	孕妇年龄start
        // bigAge	孕妇年龄end
        // marryType	婚姻状况 0 初婚 - 默认 1 再婚 2其他
        // countType	检索类型 0 产检率 1.产前筛查率 2.高危孕妇管理 3.高血压疾病
        // pageNum	页数
        // pageCell	数量 / 页
        HttpRequstForPost(httpUrl.countEntityForOthers, 'json', {
            "token": token,
            "startDateStr": startDateStr,
            "endDateStr": endDateStr,
            "startWeek": startWeek,
            "endWeek": endWeek,
            "smallAge": smallAge,
            "bigAge": bigAge,
            "marryType": marryType,
            "countType": countType,
            "pageNum": pageNum,
            "pageCell": pageCell,
        }, function sucFn(data) {
            console.log(data);
            if (data.status == 20200) {
                var patientCenterBeanList = data.patientCenterBeanList;
                var _html = '';
                for (let i = 0; i < patientCenterBeanList.length; i++) {
                    // console.log(JSON.stringify())
                    console.log(JSON.stringify(eval(patientCenterBeanList[i])))
                    _html += '<tr>\
                        <td class="username">'+ patientCenterBeanList[i].checkName + '</td>\
                        <td class="idCard">16-22</td>\
                        <td class="age">'+ patientCenterBeanList[i].parturitionDetailDueDate + '</td>\
                        <td class="gestational">'+ patientCenterBeanList[i].checkAge + '</td><td class="pregnant">'
                    if (patientCenterBeanList[i].highRiskClass == 0) {
                        _html += '<i style=" background-color: green;"></i>绿色';
                    } else if (patientCenterBeanList[i].highRiskClass == 1) {
                        _html += '<i style = " background-color: yellow;" ></i>黄色';
                    } else if (patientCenterBeanList[i].highRiskClass == 2) {
                        _html += '<i style=" background-color: orange;"></i>橙色';
                    } else if (patientCenterBeanList[i].highRiskClass == 3) {
                        _html += '<i style = " background-color: red;" ></i>红色';
                    } else if (patientCenterBeanList[i].highRiskClass == 4) {
                        _html += '<i style = " background-color: purple;" ></i>紫色';
                    }
                    _html += '</td>'
                    _html+='<td class="blood">' + patientCenterBeanList[i].filingDate + '</td>'
                    _html += "<td class='operation'><a href='javascript:;' class='look' data='" + JSON.stringify(patientCenterBeanList[i]) + "'>查看</a></td>";
                        _html+='</td>'
                   _html+='</tr>'
                }
                $('.recordBody').html(_html);
                $('.personNum').html(data.total);
                total = data.total;
                if (pageNum == 1) {
                    laypage.render({
                        elem: 'test1'
                        , count: total //数据总数
                        , theme: '#68b7e7'
                        , limit: parameter2// 每页的条数
                        , prev: '<i class="layui-icon">&#xe603</i>'
                        , next: '<i class="layui-icon">&#xe602</i>'
                        , jump: function (obj, first) {
                            if (first) {
                                //do something
                            } else {
                                if ($('.fiveRate').hasClass('active')) {
                                    headerNews();
                                    countEntityForOthers(startDateStr, endDateStr, startWeek, endWeek, smallAge, bigAge, marryType, 0, obj.curr, parameter2);
                                } else if ($('.antenatal').hasClass('active')) {
                                    countEntityForOthers(startDateStr, endDateStr, startWeek, endWeek, smallAge, bigAge, marryType, 1, obj.curr, parameter2);

                                } else if ($('.heighRisk').hasClass('active')) {
                                    countEntityForOthers(startDateStr, endDateStr, startWeek, endWeek, smallAge, bigAge, marryType, 2, obj.curr, parameter2);
                                } else if ($('.morbidity').hasClass('active')) {
                                    countEntityForOthers(startDateStr, endDateStr, startWeek, endWeek, smallAge, bigAge, marryType, 3, obj.curr, parameter2);
                                }
                            }
                        }
                    });
                }

            } else if (data.status == 20250) {
                window.location = '/maternal-ipad/login/login.html';
            } else if (data.status == 20207) {
                layer.msg('操作失败，请稍后重试');
            } else if (data.status == 20209) {
                layer.msg('暂无数据');
            }
        },
            function errfn(err) {
                layer.msg('操作失败，请稍后重试');
                layer.msg('操作失败');
            });
    }
    // 查看
    $(".recordBody").delegate('.look', "click", function () {
        localStorage.setItem("maternalrecordData", JSON.stringify(eval("(" + $(this).attr('data') + ")")))
        var recordData = eval("(" + $(this).attr('data') + ")")
        var gardenIcon = eval('(' + recordData.highRiskTotalNum + ')')
        localStorage.setItem('maternalgardenIcon', JSON.stringify(gardenIcon));
        window.location = '/maternal-ipad/center/center.html';
    });
    //G3 查询其他-统计数量
    function countEntityNumberForOthers(startDateStr, endDateStr, startWeek, endWeek, smallAge, bigAge, marryType, countType, pageNum, pageCell) {
        // token 
        // startDateStr	//建档起始时间
        // endDateStr //建档截止时间
        // startWeek	//孕周开始时间
        // endWeek//	孕周截止时间
        // smallAge//	孕妇年龄start
        // bigAge//	孕妇年龄end
        // marryType//	婚姻状况 0 初婚 - 默认 1 再婚 2其他
        // countType//	检索类型 0 产检率 1.产前筛查率 2.高危孕妇管理 3.高血压疾病
        // pageNum//	页数
        // pageCell//	数量 / 页
        // groupType//	分组类型 0.天 1.月 2.年
        HttpRequstForPost(httpUrl.countEntityNumberForOthers, 'json', {
            "token": token,
            "startDateStr": startDateStr,
            "endDateStr": endDateStr,
            "startWeek": startWeek,
            "endWeek": endWeek,
            "smallAge": smallAge,
            "bigAge": bigAge,
            "marryType": marryType,
            "countType": countType,
            "pageNum": pageNum,
            "pageCell": pageCell,
            "groupType": 1,
        }, function sucFn(data) {
            console.log(data);
            if (data.status == 20200) {
                var myChart = echarts.init($("#chartmain")[0]);
                xData = [];
                yData = [];
                var padStatisticsCountBeanList = data.padStatisticsCountBeanList;
                for (let i = 0; i < padStatisticsCountBeanList.length; i++) {
                     var xDataOnlay = padStatisticsCountBeanList[i].countDetail;
                    var yDataOnlay = padStatisticsCountBeanList[i].countSize;
                    xData.push(xDataOnlay)
                    yData.push(yDataOnlay)
                    option = {
                        title: {
                            text: '人数数量（人）'
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'cross',
                                label: {
                                    backgroundColor: '#6a7985'
                                }
                            },
                        },
                        grid: {
                            x: 10,
                            y: 40,
                            x2: 0,
                            y2: 0,
                            containLabel: true,
                            borderWidth: 1
                        },
                        xAxis: {
                            type: 'category',
                            data: xData
                        },
                        yAxis: [{
                            type: 'value',
                            nameLocation: 'center',
                            // ,
                            min: 0,
                            max: 140,
                            splitNumber: 8
                        }],
                        series: [{
                            data: yData,
                            type: 'line',
                            stack: '',
                            color: "#77cae5",
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                        }]
                    };
                    // myChart.clear(option);
                    myChart.setOption(option,true);
                    $('.tableBox').show();
                    $('.eachartsBox').show();
                    $('.particulars').css('background','#fff');
                }
             
            } else if (data.status == 20250) {
                window.location = '/maternal-ipad/login/login.html';
            } else if (data.status == 20207) {
                layer.msg('操作失败，请稍后重试');
            } else if (data.status == 20209) {
                layer.msg('暂无数据');
                // $('.particulars').html('').css('background','#fff');
                $('.tableBox').hide();
                $('.eachartsBox').hide();
                $('.particulars').css('background', '#fff');

            }
        },
            function errfn(err) {
                layer.msg('操作失败，请稍后重试');
                layer.msg('操作失败');
            });
    }
    // 头部信息
    function headerNews (){
        startDateStr = $('#test6').val();
        endDateStr = $('#test7').val();
        startWeek = $('.weekBegin option:selected').attr('value');
        endWeek = $('.weekEnd option:selected').attr('value');
        smallAge = $('.ageBegin option:selected').attr('value');
        bigAge = $('.ageEnd option:selected').attr('value');
        marryType = $('.spouseMarryType option:selected').attr('value');
    }
    // 5次产检率点击
    $('.fiveRate').click(function () {
            $('.thisMouth').addClass('active');
            getMouthDate();
            $('.inquireBtn').removeClass('active');
            headerNews();
            countEntityForOthers(startDateStr, endDateStr, startWeek, endWeek, smallAge, bigAge, marryType, 0, 1, 4)
            countEntityNumberForOthers(startDateStr, endDateStr, startWeek, endWeek, smallAge, bigAge, marryType, 0, 1, 4, 0)
    });
    // 产前筛查率
    $('.antenatal').click(function () {
        $('.thisMouth').addClass('active');
        getMouthDate();
        $('.inquireBtn').removeClass('active');
        headerNews();
        countEntityForOthers(startDateStr, endDateStr, startWeek, endWeek, smallAge, bigAge, marryType, 1, 1, 4)
        countEntityNumberForOthers(startDateStr, endDateStr, startWeek, endWeek, smallAge, bigAge, marryType, 1, 1, 4, 0)
    });
    // 高危孕产妇管理
    $('.heighRisk').click(function () {
        $('.thisMouth').addClass('active');
        getMouthDate();
        $('.inquireBtn').removeClass('active');
        headerNews();
        countEntityForOthers(startDateStr, endDateStr, startWeek, endWeek, smallAge, bigAge, marryType, 2, 1, 4)
        countEntityNumberForOthers(startDateStr, endDateStr, startWeek, endWeek, smallAge, bigAge, marryType, 2, 1, 4, 0)
    });
    // 妊娠期高血压疾病发生率
    $('.morbidity').click(function () {
        $('.thisMouth').addClass('active');
        getMouthDate();
        $('.inquireBtn').removeClass('active');
        headerNews();
        countEntityForOthers(startDateStr, endDateStr, startWeek, endWeek, smallAge, bigAge, marryType, 3, 1, 4)
        countEntityNumberForOthers(startDateStr, endDateStr, startWeek, endWeek, smallAge, bigAge, marryType, 3, 1, 4, 0)
    });
    $('.inquireBtn').click(function(){
        if ($(this).hasClass('active')) {
            return;
        }else{
            if ($('.fiveRate').hasClass('active')) {
                countType = 0;
              
            } else if ($('.antenatal').hasClass('active')) {
                countType = 1;
            } else if ($('.heighRisk').hasClass('active')) {
                countType = 2;
            } else if ($('.anemia').hasClass('active')) {
                countType = 3;
            } else if ($('.morbidity').hasClass('active')) {
                countType = 4;
            }
            headerNews();
            countEntityForOthers(startDateStr, endDateStr, startWeek, endWeek, smallAge, bigAge, marryType, countType, 1, 4)
            countEntityNumberForOthers(startDateStr, endDateStr, startWeek, endWeek, smallAge, bigAge, marryType, 3, 1, 4, 0)
        }
      
    });
    // 预分娩床位数量统计
    $('.bedNum').click(function () {
        
    })

    

});
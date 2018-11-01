$(function(){
    var pageNum = '' // 页数
    var parameter = ''; //选择下拉值
    var total = ''; //总数
    var parameter2 = $('.pageNum option:selected').attr('value'); //用到的选择下拉中的值
    //  G1 孕周查询 包含总数和第一页数据
    function countEntityWithWeekDateAndFilingType(smallWeek, bigWeek, pageNum, pageCell) {
        HttpRequstForPost(httpUrl.countEntityWithWeekDateAndFilingType, 'json', {
            "token": token,
            "smallWeek": smallWeek,
            "bigWeek": bigWeek,
            "pageNum": pageNum, //页数
            "pageCell": pageCell,   //数量/页
        }, function sucFn(data) {
            if (data.status == 20200) {
                // console.log(data);
                var patientCenterBeanList = data.patientCenterBeanList;
                var _html = '';
                for (let i = 0; i < patientCenterBeanList.length; i++) {
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
                    _html += '</td><td class="blood">' + patientCenterBeanList[i].filingDate + '</td>\
                        <td class="operation">\
                            <a href="javascript:;" class="look" data=' + JSON.stringify(patientCenterBeanList[i]) + '>查看</a>\
                        </td>\
                    </tr>'
                }
                $('.recordBody').html(_html);
                $('.personNum').html(data.total);
                total = data.total;

                if (pageNum == 1){
                    laypage.render({
                        elem: 'test1'
                        , count: total //数据总数
                        , theme: '#68b7e7'
                        , limit: parameter2// 每页的条数
                        , prev: '<i class="layui-icon">&#xe603</i>'
                        , next: '<i class="layui-icon">&#xe602</i>'
                        , jump: function (obj, first) {
                            // console.log(obj)
                            if (first) {
                                //do something
                            } else {
                                if ($('.firstWeek').hasClass('active')) {
                                    countEntityWithWeekDateAndFilingType(13, 27, obj.curr, parameter2);
                                } else if ($('.secondWeek').hasClass('active')) {
                                    countEntityWithWeekDateAndFilingType(28, 35, obj.curr, parameter2);
                                } else if ($('.lastWeek').hasClass('active')) {
                                    countEntityWithWeekDateAndFilingType(36, '', obj.curr, parameter2);
                                }
                            }
                        }
                    });
                }
                
            } else if (data.status == 20250) {
                window.location = '/maternal-ipad/login/login.html';
            } else if (data.status == 20207) {
                layer.msg('操作失败，请稍后重试');
            }
        },
            function errfn(err) {
                layer.msg('操作失败，请稍后重试');
            });
    };
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
                }else{
                    if ($('.firstWeek').hasClass('active')) {
                        countEntityWithWeekDateAndFilingType(13, 27, pageNum, parameter2);
                    } else if ($('.secondWeek').hasClass('active')) {
                        countEntityWithWeekDateAndFilingType(28, 35, pageNum, parameter2);
                    } else if ($('.lastWeek').hasClass('active')) {
                        countEntityWithWeekDateAndFilingType(36, '', pageNum, parameter2);
                    }
                }
            }
        });
        form.on('select(pageNum)', function (data) {
            parameter = data.value;
            parameter2 = parameter;
            if ($('.firstWeek').hasClass('active')) {
                countEntityWithWeekDateAndFilingType(13, 27, 1, parameter2);
            } else if ($('.secondWeek').hasClass('active')) {
                countEntityWithWeekDateAndFilingType(28, 35, 1, parameter2);
            } else if ($('.lastWeek').hasClass('active')) {
                countEntityWithWeekDateAndFilingType(36, '', 1, parameter2);
            }
        });
        form.render();
    });
    // 返回按钮
    $('.callBack').click(function(){
        window.history.back(-1);
    });
    // 周切换
    $('.tebBtn').on('click','li',function(){
        $(this).addClass('active').siblings().removeClass('active');
    });
    $('.firstWeek').click(function () {
        // console.log(parameter2)
        countEntityWithWeekDateAndFilingType(13, 27, 1, parameter2);
    });
    $('.secondWeek').click(function () {
        countEntityWithWeekDateAndFilingType(28, 35, 1, parameter2);
    });
    $('.lastWeek').click(function () {
        countEntityWithWeekDateAndFilingType(36, '', 1, parameter2);
    });
});
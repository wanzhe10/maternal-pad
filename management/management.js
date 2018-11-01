

var filingType = 1; //档案类型： 0.未建档 1.已建档
// var pageNum = 1; // 页码
var pageSize = 6; // 每页条数
var orderByType = 0; // 高危排序： 0.默认排序 1.高危评分等级-降序 2.高危评分等级-升序
var count = 0; // 总条数
var tempArr = [];
var localpageNum = localStorage.getItem('pageNum');
if (!localpageNum=='1') {
    pageNum = localpageNum;
}else{
    pageNum = localpageNum;
}
// var localfilingType = localStorage.getItem('filingType');
// if (localfilingType) {
//     filingType =0;
//     $('.likeBtn').attr('name', 0).html('已建档列表').siblings('.sup').hide();
// }else{
//     filingType = 1;
//     $('.likeBtn').attr('name', 1).html('新申请列表').siblings('.sup').show();
// }
$(function() {
    getRecordList(pageNum, pageSize, filingType, orderByType);

    // 点击空白处软键盘消失
    $('.box').click(function () {
        objBlur('content', 300);
    });
    //  操作人姓名
    $('.name').html(localStorage.getItem('maternalname'));
    // 档案列表查询 v1/web/pad/patientCenter/findForFilingList
    // alert("123");
    function getRecordList(pageNum, pageSize, filingType, orderByType) {
        // pageNum 页数
        // pageSize 每页条数
        // filingType 0. 未建档 1. 已建档
        // orderByType 0.默认排序 1.高危评分等级-降序 2.高危评分等级-升序
        if (!$(".nameInput").val() && !$(".numInput").val()) {
            var postData = {
                "pageNum": pageNum,
                "pageSize": pageSize,
                "filingType": filingType,
                "orderByType": orderByType,
                "token": token,
            }
        } else if ($(".numInput").val()) {
            var postData = {
                "paramDetail": $(".numInput").val(),
                "paramType": 1,
                "pageNum": pageNum,
                "pageSize": pageSize,
                "filingType": filingType,
                "orderByType": orderByType,
                "token": token,
            }
        } else if ($(".nameInput").val()) {
            var postData = {
                "paramDetail": $(".nameInput").val(),
                "paramType": 0,
                "pageNum": pageNum,
                "pageSize": pageSize,
                "filingType": filingType,
                "orderByType": orderByType,
                "token": token,
            }
        } else if ($(".nameInput").val() && $(".numInput").val()) {
            var postData = {
                "paramDetail": $(".numInput").val(),
                "paramType": 1,
                "pageNum": pageNum,
                "pageSize": pageSize,
                "filingType": filingType,
                "orderByType": orderByType,
                "token": token,
            }
        } else if ($(".nameInput").val() == '' && $(".numInput").val() == '') {
            var postData = {
                "paramDetail": tempData,
                "paramType": 2,
                "pageNum": pageNum,
                "pageSize": pageSize,
                "filingType": filingType,
                "orderByType": orderByType,
                "token": token,
            }
        }
        // 档案列表查询
        HttpRequstForPost(httpUrl.findListWithParamForFiling, 'json', postData, function sucFn(data){
            // console.log(data)
            // console.log(pageNum)
            localStorage.setItem('pageNum',pageNum);
            if (data.status == 20200) {
                tempArr = data.patientCenterBeanList;
                var _html = '';
                for (var i = 0; i < tempArr.length; i++) {
                    // 如果有空的数据 跳出本次循环
                    if (tempArr[i].id ==null) {
                        continue
                    }
                    // 高危评分类型 0.无-默认 1.黄 2.橙 3.红 4.紫
                    if (tempArr[i].highRiskClass == 0) {
                        _html += '<tr><td class="id">' + ((pageNum - 1) * pageSize + i + 1) + '<i class="tag gradeGreen"></i></td>';
                    } else if (tempArr[i].highRiskClass == 1) {
                        _html += '<tr><td class="id">' + ((pageNum - 1) * pageSize + i + 1) + '<i class="tag gradeYellow"></i></td>';
                    } else if (tempArr[i].highRiskClass == 2) {
                        _html += '<tr><td class="id">' + ((pageNum - 1) * pageSize + i + 1) + '<i class="tag gradeOrange"></i></td>';
                    } else if (tempArr[i].highRiskClass == 3) {
                        _html += '<tr><td class="id">' + ((pageNum - 1) * pageSize + i + 1) + '<i class="tag gradeRed"></i></td>';
                    } else if (tempArr[i].highRiskClass == 4) {
                        _html += '<tr><td class="id">' + ((pageNum - 1) * pageSize + i + 1) + '<i class="tag gradePropon"></i></td>';
                    }
                    _html += '<td class="username">' + tempArr[i].checkName + '</td>\
                            <td class="idCard">' + tempArr[i].checkIdCard + '</td>\
                            <td class="age">' + tempArr[i].checkAge + '</td>\
                            <td class="gestational">' + tempArr[i].newAgeOfMenarche + '+' + tempArr[i].newAgeOfMenarcheDay + '</td>\
                            <td class="pregnant">' + tempArr[i].parturitionDetailDueDate + '</td>';
                    // 体格检查-血型 0.O型-默认 1.A型 2.B型 3.AB型 4.RH型
                    if (tempArr[i].healthAssayBloodType == '') {
                        _html += '<td class="blood"></td>';
                    } else if (tempArr[i].healthAssayBloodType == 0) {
                        _html += '<td class="blood">O型</td>';
                    } else if (tempArr[i].healthAssayBloodType == 1) {
                        _html += '<td class="blood">A型</td>';
                    } else if (tempArr[i].healthAssayBloodType == 2) {
                        _html += '<td class="blood">B型</td>';
                    } else if (tempArr[i].healthAssayBloodType == 3) {
                        _html += '<td class="blood">AB型</td>';
                    } else if (tempArr[i].healthAssayBloodType == 4) {
                        _html += '<td class="blood">RH型</td>';
                    }
                    _html += '<td class="grade">' + tempArr[i].highRiskNumber + '</td>'
                    if (tempArr[i].highRiskTotalNum !== '') {
                        var totalNumArr = eval("(" + tempArr[i].highRiskTotalNum + ")");
                        // console.log(totalNumArr)
                        // if (totalNumArr.purple > 0) {
                        //     _html += '<td class="element"><p class="greenStrip">绿色' + "（" + totalNumArr.green + "）" + '项</p><p class="yellowStrip">黄色' + "（" + totalNumArr.yellow + "）" + '项</p><p class="orangeStrip">橙色' + "（" + totalNumArr.orange + "）" + '项</p><p class="redStrip">红色' + "（" + totalNumArr.red + "）" + '项</p></td>'
                        // } else if (totalNumArr.red > 0) {
                        //     _html += '<td class="element"><p class="greenStrip">绿色' + "（" + totalNumArr.green + "）" + '项</p><p class="yellowStrip">黄色' + "（" + totalNumArr.yellow + "）" + '项</p><p class="orangeStrip">橙色' + "（" + totalNumArr.orange + "）" + '项</p><p class="proponStrip">紫色' + "（" + totalNumArr.purple + "）" + '项</p></td>'
                        // } else if (totalNumArr.orange > 0) {
                        //     _html += '<td class="element"><p class="greenStrip">绿色' + "（" + totalNumArr.green + "）" + '项</p><p class="yellowStrip">黄色' + "（" + totalNumArr.yellow + "）" + '项</p><p class="redStrip">红色' + "（" + totalNumArr.red + "）" + '项</p><p class="proponStrip">紫色' + "（" + totalNumArr.purple + "）" + '项</p></td>'
                        // } else if (totalNumArr.yellow > 0) {
                        //     _html += '<td class="element"><p class="greenStrip">绿色' + "（" + totalNumArr.green + "）" + '项</p><p class="orangeStrip">橙色' + "（" + totalNumArr.orange + "）" + '项</p><p class="redStrip">红色' + "（" + totalNumArr.red + "）" + '项</p><p class="proponStrip">紫色' + "（" + totalNumArr.purple + "）" + '项</p></td>'
                        // } else {
                        //     _html += '<td class="element"><p class="orangeStrip">橙色' + "（" + totalNumArr.orange + "）" + '项</p><p class="redStrip">红色' + "（" + totalNumArr.red + "）" + '项</p><p class="proponStrip">紫色' + "（" + totalNumArr.purple + "）" + '项</p></td>'
                        // }

                        if (tempArr[i].highRiskClass == 4) {
                            _html += '<td class="element"><p class="greenStrip">绿色' + "（" + totalNumArr.green + "）" + '项</p><p class="yellowStrip">黄色' + "（" + totalNumArr.yellow + "）" + '项</p><p class="orangeStrip">橙色' + "（" + totalNumArr.orange + "）" + '项</p><p class="redStrip">红色' + "（" + totalNumArr.red + "）" + '项</p></td>'
                        } else if (tempArr[i].highRiskClass == 3) {
                            _html += '<td class="element"><p class="greenStrip">绿色' + "（" + totalNumArr.green + "）" + '项</p><p class="yellowStrip">黄色' + "（" + totalNumArr.yellow + "）" + '项</p><p class="orangeStrip">橙色' + "（" + totalNumArr.orange + "）" + '项</p><p class="proponStrip">紫色' + "（" + totalNumArr.purple + "）" + '项</p></td>'
                        } else if (tempArr[i].highRiskClass == 2) {
                            _html += '<td class="element"><p class="greenStrip">绿色' + "（" + totalNumArr.green + "）" + '项</p><p class="yellowStrip">黄色' + "（" + totalNumArr.yellow + "）" + '项</p><p class="redStrip">红色' + "（" + totalNumArr.red + "）" + '项</p><p class="proponStrip">紫色' + "（" + totalNumArr.purple + "）" + '项</p></td>'
                        } else if (tempArr[i].highRiskClass == 1) {
                            _html += '<td class="element"><p class="greenStrip">绿色' + "（" + totalNumArr.green + "）" + '项</p><p class="orangeStrip">橙色' + "（" + totalNumArr.orange + "）" + '项</p><p class="redStrip">红色' + "（" + totalNumArr.red + "）" + '项</p><p class="proponStrip">紫色' + "（" + totalNumArr.purple + "）" + '项</p></td>'
                        } else {
                            _html += '<td class="element"><p class="orangeStrip">橙色' + "（" + totalNumArr.orange + "）" + '项</p><p class="redStrip">红色' + "（" + totalNumArr.red + "）" + '项</p><p class="proponStrip">紫色' + "（" + totalNumArr.purple + "）" + '项</p></td>'
                        }
                    } else {
                        _html += '<td></td>'
                    }
                    if (filingType == 1) {
                        _html += "<td class='operation'><a href='javascript:;' class='look' data='" + JSON.stringify(tempArr[i]) + "'>查看</a></td>";
                    } else {
                        _html += "<td class='operation'><a href='javascript:;' class='supplement' data='" + JSON.stringify(tempArr[i]) + "'>补充档案</a></td>";
                    }
                    _html += '</tr>'
                }
                $(".recordBody").html(_html);
            } else if (data.status == 20250) {
                // window.location = '/maternal-ipad/login/login.html';
            } else if (data.status == 20209) {
                $(".recordBody").html('');
            } 
        },
        function errfn(err) {
             layer.msg('操作失败，请稍后重试');
            layer.msg('操作失败');
        });
    }

  

    // 档案列表-查询数量 v1/web/pad/patientCenter/countForFiling
    countForFiling(filingType);
    // 查询非当前展示列表总数量
    function countForFiling(filingType) {
          // filingType 0.未建档 1.已建档
        HttpRequstForPost(httpUrl.countForFiling, 'json', {
            "filingType": filingType == 0 ? 1 : 0,
            "token":token
        }, function sucFn(data) {
            if (data.status == 20200) {
                $('.sup').html(data.countForFiling);
            } else if (data.status == 20250) {
                window.location = '/maternal-ipad/login/login.html';
                }
            }, function errfn(err) {
                layer.msg('操作失败');
        });
    }
    getCount(filingType);
    // 查询当前展示列表总数量
    function getCount(filingType) {
        // pageNum 页数
        // pageSize 每页条数
        // filingType 0. 未建档 1. 已建档
        // orderByType 0.默认排序 1.高危评分等级-降序 2.高危评分等级-升序
        if (!$(".nameInput").val() && !$(".numInput").val()) {
            var postData = {
                "pageNum": pageNum,
                "pageSize": pageSize,
                "filingType": filingType,
                "orderByType": orderByType,
                "token": token,
            }
        } else if ($(".numInput").val()) {
            var postData = {
                "paramDetail": $(".numInput").val(),
                "paramType": 1,
                "pageNum": pageNum,
                "pageSize": pageSize,
                "filingType": filingType,
                "orderByType": orderByType,
                "token": token,
            }
        } else if ($(".nameInput").val()) {
            var postData = {
                "paramDetail": $(".nameInput").val(),
                "paramType": 0,
                "pageNum": pageNum,
                "pageSize": pageSize,
                "filingType": filingType,
                "orderByType": orderByType,
                "token": token,
            }
        } else if ($(".nameInput").val() && $(".numInput").val()) {
            var postData = {
                "paramDetail": $(".numInput").val(),
                "paramType": 1,
                "pageNum": pageNum,
                "pageSize": pageSize,
                "filingType": filingType,
                "orderByType": orderByType,
                "token": token,
            }
        }
          // 档案列表搜索 v1/web/pad/patientCenter/findForFilingList
        HttpRequstForPost(httpUrl.findListWithParamForFiling, 'json', postData,function sucFn(data) {
            // console.log(data)
            if (data.status == 20200) {
                count = data.pages * pageSize;
                layui.use('laypage', function () {
                    var laypage = layui.laypage;
                    //执行一个laypage实例
                    laypage.render({
                        elem: 'test1',
                        count: count,
                        theme: '#68b7e7',
                        limit: pageSize, // 每页的条数
                        groups: 4,
                        curr: localStorage.getItem("pageNum") //获取起始页
                        //  hash: 'fenye' //自定义hash值
                        ,
                        jump: function (obj, first) {
                            if (first) {
                                // 首次加载
                            } else {
                                getRecordList(obj.curr, pageSize, filingType, orderByType);
                                
                            }
                        }

                    });
                });
            } else if (data.status == 20209) {
                count = 0;
                layui.use('laypage', function () {
                    var laypage = layui.laypage;
                    //执行一个laypage实例
                    laypage.render({
                        elem: 'test1',
                        count: count,
                        theme: '#68b7e7',
                        limit: pageSize, // 每页的条数
                        groups: 4,
                        jump: function (obj, first) {
                            if (first) {
                                // 首次加载
                                //  getRecordList(pageNum, pageSize, filingType, orderByType);
                            } else {
                                getRecordList(obj.curr, pageSize, filingType, orderByType);
                            }
                        }

                    });
                });
            } else if (data.status == 20250) {
                window.location = '/maternal-ipad/login/login.html';
            }
        },
            function errfn(err) {
                 layer.msg('操作失败，请稍后重试');
                // layer.msg('操作失败');
            });
    }
    $(".inquire").click(function() {
        getCount(filingType);
        getRecordList(pageNum, pageSize, filingType, orderByType);
    })
    // 查看
    $(".recordBody").delegate('.look', "click", function() {
        localStorage.setItem("maternalrecordData", JSON.stringify(eval("(" + $(this).attr('data') + ")")))
        localStorage.setItem("maternalpregnant", $(this).parent('.operation').siblings('.pregnant').html());
        var recordData = eval("(" + $(this).attr('data') + ")")
        var gardenIcon = eval('(' + recordData.highRiskTotalNum + ')')
        localStorage.setItem('maternalgardenIcon', JSON.stringify(gardenIcon));
        window.location = '/maternal-ipad/center/center.html';
    });
    // 补充档案
    $(".recordBody").delegate('.supplement', "click", function() {
        localStorage.setItem("maternalrecordData", JSON.stringify(eval("(" + $(this).attr('data') + ")")))
        window.location = '/maternal-ipad/supplement/supplement.html';
    });
    // 后退按钮
    $(".backBtn").click(function() {
        window.location = "/maternal-ipad/index/index.html";
    });

    // 新建档案 待见档案 切换
    $('.likeBtn').click(function() {
        localStorage.setItem("pageNum","1");
        if ($(this).attr('name') == 0) {
            $(this).attr('name', 1).html('新申请列表').siblings('.sup').show();
            filingType = 1;
            getCount(filingType);
            getRecordList(1, pageSize, filingType, orderByType);
        } else if ($(this).attr('name') == 1) {
            $(this).attr('name', 0).html('已建档列表').siblings('.sup').hide();
            filingType = 0;
            getCount(filingType);
            getRecordList(1, pageSize, filingType, orderByType);
        }
    });
    // 扫码按钮
    $('.scanCode').click(function () {
        webkit.messageHandlers.scanCodeClick.postMessage("");
    });
});

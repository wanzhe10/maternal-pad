/*
 * @Author: wanjunliang
 * @Date: 2018-07-12 11:44:10
 * @Last Modified by: wanjunliang
 * @Last Modified time: 2018-09-21 18:53:24
 */
$(function() {
    var pageNum = 1; // 页码
    var pageSize = 5; // 每页条数
    var count = 0; // 总条数
    layui.use(['layer', 'form', 'element', 'laydate'], function () {
        var layer = layui.layer,
            form = layui.form,
            element = layui.element,
            laydate = layui.laydate;
        form.render();
  
    });
 
    // 点击空白处软键盘消失
    // 遮罩层点击
    $('.shadow').click(function () {
        objBlur('main', 300);
    });
    $('.content').click(function () {
        objBlur('main', 300);
    });
    $('.content2').click(function () {
        objBlur('main', 300);
    });
     
    
    // 阻止屏幕滑动
    var handle = function (event) {
        event.preventDefault();
    }
    // // 阻止屏幕滑动
    // document.body.addEventListener('touchmove', handle, false);
    // // 允许屏幕滑动
    // document.body.removeEventListener('touchmove', handle, false);
    // 查询个人信息-start
    HttpRequstForPost(httpUrl.findSelf, 'json', {
        "token": token,  
    },function sucFn(data) {
        console.log(data)
        if (data.status == 20200) {
            $(".createDate").html(data.createDate); // 创建时间
            $(".deptName").html(data.deptSimpleName); // 所在科室
            $(".hospitalName").html(data.hospitalName); // 所在机构
            $(".loginDate").html(data.loginDate); // 上次登录时间
            $(".loginName").html(data.userName); // 登录姓名
            $(".changePassword_userName").val(data.userName); // 登录姓名-修改密码使用
            $(".userName").html(data.name); // 用户名
            $(".telInput").val(data.telephone); // 手机号
            $(".emailInput").val(data.emails); // 邮箱
            $(".remarkInput").val(data.remarks); // 备注
            if (data.images !== '') {
                var imgSrc = eval("(" + data.images + ")");
                $(".headIcon").css("backgroundImage", "url(" + imgIp + imgSrc.minImageURL + ")").attr("bigImg", imgIp + imgSrc.maxImageURL);
            }
        } else if (data.status == 20250) {
            window.location = '/maternal-ipad/login/login.html';
        } else {

        }
    },
        function errfn(err) {
             layer.msg('操作失败，请稍后重试');
        });
    // 查询个人信息-end

    // 个人信息修改-start
    $(".imgFileBtn").change(function() {
        var reader = new FileReader();
        reader.readAsDataURL($(this)[0].files[0]);
        reader.onload = function(e) {
            if (e.target.result) {
                $(".headIcon").css("backgroundImage", "url(" + e.target.result + ")").attr("bigImg", e.target.result);
            }
        }
    })
    $(".updateSelf").click(function() {
        var postData = new FormData();
        $(".telInput").val() ? postData.append("telephone", $(".telInput").val()) : null;
        $(".emailInput").val() ? postData.append("emails", $(".emailInput").val()) : null;
        $(".remarkInput").val() ? postData.append("remarks", $(".remarkInput").val()) : null;
        $(".imgFileBtn").val() ? postData.append("multipartFile", $(".imgFileBtn")[0].files[0]) : null;
        postData.append("token", token);
        console.log(postData)
        HttpRequstFromDataForPost(httpUrl.updateSelf, 'json', postData, function sucFn(data) {
            // console.log(data)
            if (data.status == 20200) {
                layer.msg("修改成功");
            } else if (data.status == 20250) {
                window.location = '/maternal-ipad/login/login.html';
            } else {
                layer.msg("修改失败");
            }
        },
            function errfn(err) {
                 layer.msg('操作失败，请稍后重试');
            });
    })
    // 个人信息修改-end

    // 修改密码-start
    // 旧密码
    $(".oldPassword").focus(function() {
        $(this).parents(".changeItem").removeClass("error errorNull");
    }).blur(function() {
        if ($(this).val() == '') {
            $(this).parents(".changeItem").addClass("errorNull");
        } else if (!RegExpObj.Reg_PassWord.test($(this).val())) {
            $(this).parents(".changeItem").addClass('error');
        }
    })
    // 新密码
    $(".password").focus(function() {
        $(this).parents(".changeItem").removeClass("error errorNull");
    }).blur(function() {
        if ($(this).val() == '') {
            $(this).parents(".changeItem").addClass("errorNull");
        } else if (!RegExpObj.Reg_PassWord.test($(this).val())) {
            $(this).parents(".changeItem").addClass('error');
        }
    })
    // 确认密码
    $(".newPassword").focus(function() {
        $(this).parents(".changeItem").removeClass("error errorNull errorCoherence");
    }).blur(function() {
        if ($(this).val() == '') {
            $(this).parents(".changeItem").addClass("errorNull");
        } else if ($(this).val() != $(".password").val()) {
            $(this).parents(".changeItem").addClass('errorCoherence');
        }
    })

    $(".changePassWord").click(function() {
        if ($(".oldPassword").val() == '') {
            $(".oldPassword").parents(".changeItem").addClass("errorNull");
        } else if (!RegExpObj.Reg_PassWord.test($(".oldPassword").val())) {
            $(".oldPassword").parents(".changeItem").addClass('error');
        } else if ($(".password").val() == '') {
            $(".password").parents(".changeItem").addClass("errorNull");
        } else if (!RegExpObj.Reg_PassWord.test($(".password").val())) {
            $(".password").parents(".changeItem").addClass('error');
        } else if ($(".newPassword").val() == '') {
            $(".newPassword").parents(".changeItem").addClass("errorNull");
        } else if ($(".newPassword").val() != $(".password").val()) {
            $(".newPassword").parents(".changeItem").addClass('errorCoherence');
        } else {
            HttpRequstForPost(httpUrl.updateSelfPassword, 'json', {
                "oldPassword": $(".oldPassword").val(),
                "newPassword": $(".newPassword").val(),
                "token": token,

            }, function sucFn(data) {
                    // console.log(data)
                    if (data.status == 20200) {
                        // layer.msg("修改成功");
                        localStorage.removeItem("name");
                        localStorage.removeItem("highRiskGradesTable");
                        window.location = "/maternal-ipad/login/login.html";
                    } else if (data.status == 20250) {
                        window.location = '/maternal-ipad/login/login.html';
                    } else {
                        layer.msg("修改失败");
                    }
                },
                function errfn(err) {
                     layer.msg('操作失败，请稍后重试');
                });
        }
    })
    // 修改密码-end


    // 退出登录-statr
    $(".quitBtn").click(function() {
        HttpRequstForPost(httpUrl.signOut, 'json', { "token": token,}, function sucFn(data) {
            if (data.status == 20200) {
                localStorage.removeItem("name");
                localStorage.removeItem("highRiskGradesTable");
                localStorage.removeItem("token");
                window.location = "/maternal-ipad/login/login.html"
            } else if (data.status == 20250) {
                window.location = '/maternal-ipad/login/login.html';
            } else {
            }
        },
            function errfn(err) {
            });
    })
    // 退出登录-statr

    // 机构信息 查询 修改-start
    // D1 查询本院信息  findSelfHospital: v1/web/pad/hospital/findSelfHospital 、
    HttpRequstForPost(httpUrl.findSelfHospital, 'json', { "token": token, }, function sucFn(data) {
        console.log(data)
        if (data.status == 20200) {
            $(".tepes").val(data.types); // 医院类型
            $('.hospitalName').val(data.name); // 医院名字
            $('.addressRemarks').html(data.addressRemarks); //地址详情
            $('.details').html(data.details); // 详情
            $('.linkman').val(data.userName); //联系人
            $('.addressProvince').val(data.addressProvince); //省份
            $('.addressCity').val(data.addressCity); //市
            $('.addressArea').val(data.addressArea); // 区
            $('.userTelephone').val(data.userTelephone); //联系人电话
            $('.telephone').val(data.telephone); //电话
            $('.emails').val(data.emails); //email
            if (data.images !== '') {
                var imgUrl = eval("(" + data.images + ")");
                $('.bgImg').css("backgroundImage", "url('" + imgIp + imgUrl.minImageURL + "')").attr("imgSrc", imgIp + imgUrl.maxImageURL); // 医院图片
            }

           
        } else if (data.status == 20250) {
            window.location = '/maternal-ipad/login/login.html';
        } else {

        }
    },
            function errfn(err) {
                 layer.msg('操作失败，请稍后重试');
            });
    // 选择医院图片后的展示
    $(".hospitalFile").change(function() {
        var reader = new FileReader();
        reader.readAsDataURL($(this)[0].files[0]);
        reader.onload = function(e) {
            if (e.target.result) {
                $(".bgImg").css("backgroundImage", "url(" + e.target.result + ")").attr("bigImg", e.target.result);
            }
        }
    })
    // 修改机构基本信息维护 v1/web/pad/hospital/updateSelfHospital D1 修改
    $(".updateSelfHospital").click(function() {
        var postData = new FormData();
        $('.tepes').val() ? postData.append("types", $('.tepes').val()) : null; // 医院类型
        $('.hospitalName').val() ? postData.append("name", $('.hospitalName').val()) : null; // 医院名称
        $('.addressProvince').val() ? postData.append("addressProvince", $('.addressProvince').val()) : null; //省
        $('.addressCity').val() ? postData.append("addressCity", $('.addressCity').val()) : null; //市
        $('.addressArea').val() ? postData.append("addressArea", $('.addressArea').val()) : null; //区
        $('.addressRemarks').val() ? postData.append("addressRemarks", $('.addressRemarks').val()) : null; // 详情地址
        $('.details').val() ? postData.append("details", $('.details').val()) : null; // 机构详情
        $('.linkman').val() ? postData.append("userName", $('.linkman').val()) : null; //联系人
        $('.userTelephone').val() ? postData.append("userTelephone", $('.userTelephone').val()) : null; //联系人-电话
        $('.telephone').val() ? postData.append("telephone", $('.telephone').val()) : null; //电话
        $('.emails').val() ? postData.append("emails", $('.emails').val()) : null; //邮箱
        $('.hospitalFile').val() ? postData.append("multipartFile", $(".hospitalFile")[0].files[0]) : null; //医院图片
        postData.append("token", token);
        HttpRequstFromDataForPost(httpUrl.updateSelfHospital, 'json', postData, function sucFn(data) {
            // console.log(data)
            if (data.status == 20200) {
                layer.msg("修改成功");
            } else if (data.status == 20250) {
                window.location = '/maternal-ipad/login/login.html';
            } else {
                layer.msg("修改失败");
            }
        },
            function errfn(err) {
                layer.msg("修改失败，稍后重试");
            });
    })

    // 机构信息 查询 修改-end

    // 科室信息 查询 修改 增加 -start

    getDeptList();
    // 科室信息维护 v1/web/pad/deptSimple/findList 查询列表
    function getDeptList() {
        HttpRequstForPost(httpUrl.findList, 'json', { "token": token,},function sucFn(data) {
            // console.log(data)
            if (data.status == 20200) {
                var deptSimpleBeanList = data.deptSimpleBeanList;
                var _html = '';
                var optionHtml = '';
                for (var i = 0; i < deptSimpleBeanList.length; i++) {
                    if (deptSimpleBeanList[i].remarks == "1") {
                        _html += '<div class="hospitalMatter disabled clearfix">\
                                        <span class="hospitalOffice">' + deptSimpleBeanList[i].name + '</span>\
                                        <span class="modification amendDeptBtn" name="' + deptSimpleBeanList[i].name + '" value="' + deptSimpleBeanList[i].id + '" remarks="' + deptSimpleBeanList[i].remarks + '">修改</span>\
                                    </div>'
                    } else {
                        _html += '<div class="hospitalMatter clearfix">\
                                        <span class="hospitalOffice">' + deptSimpleBeanList[i].name + '</span>\
                                        <span class="modification amendDeptBtn" name="' + deptSimpleBeanList[i].name + '" value="' + deptSimpleBeanList[i].id + '" remarks="' + deptSimpleBeanList[i].remarks + '">修改</span>\
                                    </div>'
                        optionHtml += '<option value="' + deptSimpleBeanList[i].id + '">' + deptSimpleBeanList[i].name + '</option>'
                    }

                }
                $('.deptListBox').html(_html);
                $(".deptSelect").html(optionHtml);
                $(".amendDeptSelect").html(optionHtml);
                layui.use('form', function () {
                    var form = layui.form;
                    form.render();
                });
            } else if (data.status == 20250) {
                window.location = '/maternal-ipad/login/login.html';
            } else {
                $('.deptListBox').html('');
            }
        },
            function errfn(err) {
                 layer.msg('操作失败，请稍后重试');
            });
    }

    // 添加科室编辑
    $(".addDeptBtn").click(function() {
        $('.addDeptContent').show();
        $('.shadow').show();
        document.body.addEventListener('touchmove', handle, false);
    })
    // 添加科室编辑 取消 关闭 按钮
    $(".addDeptContent").find(".noBtn,.addDeptClose").click(function() {
        layer.closeAll();
        $(".addDeptContent").hide();
        $('.shadow').hide();
        // 允许屏幕滑动
        document.body.removeEventListener('touchmove', handle, false);
    })
    // 添加科室编辑 是否禁用切换按钮
    $(".addDeptRemarks").click(function() {
        $(this).toggleClass("true");
    })
    // 添加科室编辑 确认按钮
    $(".addDeptContent").find(".yesBtn").click(function() {
        if (!$(".addDeptInput").val()) {
            layer.msg("请输入内容");
        } else {
            // 关闭 添加科室编辑 打开 确认
            layer.closeAll();
            $(".addDeptContent").hide();
            $('.shadow').hide();
            layer.open({
                "type": 1,
                "title": '',
                "content": $('.addDeptAffirm'),
                "area": ["18.5rem", "9rem"],
                "closeBtn": 0,
                "shade": [0.5, "#000000"],
                "shadeClose": false,
                "time": 0,
                "scrollbar": false,
            });
        }
    })
    // 添加科室确认 否
    $(".addDeptAffirm").find(".noBtn").click(function() {
        layer.closeAll();
        $(".addDeptAffirm").hide();
    });
    // 添加科室确认 是
    $(".addDeptAffirm").find(".yesBtn").click(function() {
        // 科室添加
        HttpRequstForPost(httpUrl.insertDept, 'json', {
            'name': $(".addDeptInput").val(), //名称
            'remarks': $(".addDeptRemarks").hasClass("true") ? 1 : 0, // 是否禁用
            "token": token,

        }, function sucFn(data) {
                // console.log(data)
                if (data.status == 20200) {
                    getDeptList();
                    layer.msg("添加成功");
                    $(".addDeptInput").val('');
                    $(".addDeptRemarks").removeClass("true")
                    setTimeout(function () {
                        layer.closeAll();
                        $(".addDeptAffirm").hide();
                        // 允许屏幕滑动
                        document.body.removeEventListener('touchmove', handle, false);
                    }, 2500)
                } else if (data.status == 20250) {
                    window.location = '/maternal-ipad/login/login.html';
                } else {
                    layer.msg("添加失败");
                    setTimeout(function () {
                        layer.closeAll();
                        $(".addDeptAffirm").hide();
                        // 允许屏幕滑动
                        document.body.removeEventListener('touchmove', handle, false);
                    }, 2500)
                }
            },
            function errfn(err) {
                 layer.msg('操作失败，请稍后重试');
                // 允许屏幕滑动
                document.body.removeEventListener('touchmove', handle, false);
            });
    });

    // 科室修改 - 打开科室修改
    $(".deptListBox").delegate('.amendDeptBtn', 'click', function() {
        $(this).attr("remarks") == "1" ? $(".amendDeptRemarks").addClass("true") : $(".amendDeptRemarks").removeClass("true");
        $(".amendDeptInput").val($(this).attr("name"));
        $(".amendDeptAffirm").find(".yesBtn").attr("value", $(this).attr("value"));
        $('.amendDeptContent').show();
        $('.shadow').show();
        document.body.addEventListener('touchmove', handle, false);
    });
    // 科室修改 是否禁用切换按钮
    $(".amendDeptRemarks").click(function() {
        $(this).toggleClass("true");
    })
    // 科室修改 取消 关闭 按钮
    $(".amendDeptContent").find(".noBtn,.amendDeptClose").click(function() {
        layer.closeAll();
        $(".amendDeptContent").hide();
        $('.shadow').hide();
        // 允许屏幕滑动
        document.body.removeEventListener('touchmove', handle, false);
    })
    // 科室修改 确认按钮
    $(".amendDeptContent").find(".yesBtn").click(function() {
        if (!$(".amendDeptInput").val()) {
            layer.msg("请输入内容");
        } else {
            $(".amendDeptAffirm").find(".yesBtn").attr({
                "name": $(".amendDeptInput").val(),
                "remarks": $(".amendDeptRemarks").hasClass("true") ? 1 : 0,
            })
            // 关闭 科室修改 打开 确认
            layer.closeAll();
            $(".amendDeptContent").hide();
            $('.shadow').hide();
            layer.open({
                "type": 1,
                "title": '',
                "content": $('.amendDeptAffirm'),
                "area": ["18.5rem", "9rem"],
                "closeBtn": 0,
                "shade": [0.5, "#000000"],
                "shadeClose": false,
                "time": 0,
                "scrollbar": false,
            })
        }
    })
    // 科室修改 确认 否
    $(".amendDeptAffirm").find(".noBtn").click(function() {
        layer.closeAll();
        $(".amendDeptAffirm").hide();
        // 允许屏幕滑动
        document.body.removeEventListener('touchmove', handle, false);
    });
    // 科室修改 确认 是
    $(".amendDeptAffirm").find(".yesBtn").click(function() {
        // 科室修改
        HttpRequstForPost(httpUrl.update, 'json', {
            'id': $(this).attr("value"), // id
            'name': $(this).attr("name"), // 名称
            'remarks': $(this).attr("remarks"), // 是否启用
            "token": token,

        }, function sucFn(data) {
                // console.log(data)
                if (data.status == 20200) {
                    getDeptList();
                    layer.msg("修改成功");
                    setTimeout(function () {
                        layer.closeAll();
                        $(".amendDeptAffirm").hide();
                        // 允许屏幕滑动
                        document.body.removeEventListener('touchmove', handle, false);
                    }, 2500)
                } else if (data.status == 20250) {
                    window.location = '/maternal-ipad/login/login.html';
                } else {
                    layer.msg("修改失败");
                    setTimeout(function () {
                        layer.closeAll();
                        $(".amendDeptAffirm").hide();
                        // 允许屏幕滑动
                        document.body.removeEventListener('touchmove', handle, false);
                    }, 2500)
                }
            },
            function errfn(err) {
                 layer.msg('操作失败，请稍后重试');
                // 允许屏幕滑动
                document.body.removeEventListener('touchmove', handle, false);
            });
    });

    // 科室信息 查询 修改 增加 -end

    // 人员信息 添加 修改 查询 start
    // 获取人员列表
    findSelfDoctorList(pageNum, pageSize);
    function findSelfDoctorList(pageNum, pageSize) {
        HttpRequstForPost(httpUrl.findSelfDoctorList, 'json', {
            "pageNum": pageNum, // 页码
            "pageNumber": pageSize, // 每页条数
            "paramType": 0, // 搜索类型
            "paramDetails": $(".paramDetails").val(), // 搜索内容
            "token": token,
        },function sucFn(data) {
                // console.log(data)
                if (data.status == 20200) {
                    var tempArr = data.doctorBeanList;
                    var _html = "";
                    for (var i = 0; i < tempArr.length; i++) {
                        if (tempArr[i].types == 1) {
                            _html += '<div class="operability disabled">\
                                <div class="w185">' + tempArr[i].name + '</div>\
                                <div class="w265">' + tempArr[i].telephone + '</div>\
                                <div class="w245">' + tempArr[i].deptSimpleName + '</div>\
                                <div class="w270">' + tempArr[i].occupationName + '</div>\
                                <div class="w278">' + tempArr[i].createDate + '</div>\
                                <a href="javascript:;" class="alter w182" name="' + tempArr[i].name + '" telephone="' + tempArr[i].telephone + '" deptSimpleId="' + tempArr[i].deptSimpleId + '" occupationId="' + tempArr[i].occupationId + '" types="' + tempArr[i].types + '" rolesType="' + tempArr[i].rolesNameList.length + '" value="' + tempArr[i].id + '">修改</a>\
                            </div>'
                        } else {
                            _html += '<div class="operability">\
                                <div class="w185">' + tempArr[i].name + '</div>\
                                <div class="w265">' + tempArr[i].telephone + '</div>\
                                <div class="w245">' + tempArr[i].deptSimpleName + '</div>\
                                <div class="w270">' + tempArr[i].occupationName + '</div>\
                                <div class="w278">' + tempArr[i].createDate + '</div>\
                                <a href="javascript:;" class="alter w182" name="' + tempArr[i].name + '" telephone="' + tempArr[i].telephone + '" deptSimpleId="' + tempArr[i].deptSimpleId + '" occupationId="' + tempArr[i].occupationId + '" types="' + tempArr[i].types + '" rolesType="' + tempArr[i].rolesNameList.length + '" value="' + tempArr[i].id + '">修改</a>\
                            </div>'
                        }
                    }
                    $('.personnelBox_main').html(_html);
                } else if (data.status == 20250) {
                    window.location = '/maternal-ipad/login/login.html';
                } else {
                    $('.personnelBox_main').html('');
                }
            },
            function errfn(err) {
                 layer.msg('操作失败，请稍后重试');
            });
    }
    // 获取人员总数量
    getDoctorCount(pageNum, pageSize);

    function getDoctorCount(pageNum, pageSize) {
        HttpRequstForPost(httpUrl.findSelfDoctorList, 'json', {
            "pageNum": pageNum,
            "pageNumber": pageSize,
            "paramType": 0,
            "paramDetails": $(".paramDetails").val(),
            "token": token,

        }, function sucFn(data) {
                // console.log(data)
                if (data.status == 20200) {
                    count = data.pageNumber * pageSize;
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
                                } else {
                                    findSelfDoctorList(obj.curr, pageSize);
                                }
                            }
                        });
                    });
                } else if (data.status == 20250) {
                    window.location = '/maternal-ipad/login/login.html';
                } else {
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
                                } else {
                                    findSelfDoctorList(obj.curr, pageSize);
                                }
                            }
                        });
                    });
                }
            },
            function errfn(err) {
                 layer.msg('操作失败，请稍后重试');
            });
    }
    // 搜索框
    $(".seekIcon").click(function() {
        getDoctorCount(pageNum, pageSize);
        findSelfDoctorList(pageNum, pageSize);
    })
    // 添加人员按钮
    $(".addPersonnel").click(function() {
        $('.addDoctorContnet').show();
        $('.shadow').show();
        document.body.addEventListener('touchmove', handle, false);
    });
    $(".addDoctorContnet").find(".noBtn,.addDoctorClose").click(function() {
        layer.closeAll();
        $('.shadow').hide();
        $(".addDoctorContnet").hide();
        // 允许屏幕滑动
        document.body.removeEventListener('touchmove', handle, false);
    })
    //添加人员 是否禁用切换按钮 是否为管理员
    $(".addDoctorRemarks,.addDoctorManager").click(function() {
        $(this).toggleClass("true");
    })
    // 添加人员 确认按钮
    $(".addDoctorContnet").find(".yesBtn").click(function() {
        // if (!$(".addDeptInput").val()) {
        //     layer.msg("请输入内容");
        // } else {
        // 关闭 添加科室编辑 打开 确认
        layer.closeAll();
        $(".addDoctorContnet").hide();
        $('.shadow').hide();
        layer.open({
            "type": 1,
            "title": '',
            "content": $('.addDoctorAffirm'),
            "area": ["18.5rem", "9rem"],
            "closeBtn": 0,
            "shade": [0.5, "#000000"],
            "shadeClose": false,
            "time": 0,
            "scrollbar": false,
        });
    });
    // 添加人员 否
    $(".addDoctorAffirm").find(".noBtn").click(function() {
        layer.closeAll();
        $(".addDoctorAffirm").hide();
        $('.shadow').hide();
    });
    // 添加人员 是
    $(".addDoctorAffirm").find(".yesBtn").click(function() {
        // 人员添加
        HttpRequstForPost(httpUrl.insert, 'json', {
            'name': $(".doctorName").val(), //姓名
            'telephone': $(".doctorTel").val(), //手机号
            'deptId': $(".deptSelect").val(), //科室Id
            'occupationId': $(".titleSelect").val(), //职称类型
            'rolesType': $(".addDoctorManager").hasClass("true") ? 1 : 0, // 是否管理员 是1  否0
            'types': $(".addDoctorRemarks").hasClass("true") ? 1 : 0, // 是否禁用
            "token": token,

        },function sucFn(data) {
                console.log(data)
                if (data.status == 20200) {
                    getDoctorCount(pageNum, pageSize);
                    findSelfDoctorList(pageNum, pageSize);
                    layer.msg("添加成功");
                    $(".doctorName").val('');
                    $(".doctorTel").val('');
                    $(".addDoctorManager").removeClass("true");
                    $(".addDoctorRemarks").removeClass("true");
                    setTimeout(function () {
                        layer.closeAll();
                        $(".addDoctorAffirm").hide();
                        $('.shadow').hide();
                        // 允许屏幕滑动
                        document.body.removeEventListener('touchmove', handle, false);
                    }, 2500)
                } else if (data.status == 20250) {
                    window.location = '/maternal-ipad/login/login.html';
                } else {
                    layer.msg("添加失败");
                    setTimeout(function () {
                        layer.closeAll();
                        $(".addDoctorAffirm").hide();
                        // 允许屏幕滑动
                        document.body.removeEventListener('touchmove', handle, false);
                    }, 2500)
                }
            },
            function errfn(err) {
                 layer.msg('操作失败，请稍后重试');
                // 允许屏幕滑动
                document.body.removeEventListener('touchmove', handle, false);
            });
    });

    // 人员修改
    $(".personnelBox_main").delegate(".alter", "click", function() {
        $(".amendDoctorAffirm").find(".yesBtn").attr("value", $(this).attr("value"));
        $(".amendDoctorName").val($(this).attr("name")); //姓名
        $(".amendDoctorTel").val($(this).attr("telephone")); //手机号
        $(".amendDeptSelect").val($(this).attr("deptSimpleId")); //科室Id
        $(".amendTitleSelect").val($(this).attr("occupationId")); //职称类型
        $(this).attr("rolesType") > 1 ? $(".amendDoctorManager").addClass("true") : $(".amendDoctorManager").removeClass("true"); // 是否管理员 是1  否0
        $(this).attr("types") == 1 ? $(".amendDoctorRemarks").addClass("true") : $(".amendDoctorRemarks").removeClass("true"); // 是否禁用
        layui.use('form', function() {
            var form = layui.form;
            form.render();
        });
        $('.amendDoctorContnet').show();
        $('.shadow').show();
        document.body.addEventListener('touchmove', handle, false);
       
    })
    $(".amendDoctorContnet").find(".noBtn,.amendDoctorClose").click(function() {
        layer.closeAll();
        $(".amendDoctorContnet").hide();
        $('.shadow').hide();
        // 允许屏幕滑动
        document.body.removeEventListener('touchmove', handle, false);
    })
    //人员修改 是否禁用切换按钮 是否为管理员
    $(".amendDoctorRemarks,.amendDoctorManager").click(function() {
        $(this).toggleClass("true");
    })
    // 人员修改 确认按钮
    $(".amendDoctorContnet").find(".yesBtn").click(function() {
        // if (!$(".amendDeptInput").val()) {
        //     layer.msg("请输入内容");
        // } else {
        // 关闭 添加科室编辑 打开 确认
        layer.closeAll();
        $(".amendDoctorContnet").hide();
        $('.shadow').hide();
        layer.open({
            "type": 1,
            "title": '',
            "content": $('.amendDoctorAffirm'),
            "area": ["18.5rem", "9rem"],
            "closeBtn": 0,
            "shade": [0.5, "#000000"],
            "shadeClose": false,
            "time": 0,
            "scrollbar": false,
        })
        // }
    })
    // 人员修改 否
    $(".amendDoctorAffirm").find(".noBtn").click(function() {
        layer.closeAll();
        $(".amendDoctorAffirm").hide();
        $(".amendDoctorContnet").hide();
        $('.shadow').hide();
        // 允许屏幕滑动
        document.body.removeEventListener('touchmove', handle, false);
        
    });
    // 人员修改 是
    $(".amendDoctorAffirm").find(".yesBtn").click(function() {
        // 人员修改
        HttpRequstForPost(httpUrl.updateDoctor, 'json', {
            'id': $(this).attr("value"), // id
            'name': $(".amendDoctorName").val(), //姓名
            'telephone': $(".amendDoctorTel").val(), //手机号
            'deptId': $(".amendDeptSelect").val(), //科室Id
            'occupationId': $(".amendTitleSelect").val(), //职称类型
            'rolesType': $(".amendDoctorManager").hasClass("true") ? 1 : 0, // 是否管理员 是1  否0
            'types': $(".amendDoctorRemarks").hasClass("true") ? 1 : 0, // 是否禁用
            "token": token,

        }, function sucFn(data) {
                console.log(data)
                if (data.status == 20200) {
                    getDoctorCount(pageNum, pageSize);
                    findSelfDoctorList(pageNum, pageSize);
                    layer.msg("修改成功");
                    setTimeout(function () {
                        layer.closeAll();
                        $(".amendDoctorAffirm").hide();
                        $(".amendDoctorContnet").hide();
                        $('.shadow').hide();
                        // 允许屏幕滑动
                        document.body.removeEventListener('touchmove', handle, false);
                    }, 2500)
                } else if (data.status == 20250) {
                    window.location = '/maternal-ipad/login/login.html';
                } else {
                    layer.msg("修改失败");
                    setTimeout(function () {
                        layer.closeAll();
                        $(".amendDoctorAffirm").hide();
                        $(".amendDoctorContnet").hide();
                        $('.shadow').hide();
                        // 允许屏幕滑动
                        document.body.removeEventListener('touchmove', handle, false);
                    }, 2500)
                }
            },
            function errfn(err) {
                 layer.msg('操作失败，请稍后重试');
                $(".amendDoctorContnet").hide();
                $('.shadow').hide();
                // 允许屏幕滑动
                document.body.removeEventListener('touchmove', handle, false);
            });
    });

    // 人员信息 添加 修改 查询 end


    // 角色 查询 修改 增加 -start

    getRoleList();
    // 角色信息查询 v1/web/pad/occupation/findList 查询列表
    function getRoleList() {
        HttpRequstForPost(httpUrl.findListTitle, 'json', { "token": token,}, function sucFn(data) {
            console.log(data)
            if (data.status == 20200) {
                var occupationBeanList = data.occupationBeanList;
                var _html = '';
                var optionHtml = "";
                for (var i = 0; i < occupationBeanList.length; i++) {
                    _html += '<div class="professional clearfix">\
                                <span class="hospitalOffice">' + occupationBeanList[i].name + '</span>\
                                <span class="modification amendRoleBtn" name="' + occupationBeanList[i].name + '" value="' + occupationBeanList[i].id + '">修改</span>\
                            </div>';
                    optionHtml += '<option value="' + occupationBeanList[i].id + '">' + occupationBeanList[i].name + '</option>';
                }
                $('.roleListBox').html(_html);
                $(".titleSelect").html(optionHtml);
                $(".amendTitleSelect").html(optionHtml);
                layui.use('form', function () {
                    var form = layui.form;
                    form.render();
                });
            } else if (data.status == 20250) {
                window.location = '/maternal-ipad/login/login.html';
            } else {
                $('.roleListBox').html('');
            }
        },
            function errfn(err) {
                 layer.msg('操作失败，请稍后重试');
            });
    };

    // 添加角色编辑
    $(".addRoleBtn").click(function() {
        $('.addRoleContent').show();
        $('.shadow').show();
        document.body.addEventListener('touchmove', handle, false);
        // layer.open({
        //     "type": 1,
        //     "title": '',
        //     "content": $('.addRoleContent'),
        //     "area": ["18.5rem", "12.25rem"],
        //     "closeBtn": 0,
        //     "shade": [0.5, "#000000"],
        //     "shadeClose": false,
        //     "time": 0,
        //     "scrollbar": false,
        // });
    });
    // 添加角色编辑 取消 关闭 按钮
    $(".addRoleContent").find(".noBtn,.addRoleClose").click(function() {
        layer.closeAll();
        $(".addRoleContent").hide();
        $('.shadow').hide();
        // 允许屏幕滑动
        document.body.removeEventListener('touchmove', handle, false);
    });
    // 添加角色编辑 是否禁用切换按钮
    $(".addRoleRemarks").click(function() {
        $(this).toggleClass("true");
    });
    // 添加角色编辑 确认按钮
    $(".addRoleContent").find(".yesBtn").click(function() {
        if (!$(".addRoleInput").val()) {
            layer.msg("请输入内容");
        } else {
            // 关闭 添加角色编辑 打开 确认
            layer.closeAll();
            $(".addRoleContent").hide();
            $('.shadow').hide();
            layer.open({
                "type": 1,
                "title": '',
                "content": $('.addRoleAffirm'),
                "area": ["18.5rem", "9rem"],
                "closeBtn": 0,
                "shade": [0.5, "#000000"],
                "shadeClose": false,
                "time": 0,
                "scrollbar": false,
            });
        };
    });
    // 添加角色确认 否
    $(".addRoleAffirm").find(".noBtn").click(function() {
        layer.closeAll();
        $(".addRoleAffirm").hide();
        // 允许屏幕滑动
        document.body.removeEventListener('touchmove', handle, false);
    });
    // 添加角色确认 是
    $(".addRoleAffirm").find(".yesBtn").click(function() {
        // 角色添加
        HttpRequstForPost(httpUrl.insertTitle, 'json', {
            'name': $(".addRoleInput").val(), //名称
            "token": token,

            // 'remarks': $(".addRoleRemarks").hasClass("true") ? 1 : 0, // 是否禁用
        }, function sucFn(data) {
                console.log(data)
                if (data.status == 20200) {
                    getRoleList();
                    layer.msg("添加成功");
                    $(".addRoleInput").val('');
                    setTimeout(function () {
                        layer.closeAll();
                        $(".addRoleAffirm").hide();
                        // 允许屏幕滑动
                        document.body.removeEventListener('touchmove', handle, false);
                    }, 2500)
                } else if (data.status == 20250) {
                    window.location = '/maternal-ipad/login/login.html';
                } else {
                    layer.msg("添加失败");
                    setTimeout(function () {
                        layer.closeAll();
                        $(".addRoleAffirm").hide();
                        // 允许屏幕滑动
                        document.body.removeEventListener('touchmove', handle, false);
                    }, 2500)
                }
            },
            function errfn(err) {
                 layer.msg('操作失败，请稍后重试');
                // 允许屏幕滑动
                document.body.removeEventListener('touchmove', handle, false);
            });
    });

    // 角色修改 - 打开角色修改
    $(".roleListBox").delegate('.amendRoleBtn', 'click', function() {
        // $(this).attr("remarks") == "1" ? $(".amendRoleRemarks").addClass("true") : $(".amendRoleRemarks").removeClass("true");
        $(".amendRoleInput").val($(this).attr("name"));
        $(".amendRoleAffirm").find(".yesBtn").attr("value", $(this).attr("value"));
        $('.amendRoleContent').show();
        $('.shadow').show();
        document.body.addEventListener('touchmove', handle, false);
    });
    // 角色修改 是否禁用切换按钮
    $(".amendRoleRemarks").click(function() {
        $(this).toggleClass("true");
    });
    // 角色修改 取消 关闭 按钮
    $(".amendRoleContent").find(".noBtn,.amendRoleClose").click(function() {
        layer.closeAll();
        $(".amendRoleContent").hide();
        $('.shadow').hide();
        // 允许屏幕滑动
        document.body.removeEventListener('touchmove', handle, false);
    });
    // 角色修改 确认按钮
    $(".amendRoleContent").find(".yesBtn").click(function() {
        if (!$(".amendRoleInput").val()) {
            layer.msg("请输入内容");
        } else {
            $(".amendRoleAffirm").find(".yesBtn").attr({
                "name": $(".amendRoleInput").val(),
                "remarks": $(".amendRoleRemarks").hasClass("true") ? 1 : 0,
            });
            // 关闭 角色修改 打开 确认
            layer.closeAll();
            $(".amendRoleContent").hide();
            $('.shadow').hide();
            layer.open({
                "type": 1,
                "title": '',
                "content": $('.amendRoleAffirm'),
                "area": ["18.5rem", "9rem"],
                "closeBtn": 0,
                "shade": [0.5, "#000000"],
                "shadeClose": false,
                "time": 0,
                "scrollbar": false,
            });
        };
    });
    // 角色修改 确认 否
    $(".amendRoleAffirm").find(".noBtn").click(function() {
        layer.closeAll();
        $(".amendRoleAffirm").hide();
        // 允许屏幕滑动
        document.body.removeEventListener('touchmove', handle, false);
    });
    // 角色修改 确认 是
    $(".amendRoleAffirm").find(".yesBtn").click(function() {
        // 角色修改
        HttpRequstForPost(httpUrl.updateTitle, 'json', {
            'id': $(this).attr("value"), // id
            'name': $(this).attr("name"), // 名称
            "token": token,

            // 'remarks': $(this).attr("remarks"), // 是否启用
        }, function sucFn(data) {
                console.log(data)
                if (data.status == 20200) {
                    getRoleList();
                    layer.msg("修改成功");
                    setTimeout(function () {
                        layer.closeAll();
                        $(".amendRoleAffirm").hide();
                        // 允许屏幕滑动
                        document.body.removeEventListener('touchmove', handle, false);
                    }, 2500)
                } else if (data.status == 20250) {
                    window.location = '/maternal-ipad/login/login.html';
                } else {
                    layer.msg("修改失败");
                    setTimeout(function () {
                        layer.closeAll();
                        $(".amendRoleAffirm").hide();
                        // 允许屏幕滑动
                        document.body.removeEventListener('touchmove', handle, false);
                    }, 2500)
                }
            },
            function errfn(err) {
                 layer.msg('操作失败，请稍后重试');
                // 允许屏幕滑动
                document.body.removeEventListener('touchmove', handle, false);
            });
    });

    // 角色 查询 修改 增加 -end

    // 左侧列表伸缩切换
    $('.headline1').click(function() {
        $(this).toggleClass('active2')
        $('.configurationTop').slideToggle(300);
    });
    $('.headline2').click(function() {
        $(this).toggleClass('active2')
        $('.configurationBottom').slideToggle(300);
    });
    // 左侧teb切换
    $('.leftBox>.configurationTop>li').click(function() {
        var index = $(this).index();
        $('.configurationBottom > li').removeClass('active');
        $(this).addClass('active').siblings().removeClass('active');
        $('.content').eq(index).show().siblings().hide();
        $(".iocn").css("top", index * 3 + 1 + "rem");
        $(this).siblings().find('.icon2').hide();
        $(this).find('.icon2').show();
    });
    $('.leftBox>.configurationBottom>li').click(function() {
        var index = $(this).index();
        $('.configurationTop > li').removeClass('active');
        $(this).addClass('active').siblings().removeClass('active');
        $('.content2').eq(index).show().siblings("div").hide();
        $(".iocn").css("top", index * 3 + 1 + "rem");
        $(this).siblings().find('.icon2').hide();
        $(this).find('.icon2').show();
    });

 /*    *************报告单解读维护star******************* */

    // 产检次数选择
    var _degree = '';
    for (let i = 1; i <= 42; i++) {
        _degree += "<option value='" + i + "'>" + i + "</option>";
    }
    $('.marryType').append(_degree);
    // 报告单类型（单选）
    $('.typeSelect').on('click','li',function(){
        $(this).addClass('active').siblings('li').removeClass('active');
    });
   
 /*    *************报告单解读维护end******************* */
    /*    *************权限信息维护star******************* */

// 正常复检 异常复检
    $('.recheck').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
    });
    // 点击块
    $('.jurisdictionChunk').on('click','li',function(){
        $(this).addClass('active').siblings('li').removeClass('active');    
    });
 /*    *************权限信息维护end******************* */


//  点击图片查看大图
    $('.bgImg').click(function(){
        $('.lookBigImgaes').show();
        $(".lookBigImgaes").find('img').attr("src", $(this).attr("imgSrc"));
        document.body.addEventListener('touchmove', handle, false);
    });
    $('.headIcon').click(function () {
        $('.lookBigImgaes').show();
        $(".lookBigImgaes").find('img').attr("src", $(this).attr("bigimg"));
        document.body.addEventListener('touchmove', handle, false);
    });
    $(".lookBigImgaes").click(function () {
        $(this).hide();
        document.body.removeEventListener('touchmove', handle, false);
    });
    
});

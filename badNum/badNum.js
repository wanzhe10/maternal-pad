$(function(){
  
    layui.use(['layer', 'form', 'element', 'laydate', 'laypage'], function () {
        var layer = layui.layer,
            form = layui.form,
            element = layui.element,
            laydate = layui.laydate;
            laypage = layui.laypage;
        laypage.render({
            elem: 'test1'
            , count: 70 //数据总数
            , theme: '#68b7e7'
            , prev:'<i class="layui-icon">&#xe603</i>'
            , next:'<i class="layui-icon">&#xe602</i>'
            , jump: function (obj) {
                // console.log(obj)
            }
        });
        form.render();
    });
    // 返回按钮
    $('.callBack').click(function(){
        window.history.back(-1);
    });

    $('.tebBtn').on('click','li',function(){
        $(this).addClass('active').siblings().removeClass('active');
    });
});
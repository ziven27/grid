(function () {

    // 默认的配置
    var defaultOpt = null;

    // 表单
    var gridForm = document.getElementById('gridForm');


    var buildForm = function (form) {
        var opt = {
            colNum: form.colNum.value,
            viewWidth: form.viewWidth.value,
            gutter: form.gutter.value,
            isFix: !form.isFix.checked
        };
        // 首次缓存配置
        if (!defaultOpt) {
            defaultOpt = opt;
        }
        new GridStyle(opt);
        new GridHtml('gridWrap', opt);
    };

    // 重置的时候触发
    gridForm.onreset = function () {
        new GridStyle(defaultOpt);
        new GridHtml('gridWrap', opt);
        return true;
    };

    // 首次触发
    buildForm(gridForm);

    gridForm.addEventListener('change', function (e) {
        buildForm(gridForm);
    }, false);

    document.getElementById('downloadCodeBtn').onclick = function (e) {
        e.preventDefault();
        var data = document.getElementById('gridStyle').innerText;
        saveAs(
            new Blob(
                [data], {
                    type: "text/plain;charset=" + document.characterSet
                }
            ), "grid.css"
        );
    };
})();

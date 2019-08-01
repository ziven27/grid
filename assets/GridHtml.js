// 基于数据构建样式
(function () {
    function Obj(id, opt) {
        // 列数
        this.colNum = parseInt(opt.colNum) || 12;

        // 列前缀
        this.rowClassName = "g_row";
        this.wrapClassName = "g_wrap";
        this.colPre = "g_col_";
        this.content = '<div class="ph"></div>';
        this.box = document.getElementById(id);
        this.init();
    };

    Obj.prototype.init = function () {
        var wrapHtml = this.getWrapHtml();
        var rowsHtml = this.getRowsHtml();
        this.box.innerHTML = wrapHtml + rowsHtml;
    };


    Obj.prototype.getRowsHtml = function () {
        var ret = '';
        for (var i = 1, len = Math.floor(this.colNum / 2); i < len + 1; i++) {
            ret += this.getRowHtml(i);
        }
        return ret;
    };

    Obj.prototype.getRowHtml = function (colIndex) {
        var colsHtml = ``;
        var isSameCol = this.colNum % colIndex === 0 ? true : false;
        if (!isSameCol) {
            colsHtml += this.getColHtml(colIndex);
            colsHtml += this.getColHtml(this.colNum - colIndex);
        } else {
            var colLen = this.colNum / colIndex;
            for (var i = colLen; i--;) {
                colsHtml += this.getColHtml(colIndex);
            }
        }
        return `
            <div class="${this.rowClassName}">${colsHtml}</div>
        `;
    };

    Obj.prototype.getColHtml = function (num) {
        return `
            <div class="${this.colPre + num}">${this.content}</div>
        `;
    };

    Obj.prototype.getWrapHtml = function () {
        return `
            <div class="${this.wrapClassName}">${this.content}</div>
        `;
    };

    window.GridHtml = Obj;
})();
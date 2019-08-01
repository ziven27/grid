// 基于数据构建样式
(function () {
    function Obj(opt) {
        // 列数
        this.colNum = parseInt(opt.colNum) || 12;

        // 可视区域宽度
        this.viewWidth = parseInt(opt.viewWidth) || 1176;

        // 列间距
        this.gutter = parseInt(opt.gutter);

        // 是否是固定
        this.isFix = opt.isFix;

        // 列前缀
        this.colPre = "g_col_";
        this.medias = [{
            name: 'g_col_m_',
            value: '768'
        }, {
            name: 'g_col_s_',
            value: '576'
        }];
        this.init();
    };

    Obj.prototype.init = function () {
        var rowStyle = this.getBaseStyle();
        var colStyle = this.getColStyle(this.colPre);
        var mediaColStyle = this.getMediaColStyle();
        var gridStyle = rowStyle + colStyle + mediaColStyle;
        document.getElementById("gridStyle").innerHTML = gridStyle;
    };

    Obj.prototype.getMediaColStyle = function () {
        var medias = this.medias;
        var ret = '';
        for (var i = 0, len = medias.length; i < len; i++) {
            var media = medias[i];
            ret += `
                @media screen and (max-width: ${media.value}px) {${this.getColStyle(media.name)}}
            `;
        }
        return ret;
    };

    Obj.prototype.getColStyle = function (colPre) {
        if (!colPre) {
            return;
        }
        var ret = '\n';
        for (var i = 1, len = this.colNum + 1; i < len; i++) {
            var width = this.isFix ? i / this.colNum * (this.viewWidth + this.gutter) + 'px' : (i / this.colNum * 100) + '%';
            ret += '.' + colPre + i + '{ width: ' + width + ' ; }\n';
        }
        return ret;
    };

    Obj.prototype.getBaseStyle = function () {
        var wrapWidth = this.viewWidth + 'px';
        var rowWidth = this.viewWidth + this.gutter + 'px';
        var halfGutter = this.gutter / 2 + 'px';

        var ret = `                    
                .g_wrap{
                    ${this.isFix ? 'width' : 'max-width'}: ${wrapWidth};
                    margin-left: auto;
                    margin-right: auto;
                }
                .g_row{
                    ${this.isFix ? 'width' : 'max-width'}: ${rowWidth};
                    margin-left: auto;
                    margin-right: auto;
                }
                .g_row:after {
                    display: table;
                    content: '';
                    clear: both;
                }
                
                .g_row > [class*="${this.colPre}"]{
                    padding-left: ${halfGutter};
                    padding-right: ${halfGutter};
                    float: left;
                    display: inline;
                    box-sizing: border-box;
                }

                @media screen and (max-width: ${rowWidth}) {
                    .g_wrap {
                        margin-left: ${halfGutter};
                        margin-right: ${halfGutter};
                    }
                }
                `;

        return ret;
    };
    window.GridStyle = Obj;
})();
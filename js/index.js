(function () {
    function $(select) {
        return document.querySelector(select);
    }
    var chessContainer = $('.container'), tableContainer = $('.container-content'), isGameOver = false, chessColor = 'white';
    var endChessColor = 'white';
    var endElement = {
        containerEnd: $('.container-end'),
        endContainerColor: $('.end-container-color'),
        endYes: $('.end-yes'),
        endNo: $('.end-no')
    }
    var chessArr = [];
    // 创建tr和td
    function createTbody() {
        var tableContent = "";
        for (let i = 0; i < 14; i++) {
            var tdText = "<tr>";
            for (let j = 0; j < 14; j++) {
                tdText += `<td data-row='${i}' data-line='${j}'></td>`;
            }
            tdText += "</tr>";
            tableContent += tdText;
        }
        tableContainer.innerHTML = tableContent;
    }
    // 判断棋子的位置是否有重复的
    function isRecur(chessData) {
        var isrecur = chessArr.find(function (item) {
            return item.x === chessData.x && item.y === chessData.y;
        })
        return isrecur === undefined ? true : false;
    }
    function end() {
        if (!isGameOver) {
            isGameOver = true;
            for (let i = 0; i < chessArr.length; i++) {
                $(`div[data-row="${chessArr[i].y}"][data-line="${chessArr[i].x}"]`).innerHTML = i + 1;
            }
            for (let i = 0; i < arguments.length; i++) {
                $(`div[data-row="${arguments[i].y}"][data-line="${arguments[i].x}"]`).setAttribute('class', `chess ${arguments[i].c} win`);
            }
        }
    }
    // 判断游戏结束
    function isEnd() {
        for (let i = 0; i < chessArr.length; i++) {
            var oneChess = chessArr[i];
            var chess2, chess3, chess4, chess5;
            // 检查横着有没有连着的5颗棋子
            chess2 = chessArr.find((item) => {
                return oneChess.x === item.x + 1 && oneChess.y === item.y && oneChess.c === item.c;
            })
            chess3 = chessArr.find((item) => {
                return oneChess.x === item.x + 2 && oneChess.y === item.y && oneChess.c === item.c;
            })
            chess4 = chessArr.find((item) => {
                return oneChess.x === item.x + 3 && oneChess.y === item.y && oneChess.c === item.c;
            })
            chess5 = chessArr.find((item) => {
                return oneChess.x === item.x + 4 && oneChess.y === item.y && oneChess.c === item.c;
            })
            if (chess2 && chess3 && chess4 && chess5) {
                endChessColor = oneChess.c;
                end(oneChess, chess2, chess3, chess4, chess5);
            }
            // 检查竖着有没有连着的5颗棋子
            chess2 = chessArr.find((item) => {
                return oneChess.x === item.x && oneChess.y === item.y + 1 && oneChess.c === item.c;
            })
            chess3 = chessArr.find((item) => {
                return oneChess.x === item.x && oneChess.y === item.y + 2 && oneChess.c === item.c;
            })
            chess4 = chessArr.find((item) => {
                return oneChess.x === item.x && oneChess.y === item.y + 3 && oneChess.c === item.c;
            })
            chess5 = chessArr.find((item) => {
                return oneChess.x === item.x && oneChess.y === item.y + 4 && oneChess.c === item.c;
            })
            if (chess2 && chess3 && chess4 && chess5) {
                endChessColor = oneChess.c;
                end(oneChess, chess2, chess3, chess4, chess5);
            }
            // 检查左斜有没有连着的5颗棋子
            chess2 = chessArr.find((item) => {
                return oneChess.x === item.x + 1 && oneChess.y === item.y + 1 && oneChess.c === item.c;
            })
            chess3 = chessArr.find((item) => {
                return oneChess.x === item.x + 2 && oneChess.y === item.y + 2 && oneChess.c === item.c;
            })
            chess4 = chessArr.find((item) => {
                return oneChess.x === item.x + 3 && oneChess.y === item.y + 3 && oneChess.c === item.c;
            })
            chess5 = chessArr.find((item) => {
                return oneChess.x === item.x + 4 && oneChess.y === item.y + 4 && oneChess.c === item.c;
            })
            if (chess2 && chess3 && chess4 && chess5) {
                endChessColor = oneChess.c;
                end(oneChess, chess2, chess3, chess4, chess5);
            }
            // 检查右斜有没有连着的5颗棋子
            chess2 = chessArr.find((item) => {
                return oneChess.x === item.x - 1 && oneChess.y === item.y + 1 && oneChess.c === item.c;
            })
            chess3 = chessArr.find((item) => {
                return oneChess.x === item.x - 2 && oneChess.y === item.y + 2 && oneChess.c === item.c;
            })
            chess4 = chessArr.find((item) => {
                return oneChess.x === item.x - 3 && oneChess.y === item.y + 3 && oneChess.c === item.c;
            })
            chess5 = chessArr.find((item) => {
                return oneChess.x === item.x - 4 && oneChess.y === item.y + 4 && oneChess.c === item.c;
            })
            if (chess2 && chess3 && chess4 && chess5) {
                endChessColor = oneChess.c;
                end(oneChess, chess2, chess3, chess4, chess5);
            }
        }
    }
    // 绘制棋子
    function createChess(chessData) {
        if (isRecur(chessData) && !isGameOver) {
            chessArr.push(chessData);
            var chess = `<div class="chess ${chessData.c}" data-row="${chessData.y}" data-line="${chessData.x}"></div>`;   // 棋子
            if (chessData.x < 14 && chessData.y < 14) {
                var td = $(`td[data-row="${chessData.y}"][data-line="${chessData.x}"]`);
                td.innerHTML += chess;
            }
            if (chessData.x === 14 && chessData.y < 14) {
                var td = $(`td[data-row="${chessData.y}"][data-line="13"]`);
                td.innerHTML += chess;
                td.lastChild.style.left = '50%';
            }
            if (chessData.x < 14 && chessData.y === 14) {
                var td = $(`td[data-row="13"][data-line="${chessData.x}"]`);
                td.innerHTML += chess;
                td.lastChild.style.top = '50%';
            }
            if (chessData.x === 14 && chessData.y === 14) {
                var td = $(`td[data-row="13"][data-line="13"]`);
                td.innerHTML += chess;
                td.lastChild.style.top = '50%';
                td.lastChild.style.left = '50%';
            }
        }
        chessColor = chessColor === 'white' ? 'black' : 'white';
        // 判断游戏是否结束: 是否有五个棋子连在一起
        isEnd();
    }
    // 创建table的点击事件
    function onTableClick() {
        chessContainer.addEventListener('click', function (e) {
            if (!isGameOver) {
                var temp = Object.assign({}, e.target.dataset);     // 将点击的伪对象数据枚举到对象中
                if (e.target.nodeName === 'TD') {
                    var tdw = tableContainer.clientWidth / 14;      // 获取td的宽高(宽===高)
                    var targetX = e.offsetX > tdw / 2;      // 判断点击的是左边(false)还是右边(true)
                    var targetY = e.offsetY > tdw / 2;      // 判断点击的是上面(false)还是下面(true)
                    // 组装棋子的数据
                    var chessData = {
                        x: targetX ? parseInt(temp.line) + 1 : parseInt(temp.line),
                        y: targetY ? parseInt(temp.row) + 1 : parseInt(temp.row),
                        c: chessColor
                    }
                    // 绘制棋子
                    createChess(chessData);
                }
            } else {
                endElement.containerEnd.style.display = 'block';
                endElement.endContainerColor.style.color = endChessColor;
                endElement.endContainerColor.innerHTML = endChessColor === 'white' ? '白棋' : '黑棋';
            }
        })
    }
    function onEndyesClick() {
        endElement.containerEnd.style.display = 'none';
        chessArr = [];
        createTbody();
        isGameOver = false;
        chessColor = endChessColor;
    }
    var initEvent = function () {
        endElement.endYes.addEventListener('click', onEndyesClick);
        endElement.endNo.addEventListener('click', function () {
            endElement.containerEnd.style.display = 'none';
        });
    }
    var init = function () {
        createTbody();
        onTableClick();
        initEvent();
    }
    init();
})()
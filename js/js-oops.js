var primaryColor = ["#FF5A78", "#D34862", "#963446", "#FF6A85"];
var secondaryColor = ["#3ECCF9", "#37B5DD", "#2D8FAE", "#0085FF"];
var gridCanvas;
var logoGrid = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0],
                [0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0],
                [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0],
                [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0],
                [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0],
                [0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0],
                [0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0],
                [0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
                [0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
var gridColCount = 0;
var gridRowCount = 0;
var gridItemWidth = 0;
var gridItemHeight = 0;
var currentX = 0;
var currentY = 0;
var currentCol = -1;
var currentRow = -1;
var currentItemId = -1;
var currentItemAngleRange = 90;
var otherItemAngleRange = 10;
var otherItemAngleScale = 0.95;

window.addEventListener('load', js_o_load);

function js_o_load(event) {
    window.addEventListener("resize", js_o_handleResize);
    window.addEventListener("mousemove", js_o_handleMouseMove);
    gridCanvas = document.getElementById("grid-canvas");
    currentX = window.innerWidth/2;
    currentY = window.innerHeight/2;
    js_o_handleResize();
}

function js_o_handleMouseMove(event) {
    currentX = event.clientX;
    currentY = event.clientY;
    js_o_computeGridUpdates();
}

function js_o_handleResize(event) {
    gridCanvas.style.height = window.innerHeight + "px";
    gridCanvas.style.width = window.innerWidth + "px";
    gridItemWidth = Math.ceil(window.innerWidth/logoGrid[0].length);
    gridItemHeight = Math.ceil(window.innerHeight/logoGrid.length);
    gridColCount = Math.ceil(window.innerWidth/gridItemWidth);
    gridRowCount = Math.ceil(window.innerHeight/gridItemHeight);
    js_o_removeGrid();
    js_o_drawGrid();
    js_o_computeGridUpdates();
}

function js_o_drawGrid() {
    var id = 0;
    for (var x = 0; x < gridRowCount; x++){
        for (var y = 0; y < gridColCount; y++) {
            var item = document.createElement("div");
            item.id = id;
            id++;
            item.classList.add("grid-canvas__item");
            item.style.width = gridItemWidth + "px";
            item.style.height = gridItemHeight + "px";
            item.style.left = (gridItemWidth * y) + "px";
            item.style.top = (gridItemHeight * x) + "px";
            if (logoGrid[x][y] == 1) {
                item.style.backgroundColor = primaryColor[primaryColor.length-1];
            }
            else {
                item.style.backgroundColor = secondaryColor[secondaryColor.length-1];
            }
            gridCanvas.appendChild(item);
        }
    }
}

function js_o_removeGrid() {
    while (gridCanvas.firstChild) {
        gridCanvas.firstChild.remove();
    }
}

function js_o_computeGridUpdates() {
    var row = Math.ceil(currentX/gridItemWidth) - 1;
    var col = Math.ceil(currentY/gridItemHeight) - 1;

    js_o_affectCurrentItem(row, col);

    if (col == currentCol && row == currentRow) { return; }

    currentCol = col;
    currentRow = row;
    var id = 0;
    for (var x = 0; x < gridRowCount; x++){
        for (var y = 0; y < gridColCount; y++) {
            let item = document.getElementById(id);
            item.style.backgroundImage = "none";
            item.style.zIndex = 0;
            item.style.boxShadow = "none";
            item.style.transitionTimingFunction = "ease-out";
            var a = currentCol - x;
            var b = currentRow - y;
            var d = Math.min(Math.ceil(Math.sqrt(a*a+b*b)), primaryColor.length-1); 
            var p = (d + 0.001)/((primaryColor.length-1) + 0.001);
            var s = js_o_lerp( 0, otherItemAngleScale, p);
            var dl = (d * .025);
            item.style.transition = "background-color 0.3s, transform " + dl + "s";
            if (d == 0) { 
                currentItemId = id; 
                item.style.zIndex = 10000;
                item.style.boxShadow = "0 0 40px 20px " + (logoGrid[x][y] == 1 ? primaryColor[0] : secondaryColor[0]);
                item.style.transition = "background-color 0s, transform 0";
            }
            var c = secondaryColor[d];
            if (logoGrid[x][y] == 1) {
                c = primaryColor[d];
            }
            item.style.transitionDelay = dl + "s";
            item.style.backgroundColor = c;
            var rd = primaryColor.length-1 - d;
            item.style.transform = "rotateX(" + js_o_randomInteger(-rd * otherItemAngleRange, rd * otherItemAngleRange) + "deg) rotateY(" + js_o_randomInteger(-rd * otherItemAngleRange, rd * otherItemAngleRange) + "deg) scale(" + s + "," + s + ")";
            id++;
        }
    }
}

function js_o_affectCurrentItem(row, col) {
    if (currentItemId != -1) {
        var c1 = secondaryColor[0];
        if (logoGrid[col][row] == 1) {
            var c1 = primaryColor[0];
        }
        var px = currentX%gridItemWidth/gridItemWidth;
        var py = currentY%gridItemHeight/gridItemHeight;
        var rx = js_o_lerp(-currentItemAngleRange, currentItemAngleRange, px);
        var ry = js_o_lerp(-currentItemAngleRange, currentItemAngleRange, py);
        document.getElementById(currentItemId).style.backgroundImage = "radial-gradient(farthest-side at " + px*100 + "% " + py*100 + "%,white," + c1 + ")";
        document.getElementById(currentItemId).style.transform = "rotateX(" + ry + "deg) rotateY(" + rx + "deg) scale(1.05,1.05)";
    }
}

function js_o_randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function js_o_lerp(start, end, progress) {
    return start*(1-progress)+end*progress;
}
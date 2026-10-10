const canvas = document.getElementById("canvas");
const canvasOverlay = document.getElementById("canvasOverlay");
const penSlider = document.getElementById("penSize");
const body = document.getElementById("page");
const pane = document.getElementById("PaintPanel");

let dataArray = [];
var tool = "brush";
const context = canvas.getContext("2d", alpha = false);
const overlay = canvasOverlay.getContext("2d", alpha = false);
context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);
penSize.value = 2;

var divisor = 5;

//importing every swatch /cry/
const mainSwatches = document.getElementById("currentSwatches");
const mainSwatch1 = document.getElementById("activeSwatch1");
const mainSwatch2 = document.getElementById("activeSwatch2");
const swatches = document.querySelectorAll(".paintSwatch");

let drawColor = "black";
let drawColor2 = "white";
let drawWidth = "2";
let isDrawing = false;


mainSwatches.addEventListener("click", swapColors);
swatches.forEach(element => {
    element.addEventListener("click", addColor);
    console.log(element)
})

//the various eventlisteners for the canvas and canvas overlay. Detects drawing inputs.
canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);
canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("mouseup", stop, false); 
canvasOverlay.addEventListener("touchstart", start, false);
canvasOverlay.addEventListener("touchmove", draw, false);
canvasOverlay.addEventListener("mousedown", start, false);
canvasOverlay.addEventListener("mousemove", draw, false);
canvasOverlay.addEventListener("touchend", stop, false);
canvasOverlay.addEventListener("mouseup", stop, false);

//some math functions. 

function getRotation(vector) {
    return Math.atan2(vector.y, vector.x);
  }

function getDist(x1, x2, y1, y2) {
    var a = x1 - x2;
    var b = y1 - y2;

var c = Math.sqrt( a*a + b*b );
return c;
}

function getRandomOffset(r) {
    var randAngle = Math.random() * 360;
    var randRad = Math.random() * r;
    return {
        x: Math.cos(randAngle) * randRad,
        y: Math.sin(randAngle) * randRad
    };
}

function changeTool (newTool) {
    tool = newTool;
}

function moveDiv(d, x, y) {
    d.style.left = x+'px';
    d.style.top = y+'px';
}

function getOffsetX() {
    canvas.offsetLeft
}

//functions related to the color swatches and color picker are below.
function swapColors(event) {
    let temp = drawColor;
    drawColor = drawColor2;
    drawColor2 = temp;
    mainSwatch1.style.backgroundColor = drawColor;
    mainSwatch2.style.backgroundColor = drawColor2;

}

function addColor(event) {
    temp = event.srcElement.getAttribute('id');
    el = document.getElementById(temp);
    drawColor = el.style.backgroundColor;
    mainSwatch1.style.backgroundColor = drawColor;
}

function start(event) {
    isDrawing = true;
    overlay.beginPath();
    context.beginPath();
    overlay.moveTo((event.clientX - pane.offsetLeft) / divisor, (event.clientY - pane.offsetTop - 27) / divisor);
    context.moveTo((event.clientX - pane.offsetLeft)/ divisor, (event.clientY - pane.offsetTop - 27) / divisor);
    event.preventDefault();
    if (tool == "line") {
        dataArray[0] = event.clientX;
        dataArray[1] = event.clientY;
    }
    else if (tool =="circle") {
        dataArray[0] = event.clientX;
        dataArray[1] = event.clientY;
    }
    else if (tool == "airbrush") {
        context.fillStyle = drawColor;
        var centerX = event.clientX, centerY = event.clientY, i;
        var offset = getRandomOffset(drawWidth);
        var x = centerX + offset.x, y = centerY + offset.y;
        context.fillRect(x / divisor, y / divisor, 1, 1);
        var intervalID = setInterval(draw, 10);
    }
}

function draw(event) {
    if (isDrawing ) {
        if (tool == "brush"){
            context.lineTo((event.clientX - pane.offsetLeft) / divisor, (event.clientY - 28 - pane.offsetTop) / divisor);
            context.strokeStyle = drawColor;
            context.lineWidth = drawWidth;
            context.lineCap ="round";
            context.lineJoin = "round";
            context.stroke();  
        }
        else if (tool == "line") {
            overlay.fillStyle = drawColor;
            overlay.clearRect(0, 0, canvasOverlay.width, canvasOverlay.height)
            overlay.lineTo(event.clientX/ divisor, event.clientY / divisor);
            overlay.stroke();
            overlay.strokeStyle = drawColor;
            overlay.lineWidth = drawWidth;
            overlay.lineCap ="round";
            overlay.lineJoin = "round";
            overlay.beginPath();
            overlay.moveTo(dataArray[0] / divisor, dataArray[1] / divisor);
        }
        else if (tool == "circle") {
            overlay.clearRect(0, 0, canvasOverlay.width, canvasOverlay.height)
            overlay.fillStyle = drawColor;
            overlay.arc(dataArray[0] / divisor, dataArray[1] / divisor, getDist(dataArray[0], event.clientX, dataArray[1], event.clientY) / divisor, 0, 2 * Math.PI);
            overlay.fill();
            overlay.beginPath();
            overlay.moveTo(dataArray[0] / divisor, dataArray[1] / divisor);
        }
        else if (tool == "airbrush") {
            context.fillStyle = drawColor;
            var centerX = event.clientX, centerY = event.clientY;
            var offset = getRandomOffset(drawWidth);
            var x = centerX + offset.x, y = centerY + offset.y;
            context.fillRect(x / divisor, y / divisor, 1, 1);
        }
    }
}

function stop(event) {
    if (isDrawing = true)  {

        context.stroke();
        context.closePath();
        overlay.closePath();
        if (tool == "line"){
            context.strokeStyle = drawColor;
            context.lineWidth = drawWidth;
            context.lineCap ="round";
            context.lineJoin = "round";
            overlay.clearRect(0, 0, canvasOverlay.width, canvasOverlay.height)
            context.lineTo(event.clientX / divisor, event.clientY / divisor );
            context.stroke();
        }
        else if (tool == "circle") {
            overlay.clearRect(0, 0, canvasOverlay.width, canvasOverlay.height)
            context.arc(dataArray[0] / divisor, dataArray[1] / divisor, getDist(dataArray[0], event.clientX, dataArray[1], event.clientY) / divisor, 0, 2 * Math.PI);
            context.fillStyle = drawColor;
            context.fill();
        }
        isDrawing = false
    }

}

function instaDraw() {
    start();
    stop();
}


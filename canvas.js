const paintLand = document.querySelector("canvas");
const pen = paintLand.getContext("2d"); // like pen
const shapes = document.querySelectorAll(".shape");
const recycleBin = document.querySelector("#recycleBin");
const fillColor = document.querySelector("#fillColor");
const colorButton = document.querySelectorAll(".colors .option");
var moveMouseX;
var moveMouseY;
var endShape; // untill stop draw the shape
var selectbutton = ""; // create variable to catch the specific button
var selectcolor = ""; // create variable to catch the specific color
var isDrawing = false; // to stop if mouse not into canvas

window.addEventListener("load", () => {
    paintLand.width = paintLand.offsetWidth;
    paintLand.height = paintLand.offsetHeight;
});

// draw Rectangle 
const drawRect = (e) => {
    pen.beginPath();
    if(fillColor.checked){
        return pen.fillRect(e.offsetX, e.offsetY, moveMouseX - e.offsetX, moveMouseY - e.offsetY); // if checked return body will take color 
    };
        pen.strokeRect(e.offsetX, e.offsetY, moveMouseX - e.offsetX, moveMouseY - e.offsetY); // if NOT checked return body will NOT take color
}

const drawCircle = (e) => {
    pen.beginPath();
    let radius = Math.sqrt(Math.pow((moveMouseX - e.offsetX), 2) + Math.pow((moveMouseY - e.offsetY), 2));
    pen.arc(moveMouseX, moveMouseY, radius, 0, 2 * Math.PI); 
    if(fillColor.checked){
        pen.fill();
    }else{
        pen.stroke();
    }
}

const drawLine = (e) => {
    pen.beginPath();
    pen.moveTo(moveMouseX, moveMouseY);
    pen.lineTo(e.offsetX, e.offsetY);
    // if(fillColor.checked){
    //     pen.stroke();
    // }else{
        pen.stroke();
    // }
}

const startDrawing = (e) => {
    isDrawing = true; // to start drawing
    moveMouseX = e.offsetX; // when startin , set vertical axis
    moveMouseY = e.offsetY; // when startin , set horizontal axis
    pen.beginPath(); // let's create or start new shape
    pen.lineWidth = 2;
    pen.strokeStyle = selectcolor; // put color to shape
    pen.fillStyle = selectcolor; // put color to body
    endShape = pen.getImageData(0,0, paintLand.width, paintLand.height); // to give clean or pure image 
};

const drawing = (e) => {
    if(!isDrawing) return;
    pen.putImageData(endShape, 0, 0);
    if(selectbutton === "FreeHand"){
        pen.lineTo(e.offsetX, e.offsetY); // put 2 point from "x" and "y"
        pen.stroke(); // display last behaviour  
    }else if(selectbutton === "rectShape"){
        drawRect(e);
    }else if(selectbutton === "lineShape"){
        drawLine(e);
    }else if(selectbutton === "circleShape"){
        drawCircle(e);
    }
};

shapes.forEach(button => {
    // looping on all shape buttons then take action
    button.addEventListener("click", () => {
        selectbutton = button.id; 
    });
});

// to choose another color
colorButton.forEach(button => {
    button.addEventListener("click", () => {
        document.querySelector(".options .selected").classList.remove("selected");
        button.classList.add("selected");
        selectcolor = window.getComputedStyle(button).getPropertyValue("background-color");
    });
});

//to delete each shape into canvas 
recycleBin.addEventListener("click", () => {
    pen.clearRect(0, 0, paintLand.width, paintLand.height);
})

// if i move in paint land then drawing
paintLand.addEventListener("mousemove", drawing);
// if i click in paint land then start drawing
paintLand.addEventListener("mousedown", startDrawing);
// if i stop in paint land then stop drawing
paintLand.addEventListener("mouseup", () => {isDrawing = false});

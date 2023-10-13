var i;
var context;
var backgroundCanvasColor;
var suiviDeformation = 0;
var deformation = -0.4;
var invertColors = false;  // Ajouté pour déterminer si les couleurs doivent être inversées

function rect(x, y, w, h) {
  context.beginPath();
  context.rect(x, y, w, h);
  context.fill();
  context.closePath();
}

function invertBasedOnCondition(condition, color1, color2) {
  if (condition) {
    return color1;
} else {
    return color2;
}

}

function parallelepiped(x, y, w, h, d, deformFactor = 0) {
  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(x + d * deformFactor, y);
  context.lineTo(x + d * deformFactor + w, y);
  context.moveTo(x, y + h);
  context.lineTo(x + d * deformFactor, y);
  context.lineTo(x + d * deformFactor + w, y);
  context.lineTo(x + w, y + h);
  context.closePath();
  context.fill();
  
  // Check if parallelepiped touches the left border
  if (x + d * deformFactor <= 0) {
      invertColors = !invertColors;  // Invert colors
  }
}

function createCanvas(width, height) {

  //création du canvas
  let canvas = document.createElement("canvas");

  //alignement du canvas
  canvas.style.position = "absolute";
  canvas.style.top = "50%";
  canvas.style.left = "50%";
  canvas.style.transform = "translate(-50%, -50%)";
  canvas.style.boxShadow = "10px 50px 70px rgba(0, 0, 0, 0.3)";
  canvas.style.margin = "20px";

// récupération du contexte (boite à dessin)
  context = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;


  //backgroundColor du body
  //ajout du canvas dans le html
  document.body.style.backgroundColor = "white";
  document.body.appendChild(canvas);
}

function setup() {
  console.log("setup");
  createCanvas(600, 800);
  document.body.style.margin = "0";
  document.body.style.height = "100vh";
  document.body.style.overflow = "hidden";
  backgroundCanvasColor = "white";
  i = 0;
  draw();
}

function draw() {
  context.fillStyle = backgroundCanvasColor;
  context.fillRect(0, 0, 600, 800);
  i += 1;

  suiviDeformation += deformation * 0.02;
  if (suiviDeformation > Math.PI || suiviDeformation < 0) {
    deformation *= -1;
  }
  
  var deformFactor = (1 - Math.sin(suiviDeformation)) * 0.5 + 0.5;

  context.fillStyle = invertBasedOnCondition(invertColors, "white", "black");
  rect(0, 0, 600, 400);

  context.fillStyle = invertBasedOnCondition(invertColors, "black", "white");
  rect(0, 400, 600, 400);

  context.fillStyle = invertBasedOnCondition(invertColors, "black", "white");
  context.strokeStyle = invertBasedOnCondition(invertColors, "black", "white");
  parallelepiped(0, -2, 530, 402, 70, deformFactor);

  context.fillStyle = invertBasedOnCondition(invertColors, "white", "black");
  context.strokeStyle = invertBasedOnCondition(invertColors, "white", "black");
  parallelepiped(70, 400, 530, 400, -70, deformFactor);

  requestAnimationFrame(draw);
}

window.onload = function () {
  console.log("on est prêt");
  setup();
};

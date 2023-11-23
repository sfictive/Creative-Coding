var a1;
var a2;
var centerX;
var centerY;
var width = window.innerWidth;
var height = window.innerHeight;
var context;

var monCharacter;

function createCanvas(w, h) {
  var canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  context = canvas.getContext("2d");
  document.body.appendChild(canvas);
}

function draw() {
  context.clearRect(0, 0, width, height);

  monCharacter.draw();
  requestAnimationFrame(draw);
}

function setup() {
  console.log("setup");
  createCanvas(width, height);

  //Création des instances de ma class Character
  monCharacter = new Character(400, 400, 100,context);
  

  document.addEventListener("click", mousePressed);
  document.addEventListener('mousemove', mouseMoved);
  draw();
}



function mousePressed(e) {
  if (monCharacter.isInMe(e.x, e.y)) {
    monCharacter.initCroassement();
  } else {
    monCharacter.definirDestination(e.x, e.y);
  }
}


window.onload = function () {
  console.log("on est pret");
  setup();
};

function mouseMoved(e) {
  monCharacter.updateCornées(e.clientX, e.clientY);
}

function updateCornéePosition(cornée, mouseX, mouseY, initPosX, initPosY) {
  // Convertir la position de la souris en coordonnées relatives au personnage
  let relativeMouseX = mouseX - monCharacter.x;
  let relativeMouseY = mouseY - monCharacter.y;

  // Calculer le déplacement vers la position de la souris
  let dx = relativeMouseX - initPosX;
  let dy = relativeMouseY - initPosY;



  // Limiter le mouvement à l'intérieur du rayon des yeux
  let maxRadius = 5; // Ajustez en fonction de la taille des yeux
  let distance = Math.sqrt(dx * dx + dy * dy);
  if (distance > maxRadius) {
    dx = (dx / distance) * maxRadius;
    dy = (dy / distance) * maxRadius;
  }

  // Mettre à jour la position de la cornée
  cornée.offsetX = initPosX + dx;
  cornée.offsetY = initPosY + dy;
}

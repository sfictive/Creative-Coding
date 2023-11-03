let width = 800;
let height = 800;
let context;
let lineX = 5;
let colY = 5;
let squares = [];

function createCanvas(w, h) {
  var canvas = document.createElement("canvas");
  canvas.id = "myCanvas";
  canvas.width = w;
  canvas.height = h;
  context = canvas.getContext("2d");
  document.body.appendChild(canvas);
}

function draw() {
  context.clearRect(0, 0, width, height);
  for (let i = 0; i < squares.length; i++) {
    var square = squares[i]; 
    square.draw(context); 
  }
  requestAnimationFrame(draw);
}

function setup() {
  console.log("setup");
  createCanvas(width, height);

  document.addEventListener("click", mousePressed);

  // INITIALISATION DES CARRÉS
  for (let j = 1; j < lineX; j++) {
    for (let i = 1; i < colY; i++) {
      var gridX = width / lineX;
      var gridY = height / colY;
      var side = Math.min(gridX, gridY); 
      var square = new Square(i * gridX, j * gridY, side); 
      square.loadImage("img/last.png");  // Charge l'image
      squares.push(square);  // Ajoute le carré au tableau
    }
  }
  draw();
}

function mousePressed(informations) {
  console.log("mousePressed");
  console.log("x: ", informations.x, "y: ", informations.y);

  // Utiliser la fonction isInMe() pour CHAQUE carré
  for (let i = 0; i < squares.length; i++) {
    var square = squares[i];  // Renommé "circle" en "square"
    var bool = square.isInMe(informations.x, informations.y);
    console.log(i, bool);
    if (bool) {
      square.rotate();  
    }
  }
}

window.onload = function () {
  console.log("on est prêt");
  setup();
};

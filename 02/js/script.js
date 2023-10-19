let angleX;
let angleY;
let angleSpeedX = 0.001;  // Vitesse de déplacement sur l'axe X
let angleSpeedY = 0.003;  // Vitesse de déplacement sur l'axe Y
let centerX;
let centerY;

let width = window.innerWidth;
let height = window.innerHeight;

let context;
let backgroundColor;
let rayon;
let color;

let anglePourBigRadius;
let bigRadius;
let amplitudeBigRadius;
let smallRadius;



let circles = [];
let circleCount = 40;


class CircleObject {
  constructor(x, y, rayon, color, angle, angleSpeed) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.angleSpeed = angleSpeed;
    this.rayon = rayon;
    this.color = color;
  }

  update(centerX, centerY, bigRadius) {
    this.angle += this.angleSpeed;
    this.x = centerX + Math.cos(this.angle) * bigRadius;
    this.y = centerY + Math.sin(this.angle) * bigRadius; 
  }

  draw(context) {
    context.globalCompositeOperation = 'difference';
    context.globalAlpha = 0.9;
    circle(this.x, this.y, this.rayon, this.color);
    context.globalAlpha = 100;
  }
}

function createCanvas(width, height) {
  var canvas = document.createElement("canvas");
  context = canvas.getContext("2d");

  canvas.width = width;
  canvas.height = height;
  document.body.appendChild(canvas);
}

function circle(x, y, rayon, c) {
  context.beginPath();
  context.arc(x, y, rayon, 0, 2 * Math.PI, true);
  context.fillStyle = c;  // Set the color here
  context.fill();
  context.closePath();
}

function setup() {
  console.log("setup");
  createCanvas(width, height);
  color = "white";  // Assign a default color
  angleX = 0;
  angleY = 0;
 
  anglePourBigRadius = 0;
  rayon = 100;
  bigRadius = 10;
  smallRadius = 200;

  centerX = width / 2;
  centerY = height / 2;

  for(i = 0; i < circleCount; i++) {
    let angleSpeed = 0.00000000001 + Math.random() * 0.1;

    circles.push(new CircleObject(centerX, centerY, 20, color, 0, angleSpeed));
  }

  // Example of creating a new circle object and adding it to the circles array
  // circles.push(new CircleObject(centerX, centerY, 20, color, 0, 0.02));
  // circles.push(new CircleObject(centerX, centerY, 20, color, 0, 0.03));
  // circles.push(new CircleObject(centerX, centerY, 20, color, 0, 0.04));
  // circles.push(new CircleObject(centerX, centerY, 20, color, 0, 0.05));
  // circles.push(new CircleObject(centerX, centerY, 20, color, 0, 0.06));
  

  draw();
}

function draw() {
  context.fillStyle = "rgba(0, 0, 0, 0.01)";
  context.fillRect(0, 0, width, height);

  context.globalCompositeOperation = 'difference'; // Set it outside the loop

  // Mise à jour des positions selon les angles
  angleX += angleSpeedX;
  angleY += angleSpeedY;

  centerX = width / 2 + Math.cos(angleX * 10) * bigRadius * 3;
  centerY = height / 2 + Math.sin(angleY * 20) * smallRadius * 2;

  for (let circle of circles) {
      circle.update(centerX, centerY, bigRadius);
      circle.draw(context);
  }
  context.globalCompositeOperation = 'source-over'; // Reset it after all circles are drawn

  amplitudeBigRadius = 200;
  bigRadius = amplitudeBigRadius * Math.sin(anglePourBigRadius);
  anglePourBigRadius += 0.03;

  requestAnimationFrame(draw);
}

window.onload = function () {
  console.log("on est pret");
  setup();
};

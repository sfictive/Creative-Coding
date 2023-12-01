// la définition de la classe Circle c'est comme définir une function mais sans les parenthèses
// la fonction par défaul est le constructor
// on peut passer des paramètres au constructor
// dans une class on n'écrit pas "function" pour TOUTES les fonctions
// une variable globale de class s'écrit avec "this."
class Circle {
  constructor(x, y, rayon, context) {
    this.x = x;
    this.y = y;
    this.origin = { x: x, y: y };
    this.target = { x: x, y: y };

    //ajout du text
    this.context = context;
    this.size = 1;

    this.speed = 1;
    this.uniteDeTemps = 0;
    this.uniteDeTemps1 = 0;

    this.rayon = rayon;
    this.rayonOrigin = { rayon: rayon };
    this.rayonFinal = { rayon: rayon };

    this.context = context;
    
    // on initialise une couleur au bol
    this.color = "white";
    this.rotation = 0;
    this.angle = 0;
  }

  changeColor(r, g, b) {
    // on affect une couleur aléatoire
    this.color = `rgb(${Math.random() * 255},${Math.random() * 255},${
      Math.random() * 255
    })`;

  }

  // gère la taille du text
  changeRadius(pourcentage) {
    this.size = pourcentage * 200;
  }

  isInMe(mouseX, mouseY) {
    // on calcule la distance entre la souris et le centre
    let d = this.dist(mouseX, mouseY, this.x, this.y);
    // on compare cette distance au rayon
    if (d < this.rayon) {
      return true;
    } else {
      return false;
    }
  }

  draw() {
    this.context.fillStyle = this.color;
    this.context.font = `${this.size}px Arial`; // Définir la taille et le style de la police
    this.context.fillText(this.text, this.x, this.y);
  }



  dist(x1, y1, x2, y2) {
    // calcule la distance entre deux points
    // pythagore power
    let d = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    return d;
  }

  changeText(intensity) {
    if (intensity > 200) {
      this.text = "🕸️";
    } else if (intensity > 150) {
      this.text = "🕷️";
    } else if (intensity > 100) {
      this.text = "⚫";
    } else if (intensity > 50) {
      this.text = "💗";
    }
  }

  definirDestination(x, y) {
    this.target = { x: x, y: y };
    this.uniteDeTemps = 0;
  }


}

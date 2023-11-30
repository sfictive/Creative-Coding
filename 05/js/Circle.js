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

    // this.color = `rgb(${r},${g},${b})`;

    //on change la taille du rayon
    // this.rayon = Math.random() * 100;
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

  // this.move();
  // this.rapetisser();

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

 

  move(forceAttraction) {
    // //calcul la distance entre le point de départ et la destination
    // const d = this.dist(this.x, this.y, this.target.x, this.target.y);
    // if (d < 0.01) {
    //   this.origin = { x: this.target.x, y: this.target.y };
    //   return;
    // }
    // //calcul de easing simple
    // // equivalent à un pourcentage
    // const easing = Easing.bounceOut(this.uniteDeTemps); //Math.pow(this.uniteDeTemps, 5); //this.uniteDeTemps * this.speed;
    // //on incrémente le compteur de temps
    // this.uniteDeTemps += 0.01;
    // //on la distance entre le point de départ et la destination
    // let distX = this.target.x - this.origin.x;
    // let distY = this.target.y - this.origin.y;
    // this.x = this.origin.x + distX * easing;
    // this.y = this.origin.y + distY * easing;
    // console.log(Math.cos(this.angle * (Math.PI / 180)) * 100);
    
    // console.log(this.angle);
  }

  // rapetisser() {
  //   let differenceRayon2 = this.rayonFinal.rayon - this.rayon;
  //   // console.log(differenceRayon2);
  //   if (Math.abs(differenceRayon2) < 0.01) {
  //     this.rayonOrigin = { rayon: this.rayonFinal.rayon };
  //     return;
  //   }

  //   const easing = Easing.elasticOut(this.uniteDeTemps1);
  //   this.uniteDeTemps1 += 0.01;
  //   let differenceRayon = this.rayonFinal.rayon - this.rayonOrigin.rayon;
  //   this.rayon = this.rayonOrigin.rayon + differenceRayon * easing;
  // }
}

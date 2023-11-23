// la définition de la classe Circle c'est comme définir une function mais sans les parenthèses
// la fonction par défaul est le constructor
// on peut passer des paramètres au constructor
// dans une class on n'écrit pas "function" pour TOUTES les fonctions
// une variable globale de class s'écrit avec "this."
class Character {
  constructor(x, y, rayon, context) {
    this.x = x;
    this.y = y;
    this.origin = { x: x, y: y };
    this.target = { x: x, y: y };

    this.speed = 1;
    this.uniteDeTemps = 0;
    this.uniteDeTemps1 = 0;

    this.rayon = rayon;
    this.rayonOrigin = { rayon: rayon };
    this.rayonFinal = { rayon: rayon };

    this.context = context;

    // position initiale des yeux
    this.initOeilGauche3PosX = -37; 
    this.initOeilGauche3PosY = -70; 
    this.initOeilDroite3PosX = 37; 
    this.initOeilDroite3PosY = -70;
    this.initOeilGauche4PosX = -50;
    this.initOeilGauche4PosY = -90;
    this.initOeilDroite4PosX = 24;
    this.initOeilDroite4PosY = -90;
    

    // on initialise la couleur
    this.color = "#58FF00";
    this.rotation = 0;

    this.jambeGauche = new Jambe(-85, 5, 28, 60, 8.9, 0, 2 * Math.PI, "#064005", context);
    this.jambeDroite = new Jambe(85, 5, 28, 60, 9.9, 0, 2 * Math.PI, "#064005", context);

    this.piedGauche = new Jambe(-90, 50, 18, 40, 11, 0, 2 * Math.PI, "#064005", context);
    this.piedDroite = new Jambe(90, 50, 18, 40, 11, 0, 2 * Math.PI, "#064005", context);
    
    this.oeilGauche = new Yeux(-37, -70, 50, "#58FF00", context);
    this.oeilDroit = new Yeux(37, -70, 50, "#58FF00", context);

    //gris
    this.intOeilGauche = new Yeux(-37, -70, 44, "#E1E1E1", context);
    this.intOeilDroite = new Yeux(37, -70, 44, "#E1E1E1", context);

    this.intOeilGauche2 = new Yeux(-37, -70, 36, "white", context);
    this.intOeilDroite2 = new Yeux(37, -70, 36, "white", context);

    this.intOeilGauche3 = new Yeux(-37, -70, 29, "black", context);
    this.intOeilDroite3 = new Yeux(37, -70, 29, "black", context);

    this.intOeilGauche4 = new Yeux(-50, -90, 6, "white", context);
    this.intOeilDroite4 = new Yeux(24, -90, 6, "white", context);

    this.paumetteGauche = new Yeux(-70, -20, 7, "#E1E1E1", context);
    this.paumetteDroite = new Yeux(70, -20, 7, "#E1E1E1", context);

    // Le tableau contenant toutes les parties du character
    this.partiesDuCorps = [
      this.oeilGauche,
      this.oeilDroit,
      this.intOeilGauche,
      this.intOeilDroite,
      this.intOeilGauche2,
      this.intOeilDroite2,
      this.intOeilGauche3,
      this.intOeilDroite3,
      this.intOeilGauche4,
      this.intOeilDroite4,
      this.paumetteGauche,
      this.paumetteDroite,
    ];
  }
  
  updateCornées(mouseX, mouseY) {
    updateCornéePosition(
      this.intOeilGauche3, 
      mouseX, mouseY, 
      this.initOeilGauche3PosX, 
      this.initOeilGauche3PosY
    );

    updateCornéePosition(
      this.intOeilDroite3, 
      mouseX, mouseY, 
      this.initOeilDroite3PosX,
      this.initOeilDroite3PosY
    );
    updateCornéePosition(
      this.intOeilGauche4, 
      mouseX, mouseY, 
      this.initOeilGauche4PosX, 
      this.initOeilGauche4PosY
    );
    updateCornéePosition(
      this.intOeilDroite4,
      mouseX, mouseY,
      this.initOeilDroite4PosX,
      this.initOeilDroite4PosY
    );
    
  }

  changeColor() {
    // on affect une couleur aléatoire
    this.color = `rgb(${Math.random() * 255},${Math.random() * 255},${
      Math.random() * 255
    })`;
    //on change la taille du rayon
    this.rayon = Math.random() * 100;
  }


  isInMe(mouseX, mouseY) {
    let dx = mouseX - this.x;
    let dy = mouseY - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    return distance < this.rayon;
  }
  

  draw() {
    this.jambeDroite.draw(this.x, this.y);
    this.piedDroite.draw(this.x, this.y);
    this.piedGauche.draw(this.x, this.y);
    this.jambeGauche.draw(this.x, this.y);

    this.context.save();

    //on translate le contexte au centre du cercle
    this.context.translate(this.x, this.y);
    //on fait la rotation
    this.context.rotate(this.rotation);

    //on dessine le cercle
    this.context.fillStyle = this.color;

    // Dessine le cercle principal
    this.context.beginPath();
    this.context.fillStyle = this.color;
    this.context.ellipse(0, 0, this.rayon, this.rayon / 1.5, 0, 0, 2 * Math.PI);
    this.context.fill();
    this.context.closePath();
    this.context.restore();

    // Dessine chaque partie du corps
    this.partiesDuCorps.forEach((partie) => {
      partie.draw(this.x, this.y);
    });

    if (this.isCroassing) {
      this.croassement(); // Appeler croassement si l'état est actif
    } else {
      this.move(); // Mouvement normal
    }
  }

  dist(x1, y1, x2, y2) {
    // calcule la distance entre deux points
    // pythagore power
    let d = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    return d;
  }

  definirDestination(x, y) {
    this.target = { x: x, y: y };
    this.uniteDeTemps = 0;
  }

  definirRayonAleatoire() {
    this.rayonFinal.rayon = Math.random() * 200 + 50;
    this.uniteDeTemps1 = 0;
  }

  move() {
    //calcul la distance entre le point de départ et la destination
    const d = this.dist(this.x, this.y, this.target.x, this.target.y);
    if (d < 0.01) {
      this.origin = { x: this.target.x, y: this.target.y };
      return;
    }

    //calcul de easing simple
    // equivalent à un pourcentage
    const easing = Easing.elasticOut(this.uniteDeTemps); //Math.pow(this.uniteDeTemps, 5); //this.uniteDeTemps * this.speed;
    //on incrémente le compteur de temps
    this.uniteDeTemps += 0.01;

    //on la distance entre le point de départ et la destination
    let distX = this.target.x - this.origin.x;
    let distY = this.target.y - this.origin.y;
    this.x = this.origin.x + distX * easing;
    this.y = this.origin.y + distY * easing;
  }

  initCroassement() {
    if (!this.isCroassing) {
      this.isCroassing = true;
      this.isExpanding = true; // Commencer par agrandir
      this.rayonFinal.rayon = this.rayon * 1.2; // Ajustez selon la taille souhaitée
      this.uniteDeTemps1 = 0; // Réinitialiser le temps pour l'easing
    }
  }

  croassement() {
  let differenceRayon = this.rayonFinal.rayon - this.rayon;
  
  if (Math.abs(differenceRayon) < 0.01) {
    // Lorsque l'animation est presque terminée, inversez le sens ou arrêtez
    if (this.isExpanding) {
      this.rayonFinal.rayon = this.rayonOrigin.rayon; // Commencez à rétrécir
      this.isExpanding = false;
    } else {
      // Arrêtez l'animation de croassement
      this.isCroassing = false;
    }
  } else {
    const easing = Easing.elasticOut(this.uniteDeTemps1);
    this.uniteDeTemps1 += 0.0001;
    this.rayon += differenceRayon * easing;
  }
}

  
}

class Jambe {
  constructor(
    offsetX,
    offsetY,
    rayonX,
    rayonY,
    rotation,
    angleDebut,
    angleFin,
    couleur,
    context
  ) {
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.rayonX = rayonX;
    this.rayonY = rayonY;
    this.rotation = rotation;
    this.angleDebut = angleDebut;
    this.angleFin = angleFin;
    this.couleur = couleur;
    this.context = context;
  }

  draw(xParent, yParent) {
    let x = xParent + this.offsetX;
    let y = yParent + this.offsetY;

    this.context.beginPath();
    this.context.fillStyle = this.couleur;
    this.context.ellipse(
      x,
      y,
      this.rayonX,
      this.rayonY,
      this.rotation,
      this.angleDebut,
      this.angleFin
    );
    this.context.fill();
    this.context.closePath();
  }
}

class Yeux {
  constructor(offsetX, offsetY, rayon, couleur, context) {
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.rayon = rayon;
    this.couleur = couleur;
    this.context = context;
  }

  draw(xParent, yParent) {
    // Utiliser les positions xParent et yParent pour le positionnement relatif
    let x = xParent + this.offsetX;
    let y = yParent + this.offsetY;

    this.context.beginPath();
    this.context.fillStyle = this.couleur;
    this.context.arc(x, y, this.rayon, 0, 2 * Math.PI);
    this.context.fill();
    this.context.closePath();
  }

  

  // ... Autres méthodes spécifiques aux Yeux
}

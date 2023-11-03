class Square {
  constructor(x, y, cote) {
    this.x = x;
    this.y = y;
    this.cote = cote; // longueur du côté du carré
    this.color = "blue";
    this.rotation = 0;
    this.image = new Image();
  }

 loadImage(src) {
    this.image.src = src;
  }

  // rotation de 45° -> Math.PI / 4 = 45°
  rotate(){
    this.rotation += Math.PI / 2; 
  }


  changeColor() {
    this.color = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
    this.cote = Math.random() * 100; // change la taille du carré
  }

 

  isInMe(mouseX, mouseY) {
    if (
      mouseX > this.x - this.cote / 2 &&
      mouseX < this.x + this.cote / 2 &&
      mouseY > this.y - this.cote / 2 &&
      mouseY < this.y + this.cote / 2
    ) {
      return true;
    } else {
      return false;
    }
  }

  draw(context) {
    // Cette fonction dessine uniquement l'image
    if (this.image.complete && this.image.naturalHeight !== 0) {
      context.save();
      context.translate(this.x, this.y);
      context.rotate(this.rotation);
      context.drawImage(this.image, -this.cote / 2, -this.cote / 2, this.cote, this.cote);
      context.restore();
    }
  }
}

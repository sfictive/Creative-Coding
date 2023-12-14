class App {
  constructor() {
    this.setup();
  }

  setup() {
    this.height = window.innerHeight;
    this.width = window.innerWidth;
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);





    this.audioTool = new AudioTool();

    document.addEventListener("click", (e) => {
      this.audioTool.play(e);
    });

    this.draw();
  }

  draw() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.width, this.height);

    let centerX = this.width / 2;
    let centerY = this.height / 2 + 150;

    this.drawDataCircles(this.audioTool.dataWave, centerX, centerY, 10);
    this.drawDataCircles(this.audioTool.dataFrequency, centerX, centerY, 100);
    this.drawDataCircles(
      this.audioTool.dataFloatFrequency,
      centerX,
      centerY,
      50

    );

    /**
     *  A CHOIX : analyser un des 3 types de data
     */

    this.audioTool.updatedFloatFrequency();
    this.audioTool.updateWaveForm();
    this.audioTool.updateFrequency();

    requestAnimationFrame(this.draw.bind(this));
  }

  drawDataCircles(data, centerX, centerY, baseRadius) {
    if (data && data.length > 0) {
      let angleStep = (2 * Math.PI) / data.length;
      for (let i = 0; i < data.length; i++) {
        let angle = i * angleStep;

        // La position de base des cercles autour du cercle central
        let baseX = centerX + baseRadius * Math.cos(angle) * 6;
        let baseY = centerY + baseRadius * Math.sin(angle) * 3 ;

        // Ajuster la position Y en fonction de la valeur de la donnée
        let dataValue = (Math.abs(data[i]) / 500) * 500; // Ajustez le facteur 100 si nécessaire
        let y = baseY - dataValue * 2; // Déplacer vers le haut pour les valeurs élevées

        this.drawCircle(baseX, y, 1); // Rayon fixe pour tous les cercles
      }
    }
  }

  drawCircle(x, y, radius) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = "red";
    this.ctx.fill();
    this.ctx.closePath();
  }
}

window.onload = function () {
  const app = new App();
  //   console.log(app);
};

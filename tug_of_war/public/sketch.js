let gamecountdown = 30;
function setup() {
    createCanvas(windowWidth, windowHeight);

    frameRate(30);
}
function draw() {
    clear();
gamecountdown -= 1 / 30;
  fill(240,20,20);
  textSize(300);
  textFont('Bangers');
  text(round(gamecountdown), width / 2.5 , 223)
  
   if (gamecountdown <= 0) {
    gamecountdown = 0;
   }
} 
function setup() {
  createCanvas(400, 400); //400px square for display
  console.log(window.x);
  console.log(window.y);
}

function draw() {
  background(235);
  stroke(1);
  fill(0);
  rect(199, 0, 2, 400);
  rect(0, 199, 400, 2);
  for (let x = 0; x < Object.keys(window.x).length; x++) {
    //For loop to iterate thought the global variables x,y positions and draw circles to represent sample data
    let red = (Number(window.x[x]) / 400) * 255;
    let blue = (Number(window.y[x]) / 400) * 255;
    let c = color(red, 0, blue, 255 / 2);
    fill(c);
    noStroke();
    circle(window.x[x], window.y[x], 100);
  }
}

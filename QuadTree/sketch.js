let qt;
let count = 0;
let range = null;
let points = null;
let total = 0;
function setup() {
  createCanvas(400, 400);
  let boundary = new Rectangle(200, 200, 200, 200);
  qt = new QuadTree(boundary, 4);
  for (let i = 0; i < 50; i++) {
    let p = new Point(Math.random() * 400, Math.random() * 400);
    qt.insert(p);
    total++;
  }
  background(0);
  qt.show();
}
function draw() {
  background(0);
  qt.show();
  // insert points on mouse-press event
  if (mouseIsPressed) {
    let m = new Point(mouseX, mouseY);
    total++;
    qt.insert(m);
  }
  stroke(0, 255, 0);
  rectMode(CENTER);
  range = new Rectangle(mouseX, mouseY, 50, 50);
  rect(range.x, range.y, range.w * 2, range.h * 2);
  points = [];
  count = 0;
  qt.query(range, points);
  for (let p of points) {
    strokeWeight(4);
    point(p.x, p.y);
  }
  console.log(
    `%c total: ${total} count: ${count}`,
    `color:pink; font-weight: bold; background-color:black;`
  );
}

// Insert points only on click
// function mouseClicked() {
//   let m = new Point(mouseX, mouseY);
//   qt.insert(m);
// }

// Random points around the mouse
// function draw() {
//   background(0);
//   if (mouseIsPressed) {
//     for (let i = 0; i < 1; i++) {
//       let m = new Point(mouseX + random(-5, 5), mouseY + random(-5, 5));
//       qt.insert(m);
//     }
//   }
//   background(0);
//   qt.show();
// }

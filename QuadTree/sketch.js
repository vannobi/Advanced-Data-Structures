let qt;
function setup() {
  createCanvas(400, 400);
  let boundary = new Rectangle(200, 200, 200, 200);
  qt = new QuadTree(boundary, 4);
  for (let i = 0; i < 1000; i++) {
    let p = new Point(Math.random() * 400, Math.random() * 400);
    qt.insert(p);
  }
  background(0);
  qt.show();
  console.log(qt);
}
function draw() {
  background(0);
  // insert points on mouse-press event
  if (mouseIsPressed) {
    let m = new Point(mouseX, mouseY);
    qt.insert(m);
  }
  background(0);
  qt.show();
}

// Insert points only on click
// function mouseClicked() {
//   let m = new Point(mouseX, mouseY);
//   qt.insert(m);
// console.log(qt);
// console.group(qt);
// console.table(qt);
// console.table(qt.points);
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

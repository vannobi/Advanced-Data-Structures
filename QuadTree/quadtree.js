class Point {
  constructor(x, y, userData) {
    this.x = x;
    this.y = y;
    this.userData = userData;
  }
}
class Rectangle {
  constructor(x, y, w, h) {
    this.x = x; // center
    this.y = y;
    this.w = w; // half width
    this.h = h; // half height
  }
  contains(point) {
    if (
      point.x <= this.x + this.w &&
      point.x >= this.x - this.w &&
      point.y <= this.y + this.h &&
      point.y >= this.y - this.h
    ) {
      return true;
    }
    return false;
  }
  intersects(range) {
    return !(
      range.x - range.w > this.x + this.w ||
      range.x + range.w < this.x - this.w ||
      range.y - range.h > this.y + this.h ||
      range.y + range.h < this.y - this.h
    );
  }
}

class QuadTree {
  constructor(boundary, n) {
    this.boundary = boundary; // Rectangle
    this.capacity = n; // capacidad maxima de cada cuadrante
    this.points = []; // vector , almacena los puntos a almacenar
    this.size = 0;
    this.divided = false;
  }
  // divide el quadtree en 4 quadtrees
  subdivide() {
    // Algoritmo
    // 1: Crear 4 hijos : qt_northeast , qt_northwest , qt_southeast , qt_southwest
    // 2: Asignar los QuadTree creados a cada hijo
    // this . northeast = qt_northeast ;
    this.divided = true;
    let newW = this.boundary.w / 2;
    let newH = this.boundary.h / 2;
    this.northeast = new QuadTree(
      new Rectangle(this.boundary.x + newW, this.boundary.y + newH, newW, newH),
      this.capacity
    );
    this.northwest = new QuadTree(
      new Rectangle(this.boundary.x - newW, this.boundary.y + newH, newW, newH),
      this.capacity
    );
    this.southeast = new QuadTree(
      new Rectangle(this.boundary.x + newW, this.boundary.y - newH, newW, newH),
      this.capacity
    );
    this.southwest = new QuadTree(
      new Rectangle(this.boundary.x - newW, this.boundary.y - newH, newW, newH),
      this.capacity
    );
  }

  insert(point) {
    // Algoritmo
    // 1: Si el punto no esta en los limites ( boundary ) del quadtree Return
    // 2: Si ( this . points . length ) < ( this . capacity ),
    // 2.1 Insertamos en el vector this . points
    // Sino
    // 2.2 Dividimos si aun no ha sido dividido
    // 2.3 Insertamos recursivamente en los 4 hijos .
    // this . northeast . insert ( point );
    // this . northwest . insert ( point );
    // this . southeast . insert ( point );
    // this . southwest . insert ( point );
    if (!this.boundary.contains(point)) return 0;
    if (this.points.length < this.capacity) {
      this.points.push(point);
      this.size++;
      return 1;
    } else {
      if (!this.divided) this.subdivide();
      // console.log(point);
      // let prevlengthNE = this.northeast.length;
      let inserted = this.northeast.insert(point);
      if (inserted === 0) inserted = this.northwest.insert(point);

      if (inserted === 0) inserted = this.southeast.insert(point);
      if (inserted === 0) inserted = this.southwest.insert(point);
      // console.log(this.points);
      return 2;
    }
  }
  show() {
    stroke(255);
    strokeWeight(1);
    noFill();
    rectMode(CENTER);
    rect(
      this.boundary.x,
      this.boundary.y,
      this.boundary.w * 2,
      this.boundary.h * 2
    );
    if (this.divided) {
      this.northeast.show();
      this.northwest.show();
      this.southeast.show();
      this.southwest.show();
    }
    for (let p of this.points) {
      strokeWeight(4);
      point(p.x, p.y);
    }
  }
}

// export { QuadTree, Point, Rectangle };

window.onload = function () {
  function draw() {
    var run = Pts.quickStart("#pt", "#FF008E");

    run((time, ftime) => {
      // rectangle
      var rect = Rectangle.fromCenter(space.center, space.size.$divide(4));
      var poly = Rectangle.corners(rect);
      poly.shear2D((Num.cycle((time % 500) / 500) - 1) / 5, space.center);

      // triangle
      var tris = poly.segments(2, 1, true);
      tris.map((t) => t.push(space.pointer));

      // circle
      var circles = tris.map((t) => Triangle.incircle(t));
      var circums = tris.map((t) => Triangle.circumcircle(t));

      // drawing
      form.fillOnly("rgba(255,255,255,.2)", 1).circles(circums);
      form.fillOnly("#7100FF").polygon(poly);
      form.fill("#FF008E").circles(circles);
      form.strokeOnly("#FF008E ", 1).polygons(tris);
      form.fill("#FFF000").point(space.pointer, 1);
    });
  }

  draw();
};

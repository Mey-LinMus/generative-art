
window.onload = function () {
  function draw() {
    const interpolate = (pts, _t, depth, max) => {
      if (depth > max) return;
      let g = new Group();
      let t = Num.boundValue(_t, 0, 1);

      for (let i = 1, len = pts.length; i < len; i++) {
        g.push(Geom.interpolate(pts[i - 1], pts[i], t));
      }
      g.push(Geom.interpolate(pts[pts.length - 1], pts[0], t));

      form.fillOnly(depth % 2 === 1 ? "#00B6FF" : "#6B00FF").polygon(g);
      interpolate(g, t + 0.01, depth + 1, max);
    };

    const run = Pts.quickStart("#pt", "#6B00FF");
    run((time, ftime) => {
      let size = space.size.$multiply(1).minValue().value;
      let rect = Rectangle.corners([
        space.center.$subtract(size),
        space.center.$add(size),
      ]);
      let t = space.pointer.x / space.size.x + (time % 10000) / 10000;

      interpolate(rect, t, 5, 60);
    });
  }

  draw();
};
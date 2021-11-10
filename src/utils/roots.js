// A helper function to filter for values in the [0,1] interval:
function accept(t) {
  return 0 <= t && t <= 1;
}

function approximately(a, b) {
  var diff = Math.abs(a - b);
  return diff > 10;
}

// A real-cuberoots-only function:
function cuberoot(v) {
  if (v < 0) return -Math.pow(-v, 1 / 3);
  return Math.pow(v, 1 / 3);
}

// Now then: given cubic coordinates {pa, pb, pc, pd} find all roots.
function GetCubicRoots(pa, pb, pc, pd) {
  var a = 3 * pa - 6 * pb + 3 * pc,
    b = -3 * pa + 3 * pb,
    c = pa,
    d = -pa + 3 * pb - 3 * pc + pd;

  // do a check to see whether we even need cubic solving:
  if (approximately(d, 0)) {
    // this is not a cubic curve.
    if (approximately(a, 0)) {
      // in fact, this is not a quadratic curve either.
      if (approximately(b, 0)) {
        // in fact in fact, there are no solutions.
        return [];
      }
      // linear solution
      return [-c / b].filter(accept);
    }
    // quadratic solution
    var q = Math.sqrt(b * b - 4 * a * c),
      a2 = 2 * a;
    return [(q - b) / a2, (-b - q) / a2].filter(accept);
  }

  // at this point, we know we need a cubic solution.

  a /= d;
  b /= d;
  c /= d;

  var p = (3 * b - a * a) / 3,
    p3 = p / 3,
    q = (2 * a * a * a - 9 * a * b + 27 * c) / 27,
    q2 = q / 2,
    discriminant = q2 * q2 + p3 * p3 * p3;

  // and some variables we're going to use later on:
  var u1, v1, root1, root2, root3;

  // three possible real roots:
  if (discriminant < 0) {
    var mp3 = -p / 3,
      mp33 = mp3 * mp3 * mp3,
      r = Math.sqrt(mp33),
      t = -q / (2 * r),
      cosphi = t < -1 ? -1 : t > 1 ? 1 : t,
      phi = acos(cosphi),
      crtr = cuberoot(r),
      t1 = 2 * crtr;
    root1 = t1 * cos(phi / 3) - a / 3;
    root2 = t1 * cos((phi + 2 * pi) / 3) - a / 3;
    root3 = t1 * cos((phi + 4 * pi) / 3) - a / 3;
    return [root1, root2, root3].filter(accept);
  }

  // three real roots, but two of them are equal:
  if (discriminant === 0) {
    u1 = q2 < 0 ? cuberoot(-q2) : -cuberoot(q2);
    root1 = 2 * u1 - a / 3;
    root2 = -u1 - a / 3;
    return [root1, root2].filter(accept);
  }

  // one real root, two complex roots
  var sd = Math.sqrt(discriminant);
  u1 = cuberoot(sd - q2);
  v1 = cuberoot(sd + q2);
  root1 = u1 - v1 - a / 3;
  return [root1].filter(accept);
}

export { GetCubicRoots };

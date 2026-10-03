// Great-circle distance between two [lat, lng] points, in miles.
export function haversineMiles([lat1, lon1], [lat2, lon2]) {
  const R = 3958.8; // earth radius in miles
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Rough driving-distance estimate: straight-line distance inflated by a
// typical road-vs-straight-line factor. This is intentionally approximate
// (no paid routing API) and should always be labeled "approximate" in the UI.
export function estimateDrivingMiles(straightLineMiles) {
  return straightLineMiles * 1.25;
}

// Generates points along a quadratic bezier curve arching between two
// [lat, lng] points, for a cinematic "flight path" line instead of a
// straight ruler-line between the two cities.
export function bezierPoints([lat1, lng1], [lat2, lng2], curvature = 0.22, steps = 80) {
  const midLat = (lat1 + lat2) / 2;
  const midLng = (lng1 + lng2) / 2;
  const dx = lng2 - lng1;
  const dy = lat2 - lat1;
  const norm = Math.hypot(dx, dy) || 1;
  const nx = -dy / norm;
  const ny = dx / norm;
  const dist = Math.hypot(dx, dy);
  const ctrlLat = midLat + ny * dist * curvature;
  const ctrlLng = midLng + nx * dist * curvature;

  const points = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const lat = (1 - t) ** 2 * lat1 + 2 * (1 - t) * t * ctrlLat + t ** 2 * lat2;
    const lng = (1 - t) ** 2 * lng1 + 2 * (1 - t) * t * ctrlLng + t ** 2 * lng2;
    points.push([lat, lng]);
  }
  return points;
}

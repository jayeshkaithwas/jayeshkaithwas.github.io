/**
 * Fragment shader for the hero field — print logic, not screen logic.
 *
 * A domain-warped flow field carves a torii gate out of the paper as halftone
 * dots and ink stipple. Nothing glows and nothing blurs: the shader only ever
 * *subtracts* light from the paper, the way ink does. As `uIntensity` falls
 * with scroll the gate breaks up into loose stipple and the paper returns.
 *
 * Constraints: mediump throughout, max 5 fbm octaves, no pow() in the inner
 * loop. It has to stay cheap enough for a mid-range Android.
 */
export const FRAGMENT_SHADER = /* glsl */ `#version 300 es
precision mediump float;

uniform vec2  uResolution;
uniform float uTime;
uniform vec2  uMouse;
uniform float uIntensity;
uniform vec3  uPaper;
uniform vec3  uInk;

out vec4 fragColor;

const vec3 BURNT = vec3(0.761, 0.255, 0.047);  // #C2410C

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float sum = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 5; i++) {
    sum += amp * noise(p);
    p = p * 2.02;
    amp *= 0.5;
  }
  return sum;
}

// Signed distance to a torii gate silhouette, built from boxes.
float torii(vec2 p) {
  p.y += 0.10;
  float d = 1e9;

  vec2 legs = vec2(abs(p.x) - 0.40, p.y);
  d = min(d, max(abs(legs.x) - 0.030, abs(legs.y + 0.26) - 0.44));

  float sweep = 0.028 * cos(p.x * 2.2);
  d = min(d, max(abs(p.x) - 0.60, abs(p.y - 0.33 - sweep) - 0.026));
  d = min(d, max(abs(p.x) - 0.48, abs(p.y - 0.19) - 0.017));

  return d;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;

  float t = uTime * 0.035;
  vec2 parallax = uMouse * 0.045;

  // Domain warp — fbm sampling fbm. Stops it reading as plasma.
  vec2 q = vec2(fbm(uv * 1.5 + parallax + t), fbm(uv * 1.5 + vec2(3.2, 1.7) - t));
  vec2 r = vec2(
    fbm(uv * 1.8 + 3.0 * q + vec2(1.7, 9.2) + t * 1.3),
    fbm(uv * 1.8 + 3.0 * q + vec2(8.3, 2.8) - t)
  );
  float flow = fbm(uv * 2.0 + 3.2 * r);

  // Halftone screen: a rotated dot grid whose dot size follows the flow field.
  float ang = 0.4;
  mat2 rot = mat2(cos(ang), -sin(ang), sin(ang), cos(ang));
  vec2 cell = rot * gl_FragCoord.xy / 4.5;
  float dot_ = length(fract(cell) - 0.5);

  // The gate, eroded by the flow as intensity drops.
  float gate = torii(uv * 1.30 - vec2(parallax.x * 0.4, 0.0));
  float erosion = (1.0 - uIntensity) * 0.5;
  float mask = smoothstep(0.05 + erosion, -0.01, gate + (flow - 0.5) * erosion * 1.5);

  // Coverage = how much ink this pixel takes. Never negative: paper is the floor.
  float coverage = mask * smoothstep(0.62, 0.18, dot_) * 0.30;
  coverage += flow * flow * 0.055;
  coverage *= uIntensity;

  // Vignette pulls ink toward the edges rather than lightening the centre.
  float vig = smoothstep(0.15, 1.30, length(uv * vec2(0.8, 1.0)));
  coverage += vig * 0.035 * uIntensity;

  vec3 col = mix(uPaper, uInk, clamp(coverage, 0.0, 1.0));

  // A little burnt ink only where the gate itself is solid.
  col = mix(col, BURNT, mask * smoothstep(0.55, 0.95, flow) * 0.18 * uIntensity);

  // Paper grain, subtractive.
  col -= (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) * 0.022;

  fragColor = vec4(col, 1.0);
}`;

export const VERTEX_SHADER = /* glsl */ `#version 300 es
precision mediump float;
// Single oversized triangle — no attribute buffers, no index buffer.
void main() {
  vec2 pos = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  gl_Position = vec4(pos * 2.0 - 1.0, 0.0, 1.0);
}`;

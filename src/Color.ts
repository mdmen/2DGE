import { clamp } from './utils';

export class Color {
  public readonly rgba = new Float32Array(4);

  constructor(r = 0, g = 0, b = 0, alpha = 1) {
    this.setRGBA(r, g, b, alpha);
  }

  public setRGBA(r = 0, g = 0, b = 0, alpha = 1) {
    this.rgba[0] = Math.floor(clamp(0, 255, r));
    this.rgba[1] = Math.floor(clamp(0, 255, g));
    this.rgba[2] = Math.floor(clamp(0, 255, b));
    this.rgba[3] = clamp(0, 1, alpha);
  }

  public getRGBACss() {
    return `rgb(${this.rgba[0]} ${this.rgba[1]} ${this.rgba[2]} / ${this.rgba[3]})`;
  }

  public copy(color: Color) {
    this.setRGBA(...color.rgba);
  }

  public isEqual(color: Color) {
    const c1Rgba = this.rgba;
    const c2Rgba = color.rgba;

    return (
      c1Rgba[0] === c2Rgba[0] &&
      c1Rgba[1] === c2Rgba[1] &&
      c1Rgba[2] === c2Rgba[2] &&
      c1Rgba[3] === c2Rgba[3]
    );
  }
}

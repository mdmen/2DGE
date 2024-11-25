import { Vector } from './Vector';
import type { Point } from './Point';

export class BoundingBox {
  private readonly center = new Vector();

  constructor(
    public readonly min = new Vector(Infinity, Infinity),
    public readonly max = new Vector(-Infinity, -Infinity)
  ) {}

  public set(minX: number, minY: number, maxX: number, maxY: number) {
    this.min.x = minX;
    this.min.y = minY;
    this.max.x = maxX;
    this.max.y = maxY;
  }

  public translate(p: Point) {
    this.min.addV(p);
    this.max.addV(p);
  }

  public reset() {
    this.set(Infinity, Infinity, -Infinity, -Infinity);
  }

  public setFromPoints(points: Point[]) {
    this.reset();

    for (let i = 0; i < points.length; i++) {
      const point = points[i];

      if (point.x < this.min.x) {
        this.min.x = point.x;
      }

      if (point.x > this.max.x) {
        this.max.x = point.x;
      }

      if (point.y < this.min.y) {
        this.min.y = point.y;
      }

      if (point.y > this.max.y) {
        this.max.y = point.y;
      }
    }
  }

  public collidesWith(box: BoundingBox) {
    return (
      this.min.x < box.max.x &&
      this.max.x > box.min.x &&
      this.min.y < box.max.y &&
      this.max.y > box.min.y
    );
  }

  public setMin(v: Point) {
    this.min.copy(v);
  }

  public setMax(v: Point) {
    this.max.copy(v);
  }

  public setWidth(width: number) {
    this.max.x = this.min.x + width;
  }

  public getWidth() {
    return this.max.x - this.min.x;
  }

  public setHeight(height: number) {
    this.max.y = this.min.y + height;
  }

  public getHeight() {
    return this.max.y - this.min.y;
  }

  public getCenter() {
    return this.center.set(
      (this.min.x + this.max.x) / 2,
      (this.min.y + this.max.y) / 2
    );
  }
}

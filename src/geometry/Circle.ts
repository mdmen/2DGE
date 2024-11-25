import type { Entity } from '../entities';
import { Shape } from './Shape';
import { ShapeType } from './ShapeType';

export class Circle extends Shape {
  constructor(entity: Entity, private radius = 0) {
    super(entity, ShapeType.Circle);
  }

  public getRadius() {
    return this.radius;
  }

  public setRadius(radius: number) {
    this.radius = radius;

    this.updateBounds();
  }

  public updateBounds() {
    const position = this.entity.getGlobalPosition();
    const x = position.x - this.radius;
    const y = position.y - this.radius;
    const diameter = this.radius * 2;

    this.bounds.set(x, y, x + diameter, y + diameter);
  }
}

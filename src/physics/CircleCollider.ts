import { Collider } from './Collider';
import { isCircleCollidingWithCircle, isCircleCollider } from './collisions';
import { ShapeType } from '../geometry';
import { Transform } from '../Transform';

export class CircleCollider extends Collider {
  constructor(transform: Transform, public radius = 0, center = true) {
    super(transform, ShapeType.Circle, center);
  }

  public override update() {
    super.update();

    this.bounds.translate(-this.radius);
  }

  public collidesWith(collider: Collider) {
    if (!this.bounds.collidesWith(collider.bounds)) {
      return false;
    }

    if (isCircleCollider(collider)) {
      return isCircleCollidingWithCircle(this, collider);
    }

    return false;
  }
}

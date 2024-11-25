import { Collider, type CollidableEntity } from './Collider';
import {
  isRectCollidingWithCircle,
  isRectCollidingWithRect,
} from './collisions';
import { ShapeType } from '../geometry/ShapeType';
import { isCircleCollider } from './helpers';

export class RectCollider extends Collider {
  constructor(entity: CollidableEntity) {
    super(entity, ShapeType.Rectangle);
  }

  public collidesWith(collider: Collider) {
    if (!isRectCollidingWithRect(this, collider)) {
      return false;
    }

    if (isCircleCollider(collider)) {
      return isRectCollidingWithCircle(this, collider);
    }

    return false;
  }
}

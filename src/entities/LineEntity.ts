import { Entity, type EntityOptions } from './Entity';
import { RectCollider } from '../PhysicalBody';
import { DrawableShape } from '../graphics';
import { ShapeType, Vector } from '../geometry';

export interface LineEntityOptions extends EntityOptions {
  end?: Vector;
}

export class LineEntity extends Entity {
  public readonly end;

  constructor({
    layer,
    end = new Vector(),
    collidable = false,
    ...options
  }: LineEntityOptions) {
    super(options);

    this.shape = ShapeType.Line;
    this.end = end;
    // TODO set bounding box
    // this.size.set(length, 0);

    if (layer) {
      this.drawable = new DrawableShape({ entity: this, layer });
    }

    if (collidable) {
      this.collider = new RectCollider(this);
    }
  }
}

import { ShapeType, Size, Vector } from '../geometry';
import { PolyEntity, type PolyEntityOptions } from './PolyEntity';
import { RectCollider } from '../physics';
import { DrawableShape } from '../graphics';

export interface RectEntityOptions extends Omit<PolyEntityOptions, 'verteces'> {
  size?: Size;
}

export class RectEntity extends PolyEntity {
  constructor({
    layer,
    size = new Size(),
    physics,
    ...options
  }: RectEntityOptions) {
    super({
      verteces: [
        new Vector(0, 0),
        new Vector(size.width, 0),
        new Vector(size.width, size.height),
        new Vector(0, size.height),
      ],
      ...options,
    });

    this.shape = ShapeType.Rectangle;
    this.size.copy(size);

    if (layer) {
      this.drawable = new DrawableShape({ entity: this, layer });
    }

    if (physics) {
      this.collider = new RectCollider(this);
    }
  }

  public setSize(width: number, height: number) {
    this.verteces[1].x = width;
    this.verteces[2].x = width;
    this.verteces[2].y = height;
    this.verteces[3].y = height;

    this.size.set(width, height);
  }
}

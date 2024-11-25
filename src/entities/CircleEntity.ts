import { Entity } from './Entity';
import { CircleCollider } from '../physics';
import { DrawableCircle } from '../graphics/DrawableCircle';
import { Layer } from '../graphics';

export interface CircleEntityOptions {
  layer?: Layer;
  physics?: boolean;
  radius?: number;
}

export class CircleEntity extends Entity {
  public declare drawable: DrawableCircle | null;
  public declare collider: CircleCollider | null;
  private _radius;

  constructor({ layer, radius = 0, physics = false }: CircleEntityOptions) {
    super(physics);

    this._radius = radius;

    if (layer) {
      this.drawable = new DrawableCircle({ entity: this, layer, radius });
    }

    if (physics) {
      this.collider = new CircleCollider(this.transform, radius);
    }
  }

  public set radius(n: number) {
    this._radius = n;

    if (this.drawable) {
      this.drawable.radius = n;
    }

    if (this.collider) {
      this.collider.radius = n;
    }

    this.updateBounds();
  }

  public get radius() {
    return this._radius;
  }

  public updateBounds() {
    if (!this.collider) return;

    const side = Math.ceil(this._radius * 2 * this._scale);

    this.collider.size.set(side, side);
  }
}

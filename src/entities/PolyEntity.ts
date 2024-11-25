import { Vector } from '../geometry';
import { DrawablePoly, type Layer } from '../graphics';
import { Entity } from './Entity';

export interface PolyEntityOptions {
  layer?: Layer;
  verteces?: Vector[];
  physics?: boolean;
}

export class PolyEntity extends Entity {
  public verteces: Vector[] = [];
  public normals: Vector[] = [];
  public edges: Vector[] = [];

  constructor({ layer, verteces = [], physics = false }: PolyEntityOptions) {
    super(physics);

    this.setVerteces(verteces);

    if (layer) {
      this.drawable = new DrawablePoly({ entity: this, layer });
    }
  }

  public setVerteces(verteces: Vector[]) {
    const length = verteces.length;

    for (let i = 0; i < length; i++) {
      if (this.verteces[i]) {
        this.verteces[i].copy(verteces[i]);
      } else {
        this.verteces[i] = verteces[i];
      }

      if (!this.edges[i]) {
        this.edges[i] = new Vector();
      }

      if (!this.normals[i]) {
        this.normals[i] = new Vector();
      }

      this.verteces.length = length;
      this.edges.length = length;
      this.normals.length = length;
    }

    this.recalculate();
    this.updateBounds();
  }

  private recalculate() {
    const points = this.verteces;
    const length = points.length;

    for (let i = 0; i < length; i++) {
      const v1 = points[i];
      const v2 = i < length - 1 ? points[i + 1] : points[0];

      this.edges[i].copy(v2).subV(v1);
      this.normals[i].copy(this.edges[i]).perp().normalize();
    }
  }

  public updateBounds() {
    for (let i = 0; i < this.verteces.length; i++) {
      const v = this.verteces[i];

      if (v.x < this.position.x) {
        this.min.x = vertex.x;
      }
      if (vertex.x > this.max.x) this.max.x = vertex.x;
      if (vertex.y < this.min.y) this.min.y = vertex.y;
      if (vertex.y > this.max.y) this.max.y = vertex.y;
    }
  }

  protected updateEntityBoundsRotation() {
    if (!this._rotation) return;

    const cos = Math.abs(Math.cos(this._rotation));
    const sin = Math.abs(Math.sin(this._rotation));
    const width = this.bounds.width * cos + this.bounds.height * sin;
    const height = this.bounds.width * sin + this.bounds.height * cos;

    this.bounds.set(width, height);
  }
}

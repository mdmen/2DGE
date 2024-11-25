import type { Entity } from '../entities';
import type { ShapeType } from './ShapeType';
import { BoundingBox } from './BoundingBox';

export abstract class Shape {
  public readonly bounds = new BoundingBox();

  constructor(
    public readonly entity: Entity,
    public readonly shape: ShapeType
  ) {}
}

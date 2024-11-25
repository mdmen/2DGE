import { type ShapeType } from '../geometry';
import type { Transform } from '../Transform';
import { CollisionResponse } from './CollisionResponse';

export abstract class Collider {
  private readonly Response = new CollisionResponse();

  constructor(
    public readonly transform: Transform,
    public readonly shape: ShapeType
  ) {}

  abstract collidesWith(other: Collider): boolean;

  abstract resolveCollision(): void;
}

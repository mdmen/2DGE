import type { Collider } from './Collider';

export class CollisionResponse {
  constructor(
    public readonly collider: Collider,
    public readonly otherCollider: Collider
  ) {}

  public reset() {}
}

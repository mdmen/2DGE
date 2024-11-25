import { Vector } from '../geometry';

interface Entity {
  position: Vector;
}

export class Body {
  public readonly velocity = new Vector();
  public readonly acceleration = new Vector();
  public readonly friction = new Vector();
  public readonly speedLimit = new Vector(Infinity, Infinity);
  public restitution = 0;
  public mass = 0;
  public inverseMass = 0;
  public inertia = 0;
  public density = 0;
  public inverseInertia = 0;
  public angularVelocity = 0;
  public angularAcceleration = 0;

  public collisionGroup = -1;
  public collisionMask = -1;

  constructor(public readonly entity: Entity) {}

  public update(deltaStep: number) {
    if (this.mass === 0) return;

    this.velocity.scaleV(this.friction);

    if (this.velocity.x > this.speedLimit.x) {
      this.velocity.x = this.speedLimit.x;
    }
    if (this.velocity.y > this.speedLimit.y) {
      this.velocity.y = this.speedLimit.y;
    }

    if (!this.velocity.isZero()) {
      const step = this.velocity.clone();

      step.scale(deltaStep);
      this.entity.position.addV(step);
    }
  }

  public canCollide(other: Body) {
    return !!(this.collisionGroup & other.collisionMask);
  }
}

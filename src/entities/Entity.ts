import { Container } from '../Container';
import type { Drawable } from '../graphics';
import { type Collider, Body } from '../physics';
import { Matrix, Vector, BoundingBox } from '../geometry';

export abstract class Entity extends Container {
  public readonly position = new Vector();
  public readonly origin = new Vector();
  public readonly matrix = new Matrix();
  private rotation = 0;
  private scale = 1;
  public collider: Collider | null = null;
  public drawable: Drawable | null = null;
  public body: Body | null = null;
  public readonly tags = new Set();

  // includes children bounds
  public readonly bounds = new BoundingBox();

  constructor(physics?: boolean) {
    super();

    this.drawableShape = new Circle(this);
    this.collidableShape = new Circle(this);
    this.drawable = new CircleDrawable(this.drawableShape);
    this.physics = new Body(this.transform);
    this.collider = new CircleCollider(this.collidableShape, this.physics);
  }

  public getGlobalPosition() {
    if (!this.parent) {
      return this.position;
    }

    const position = this.position.clone();
    this.traverseParents((entity) => {
      position.addV(entity.position);
    });

    return position;
  }

  public setScale(scale: number) {
    this.scale = scale;
  }

  public getScale() {
    return this.scale;
  }

  public override addChild(item: this) {
    super.addChild(item);

    if (item.drawable) {
      item.sortSiblingsByZIndex();
    }

    return this;
  }

  private sortSiblingsByZIndex() {
    if (!this.parent) return;

    this.parent.children.sort((a, b) => {
      if (!a.drawable || !b.drawable) return 0;

      return b.drawable.zIndex - a.drawable.zIndex;
    });
  }

  public update(deltaStep: number) {
    this.body?.update(deltaStep);
    this.collider?.update();

    this.children.forEach((entity) => {
      entity.update(deltaStep);
    });
  }

  public draw() {
    this.drawable?.draw();
    this.collider?.draw();

    this.children.forEach((entity) => {
      entity.draw();
    });
  }

  public abstract updateBounds(): void;
}

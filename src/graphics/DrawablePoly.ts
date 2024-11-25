import type { Entity } from '../entities';
import type { RenderNode } from './Drawable';
import { DrawableShape, type DrawableShapeOptions } from './DrawableShape';
import { getRenderScope } from './scope';

export interface DrawablePolyOptions extends DrawableShapeOptions {
  radius?: number;
}

export class DrawablePoly extends DrawableShape {
  public radius;

  constructor({
    radius = 0,
    shouldCreateNode = true,
    ...options
  }: DrawablePolyOptions) {
    super({ shouldCreateNode: false, ...options });

    this.radius = radius;

    if (shouldCreateNode) {
      this.createNode();
    }
  }

  protected async createNode() {
    const scope = await getRenderScope();

    if (!scope) return;

    this.node = new (scope.EllipseNode as {
      new (entity: Entity): RenderNode;
    })(this.entity);
  }
}

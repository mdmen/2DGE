import type { Entity } from '../entities';
import type { Layer } from './Layer';

export interface DrawableOptions {
  entity: Entity;
  layer: Layer;
  visible?: boolean;
  opacity?: number;
  zIndex?: number;
  shouldCreateNode?: boolean;
}

export interface RenderNode {
  destroy?(): void;
}

export abstract class Drawable {
  public readonly entity;
  public readonly layer;
  public node: RenderNode | null = null;
  public opacity;
  public visible;
  public zIndex;
  public debug = false;

  constructor({
    entity,
    layer,
    zIndex = 0,
    visible = true,
    opacity = 1,
  }: DrawableOptions) {
    this.entity = entity;
    this.layer = layer;
    this.visible = visible;
    this.opacity = opacity;
    this.zIndex = zIndex;
  }

  public setZIndex(n: number) {
    if (this.zIndex === n) return;

    this.zIndex = n;

    this.entity.sortSiblingsByZIndex();
  }

  public getGlobalZIndex() {
    if (!this.entity.parent) {
      return this.zIndex;
    }

    let zIndex = this.zIndex;
    this.entity.traverseParents((entity) => {
      if (!entity.drawable) return false;

      zIndex += entity.drawable.zIndex;
    });

    return zIndex;
  }

  public isGloballyVisible() {
    if (!this.entity.parent || !this.visible) {
      return this.visible;
    }

    return !!this.entity.findParent((entity) =>
      entity.drawable ? entity.drawable.visible : false
    );
  }

  public getGlobalOpacity() {
    if (!this.entity.parent || this.opacity === 0) {
      return this.opacity;
    }

    let opacity = this.opacity;
    this.entity.traverseParents((entity) => {
      if (!entity.drawable) return false;

      opacity *= entity.drawable.opacity;
    });

    return opacity;
  }

  public draw() {
    this.layer.draw(this);
  }

  public destroy() {
    this.node?.destroy?.();
  }
}

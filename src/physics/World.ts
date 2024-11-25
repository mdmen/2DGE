import { Vector } from '../geometry';
import type { Body } from './Body';
import type { Collider } from './Collider';
import { QuadTree } from './QuadTree';

const defaultCollisionGroup = Symbol('defaultCollisionGroup');

export class World {
  public readonly gravity = new Vector();

  public readonly bodies = new Map<number | symbol, Set<Body>>([
    [defaultCollisionGroup, new Set()],
  ]);
  public readonly collisionTree = new QuadTree();

  public add(...bodies: Body[]) {
    bodies.forEach((collider) => {
      if (collider.groups.size === 0) {
        this.colliders.get(defaultCollisionGroup)?.add(collider);
        return;
      }

      collider.groups.forEach((groupId) => {
        if (!this.colliders.has(groupId)) {
          this.colliders.set(groupId, new Set());
        }

        this.colliders.get(groupId)?.add(collider);
      });
    });

    return this;
  }

  public remove(...bodies: Collider[]) {
    bodies.forEach((collider) => {
      if (collider.groups.size === 0) {
        this.bodies.get(defaultCollisionGroup)?.delete(collider);
        return;
      }

      collider.groups.forEach((groupId) => {
        const group = this.bodies.get(groupId);

        if (!group) return;

        group.delete(collider);

        if (group.size === 0) {
          this.bodies.delete(groupId);
        }
      });
    });

    return this;
  }

  public update() {
    this.bodies.forEach((group) => {
      this.collisionTree.clear();

      group.forEach((collider) => {
        this.collisionTree.insert(collider);
      });
    });
  }

  public clear() {
    this.bodies.clear();
    this.collisionTree.clear();
  }
}

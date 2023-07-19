import { Direction, EntityType, Position } from "./entity.interface";

export type GameObject = {
    id: number;
    position: Position;
    direction: Direction;
    velocity: number;
    directionThreshold: number;
    score: number;
    entityType: EntityType
};

export type HighscoreObject = {
    id: number;
    name: string;
    score: number;
};
export type Position = {
    top: number;
    left: number;
};

// export const defaultPosition: Position = {
//     top: 0,
//     left: 0
// };

export enum Direction {
    UP = 'up',
    DOWN = 'down',
    LEFT = 'left',
    RIGHT = 'right'
};

export enum EntityType {
    BUG_ORANGE = 'bug_orange',
    BUG_GREEN = 'bug_green',
    BUG_RED = 'bug_red'
};
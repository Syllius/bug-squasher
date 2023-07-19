export enum SceneType {
    MENU = 'menu',
    GAME = 'game',
    GAME_OVER = 'game_over',
    HIGHSCORES = 'highscores',
    INSTRUCTIONS = 'instructions'
};

interface Size {
    width: number;
    height: number;
}

export interface WindowSize extends Size { };

export interface BoardSize extends Size { };
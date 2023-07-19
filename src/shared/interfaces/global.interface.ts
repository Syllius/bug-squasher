import { createContext, useContext } from "react";
import { BoardSize, SceneType, WindowSize } from "./board.interface";

export type GeneralState = {
    currentScene: SceneType,
    setCurrentScene: (sceneType: SceneType) => any,
    windowSize: WindowSize,
    boardSize: BoardSize,
    gameScore: number,
    setGameScore: (gameScore: number) => any,
    bugsCount: number,
    setBugsCount: (bugsCount: number) => any,
    timerSeconds: number,
    setTimerSeconds: (timerSeconds: number) => any,
    isTimeUp: boolean,
    setTimeUp: (isTimeUp: boolean) => any
};

export const GeneralContext = createContext<GeneralState>({
    currentScene: SceneType.MENU,
    setCurrentScene: () => { },
    windowSize: {
        width: 0,
        height: 0
    },
    boardSize: {
        width: 0,
        height: 0
    },
    gameScore: 0,
    setGameScore: () => { },
    bugsCount: 0,
    setBugsCount: () => { },
    timerSeconds: 0,
    setTimerSeconds: () => { },
    isTimeUp: false,
    setTimeUp: () => { }
});

export const useGeneralContext = () => useContext(GeneralContext);
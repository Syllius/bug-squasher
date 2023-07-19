import React, { useCallback, useEffect, useRef, useState } from "react";
import './Board.scss';
import { BoardSize, SceneType, WindowSize } from "../../shared/interfaces/board.interface";
import { MenuScene } from "../scenes/MenuScene/MenuScene";
import { GeneralContext } from "../../shared/interfaces/global.interface";
import { GameScene } from "../scenes/GameScene/GameScene";
import { GameOverScene } from "../scenes/GameOverScene/GameOverScene";
import { HighscoresScene } from "../scenes/HighscoresScene/HighscoresScene";
import { InstructionsScene } from "../scenes/InstructionsScene/InstructionsScene";

export const Board: React.FC = () => {
    const [currentScene, setCurrentScene] = useState<SceneType>(SceneType.MENU);
    const [boardSize, setBoardSize] = useState<BoardSize>({ width: 0, height: 0 });
    const [windowSize, setWindowSize] = useState<WindowSize>({ width: 0, height: 0 });
    const [gameScore, setGameScore] = useState<number>(0);
    const [bugsCount, setBugsCount] = useState<number>(0);
    const [timerSeconds, setTimerSeconds] = useState<number>(0);
    const [isTimeUp, setTimeUp] = useState<boolean>(false);
    const boardRef = useRef<HTMLDivElement>(null);

    const renderCurrentScene = useCallback(() => {
        switch (currentScene) {
            case SceneType.MENU: return <MenuScene />;
            case SceneType.GAME: return <GameScene />;
            case SceneType.GAME_OVER: return <GameOverScene />;
            case SceneType.HIGHSCORES: return <HighscoresScene />;
            case SceneType.INSTRUCTIONS: return <InstructionsScene />;
        };
    }, [currentScene]);

    useEffect(() => {
        setBoardSize({
            width: boardRef.current?.clientWidth as number,
            height: boardRef.current?.clientHeight as number
        });
    }, [boardRef.current?.clientWidth, boardRef.current?.clientHeight]);

    useEffect(() => {
        setWindowSize({
            width: window.innerWidth as number,
            height: window.innerHeight as number
        });
    }, [window.innerWidth, window.innerHeight]);

    return (
        <GeneralContext.Provider value={{
            currentScene, setCurrentScene, windowSize, boardSize, gameScore, setGameScore,
            isTimeUp, setTimeUp, bugsCount, setBugsCount, timerSeconds, setTimerSeconds
        }}>
            <div id="game-board" ref={boardRef}>
                {renderCurrentScene()}
            </div>
        </GeneralContext.Provider>
    );
};
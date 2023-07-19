import React, { useCallback, useMemo, useState } from "react";
import "./GameOverScene.scss";
import { useGeneralContext } from "../../../shared/interfaces/global.interface";
import { MenuItem } from "../MenuScene/MenuItem/MenuItem";
import { SceneType } from "../../../shared/interfaces/board.interface";
import { getLocalStorage, setLocalStorage } from "../../../utils";

export const GameOverScene: React.FC = () => {
    const [userName, setUserName] = useState("");

    const { gameScore, bugsCount, setCurrentScene, setGameScore } = useGeneralContext();

    const onTryAgainClicked = useCallback(() => {
        setGameScore(0);
        setCurrentScene(SceneType.GAME);
    }, []);

    const onHighscoresClicked = useCallback(() => {
        setGameScore(0);
        setCurrentScene(SceneType.HIGHSCORES);
    }, []);

    const onSaveUserClicked = useCallback(() => {
        setLocalStorage(userName, gameScore);
        setGameScore(0);
        setCurrentScene(SceneType.HIGHSCORES);
    }, [userName, gameScore]);

    const onUserNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    }, []);

    const bestScore = useMemo<number>(() => {
        const lsItems = getLocalStorage();
        if (lsItems) {
            lsItems.sort((a: any, b: any) => b.score - a.score);
            return lsItems[0].score;
        }
    }, []);

    return (
        <div className="game-over">
            <h1>Time's Up!</h1>
            <p>You scored <span>{gameScore}</span> points!</p>
            <p>And squashed <span>{bugsCount}</span> bugs on the way.</p>
            <p>Thank you for the free cleaning service!</p>
            <div className="game-over-user">
                <p>Name: </p>
                <input
                    type="text"
                    name="user-name"
                    onChange={onUserNameChange}
                    value={userName}
                />
                <button onClick={onSaveUserClicked}>Save</button>
            </div>
            <p>Best score: <span>{bestScore}</span></p>
            <div className="game-over-options">
                <MenuItem itemClassName="try-again" itemName="TRY AGAIN" onMenuItemClick={onTryAgainClicked} />
                <MenuItem itemClassName="highscores" itemName="HIGHSCORES" onMenuItemClick={onHighscoresClicked} />
            </div>
        </div>
    );
};
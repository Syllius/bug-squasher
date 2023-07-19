import React, { useCallback } from "react";
import './MenuScene.scss';
import { MenuItem } from "./MenuItem/MenuItem";
import { useGeneralContext } from "../../../shared/interfaces/global.interface";
import { SceneType } from "../../../shared/interfaces/board.interface";

export const MenuScene: React.FC = () => {
    const { setCurrentScene } = useGeneralContext();

    const onPlayClicked = useCallback(() => {
        setCurrentScene(SceneType.GAME);
    }, []);

    const onHighscoresClicked = useCallback(() => {
        setCurrentScene(SceneType.HIGHSCORES);
    }, []);

    const onInstructionsClicked = useCallback(() => {
        setCurrentScene(SceneType.INSTRUCTIONS);
    }, []);


    return (
        <div className="main-menu">
            <h1>BUG SQUASHER</h1>
            <div className="main-menu-items">
                <MenuItem itemClassName="play" itemName="PLAY" onMenuItemClick={onPlayClicked} />
                <MenuItem itemClassName="instructions" itemName="INSTRUCTIONS" onMenuItemClick={onInstructionsClicked} />
                <MenuItem itemClassName="highscores" itemName="HIGHSCORES" onMenuItemClick={onHighscoresClicked} />
            </div>
            <div className="main-menu-footer">
                <p>Version 1.0.0 Created by Ron M.</p>
            </div>
        </div>
    );
};
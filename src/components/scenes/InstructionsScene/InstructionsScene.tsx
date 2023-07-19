import React, { useCallback } from "react";
import "./InstructionsScene.scss";
import { MenuItem } from "../MenuScene/MenuItem/MenuItem";
import { SceneType } from "../../../shared/interfaces/board.interface";
import { useGeneralContext } from "../../../shared/interfaces/global.interface";

export const InstructionsScene: React.FC = () => {
    const { setCurrentScene } = useGeneralContext();

    const onBackClicked = useCallback(() => {
        setCurrentScene(SceneType.MENU);
    }, []);

    return (
        <div className="instructions">
            <h1>Instructions</h1>
            <p>Oh no!</p>
            <p>There's a bug infestation all over the place!</p>
            <p>Your mission is to take this<br></br> trusty hammer and squash them down!</p>
            <p>Good Luck!</p>
            <div className="instructions-bug-types">
                <div className="bug-type bug-type-a">
                    <img src="assets/bug1.png" />
                    <p>10 pts</p>
                </div>
                <div className="bug-type bug-type-b">
                    <img src="assets/bug2.png" />
                    <p>40 pts</p>
                </div>
                <div className="bug-type bug-type-c">
                    <img src="assets/bug3.png" />
                    <p>80 pts</p>
                </div>
            </div>
            <MenuItem itemClassName="back" itemName="BACK" onMenuItemClick={onBackClicked} />
        </div>
    );
};
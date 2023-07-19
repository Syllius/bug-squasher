import React from "react";
import "./GameHud.scss";
import { Timer } from "../Timer/Timer";

interface Props {
    gameScore: number;
}

export const GameHud: React.FC<Props> = ({ gameScore }: Props) => {
    return (
        <div className="game-hud">
            <div className="game-hud-score text-light">
                <span>SCORE: <span className="score">{gameScore}</span></span>
            </div>
            <div className="game-hud-timer text-light">
                <Timer />
            </div>
        </div>
    );
};
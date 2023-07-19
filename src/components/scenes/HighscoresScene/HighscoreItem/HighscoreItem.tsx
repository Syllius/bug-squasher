import React from "react";
import "./HighscoreItem.scss";

interface Props {
    id: number;
    name: string;
    score: number;
}

export const HighscoreItem: React.FC<Props> = ({ id, name, score }: Props) => {
    return (
        <div className="highscore-item">
            <p>{id}.</p>
            <p>{name}</p>
            <p>{score}</p>
        </div>
    );
};
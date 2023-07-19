import React, { useCallback, useEffect, useState } from "react";
import "./HighscoresScene.scss";
import { HighscoreObject } from "../../../shared/interfaces/game.interface";
import { HighscoreItem } from "./HighscoreItem/HighscoreItem";
import { MenuItem } from "../MenuScene/MenuItem/MenuItem";
import { useGeneralContext } from "../../../shared/interfaces/global.interface";
import { SceneType } from "../../../shared/interfaces/board.interface";
import { getLocalStorage } from "../../../utils";

export const HighscoresScene: React.FC = () => {
    const [items, setItems] = useState<HighscoreObject[]>([
        { id: 1, name: '---', score: 0 },
        { id: 2, name: '---', score: 0 },
        { id: 3, name: '---', score: 0 },
        { id: 4, name: '---', score: 0 },
        { id: 5, name: '---', score: 0 },
        { id: 6, name: '---', score: 0 },
        { id: 7, name: '---', score: 0 }
    ]);
    const { setCurrentScene } = useGeneralContext();

    const onBackClicked = useCallback(() => {
        setCurrentScene(SceneType.MENU);
    }, []);

    useEffect(() => {
        const lsItems = getLocalStorage();
        if (lsItems) {
            lsItems.sort((a: any, b: any) => b.score - a.score);
            lsItems.forEach((item: any, index: number) => item.id = index + 1);

            const newItems = items.map((i) => {
                const lsItem = lsItems.find((lsItem: any) => lsItem.id === i.id);
                if (lsItem) {
                    return {
                        id: lsItem.id,
                        name: lsItem.name,
                        score: lsItem.score
                    }
                } else {
                    return i;
                }
            });

            setItems(newItems);
        }
    }, []);

    return (
        <div className="highscores">
            <h1>Highscores</h1>
            <div className="highscores-items">
                {items.map((item) => {
                    return <HighscoreItem
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        score={item.score}
                    />
                })}
            </div>
            <MenuItem itemClassName="back" itemName="BACK" onMenuItemClick={onBackClicked} />
        </div>
    );
};
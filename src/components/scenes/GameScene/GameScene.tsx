import React, { useCallback, useEffect, useState } from "react";
import './GameScene.scss';
import { BugEntity } from "../../BugEntity/BugEntity";
import { GameObject } from "../../../shared/interfaces/game.interface";
import { Direction, EntityType } from "../../../shared/interfaces/entity.interface";
import { randomInteger } from "../../../utils";
import { useInterval } from "../../../hooks/useInterval";
import { useGeneralContext } from "../../../shared/interfaces/global.interface";
import { GameHud } from "../../GameHud/GameHud";
import { SceneType } from "../../../shared/interfaces/board.interface";
import { useAudio } from "../../../hooks/useAudio";

export const GameScene: React.FC = () => {
    const [gameObjects, setGameObjects] = useState<GameObject[]>([]);
    const [isSmash, setSmash] = useState<boolean>(false);
    const [currentId, setCurrentId] = useState<number>(0);
    const [startCounter, setStartCounter] = useState<number>(3);
    const {
        boardSize, gameScore, isTimeUp, setTimeUp, setCurrentScene, timerSeconds
    } = useGeneralContext();

    const toggleSound = useAudio('sound/hit.wav');

    const generateBugEntity = () => {
        if (startCounter > 0) return;
        const randomDir = randomInteger(0, 3);
        const randomX = randomInteger(0, boardSize.width - 100);
        const randomY = randomInteger(0, boardSize.height - 100);

        const [velocity, directionThreshold, score, entityType] = setGameProgress();

        const bugEntity: GameObject = {
            id: currentId,
            direction: Object.values(Direction)[randomDir],
            position: { top: randomY, left: randomX },
            velocity: velocity,
            directionThreshold: directionThreshold,
            score: score,
            entityType: entityType
        };

        setGameObjects((prevState) => [...prevState, bugEntity]);
        setCurrentId(currentId + 1);
    };

    const setGameProgress = (): [number, number, number, EntityType] => {
        let velocity = 2;
        let directionThreshold = 3000;
        let entityType = EntityType.BUG_ORANGE;
        let score = 10;

        if (timerSeconds <= 20 && timerSeconds !== 0) {
            velocity = 5;
            directionThreshold = 200;
            entityType = EntityType.BUG_RED;
            score = 80;
        } else if (timerSeconds <= 30 && timerSeconds !== 0) {
            velocity = 4;
            directionThreshold = 1000;
            entityType = EntityType.BUG_GREEN;
            score = 40;
        } else if (timerSeconds <= 40 && timerSeconds !== 0) {
            velocity = 4;
            directionThreshold = 2000;
            entityType = EntityType.BUG_GREEN;
            score = 40;
        } else if (timerSeconds <= 50 && timerSeconds !== 0) {
            velocity = 3;
            directionThreshold = 2500;
            entityType = EntityType.BUG_ORANGE;
        }

        return [velocity, directionThreshold, score, entityType];
    };

    if (timerSeconds <= 45) {
        useInterval(generateBugEntity, 700);
    } else if (timerSeconds <= 50) {
        useInterval(generateBugEntity, 1000);
    } else if (timerSeconds <= 55) {
        useInterval(generateBugEntity, 1500);
    } else if (timerSeconds <= 60) {
        useInterval(generateBugEntity, 2000);
    }

    useInterval(() => {
        if (startCounter > 0) {
            setStartCounter((counter) => counter - 1);
        }
    }, 1000);

    const onGameClick = useCallback(() => {
        setSmash(true);
        setTimeout(() => setSmash(false), 100);
        toggleSound();
    }, []);

    useEffect(() => {
        if (isTimeUp) {
            setGameObjects([]);
            setCurrentId(0);
            setStartCounter(3);
            setTimeUp(false);

            setCurrentScene(SceneType.GAME_OVER);
        }
    }, [isTimeUp]);

    return (
        <div className={`game ${isSmash ? 'game-smash' : ''}`} onClick={onGameClick}>
            {startCounter == 0 ?
                <>
                    {gameObjects.map((go, index) => {
                        return <BugEntity
                            key={index}
                            velocity={go.velocity}
                            directionThreshold={go.directionThreshold}
                            defaultDirection={go.direction}
                            defaultPosition={go.position}
                            gameObject={go}
                        />
                    })}

                    <GameHud gameScore={gameScore} />
                </>
                :
                <>
                    <div className="game-start-counter">
                        <h1>{startCounter}</h1>
                    </div>
                </>
            }
        </div>
    );
};
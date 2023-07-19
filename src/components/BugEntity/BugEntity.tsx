import React, { useCallback, useEffect, useRef, useState } from "react";
import './BugEntity.scss';
import { Direction, EntityType, Position } from "../../shared/interfaces/entity.interface";
import { useInterval } from "../../hooks/useInterval";
import { randomInteger } from "../../utils";
import { useGeneralContext } from "../../shared/interfaces/global.interface";
import { GameObject } from "../../shared/interfaces/game.interface";
import { useAudio } from "../../hooks/useAudio";

interface Props {
    velocity: number;
    directionThreshold: number;
    defaultDirection: Direction;
    defaultPosition: Position;
    gameObject: GameObject;
}

export const BugEntity: React.FC<Props> = ({
    velocity, directionThreshold, defaultDirection, defaultPosition, gameObject
}: Props) => {
    const [position, setPosition] = useState<Position>(defaultPosition);
    const [direction, setDirection] = useState<Direction>(defaultDirection);
    const [isSquashed, setSquashed] = useState<boolean>(false);
    const [imgSrc, setImgSrc] = useState<string>("bug1");

    const toggleSound = useAudio('sound/bug_squash.wav');

    const { boardSize, gameScore, setGameScore, setBugsCount, bugsCount } = useGeneralContext();

    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        let finalImgSrc = "bug1";

        switch (gameObject.entityType) {
            case EntityType.BUG_ORANGE: finalImgSrc = "bug1"; break;
            case EntityType.BUG_GREEN: finalImgSrc = "bug2"; break;
            case EntityType.BUG_RED: finalImgSrc = "bug3"; break;
        }

        setImgSrc(finalImgSrc);
    }, [gameObject]);

    const move = () => {
        if (isSquashed) return;

        const currentLeft = position.left;
        const currentTop = position.top;

        let newPosition: Position = { top: 0, left: 0 };

        switch (direction) {
            case Direction.DOWN:
                newPosition = {
                    top: Math.min(currentTop + velocity,
                        boardSize.height - (imgRef.current?.height || 0) - 15),
                    left: currentLeft
                };
                break;
            case Direction.UP:
                newPosition = {
                    top: Math.max(currentTop - velocity, 15),
                    left: currentLeft
                };
                break;
            case Direction.LEFT:
                newPosition = {
                    top: currentTop,
                    left: Math.max(currentLeft - velocity, 15)
                };
                break;
            case Direction.RIGHT:
                newPosition = {
                    top: currentTop,
                    left: Math.min(currentLeft + velocity,
                        boardSize.width - (imgRef.current?.width || 0) - 15)
                };
                break;
        }

        setPosition(newPosition);
    };

    const changeDirection = () => {
        if (isSquashed) return;

        const randomDir = randomInteger(0, 3);
        switch (randomDir) {
            case 0:
                setDirection(Direction.UP);
                break;
            case 1:
                setDirection(Direction.DOWN);
                break;
            case 2:
                setDirection(Direction.LEFT);
                break;
            case 3:
                setDirection(Direction.RIGHT);
                break;
        }
    };

    const getDirection = useCallback(() => {
        switch (direction) {
            case Direction.DOWN:
                return "rotateZ(180deg)";
            case Direction.UP:
                return "rotateZ(0deg)";
            case Direction.LEFT:
                return "rotateZ(270deg)";
            case Direction.RIGHT:
                return "rotateZ(90deg)";
        }
    }, [direction]);

    const onBugEntityClick = useCallback(() => {
        if (!isSquashed) {
            setGameScore(gameScore + gameObject.score);
        }
        setSquashed(true);
        setDirection(Direction.UP);
        setBugsCount(bugsCount + 1);
        toggleSound();
    }, [gameScore]);

    useInterval(move, 15);
    useInterval(changeDirection, directionThreshold);

    return (
        <div
            className={`entity-bug ${!isSquashed ? 'hover' : 'squashed'}`}
            style={{ top: position.top, left: position.left, transform: getDirection() }}
            onClick={onBugEntityClick}
        >
            {!isSquashed ?
                <img
                    src={`assets/${imgSrc}.png`}
                    ref={imgRef}
                /> :
                <img
                    src="assets/splat.png"
                />}
        </div >
    );
};
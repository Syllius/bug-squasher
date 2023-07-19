import React, { useEffect, useState } from "react";
import "./Timer.scss";
import { useInterval } from "../../hooks/useInterval";
import { useGeneralContext } from "../../shared/interfaces/global.interface";

export const Timer: React.FC = () => {
    const [minutes, setMinutes] = useState<number>(1);
    const [seconds, setSeconds] = useState<number>(0);
    const [isTimerStarted, setTimerStarted] = useState<boolean>(false);
    const { setTimeUp, setTimerSeconds } = useGeneralContext();

    useInterval(() => {
        if (seconds > 0) {
            setSeconds((seconds) => seconds - 1);
        } else if (minutes > 0) {
            setMinutes((minutes) => minutes - 1);
            setSeconds(59);
        }
        setTimerStarted(true);
    }, 1000);

    useEffect(() => {
        if (isTimerStarted && seconds <= 0) {
            setTimeUp(true);
        }
        setTimerSeconds(seconds);
    }, [seconds]);

    const formatTime = (value: number): string => {
        return value.toString().padStart(2, '0');
    };

    return (
        <div
            className="game-timer"
        >
            <span>
                {formatTime(minutes)}:
                <span className={`${seconds <= 10 && minutes === 0 ? 'final' : ''}`}>
                    {formatTime(seconds)}
                </span>
            </span>
        </div>
    );
};
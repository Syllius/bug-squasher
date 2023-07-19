import React from 'react'
import { Board } from './components/Board/Board';

export const App: React.FC = () => {
    return (
        <>
            <Board />

            {/* caching images before starting the game */}
            <img src="assets/bg-1.jpg" style={{ display: 'none' }} />
            <img src="assets/bug1.png" style={{ display: 'none' }} />
            <img src="assets/bug2.png" style={{ display: 'none' }} />
            <img src="assets/bug3.png" style={{ display: 'none' }} />
            <img src="assets/hammer_down.png" style={{ display: 'none' }} />
            <img src="assets/hammer.png" style={{ display: 'none' }} />
            <img src="assets/images.jpg" style={{ display: 'none' }} />
            <img src="assets/splat.png" style={{ display: 'none' }} />
        </>
    );
};
'use client';

import { useEffect, useRef, useState } from 'react';

const Canvas = () => {
    const canvasRef = useRef(null);
    useEffect(() => {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        canvasRef.current.style.backgroundColor = '#111111';
    }, []);

    const [grid, setGrid] = useState([]);

    useEffect(() => {
        for (let i = 0; i < canvasRef.current.width; i += 20) {
            for (let j = 0; j < canvasRef.current.height; j += 20) {
                setGrid(previousGrid => {
                    previousGrid.push([i, j]);
                    return previousGrid;
                });

                const context = canvasRef.current.getContext('2d');
                context.strokeStyle = '#4B3B40';
                context.strokeRect(i, j, 20, 20);
            }
        }
    }, []);

    return <canvas ref={canvasRef}></canvas>;
};

export default Canvas;

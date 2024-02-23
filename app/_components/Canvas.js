'use client';

import { useEffect, useRef, useState } from 'react';

const PIXEL_SIZE = 40;

const Canvas = () => {
    const canvasRef = useRef(null);
    useEffect(() => {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        canvasRef.current.style.backgroundColor = '#111111';
    }, []);

    const [grid, setGrid] = useState([]);

    useEffect(() => {
        for (let i = 0; i < canvasRef.current.width; i += PIXEL_SIZE) {
            for (let j = 0; j < canvasRef.current.height; j += PIXEL_SIZE) {
                setGrid(previousGrid => {
                    previousGrid.push([i, j]);
                    return previousGrid;
                });

                const context = canvasRef.current.getContext('2d');
                context.strokeStyle = '#FFFFFF';
                context.strokeRect(i, j, PIXEL_SIZE, PIXEL_SIZE);
            }
        }
    }, []);

    useEffect(() => {
        canvasRef.current.addEventListener('click', event => {
            const context = canvasRef.current.getContext('2d');
            const pixelX = Math.floor(event.offsetX / PIXEL_SIZE) * PIXEL_SIZE;
            const pixelY = Math.floor(event.offsetY / PIXEL_SIZE) * PIXEL_SIZE;
            context.fillStyle = '#FFFFFF';
            context.fillRect(pixelX, pixelY, PIXEL_SIZE, PIXEL_SIZE);
        });
    }, []);

    return <canvas ref={canvasRef}></canvas>;
};

export default Canvas;

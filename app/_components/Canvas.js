'use client';

import { useEffect, useRef, useState } from 'react';

const PIXEL_SIZE = 40;

let didInit = false;

const Canvas = () => {
    const canvasRef = useRef(null);

    const [grid, setGrid] = useState([]);

    useEffect(() => {
        if (didInit) return;
        didInit = true;

        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        canvasRef.current.style.backgroundColor = '#111111';

        let cols = [];
        for (let i = 0; i < canvasRef.current.width; i += PIXEL_SIZE) {
            let row = [];
            for (let j = 0; j < canvasRef.current.height; j += PIXEL_SIZE) {
                row.push([i, j, false]);
            }

            cols.push(row);
        }

        setGrid(cols);
    }, []);

    const addPixelToGrid = event => {
        const context = canvasRef.current.getContext('2d');
        const pixelX = Math.floor(event.clientX / PIXEL_SIZE) * PIXEL_SIZE;
        const pixelY = Math.floor(event.clientY / PIXEL_SIZE) * PIXEL_SIZE;
        context.fillStyle = '#FFFFFF';
        context.fillRect(pixelX, pixelY, PIXEL_SIZE, PIXEL_SIZE);

        let pixelIndex = null;
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (grid[i][j][0] === pixelX && grid[i][j][1] === pixelY) {
                    pixelIndex = [i, j];

                    break;
                }
            }
        }

        setGrid(previousGrid => {
            previousGrid[pixelIndex[0]][pixelIndex[1]][2] = true;
            return previousGrid;
        });
    };

    const [start, setStart] = useState(false);
    useEffect(() => {
        if (!start) return;

        const intervalID = setInterval(() => {
            let cloneGrid = JSON.parse(JSON.stringify(grid));
            for (let i = 0; i < grid.length; i++) {
                for (let j = 0; j < grid[i].length; j++) {
                    let neighbors = 0;
                    // top
                    if (grid[i] && grid[i][j - 1] && grid[i][j - 1][2]) {
                        neighbors += 1;
                    }

                    // top right
                    if (
                        grid[i + 1] &&
                        grid[i + 1][j - 1] &&
                        grid[i + 1][j - 1][2]
                    ) {
                        neighbors += 1;
                    }

                    // right
                    if (grid[i + 1] && grid[i + 1][j] && grid[i + 1][j][2]) {
                        neighbors += 1;
                    }

                    // bottom right
                    if (
                        grid[i + 1] &&
                        grid[i + 1][j + 1] &&
                        grid[i + 1][j + 1][2]
                    ) {
                        neighbors += 1;
                    }

                    // bottom
                    if (grid[i] && grid[i][j + 1] && grid[i][j + 1][2]) {
                        neighbors += 1;
                    }

                    // bottom left
                    if (
                        grid[i - 1] &&
                        grid[i - 1][j + 1] &&
                        grid[i - 1][j + 1][2]
                    ) {
                        neighbors += 1;
                    }

                    // left
                    if (grid[i - 1] && grid[i - 1][j] && grid[i - 1][j][2]) {
                        neighbors += 1;
                    }

                    // top left
                    if (
                        grid[i - 1] &&
                        grid[i - 1][j - 1] &&
                        grid[i - 1][j - 1][2]
                    ) {
                        neighbors += 1;
                    }

                    if (grid[i][j][2]) {
                        if (neighbors < 2) {
                            cloneGrid[i][j][2] = false;
                        }

                        if (neighbors >= 2) {
                            cloneGrid[i][j][2] = true;
                        }

                        if (neighbors > 3) {
                            cloneGrid[i][j][2] = false;
                        }
                    }

                    if (grid[i][j][2] === false) {
                        if (neighbors === 3) {
                            cloneGrid[i][j][2] = true;
                        }
                    }
                }
            }

            const context = canvasRef.current.getContext('2d');
            context.clearRect(
                0,
                0,
                canvasRef.current.width,
                canvasRef.current.height
            );

            for (let i = 0; i < cloneGrid.length; i++) {
                for (let j = 0; j < cloneGrid[i].length; j++) {
                    if (cloneGrid[i][j][2]) {
                        context.fillStyle = '#FFFFFF';
                        context.fillRect(
                            cloneGrid[i][j][0],
                            cloneGrid[i][j][1],
                            PIXEL_SIZE,
                            PIXEL_SIZE
                        );
                    }
                }
            }

            setGrid(cloneGrid);
        }, 250);

        return () => clearInterval(intervalID);
    }, [start, grid]);

    return (
        <div>
            <canvas
                ref={canvasRef}
                onClick={start ? null : addPixelToGrid}></canvas>

            {start ? null : (
                <button className="start-button" onClick={() => setStart(true)}>
                    start
                </button>
            )}
        </div>
    );
};

export default Canvas;

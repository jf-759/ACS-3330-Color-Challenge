import React, { useState, useEffect } from 'react'
import './ColorSwatches.css'

function ColorSwatches() {
    const [hexData, setHexData] = useState([])
    const [targetColor, setTargetColor] = useState('')
    const [resultMessage, setResultMessage] = useState('')
    const [gameOver, setGameOver] = useState(false)

    useEffect(() => {
        randomColorSwatch()
    }, [])

    function generateRandomHexDigit() {
        const hexNumber = '0123456789abcdef'
        return hexNumber[Math.floor(Math.random() * 16)]
    }

    function generateRandomHexColor () {
        let hexColor = '#'
        for (let i = 0; i < 6; i++) {
            hexColor += generateRandomHexDigit()
        }
        return hexColor
    }

    function randomColorSwatch() {
        const newColors = [
            generateRandomHexColor(),
            generateRandomHexColor(),
            generateRandomHexColor(),
        ]
        setHexData(newColors)

        const randomIndex = Math.floor(Math.random() * 3)
        setTargetColor(newColors[randomIndex])
        setResultMessage('')
        setGameOver(false)
    }

    function handleClick(clickedColor) {
        if (clickedColor === targetColor) {
            setResultMessage('Correct!')
        } else {
            setResultMessage('Incorrect!')
        }
        setGameOver(true)
    }

    function handlePlayAgain() {
        randomColorSwatch()
    }

    return(
        <div className="swatches-container">

            <div className="target-color">
                {targetColor && (
                    <div className="target-color-container">
                        <p>Target Color:</p>
                        <div className="target-swatch"
                        >
                            {targetColor}
                        </div>
                    </div>
                )}
            </div>

            <div className="color-swatches">
                {hexData.map((hex, index) => (
                    <div
                        key={index}
                        className="swatch"
                        style={{ backgroundColor: hex }}
                        onClick={() => !gameOver && handleClick(hex)}
                    >
                    </div>
                ))}
            </div>
            
            {resultMessage && (
                <p className={`result-message ${resultMessage === 'Correct!' ? 'correct' : 'incorrect'}`}>
                    {resultMessage}
                </p>
            )}

            <div className="button-container">
                {hexData.length > 0 && !gameOver && (
                    <button onClick={randomColorSwatch}>Regenerate Swatches</button>
                )}

                {gameOver && (
                    <button onClick={handlePlayAgain}>Play Again</button>
                )}
            </div>
        </div>
    )
}

export default ColorSwatches
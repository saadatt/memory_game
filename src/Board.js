import React from 'react';
import Square from './Square';

const style = {
    margin: '0 auto',
    border: '2px solid darkgreen',
    width: '400px',
    height: '300px',
    display: 'grid',
    gridTemplate: 'repeat(3, 1fr) / repeat(4, 1fr)'
}

const Board = ({cards, openCard, openClickable}) => (
    <div style={style}>

        {cards.map((card, i) => (
            <Square
                key={i}
                card={card}
                openCard={openCard}
                openClickable={openClickable}
            />
        ))}
    </div>
)

export default Board;
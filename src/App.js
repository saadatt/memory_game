import React, {useEffect, useState} from "react";
import "./App.css";
import Board from './Board'

const emoji = ['+', '+', '!', '!', '?','?', '%', '%', '&', '&', '$', '$'];

export default function App() {

    // массив, который наполним эмоджи
    const [cards, setCards] = useState([
        {id: 1, emoji: '', open: false},
        {id: 2, emoji: '', open: false},
        {id: 3, emoji: '', open: false},
        {id: 4, emoji: '', open: false},
        {id: 5, emoji: '', open: false},
        {id: 6, emoji: '', open: false},
        {id: 7, emoji: '', open: false},
        {id: 8, emoji: '', open: false},
        {id: 9, emoji: '', open: false},
        {id: 10, emoji: '', open: false},
        {id: 11, emoji: '', open: false},
        {id: 12, emoji: '', open: false},
    ])

    // счетчик ходов (чтобы запускать проверку каждый 2-ой ход)
    const [count, setCount] = useState(1);

    // сохраняем эмоджи в историю, чтобы проверять совпадения
    const [history, setHistory] = useState([]);

    // сохраняем id в историю, чтобы знать, какие карточки скрывать
    const [historyId, setHistoryId] = useState([]);

    // результат конкретной игры
    const [result, setResult] = useState(0);
    const [resultsAccumulator, setResultsAccumulator] = useState([])

    // заполняем карточки эмоджи.
    // Начинаем с массива с эмоджи
    // 2 раза добавляем каждую эмоджи рандомно вместо пустой строки,
    // проверяя, нет занято ли место уже
    // const createCards = () => {
    //     const newCards = [...cards];
    //     for (let i = 0; i < emoji.length; i++) {
    //         for (let tm = 1; tm <= 2; tm++) {
    //             let j = Math.floor(Math.random() * 12);
    //             if (newCards[j].emoji === '') {
    //                 newCards[j].emoji = emoji[i];
    //             } else {
    //                 while (newCards[j].emoji !== '')
    //                     j = Math.floor(Math.random() * 12);
    //                 if (newCards[j].emoji === '') {
    //                     newCards[j].emoji = emoji[i];
    //                 }
    //             }
    //         }
    //     }
    //     setCards(newCards);
    // }


    const createCards = () => {
        let randomId=Math.floor(Math.random() * 12);
        let newCards = [...cards];
        emoji.map(el=> { {do {
            randomId=Math.floor(Math.random() * 12) }
                        while (newCards[randomId].emoji !== '')}
            newCards[randomId].emoji = el;
       })
        setCards(newCards);
    }

    // открываем карточки
    const openCard = (cardId) => {
        let intoHistory;
        let intoHistoryId;
        const newCards = cards.map(el => {
            if (el.id === cardId) {
                intoHistory = el.emoji;
                intoHistoryId = el.id;
                return {...el, open: true}
            }
            ;
            return el;
        })
        setCards(newCards)
        setCount(count + 1);
        console.log(count)
        setHistory([...history, intoHistory])
        setHistoryId([...historyId, intoHistoryId])
    }

    // проверяем, одинаковы ли открытые последние 2 карточки
    const checkEquality = () => {
        if (count !== 0 && count % 2 === 0) {
            if (history[history.length - 1] !== history[history.length - 2]) {
                let newCards = cards.map(el => {
                    if (el.id === historyId[historyId.length - 1] || el.id === historyId[historyId.length - 2])
                        return {...el, open: false};
                    return el;
                })
                setCards(newCards)
            }
        }
    }

    // чтобы показать результат, подсчитываем кол-во ходов (2 карточки - 1 ход)
    const howManyMoves = () => {
        let allMoves = 0
        console.log(cards.map(el => el.open).includes(true))
        if (!(cards.map(el => el.open).includes(false))) {
            allMoves = count / 2;
        }
        setResult(allMoves);
    }

    // сохраняем результат игры (к-во ходов)
    const saveResult = () => {
        const newAccumulator = [...resultsAccumulator, result];
        setResultsAccumulator(newAccumulator)
    }

    // запускаем игру заново, задаем снова начальные значения
    const startAgain = () => {
        const newCards = [...cards];
        for (let i = 0; i < newCards.length; i++) {
            newCards[i].open = false;
            newCards[i].emoji = '';
        }
        setCards(newCards);
        setCount(0)
        setHistory([]);
        setHistoryId([]);
        setResult(0)
        saveResult()
    }

    // когда сохранен результат игры, карточки наполняются снова, чтобы начать
    useEffect(() => {
        createCards();
    }, [resultsAccumulator])

    // через 0,7 секунд после каждого хода
    // запускаеся проверка, совпали ли карточки
    useEffect(() => {
        setTimeout(() => {
            checkEquality();
        }, 700);
    }, [count])

    // через 12 ходов начинаем проверять результаты
    // если все карточки открыты, считаем кол-во ходов.
    useEffect(() => {
        if (count > 12) {
            setTimeout(() => {
                howManyMoves();
            }, 600);
        }
    }, [count])


    return (
        <div className="App">
            <h1>Memory Game</h1>

            <Board cards={cards}
                   openCard={openCard}/>

            {resultsAccumulator[0] &&

            <div>
                Your results: {resultsAccumulator.map((el, i) => {
                if (i === resultsAccumulator.length - 1) {
                    return <span>{el}{' '}</span>
                }
                ;
                return <span>{el}{', '}</span>;
            })}
            </div>

            }

            {result ? <div>
                <h2>{`You win in ${result} moves!`}</h2>
                <button onClick={startAgain} className='button'> Start again</button>
            </div> : null}

        </div>
    );
}
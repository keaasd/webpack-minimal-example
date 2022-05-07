import './styles/style.scss';
import image from './images/example.svg';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app/app';

ReactDOM.render(<App />, document.getElementById('root'));

// document.getElementById('root').innerHTML = `<img src=${image} />`;

console.log('Hello world');
// создание свойства класса без конструктора
class Game {
    name = 'Violin Charades'
}
const myGame = new Game()

// создаем параграф
const p = document.createElement('p')
p.textContent = `I like ${myGame.game}.`

// создаем элемент заголовка
const heading = document.createElement('h1')
heading.textContent = 'Как интересно!'

// добавляем параграф и заголовок в DOM
const root = document.querySelector('#root')
root.append(heading, p)
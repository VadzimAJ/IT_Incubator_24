import React from 'react';
import './App.css';
import logo from './logo.png';
import logo1 from './logo.jpg';
import logo2 from './dzigueda.jpg';
import bober from './bober.jpg';
import { Cart } from './Cart';
import { Button } from './Button';



function App() {
    let likes = 0 

    const startCart = [
        {title: "124", numberLesson: 1, likes: 3, src: logo},
        {title: "Gunba", numberLesson: 2, likes: 5, src: logo1},
        {title: "Dzigueda", numberLesson: 3, likes: 10, src: logo2},
        {title: "Bober", numberLesson: 4, likes: -5, src: bober}
        
    ]

    const reternArrLength = () => {
        console.log("Pizdec!!!")
    }

    return (
        <div className="App">
            <>
            {startCart.map(el => {
                return (<Cart title={el.title}
                    src={el.src}
                    numberLesson={el.numberLesson}
                    likes={el.likes}
                    />)
            })}
            </>


            {/* <Cart title={startCart[0].title}
            src={startCart[0].src}
            numberLesson={startCart[0].numberLesson}
            likes={startCart[0].likes}
            />             */}
        </div>
    );
}

export default App;
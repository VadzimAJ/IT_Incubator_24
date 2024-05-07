import React, { useState } from 'react';
import './App.css';
import { NewComponent } from './NewComponent';

type MoneyType = "ALL" | "RUBLS" | "Dollars"

function App() {
    const [money, setMoney] = useState([
        { banknots: 'Dollars', value: 100, number: ' a1234567890' },
        { banknots: 'Dollars', value: 50, number: ' z1234567890' },
        { banknots: 'RUBLS', value: 100, number: ' w1234567890' },
        { banknots: 'Dollars', value: 100, number: ' e1234567890' },
        { banknots: 'Dollars', value: 50, number: ' c1234567890' },
        { banknots: 'RUBLS', value: 100, number: ' r1234567890' },
        { banknots: 'Dollars', value: 50, number: ' x1234567890' },
        { banknots: 'RUBLS', value: 50, number: ' v1234567890' },
    ])

    const [filter, setFilter] = useState<MoneyType>("ALL")
    let currentMoney = money

    if (filter === "RUBLS") {
        currentMoney = money.filter((filteredMoney) => filteredMoney.banknots === 'RUBLS')
    } else if (filter === "Dollars") {
        currentMoney = money.filter((filteredMoney) => filteredMoney.banknots === 'Dollars')
    } 

    


    const onClickFilterHundler = (banknote: MoneyType) => {
        setFilter(banknote)
    }

    return (
        <>  
            <NewComponent currentMoney= {currentMoney} onClickFilterHundler={onClickFilterHundler}/>
            {/* <ul>
                {currentMoney.map((objFromMoney, index) => {
                    return (
                        <li key={index}>
                            <span> {objFromMoney.banknots}</span>
                            <span> {objFromMoney.value}</span>
                            <span> {objFromMoney.number}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => onClickFilterHundler("ALL")}>ALL</button>
                <button onClick={() => onClickFilterHundler("RUBLS")}>RUBLS</button>
                <button onClick={() => onClickFilterHundler("Dollars")}>Dollars</button>
            </div> */}

        </>



    );
}
export default App;

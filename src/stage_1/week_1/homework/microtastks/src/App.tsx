import React, {useState} from 'react';
import './App.css';
import { Button } from './Button';

function App () {

    // const myfirstSubuscribe = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     console.log("Hello I'm Person 1")
    // }

    // const myfirstSubuscribe2 = () => {
    //     console.log("Hello I'm Person 2")
    // }

    const onClickHendler = (name: string) => {
        console.log (name)
    }

    const foo1 = () => {
        let a = "100200";
        console.log (a + " type of a is " + typeof a)
    }

    const foo2 = (inf: number) => {
        console.log(inf + " type of inf is " + typeof inf)
    }

    return (
        <div>
            
        {/* <button onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{console.log("Hello")}}>Click me</button> */}
        <button onClick={() => onClickHendler('vasya')} >Click me</button>
        <button onClick={() => onClickHendler('ne vasya')} >Click me - 2</button>

        <button onClick = {foo1}>Button 1 void</button>
        <button onClick = {() => foo2(100200)}>Button 2 void</button>

        <Button name="Button 1" callBack={foo1}/>
        <Button name="Button 2" callBack={() => foo2(100)}/>
        </div>
    );
}
export default App;

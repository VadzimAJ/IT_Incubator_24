import React, { useState } from 'react';
import {Header} from './site/Header';
import { Body } from './site/Body';
import { Footer } from './site/Footer';
import './App.css';


function App() {
    return (
        <>
            <Header titleForHeader={"New Header"}/>
            <Body titleForBody = {"New Body"}/>
            <Footer  titleForFooter = {"New Footer"}/>
        </>
        
    );
}
export default App;

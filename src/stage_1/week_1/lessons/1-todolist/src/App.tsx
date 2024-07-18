import React, {useState} from 'react';
import styles from "./components/Site.module.css";
import { PageOne } from './components/pages/PageOne';
import { PageTwo } from './components/pages/PageTwo';
import { PageThree } from './components/pages/PageThree';
import { Navigate, Route, Routes, NavLink, Link } from 'react-router-dom';
import { Error404 } from './components/pages/Error404';
import styled from 'styled-components'


function App() {

    const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
            return isActive ? styles.activeNavLink : styles.navLink;
        };
    
    return (
        <div>
            <div className={styles.header}><h1>HEADER</h1></div>
            <div className={styles.body}>
                <nav className={styles.nav}>
                    <ul>
                        <li><NavLink to ={'/adidas'} className={getNavLinkClass}>ADIDIAS</NavLink></li>
                        <li> <NavLink to ={'/puma'} className={getNavLinkClass}>PUMA</NavLink> </li>
                        <li> <NavLink to ={'/abibas'} className={getNavLinkClass}>ABIBAS</NavLink> </li>

                        <NavWrapper><NavLink to ={'/adidas'} >ADIDIAS</NavLink></NavWrapper>
                        <NavWrapper> <NavLink to ={'/puma'} >PUMA</NavLink> </NavWrapper>
                        <NavWrapper> <NavLink to ={'/abibas'} >ABIBAS</NavLink> </NavWrapper>
                    
                    </ul>
                </nav>
                <div className={styles.content}>
                    <Routes>
                        <Route path='/' element={<Navigate to={'/adidas'}/>}/>

                        <Route path='/adidas' element={<PageOne/>}/>
                        <Route path='/puma' element={<PageTwo/>}/>
                        <Route path='/abibas' element={<PageThree/>}/>
                        <Route path='/error404' element={<Error404/>}/>

                        <Route path='/*' element={<Navigate to={'/error404'}/>}/>
                        
                    </Routes>
                </div>
            </div>
            <div className={styles.footer}>abibas 2023</div>
        </div>
    );
}

const NavWrapper = styled.li`
    margin-left: 10px;
    font-size: 20px;

    & > a {
        text-decoration: none;
        color: #282c34;
    }

    & > a.active {
        text-decoration: underline;
        color: #7fb8f1;
    }

    & > a.hover {
        color: #8cabc3;
    }
`


export default App;

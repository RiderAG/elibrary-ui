import React from 'react';

import s from './Footer.module.css';
import logo from '../../logo.svg';

const Footer = () => {
    return(
    <footer className={s.myFooter}>  
        <h4><img src={logo} alt="logo" height={64}/>eLibrary, 2020</h4>
    </footer>
    )
}

export default Footer;
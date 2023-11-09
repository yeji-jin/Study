import React, { useState, useRef } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function FooterNav() {

    const navList = [
        // {
        //     title:'intro',
        //     href:'/',
        // },
        {
            title:'메뉴1',
            href:'main',
        },
        {
            title:'메뉴2',
            href:'sub1',
        },
        {
            title:'메뉴3',
            href:'sub2',
        },
        {
            title:'메뉴4',
            href:'sub3',
        },
    ];

  return (
    <footer>
        <ul>
            {
                navList.map(item => {
                    return <li key={item.title}>
                            <Link to={item.href}>{item.title}</Link>
                        </li>
                })
            }
        </ul>
    </footer>
  );
}

export default FooterNav;

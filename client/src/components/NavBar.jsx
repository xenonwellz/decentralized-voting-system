import React, { useContext, useState, useEffect } from 'react';
import { Web3Context } from '../utils/contexts/Contract';
import logo from "../imgs/logo.png";
import NavLink from "./NavLink";
import { NavLink as Nav } from 'react-router-dom';

const NavBar = () => {

    const { account, contract } = useContext(Web3Context);
    const [admin, setAdmin] = useState("");

    const init = async () => {
        const _admin = await contract.methods.admin().call();
        setAdmin(_admin);
    }

    useEffect(() => {
        init();
    }, [])


    return (
        <nav className="fixed top-0 left-0 w-full bg-white">
            <div className='container flex justify-between h-16 p-3'>
                <Nav to="/">
                    <img src={logo} className="w-10 h-10 rounded-md" alt="" />
                </Nav>
                <div className='flex items-center gap-3'>
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/register" >Register</NavLink>
                    {admin.toUpperCase() == account.toUpperCase() ? <NavLink to="/new/poll">Add New Poll</NavLink> : null}
                </div>
            </div>
            <div className="border-t ">
                <div className="container flex items-center p-2">
                    <span className="inline-block w-2 h-2 mr-1 bg-green-700 rounded-full"></span>
                    <span className="pr-2 font-semibold">Connected: </span>
                    <span>{account}</span>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;

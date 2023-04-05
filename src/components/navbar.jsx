import React, { Component } from 'react';

function Navbar({totalCounters}){
        return (
            <nav className="navbar bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <div className="badge bg-pill bg-secondary">
                        {totalCounters}
                    </div>
                </div>
            </nav>
        );
}
 
export default Navbar;
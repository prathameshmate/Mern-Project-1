import React from 'react';
import { NavLink } from "react-router-dom";

const Error = () => {
    return (
        <>
            <div id='notfound'>
                <div className='notfound'>
                    <h1>404</h1>
                    <h1>WE ARE SORRY , PAGE NOT FOUND</h1>
                    <p>THE PAGE YOU ARE LOOKING FOR MIGHT HAVE BEEN REMOVED  HAD ITS NAME CHANGED  OR IS TEMPORARILY UNAVAILABLE</p>
                    <button type='button ' className='btn btn-primary btn-sm' ><NavLink className="nav-link" to="/">BACK TO HOMEPAGE</NavLink></button>
                </div>
            </div>
        </>
    )
}
export default Error; 
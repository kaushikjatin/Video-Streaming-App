import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component{

    render(){
        return(
            <div className='navbar'>

                <span className='left_nav'>
                    <Link to='/upload_video'>Upload Video</Link>
                    <Link to='/videos'>Videos</Link>
                </span>

                <span className='right_nav'>
                    <Link to='/signin'>Login</Link>
                    <Link to='/signup'>Register</Link>
                </span>
            </div>
        )
    }
}

export default Navbar;
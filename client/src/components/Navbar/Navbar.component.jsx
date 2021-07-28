import React from 'react';
import Nav from 'react-bootstrap/Nav'
import { connect } from 'react-redux';
import {signOut} from '../../redux/user/user.actions';
import {Link} from 'react-router-dom'

class Navbar extends React.Component{

    render(){
        var {currentUser,signOut}=this.props;
        return(
            <div className='navbar'>
                <Nav fill variant="tabs">
                <Nav.Item>
                    <Nav.Link as={Link} to="/">HOME</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1" as={Link} to="/upload_video">Upload Video</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2" as={Link} to="/videos">Videos</Nav.Link>
                </Nav.Item>
                </Nav>

                <Nav className="justify-content-end" activeKey="/home">

                    {
                        currentUser?
                        (<Nav.Item>
                            <Nav.Link eventKey="disabled" disabled>{currentUser}</Nav.Link>
                        </Nav.Item>):
                        (<span></span>)
                    }

                    {currentUser ? 
                            (
                                <Nav.Item>
                                   <span onClick={signOut}>
                                       <Nav.Link eventKey="link-1" >LogOut</Nav.Link>
                                    </span>
                                </Nav.Item>
                            ):(
                                    <Nav.Item>
                                             <Nav.Link eventKey="link-3" as={Link} to="/signin">Login</Nav.Link>
                                    </Nav.Item>
                            )
                    }

                    {currentUser ? 
                            (
                                <div></div>
                            ):(
                                    <Nav.Item>
                                             <Nav.Link eventKey="link-3" as={Link} to="/signup">Register</Nav.Link>
                                    </Nav.Item>
                            )
                    }
                </Nav>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        currentUser:state.user.currentUser
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        signOut:()=>{
            console.log("Running the dispatch");
            dispatch(signOut())
        }

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Navbar);
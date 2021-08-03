import React from 'react';
import Nav from 'react-bootstrap/Nav'
import { connect } from 'react-redux';
import {signOut} from '../../redux/user/user.actions';
import {Link} from 'react-router-dom'

class Navbar extends React.Component{

    render(){
        var {currentUser,signOut,token_issue_time}=this.props;
        const hours_diff=Math.abs(new Date().getTime() - new Date(token_issue_time).getTime())/(1000 * 60 * 60);
        if(hours_diff>1){
            currentUser=null;
        }
        return(
            <div className='container'>
                <Nav fill variant="tabs">
                <Nav.Item>
                    <Nav.Link eventKey="link-0" as={Link} to="/">HOME</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1" as={Link} to="/upload_video">Upload Video</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2" as={Link} to="/videos">Videos</Nav.Link>
                </Nav.Item>

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
                                       <Nav.Link eventKey="link-3" >LogOut</Nav.Link>
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
                                             <Nav.Link eventKey="link-4" as={Link} to="/signup">Register</Nav.Link>
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
        currentUser:state.user.currentUser,
        token_issue_time:state.user.time
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
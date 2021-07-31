import React,{useState} from 'react';
import { connect } from 'react-redux';
import {emailSignInStart} from '../../redux/user/user.actions'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './SignIn.styles.scss'

const SignIn = (props)=>{
    const [credentials,setCredentials]=useState({email:'',password:''})
    const {EmailSignInStart}=props;
    const {email,password}=credentials;


    const handleSubmit= async event=>{
        event.preventDefault();
        console.log("We will make a store,redux-saga, and then do the authentication process")
        EmailSignInStart(email,password,props.history);
        setCredentials({email:'',password:''})
    }

    const handleChange=event=>{
        const {value,name}=event.target;
        setCredentials({...credentials,[name]:value})
    }

    return(
        <div className='signin_form'>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Email" name="email" onChange={handleChange}  value={email} required/>
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange}  value={password} required/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>

        </div>
    )
}

const mapDispatchToProps = (dispatch)=>({
    EmailSignInStart : (email,password,history)=>dispatch(emailSignInStart({email,password,history}))
})

export default connect(null,mapDispatchToProps)(SignIn)
import React,{useState} from 'react';
import { connect } from 'react-redux';
import {emailSignInStart} from '../../redux/user/user.actions';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './SignIn.styles.scss';
import AlertMessage from '../Alert/Alert.component';
import {setSignInPageAlert} from '../../redux/Alerts/Alert.Actions'

const SignIn = (props)=>{
    const [credentials,setCredentials]=useState({email:'',password:''});
    const {EmailSignInStart,alertInfo}=props;
    const {email,password}=credentials;


    const handleSubmit= async event=>{
        event.preventDefault();
        EmailSignInStart(email,password,props.history,setCredentials);
        setCredentials({email:'',password:''})
    }

    const handleChange=event=>{
        const {value,name}=event.target;
        setCredentials({...credentials,[name]:value})
    }

    return(
        <div>
            <AlertMessage setAlertInfo={setSignInPageAlert} alertInfo={alertInfo}></AlertMessage>
            <div className='signin_form'>
                <div className='signin_message'>
                    LOGIN 
                    <div className='additional_message'>
                        Stream smoothly long videos with ease!
                    </div>
                </div>
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
        </div>
    )
}

const mapStateToProps=(state)=>({
    alertInfo:state.alert.signInPageInfo
})

const mapDispatchToProps = (dispatch)=>({
    EmailSignInStart : (email,password,history)=>dispatch(emailSignInStart({email,password,history}))
})

export default connect(mapStateToProps,mapDispatchToProps)(SignIn)
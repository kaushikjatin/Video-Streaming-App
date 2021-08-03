import React,{useState} from 'react';
import { connect } from 'react-redux';
import { emailSignUpStart } from '../../redux/user/user.actions';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './SignUp.Styles.scss'



const SignUp = ({emailSignUpStart,history})=>{
    const [credentials,setCredentials]=useState({email:'',password:'',firstName:'',lastName:''})
    const {email,password,firstName,lastName}=credentials;
    const handleSubmit= async event=>{
        event.preventDefault();
        emailSignUpStart({email,password,firstName,lastName,history})
    }

    const handleChange=event=>{
        const {value,name}=event.target;
        setCredentials({...credentials,[name]:value})
    }
  

    return(
        
    <div className='signup_form'>

        <div className='signup_message'>
                Register 
                <div className='additional_message'>
                    Join the community and stream videos smoothly!
                </div>
        </div>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="string" placeholder="First Name" name="firstName" onChange={handleChange} key='firstName'  value={firstName} required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="string" placeholder="Last Name" name="lastName" onChange={handleChange} key='lastName' value={lastName} required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Email" name="email" key='email' onChange={handleChange}  value={email} required/>
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password"  key='password' onChange={handleChange}  value={password} required/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>

    </div>
    )
}

const mapDispatchToProps=(dispatch)=>({
    emailSignUpStart:(payload)=>{dispatch(emailSignUpStart(payload))}
})

export default connect(null,mapDispatchToProps)(SignUp)
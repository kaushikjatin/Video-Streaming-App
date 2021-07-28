import React,{useState} from 'react';
import { connect } from 'react-redux';
import { emailSignUpStart } from '../../redux/user/user.actions';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './SignUp.Styles.scss'



const SignUp = ({emailSignUpStart})=>{
    const [credentials,setCredentials]=useState({email:'',password:'',firstName:'',lastName:''})
    const {email,password,firstName,lastName}=credentials;

    const handleSubmit= async event=>{
        event.preventDefault();
        emailSignUpStart({email,password,firstName,lastName})
    }

    const handleChange=event=>{
        const {value,name}=event.target;
        setCredentials({...credentials,[name]:value})
    }
  

    return(
        
    <div className='signup_form'>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="string" placeholder="First Name" name="firstName" onChange={handleChange}  value={firstName} required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="string" placeholder="Last Name" name="lastName" onChange={handleChange}  value={lastName} required/>
            </Form.Group>

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

const mapDispatchToProps=(dispatch)=>({
    emailSignUpStart:(payload)=>{dispatch(emailSignUpStart(payload))}
})

export default connect(null,mapDispatchToProps)(SignUp)
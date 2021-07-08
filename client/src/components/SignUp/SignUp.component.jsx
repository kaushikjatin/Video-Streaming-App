import React,{useState} from 'react';
import { connect } from 'react-redux';
import FormInput from '../FormInput/FormInput.component'
import CustomButton from '../CustomButton/CustomButton.component';
import { emailSignUpStart } from '../../redux/user/user.actions';


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
        <div>
            <form onSubmit={handleSubmit}>
                    <FormInput
                        name='firstName'
                        type='string'
                        handleChange={handleChange}
                        value={firstName}
                        label='firstName'
                        required
                    />
                     <FormInput
                        name='lastName'
                        type='string'
                        handleChange={handleChange}
                        value={lastName}
                        label='lastName'
                        required
                    />
                    <FormInput
                        name='email'
                        type='email'
                        handleChange={handleChange}
                        value={email}
                        label='email'
                        required
                    />
                    <FormInput
                        name='password'
                        type='password'
                        value={password}
                        handleChange={handleChange}
                        label='password'
                        required
                    />
                    <div className='buttons'>
                    <CustomButton type='submit' value='Submit Form'>Sign Up</CustomButton>
                    </div>
                </form>
        </div>
    )
}

const mapDispatchToProps=(dispatch)=>({
    emailSignUpStart:(payload)=>{dispatch(emailSignUpStart(payload))}
})

export default connect(null,mapDispatchToProps)(SignUp)
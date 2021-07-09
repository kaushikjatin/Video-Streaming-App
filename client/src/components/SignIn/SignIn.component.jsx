import React,{useState} from 'react';
import { connect } from 'react-redux';
import FormInput from '../FormInput/FormInput.component'
import CustomButton from '../CustomButton/CustomButton.component';
import {emailSignInStart} from '../../redux/user/user.actions'

const SignIn = (props)=>{
    const [credentials,setCredentials]=useState({email:'',password:''})
    const {EmailSignInStart}=props;
    const {email,password}=credentials;


    const handleSubmit= async event=>{
        event.preventDefault();
        console.log("We will make a store,redux-saga, and then do the authentication process")
        EmailSignInStart(email,password);
    }

    const handleChange=event=>{
        const {value,name}=event.target;
        setCredentials({...credentials,[name]:value})
    }

    const handleClick=()=>{
        props.history.push('/upload_video');
    }
  

    return(
        <div>
            <form onSubmit={handleSubmit}>
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
                    <CustomButton type='submit' value='Submit Form'>Sign In</CustomButton>
                    </div>
                </form>

                <button onClick={handleClick}>GO TO UPLOAD</button>
        </div>
    )
}

const mapDispatchToProps = (dispatch)=>({
    EmailSignInStart : (email,password)=>dispatch(emailSignInStart({email,password}))
})

export default connect(null,mapDispatchToProps)(SignIn)
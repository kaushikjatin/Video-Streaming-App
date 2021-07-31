import { connect } from "react-redux";
import {useEffect,useState} from 'react';
import './home.styles.scss'

const Home=({user,history})=>{

    const [message,setMessage]=useState("SignIn First")
    
    useEffect(()=>{
        if(user.currentUser==null)
            {history.push('/signin');}
        else{
            const hours_diff=Math.abs(new Date().getTime() - new Date(user.token_issue_time).getTime())/(1000 * 60 * 60);
            if(hours_diff>1){
                history.push('/signin');
            }
            else{
                setMessage("Welcome " + user.currentUser)
            }
        }
    },[user,history])


    return(
        <div className='home_message'>
            {message}
        </div>
    )
}

const mapStateToProps=(state)=>({
    user:state.user
})

export default connect(mapStateToProps,null)(Home)
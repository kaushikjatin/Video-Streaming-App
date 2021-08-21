import Alert from 'react-bootstrap/Alert';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import {useState} from 'react-redux';

const AlertMessage=({setAlertInfo,alertInfo,ActionFunction,type='danger'})=>{

    useEffect(()=>{
        if(alertInfo.state){
            const timer = setTimeout(() => {
                ActionFunction(setAlertInfo);
              }, 3000);
              return () => clearTimeout(timer);
        }
    },[alertInfo,setAlertInfo,ActionFunction])

    if(alertInfo.state){
        return(
            <Alert variant={type} onClose={()=>{ActionFunction(setAlertInfo)}} dismissible>
                <p>{alertInfo.message}</p>
          </Alert>
        )
    }
    else{
        return(
            <span></span>
        )
    }
        
}

const mapDispatchToProps=(dispatch)=>({
    ActionFunction:(setAlertInfo)=>{dispatch(setAlertInfo({state:false,message:''}))}
})

export default connect(null,mapDispatchToProps)(AlertMessage);

import './home.styles.scss';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux';
import {emailSignInStart} from '../../redux/user/user.actions';
import AlertMessage from '../Alert/Alert.component';
import {setSignInPageAlert} from '../../redux/Alerts/Alert.Actions'

const Home=(props)=>{    
    const {EmailSignInStart,alertInfo}=props;

    const handleClick= async event=>{
        event.preventDefault();
        EmailSignInStart('dummy000@gmail.com','dummy000@',props.history);
    }
    
    return(
        <div>
            <AlertMessage setAlertInfo={setSignInPageAlert} alertInfo={alertInfo} type={'success'}></AlertMessage>
            <div className='homepage_container'>
                <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Dummy Email and Password</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Email --- dummy000@gmail.com </p>
                    <p>Password --- dummy@000</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={handleClick}>Click to Use Dummy Email and Password!</Button>
                </Modal.Footer>
                </Modal.Dialog>

                <ListGroup as="ul" className='homepage_listgroup'>
                    <ListGroup.Item as="li" active className='list_heading'>
                        Optimisations we have done!
                    </ListGroup.Item>
                    <ListGroup.Item as="li">Done Horizontal Scaling by using the piping concept while uploading the videos.</ListGroup.Item>
                    <ListGroup.Item as="li">Enhancing the user experience by proving the buffer functionality while watching video without downloading it completely.</ListGroup.Item>
                    <ListGroup.Item as="li">Bought down server RAM usage by a lot using the buffer and stream functionality.</ListGroup.Item>
                </ListGroup>

                <ListGroup as="ul" className='homepage_listgroup'>
                    <ListGroup.Item as="li" active className='list_heading'>
                        Features We Provide
                    </ListGroup.Item>
                    <ListGroup.Item as="li">Streaming free Videos with ease(without any login)</ListGroup.Item>
                    <ListGroup.Item as="li">Uploading your personalized videos(upto 20MB due to storage limitations.)</ListGroup.Item>
                    <ListGroup.Item as="li">Registeration a free account through email and password</ListGroup.Item>
                </ListGroup>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch)=>({
    EmailSignInStart : (email,password,history)=>dispatch(emailSignInStart({email,password,history}))
})

const mapStateToProps=(state)=>({
    alertInfo:state.alert.signInPageInfo
})


export default connect(mapStateToProps,mapDispatchToProps)(Home)
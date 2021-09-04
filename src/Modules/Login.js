import React from 'react';
import loginimg from '../Assets/login-img.png'
import { useHistory } from "react-router-dom";
// import Alert from './Components/Alert'
import Signup from './Signup';
import {toaster, toastError, toastSuccess} from '../Components/Toast';
import { authenticate } from '../Services/UserServices';
import { ManageLocalStorage } from '../Utils/ManageLocalStorage';
import { GlobalDispatchContext } from '../ContextStore/ContextAPI';
function Login(props) {

const [isSignUp,setIsSignup]= React.useState(false)
const Email = React.useRef('')
const Pswd = React.useRef('')
const history = useHistory()
const dispatch = React.useContext(GlobalDispatchContext)
const getFname=name=> 'Hello '+name.split(' ')[0]
const handleSubmit=(e)=>{
  const payload={email:Email.current.value,password:Pswd.current.value}
e.preventDefault()
const id = toaster.loading("Loggin in...")
authenticate(payload)
.then(res=>{console.log(res);
  toastSuccess(id,getFname(res.name) + '👌')
  dispatch({type:'login',payload:res})
  ManageLocalStorage.set('userDetails',res)
  history.push('./dashboard')
}).catch(e=>toastError(id,e.response.data + '🤯'))

}


  return (
    <>
    {/* <Toast/> */}
    <div className="login">
    <div className="row">
      <div className="col">
      {isSignUp? <Signup setIsSignup={setIsSignup}/>:

        <form className="form-signin" onSubmit={handleSubmit}>
          <img className="mb-4" src={loginimg} alt="login" width="72" height="72"/>
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label htmlFor="email" className="sr-only">Email address</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Email address"
            required
            autoComplete="email"
            ref={Email}
          />
          <label htmlFor="password" className="sr-only">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Password"
            required
            autoComplete="current-password"
            ref={Pswd}
          />

          <button className="btn btn-lg btn-primary btn-block" type="submit" >
            {/* <i className="fa fa-spinner fa-spin mr-1" v-if="showLoader"></i> */}
             Log In
          </button>
        </form>
}
        <p className="mt-3 text-muted">

          {isSignUp?'Already a member':'New to platform?' }
            <span className='link' onClick={()=>setIsSignup(state=>!state)}> {isSignUp?'Sign in':'Create an Account' } </span>

        </p>
      </div>
    </div>
  </div>
      {/* {show &&<Alert content={content.current} show={show} variant={variant.current} closeAlert={closeAlert}/> } */}

    </>
  );
}


export default Login;

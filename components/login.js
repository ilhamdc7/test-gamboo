import React, {useState, useEffect} from 'react'
import styles from './login.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { login, authUser } from '../store/userSlice'
import getUserToken from '../services/getUserToken'
import jwt_decode from "jwt-decode";
import { useRouter } from 'next/router'
import thunk from 'redux-thunk'


const Login = () => {

    const user = useSelector(authUser)
    const router = useRouter()

    useEffect(() => {
        if(user?.token){
            router.push('/dashboard')
        }
    },[])


    const [loginForm, setLoginForm] = useState(getEmptyLoginForm())


    const dispatch = useDispatch()

    function getEmptyLoginForm(){
        return {
            username: '',
            password: ''
        }
    }




    const handleLogin = async(e) => {
        e.preventDefault()

        getUserToken(loginForm).then(res => {
            const {data, status} = res
            const user = jwt_decode(data.access)
            if (status >= 200, status <= 300){
                sessionStorage.setItem('userData', JSON.stringify(user))
                thunk(dispatch(login(
                    {
                        token: data.access,
                        userData: JSON.parse(sessionStorage.getItem('userData'))
                    }
                   
                )))
                router.push('/dashboard')
            }
        })

        

    }


  return (
    <>
     <div className={styles.container}>
         <div className={styles.loginContainer}>
            <form>
                <label htmlFor='username' style={{width: '100%'}}>Username</label><br/>
                <input onChange={(e) => setLoginForm({...loginForm, username: e.target.value})} value={loginForm.username} type={'text'} placeholder='username' id='username'/><br/>
                <label style={{marginTop: '10px'}} htmlFor='password'>Password</label><br/>
                <input onChange={(e) => setLoginForm({...loginForm, password: e.target.value})} value={loginForm.password} type={'password'} placeholder='password' id='password'/><br/>
                <button onClick={(e) => handleLogin(e)} className={styles.loginBtn} type='submit'>Login</button><br/>
            </form>
         </div>
        
     </div>
    </>
  )
}

export default Login
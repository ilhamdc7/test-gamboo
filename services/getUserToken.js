import axios from "axios";


export default async function getUserToken(loginForm){
    return await axios.post(`https://tap.efgroup.az/api/auth/token/`, {
        username: loginForm.username,
        password: loginForm.password
    })
}
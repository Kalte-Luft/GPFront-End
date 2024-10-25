//file location: src/services/userService.js
import axios from '../axios';
const handleLoginApi =(userEmail, userPassword) =>{
    return axios.post('/api/login',
        {email : userEmail ,password: userPassword}
    );

}
export {
    handleLoginApi
}
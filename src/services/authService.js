import http, { setJwt } from "./httpService";
import jwtDecode from 'jwt-decode';

const tokenKey = "token";
const apiEndPoint = '/auth';

setJwt(getJwt());

export async function logIn(email, password) {
    const { data: jwt } = await http.post(apiEndPoint, {email, password});
    localStorage.setItem(tokenKey, jwt);
}

export function logout () {
    localStorage.removeItem(tokenKey);
}

export function loginWithJwt (jwt) {
    localStorage.setItem(tokenKey, jwt);
}


export function getCurrentUser(){
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
    }
    catch(ex){ return null }
}

export function getJwt() {
    return localStorage.getItem("token");
}


export default { getJwt, logIn, logout, getCurrentUser, loginWithJwt };
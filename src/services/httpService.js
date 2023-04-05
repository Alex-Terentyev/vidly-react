import axios from "axios";
import { toast } from "react-toastify";
import logService from "./logService";

const http = axios.create({
  baseURL: 'http://localhost:3900/api',

});

export function setJwt(jwt) {
  http.defaults.headers.common['x-auth-token'] = jwt;
}

//interceptor is called first, before the trycatch block
//it will handle unexpected errors or will pass expected errors
//to corresponding functions


axios.interceptors.response.use(null, error => {
  const expectedError = 
  error.response 
  && error.response.status >= 400 
  && error.response.status < 500;
  
  if (!expectedError){
    logService.log(error);
    toast.error('Unexpected error occured. PLease try again later');
  }
  
  return Promise.reject(error);
});


// export default {
//     get: axios.get,
//     post: axios.post,
//     put: axios.put,
//     patch: axios.patch,
//     delete: axios.delete
// }

export default http;
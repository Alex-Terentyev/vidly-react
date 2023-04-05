import http from './httpService';

const endPoint = '/users';

export function register(user) {
    return http.post(endPoint, user);
}
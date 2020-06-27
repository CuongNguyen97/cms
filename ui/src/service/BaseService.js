import axios from 'axios';

export class BaseService {
    get = (url, params) => {
        return axios.get(url, {
            params: params,
        }).then(result => result.data);
    }

    post = (url, data) => {
        return axios.post(url, data).then(result => result.data);
    }

    put = (url, data) => {
        return axios.put(url, data).then(result => result.data);
    }

    delete = (url, params) => {
        return axios.delete(url, {
            params: params
        }).then(result => result.data);
    }
}
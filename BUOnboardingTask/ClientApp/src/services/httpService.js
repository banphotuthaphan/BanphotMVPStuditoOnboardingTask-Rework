import axios from 'axios';
import { toast } from 'react-toastify';

axios.interceptors.response.use(null, error => {

    const expectedError = error.response && error.response.status >= 400 && error.response < 500

    if (!expectedError) {
        //here is where to connect to log service to log the error
        //console.log('Logging the error', ex);

        toast.error('an unexpected error occurred');
    }
    return Promise.reject(error);

});

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};

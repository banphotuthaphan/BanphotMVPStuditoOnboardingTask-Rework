import http from './httpService';
import { apiEndpoint } from '../config.json'

const storeUrl = apiEndpoint + '/Stores'

export function getStores() {
    return http.get(storeUrl);
}

export function saveStore(store) {
    if (store.id) {
        return http.put(storeUrl + '/' + store.id, store);
    }
    return http.post(storeUrl, store);

}

export function deleteStore(storeId) {
    return http.delete(storeUrl + '/' + storeId);
}

import http from './httpService';
import { apiEndpoint } from '../config.json'

const salesUrl = apiEndpoint + '/Sales'

export function getSales() {
    return http.get(salesUrl);
}

export function saveSale(sales) {
    if (sales.id) {
        return http.put(salesUrl + '/' + sales.id, sales);
    }
    return http.post(salesUrl, sales);

}

export function deleteSale(salesId) {
    return http.delete(salesUrl + '/' + salesId);
}

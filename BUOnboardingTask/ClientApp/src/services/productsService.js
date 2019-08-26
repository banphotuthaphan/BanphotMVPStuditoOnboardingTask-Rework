import http from './httpService';
import { apiEndpoint } from '../config.json'

const productUrl = apiEndpoint + '/Products'

export function getProducts() {
    return http.get(productUrl);
}

export function saveProduct(product) {
    if (product.id) {
        return http.put(productUrl + '/' + product.id, product);
    }
    return http.post(productUrl, product);

}

export function deleteProduct(productId) {
    return http.delete(productUrl + '/' + productId);
}

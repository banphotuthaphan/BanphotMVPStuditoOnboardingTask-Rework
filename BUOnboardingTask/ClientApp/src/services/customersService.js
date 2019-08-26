import http from './httpService';
import { apiEndpoint } from '../config.json'

const customerUrl= apiEndpoint + '/Customers'

export function getCustomers() {
    return http.get(customerUrl);
}

export function saveCustomer(customer) {
    if (customer.id) {
        return http.put(customerUrl + '/' + customer.id, customer);
    }
    return http.post(customerUrl, customer);

}

export function deleteCustomer(customerId) {
    return http.delete(customerUrl + '/' + customerId);
}

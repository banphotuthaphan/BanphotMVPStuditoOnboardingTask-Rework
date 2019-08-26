import React from 'react';
import { Form } from 'semantic-ui-react';
import Select from './common/select';
import InputDate from './common/inputDate';
import './common/custom.scss';


const SaleForm = ({ dateSold, customers, products, stores, onChange, selectedCustomer, selectedProduct, selectedStore, errors }) => {

    return (
        <Form size='small'>
            <Form.Group widths='equal'>
                <InputDate
                    dateFormat='MM/DD/YYYY '
                    value={dateSold}
                    placeholder='Date'
                    iconPosition='left'
                    label='Date Sold'
                    name='dateSold'
                    onChange={onChange}
                    errors={errors.dateSold}
                    id='form-subcomponent-shorthand-input-dateSold' />
            </Form.Group>
            <Form.Group widths='equal'>
                <Select
                    defaultValue={selectedCustomer}
                    label='Customer'
                    name='customerName'
                    onChange={onChange}
                    errors={errors.customerName}
                    id='form-subcomponent-shorthand-select-customers'
                    options={customers} />
            </Form.Group>
            <Form.Group widths='equal'>
                <Select
                    defaultValue={selectedProduct}
                    label='Product'
                    name='productName'
                    onChange={onChange}
                    errors={errors.productName}
                    id='form-subcomponent-shorthand-select-products'
                    options={products} />
            </Form.Group>
            <Form.Group widths='equal'>
                <Select
                    defaultValue={selectedStore}
                    label='Store'
                    name='storeName'
                    onChange={onChange}
                    errors={errors.storeName}
                    id='form-subcomponent-shorthand-select-stores'
                    options={stores} />
            </Form.Group>
        </Form>
    );
}; 
export default SaleForm;


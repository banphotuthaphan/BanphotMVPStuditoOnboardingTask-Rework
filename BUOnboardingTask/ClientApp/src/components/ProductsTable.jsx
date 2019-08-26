import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import DataTable from './common/table';
import 'semantic-ui-css/semantic.min.css';

class ProductsTable extends Component {

    columns = [
        { label: 'Name', path: 'name' },
        { label: 'Price', path: 'price' },
        {
            label: 'Action',
            key: 'edit',
            content: product => (< Button
                color='yellow'
                onClick={() => { this.props.onEdit(product, 'Edit') }}>
                <Icon
                    name='edit outline' />Edit</Button>)
        },
        {
            label: 'Action',
            key: 'delete',
            content: product => (< Button
                color='red' onClick={() => this.props.onDelete(product, 'Delete')}>
                <Icon
                    name='trash alternate outline' />Delete</Button>)
        }
    ];

    render() {

        const { products, onDelete, onEdit } = this.props;

        return (
            <DataTable
                columns={this.columns}
                data={products}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        );
    }
}

export default ProductsTable;
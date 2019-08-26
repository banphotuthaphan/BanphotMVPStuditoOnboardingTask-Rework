import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import DataTable from './common/table';
import 'semantic-ui-css/semantic.min.css';

class SalesTable extends Component {

    columns = [
        { label: 'Customer', path: 'customer.name' },
        { label: 'Product', path: 'product.name' },
        { label: 'Store', path: 'store.name' },
        { label: 'Date Sole', path: 'dateSold' },
        {
            label: 'Action',
            key: 'edit',
            content: sale => (< Button
                color='yellow'
                onClick={() => { this.props.onEdit(sale, 'Edit') }}>
                <Icon
                    name='edit outline' />Edit</Button>)
        },
        {
            label: 'Action',
            key: 'delete',
            content: sale => (< Button
                color='red'
                onClick={() => this.props.onDelete(sale, 'Delete')}>
                <Icon
                    name='trash alternate outline' />Delete</Button>)
        }
    ];

    render() {

        const { sales, onDelete, onEdit } = this.props;

        return (
            <DataTable
                columns={this.columns}
                data={sales}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        );
    }
}

export default SalesTable;
import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import DataTable from './common/table';
import 'semantic-ui-css/semantic.min.css';

class CustomersTable extends Component {

    columns = [
        { label: 'Name', path: 'name' },
        { label: 'Address', path: 'address' },
        {
            label: 'Action',
            key: 'edit',
            content: customer => (< Button
                color='yellow'
                onClick={() => { this.props.onEdit(customer, 'Edit') }}>
                <Icon
                    name='edit outline' />Edit</Button>)
        },
        {
            label: 'Action',
            key: 'delete',
            content: customer => (< Button
                color='red'
                onClick={() => this.props.onDelete(customer, 'Delete')}>
                <Icon
                    name='trash alternate outline' /> Delete</Button>)
        }
    ];

    render() {

        const { customers, onDelete, onEdit } = this.props;

        return (
            <DataTable
                columns={this.columns}
                data={customers}
                onEdit={onEdit}

                onDelete={onDelete}
            />
        );
    }
}

export default CustomersTable;
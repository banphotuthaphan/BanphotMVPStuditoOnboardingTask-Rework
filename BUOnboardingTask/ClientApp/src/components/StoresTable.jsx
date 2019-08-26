import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import DataTable from './common/table';
import 'semantic-ui-css/semantic.min.css';

class StoresTable extends Component {

    columns = [
        { label: 'Name', path: 'name' },
        { label: 'Address', path: 'address' },
        {
            label: 'Action',
            key: 'edit',
            content: store => (< Button
                color='yellow'
                onClick={() => { this.props.onEdit(store, 'Edit') }}>
                <Icon
                    name='edit outline' />Edit</Button>)
        },
        {
            label: 'Action',
            key: 'delete',
            content: store => (< Button
                color='red'
                onClick={() => this.props.onDelete(store, 'Delete')}>
                <Icon
                    name='trash alternate outline' />Delete</Button>)
        }
    ];

    render() {

        const { stores, onDelete, onEdit } = this.props;

        return (
            <DataTable
                columns={this.columns}
                data={stores}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        );
    }
}

export default StoresTable;
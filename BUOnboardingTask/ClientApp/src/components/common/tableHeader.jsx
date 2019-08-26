import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class HeaderTable extends Component {

    render() {
        return (
            <Table.Header>
                <Table.Row>
                    {
                        this.props.columns.map(column => (
                            <Table.HeaderCell
                                key={column.path || column.key}>
                                {column.label}
                            </Table.HeaderCell>
                        ))}
                </Table.Row>
            </Table.Header>
        );
    }
}

export default HeaderTable;
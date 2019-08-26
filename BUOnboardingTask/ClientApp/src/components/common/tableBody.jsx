import React, { Component } from 'react';
import _ from 'lodash';
import dateFormat from 'dateformat';
import { Table } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class HeaderBody extends Component {
    renderCell = (item, column) => {
        if (column.content) return column.content(item);

        let value;

        if (column.path === 'dateSold') {
            value = _.get(item, column.path);
            value = dateFormat(value, 'd mmm, yyyy');
            }
        else {
            value = _.get(item, column.path);
        }
        console.log(value);
        return value;
    };

    createKey = (item, column) => {
        return item._id + (column.path || column.key);
    }

    render() {

        const { data, columns } = this.props;

        return (
            <Table.Body>
                {data.map(item => (
                    <Table.Row key={item._id}>
                        {
                            columns.map(column => (
                                <Table.Cell key={this.createKey(item, column)}>
                                    {this.renderCell(item, column)}
                                </Table.Cell>
                            ))}
                    </Table.Row>
                ))}
            </Table.Body>
        );
    }
}

export default HeaderBody;
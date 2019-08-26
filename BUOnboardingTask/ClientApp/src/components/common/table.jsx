import React from 'react';
import { Table } from 'semantic-ui-react';
import HeaderTable from './tableHeader';
import BodyTable from './tableBody';
import 'semantic-ui-css/semantic.min.css';

const DataTable = ({ columns, data }) => {
    return (
        <Table celled>
            <HeaderTable columns={columns} />
            <BodyTable columns={columns} data={data} />
        </Table>
    );
};

export default DataTable;
import React  from 'react';
import Joi from 'joi-browser';
import { Button } from 'semantic-ui-react';
import { ToastContainer, toast } from 'react-toastify';
import { getCustomers, saveCustomer, deleteCustomer } from '.././services/customersService';
import CustomersTable from './CustomersTable';
import ModalCustomerForm from './CustomerModalForm';
import  Validate  from './common/validation';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';

class Customers extends Validate {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            loading: true,
            data: {id: '', name: '', address: '' },
            errors: {},
            //for <Modal>
            confirmDialog: false,
            modalHeader: '',
            secondButtonLabel: '',
            closeOnDimmerClick: true,
            //to identify action
            action: '',
            //for 'Edit', 'Create' button
            disabled: ''
        };
    }

    schema = {
        id: Joi.number().allow(''),
        name: Joi.string().required().label('Name'),
        address: Joi.string().required().label('Address')
    }

    async componentDidMount() {
        const { data: customers } = await getCustomers();
        this.setState({ customers });

    }

    handleEdit = async customer => {  
        const customers = [...this.state.customers];
        const index = customers.findIndex(c => c.id === customer.id);
        customers[index] = { ...customer };
        this.setState({ customers });

        await saveCustomer(customer);
    }

    handleCreate = async customer => {
        const obj = { name: customer.name, address: customer.address };
        const { data: newCustomer } =   await saveCustomer(obj);

        const customers = [newCustomer, ...this.state.customers];
        this.setState({ customers });
    }

    handleDelete = async id => {
        const originalCustomers = this.state.customers;

        const customers = this.state.customers.filter(c => c.id !== id);
        this.setState({ customers });

        try {
            await deleteCustomer(id);
        }
        catch (ex) {
            if (ex.response && ex.response.status === 404)
                toast('This customer has already been deleted');
            this.setState({ customers: originalCustomers });
        }
    }

    //Section about switching various forms to modal
    handleCloseConfigShow = (customer, key) => {

        if (key === 'Delete') {
            this.setState({
                open: true,
                action: key,
                confirmDialog: true,
                data: { id: customer.id },
                modalHeader: 'Delete customer'
            })
        }
        if (key === 'Edit') {
            this.setState({
                open: true,
                action: key,
                data: {
                    id: customer.id,
                    name: customer.name,
                    address: customer.address
                },
                modalHeader: 'Edit customer'
            });
        }
    }

    handleCreateCustomer = () => {
        this.setState({ open: true, disabled: 'disabled' });
    }

    handleModalCloseWithoutChange = () => {

        this.setState({
            open: false,
            modalHeader: '',
            secondButtonLabel: '',
            data: {
                id: '',
                name: '', address: ''
            },
            confirmDialog: false,
            action: '',
            errors: {},
            disabled: ''
        });
    }

    handleModalCloseWithChange = () => {
        if (this.state.action === 'Delete') {

        }
        else {
            const errors = this.validate();
            this.setState({ errors: errors || {} });
            if (errors) return;

        }
        const { data } = this.state;
        if (data.name && data.address) {
            let customerToSubmit = { name: data.name, address: data.address };
            if (data.id) {
                customerToSubmit.id = data.id;
                this.handleEdit(customerToSubmit);
            }
            else {
                this.handleCreate(customerToSubmit);
            };
        }
        else {
            if (data.id) {
                this.handleDelete(data.id);
            }
        }
        this.setState({
            open: false,
            modalHeader: '',
            secondButtonLabel: '',
            data: {
                id: '',
                name: '', address: ''
            },
            confirmDialog: false,
            action: '',
            errors: {},
            disabled: ''
        });
    }

    render() {
        const { open,
            closeOnDimmerClick,
            data,
            customers,
            confirmDialog,
            modalHeader,
            errors,
            action,
            disabled } = this.state;

        return (
            <div>
                < ToastContainer />
                <Button
                    color='blue'
                    onClick={() => { this.handleCreateCustomer(); this.setState({ modalHeader: 'Create new customer' }) }}>New Customer</Button>
                <CustomersTable
                    customers={customers}
                    onEdit={this.handleCloseConfigShow}
                    onDelete={this.handleCloseConfigShow}
                />
                <ModalCustomerForm
                    open={open}
                    action={action}
                    disabled={disabled}
                    closeOnDimmerClick={closeOnDimmerClick}
                    modalHeader={modalHeader}
                    confirmDialog={confirmDialog}
                    onChange={this.handleChange}
                    handleModalCloseWithChange={this.handleModalCloseWithChange}
                    handleModalCloseWithoutChange={this.handleModalCloseWithoutChange}
                    data={data}
                    errors={errors}
                />
            </div>
        );
    }
}

export default Customers;

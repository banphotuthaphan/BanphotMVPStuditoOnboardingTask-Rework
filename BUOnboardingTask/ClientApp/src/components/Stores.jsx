import React, { Component } from 'react';
import Joi from 'joi-browser';
import { Button } from 'semantic-ui-react';
import { ToastContainer, toast } from 'react-toastify';
import { getStores, saveStore, deleteStore } from '.././services/storesService';
import StoresTable from './StoresTable';
import ModalStoreForm from './StoreModalForm';
import Validate  from './common/validation';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';

class Stores extends Validate{
    constructor(props) {
        super(props);
        this.state = {
            stores: [],
            loading: true,
            data: { id: '', name: '', address: '' },
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

    //Section about conntect to services
    async componentDidMount() {
        const { data: stores } = await getStores();
        this.setState({ stores });
    }

    handleEdit = async store => {
        const stores = [...this.state.stores];
        const index = stores.findIndex(s => s.id === store.id);
        stores[index] = { ...store };
        this.setState({ stores });

        await saveStore(store);
    }

    handleCreate = async store => {
        const obj = { name: store.name, address: store.address };
        const { data: newStore } =   await saveStore(obj);

        const stores = [newStore, ...this.state.stores];
        this.setState({ stores });
    }

    handleDelete = async id => {
        const originalStores = this.state.stores;

        const stores = this.state.stores.filter(c => c.id !== id);
        this.setState({ stores });

        try {
            await deleteStore(id);
        }
        catch (ex) {
            if (ex.response && ex.response.status === 404)
                toast('This customer has already been deleted');
            this.setState({ customers: originalStores });
        }
    }

    //Section about switching various forms to modal
    handleCloseConfigShow = (store, key) => {

        if (key === 'Delete') {
            this.setState({
                open: true,
                action: key,
                confirmDialog: true,
                data: { id: store.id },
                modalHeader: 'Delete store'
            })
        }
        if (key === 'Edit') {
            this.setState({
                open: true,
                action: key,
                data: {
                    id: store.id,
                    name: store.name,
                    address: store.address
                },
                modalHeader: 'Edit store'
            });
        }
    }

    handleCreateStore = () => {
        this.setState({ open: true, disabled: 'disabled'  });
    }

    handleModalCloseWithoutChange = () => {
        this.setState({
            open: false,
            modalHeader: '',
            secondButtonLabel: '',
            data: {
                id: '',
                name: '',
                address: ''
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
            let storeToSubmit = { name: data.name, address: data.address };
            if (data.id) {
                storeToSubmit.id = data.id;
                this.handleEdit(storeToSubmit);
            }
            else {
                this.handleCreate(storeToSubmit);
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
                name: '',
                address: ''
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
            stores,
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
                    onClick={() => { this.handleCreateStore(); this.setState({ modalHeader: 'Create new store' }) }}>New Store</Button>
                <StoresTable
                    stores={stores}
                    onEdit={this.handleCloseConfigShow}
                    onDelete={this.handleCloseConfigShow}
                />
                <ModalStoreForm
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

export default Stores;

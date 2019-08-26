import React, { Component } from 'react';
import Joi from 'joi-browser';
import { Button } from 'semantic-ui-react';
import { ToastContainer, toast } from 'react-toastify';
import { getProducts, saveProduct, deleteProduct } from '.././services/productsService';
import ProductsTable from './ProductsTable';
import ModalProductForm from './ProductModalForm';
import Validate from './common/validation';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';

class Products extends Validate {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            loading: true,
            data: { id: '', name: '', price: '' },
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
        price: Joi.number().required().label('Price')
    }

    //Section about conntect to services
    async componentDidMount() {
        const { data: products } = await getProducts();
        this.setState({ products });

    }

    handleEdit = async product => {
        const products = [...this.state.products];
        const index = products.findIndex(p => p.id === product.id);
        products[index] = { ...product };
        this.setState({ products });

        await saveProduct(product);
    }

    handleCreate = async product => {
        const obj = { name: product.name, price: product.price };
        const { data: newProduct } = await saveProduct(obj);

        const products = [newProduct, ...this.state.products];
        this.setState({ products });
    }

    handleDelete = async id => {
        const originalProducts = this.state.products;

        const products = this.state.products.filter(c => c.id !== id);
        this.setState({ products });

        try {
            await deleteProduct(id);
        }
        catch (ex) {
            if (ex.response && ex.response.status === 404)
                toast('This customer has already been deleted');
            this.setState({ customers: originalProducts });
        }
    }
    //Section about switching various forms to modal
    handleCloseConfigShow = (product, key) => {

        if (key === 'Delete') {
            this.setState({
                open: true,
                action: key,
                confirmDialog: true,
                data: { id: product.id },
                modalHeader: 'Delete product'
            })
        }
        if (key === 'Edit') {
            this.setState({
                open: true,
                action: key,
                data: {
                    id: product.id,
                    name: product.name, price: product.price
                },
                modalHeader: 'Edit product'
            });
        }
    }

    handleCreateProduct = () => {
        this.setState({ open: true, disabled: 'disabled' });
    }

    handleModalCloseWithoutChange = () => {
        this.setState({
            open: false,
            modalHeader: '',
            secondButtonLabel: '',
            data: { id: '', name: '', price: '' },
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
        if (data.name && data.price) {
            let productToSubmit = { name: data.name, price: data.price };
            if (data.id) {
                productToSubmit.id = data.id;
                this.handleEdit(productToSubmit);
            }
            else {
                this.handleCreate(productToSubmit);
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
                price: ''
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
        products,
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
                onClick={() => { this.handleCreateProduct(); this.setState({ modalHeader: 'Create new product' }) }}>New Product</Button>
            <ProductsTable
                products={products}
                onEdit={this.handleCloseConfigShow}
                onDelete={this.handleCloseConfigShow}
            />
            <ModalProductForm
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

export default Products;
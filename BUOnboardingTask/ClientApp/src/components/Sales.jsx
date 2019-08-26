import React, { Component } from 'react';
import Joi from 'joi-browser';
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import { getSales, saveSale, deleteSale } from '.././services/salesService';
import { getCustomers } from '.././services/customersService';
import { getProducts } from '.././services/productsService';
import { getStores } from '.././services/storesService';
import { Button } from 'semantic-ui-react';
import SalesTable from './SalesTable';
import ModalSalesForm from './SalesModalForm';
import Validate from './common/validation';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';


class Sales extends Validate {
    constructor(props) {
        super(props);
        this.state = {
            sales: [],
            customers: [],
            products: [],
            stores: [],
            customersFromDb: [],
            productsFromDb: [],
            storesFromDb: [],
            loading: true,
            //temporary capture value on text box
            data: {
                id: '',
                customerName: '',
                productName: '',
                storeName: '',
                dateSold: ''
            },
            errors: {},
            //for <Modal>
            confirmDialog: false,
            modalHeader: '',
            closeOnDimmerClick: true,
            //to identify action
            action: '',
            //for 'Edit', 'Create' button
            disabled: ''
        };
    }

    schema = {
        id: Joi.number().allow(''),
        customerName: Joi.string().required().label('Customer'),
        productName: Joi.string().required().label('Product'),
        storeName: Joi.string().required().label('Store'),
        dateSold: Joi.string().required().label('Date')
    }

    //Section about conntect to services
    async componentDidMount() {
        const { data: sales } = await getSales();
        this.setState({ sales });

        const { data: customersInDb } = await getCustomers();
        let customers = customersInDb.map(c => { return { value: c.name, text: c.name, id: c.id } })
        this.setState({ customers: customers, customersFromDb: customersInDb });

        const { data: productsInDb } = await getProducts();
        let products = productsInDb.map(p => { return { value: p.name, text: p.name, id: p.id } })
        this.setState({ products: products, productsFromDb: productsInDb });

        const { data: storesInDb } = await getStores();
        let stores = storesInDb.map(s => { return { value: s.name, text: s.name, id: s.id } })
        this.setState({ stores: stores, storesFromDb: storesInDb });
    }

    handleEdit = async sale => {

        await saveSale(sale);

        const sales = [...this.state.sales];

        const copySale = sale;

        //Ugly : must be better way to do this
        const { customersFromDb, productsFromDb, storesFromDb } = this.state;
        const customer = customersFromDb.find(c => c.id === copySale.customerId);
        const product = productsFromDb.find(p => p.id === copySale.productId);
        const store = storesFromDb.find(s => s.id === copySale.storeId);

        copySale.customer = customer;
        copySale.product = product;
        copySale.store = store;
        //end of ugly area

        const index = sales.findIndex(s => s.id === sale.id);
        sales[index] = { ...copySale };

        this.setState({ sales });
    }

    handleCreate = async sale => {
        const obj = {
            customerId: sale.customerId,
            productId: sale.productId,
            storeId: sale.storeId,
            dateSold: sale.dateSold
        };
        const {data: newSale } =  await saveSale(obj);

        //Ugly : must be better way to do this
        const { customersFromDb, productsFromDb, storesFromDb } = this.state;
        const customer = customersFromDb.find(c => c.id === sale.customerId);
        const product = productsFromDb.find(p => p.id === sale.productId);
        const store = storesFromDb.find(s => s.id === sale.storeId);

        obj.customer = customer;
        obj.product = product;
        obj.store = store;
        obj.id = newSale.id;
         //end of ugly area

        const sales = [obj, ...this.state.sales];
        this.setState({ sales });
    }

    handleDelete = async id => {
        const originalSales = this.state.sales;

        const sales = this.state.sales.filter(c => c.id !== id);
        this.setState({ sales });

        try {
            await deleteSale(id);
        }
        catch (ex) {
            if (ex.response && ex.response.status === 404)
                toast('This customer has already been deleted');
            this.setState({ sales: originalSales });
        }
    }

    //Section about switching various forms to modal
    handleCloseConfigShow = (sale, key) => {

        if (key === 'Delete') {
            this.setState({
                open: true,
                action: key,
                confirmDialog: true,
                data: { id: sale.id },
                modalHeader: 'Delete Sale'
            })
        }
        if (key === 'Edit') {
            this.setState({
                open: true,
                action: key,
                data: {
                    id: sale.id,
                    customerName: sale.customer.name,
                    productName: sale.product.name,
                    storeName: sale.store.name,
                    dateSold: sale.dateSold
                },
                modalHeader: 'Edit sale'
            });
        }
    }

    handleCreateSale = () => {
        this.setState({
            open: true,
            disabled: 'disabled'
        });
    }

    handleModalCloseWithoutChange = () => {
        this.setState({
            open: false,
            modalHeader: '',
            secondButtonLabel: '',
            data: {
                id: '',
                customerName: '',
                productName: '',
                storeName: '',
                dateSold: ''
            }, confirmDialog: false,
            action: '', errors: {},
            disabled: ''
        });
    }

    handleModalCloseWithChange = () => {
        if (this.state.action === 'Delete') {
            const { data } = this.state;
            if (data.id) {
                this.handleDelete(data.id);
                this.setState({
                    open: false,
                    modalHeader: '',
                    secondButtonLabel: '',
                    data: {
                        id: '',
                        customerName: '',
                        productName: '',
                        storeName: '',
                        dateSold: ''
                    }, confirmDialog: false,
                    action: '',
                    errors: {},
                    disabled: ''
                });
                return
            }
        }
        else {
            const errors = this.validate();
            this.setState({ errors: errors || {} });
            if (errors) return;
        }
        const { data, customers, products, stores } = this.state;
        const customer = customers.find(c => c.value === data.customerName);
        const product = products.find(p => p.value === data.productName);
        const store = stores.find(s => s.value === data.storeName);

        if (data) {
            let salesToSubmit = {
                productId: product.id,
                customerId: customer.id,
                storeId: store.id,
                dateSold: data.dateSold
            };
            if (data.id) {
                salesToSubmit.id = data.id;
                this.handleEdit(salesToSubmit);
            }
            else {
                this.handleCreate(salesToSubmit);
            }
        }
        this.setState({
            open: false,
            modalHeader: '',
            secondButtonLabel: '',
            data: {
                id: '',
                customerName: '',
                productName: '',
                storeName: '', dateSold: ''
            }, confirmDialog: false,
            action: '',
            errors: {},
            disabled: ''
        });
    }

    render() {
        const { open,
            closeOnDimmerClick,
            data,
            sales,
            customers,
            products,
            stores,
            errors,
            confirmDialog,
            modalHeader,
            action,
            disabled } = this.state;

        return (
            <div>
                < ToastContainer />
                <Button
                    color='blue'
                    onClick={() => {
                    this.handleCreateSale();
                    this.setState({ modalHeader: 'Create new sales' })
                }}>New Sale</Button>
                <SalesTable
                    sales={sales}
                    customers={customers}
                    products={products}
                    stores={stores}
                    onEdit={this.handleCloseConfigShow}
                    onDelete={this.handleCloseConfigShow}
                />
                <ModalSalesForm
                    open={open}
                    action={action}
                    disabled={disabled}
                    closeOnDimmerClick={closeOnDimmerClick}
                    modalHeader={modalHeader}
                    confirmDialog={confirmDialog}
                    onChange={this.handleChange}
                    handleModalCloseWithChange={this.handleModalCloseWithChange}
                    handleModalCloseWithoutChange={this.handleModalCloseWithoutChange}
                    customers={customers}
                    products={products}
                    stores={stores}
                    data={data}
                    errors={errors}
                />
            </div>
        );
    }
}

export default Sales;

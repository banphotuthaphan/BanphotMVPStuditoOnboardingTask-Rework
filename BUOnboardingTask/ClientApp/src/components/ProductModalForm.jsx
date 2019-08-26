import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import ProductForm from './ProductForm';
import ButtonCustom from './common/button';
import 'semantic-ui-css/semantic.min.css';

class ModalProductForm extends Component {

    render() {
        const { open,
            closeOnDimmerClick,
            modalHeader,
            confirmDialog,
            onChange,
            handleModalCloseWithoutChange,
            handleModalCloseWithChange,
            data,
            errors,
            action,
            disabled } = this.props;

        let secondBtnProps;

        action === 'Edit' ? secondBtnProps = { label: 'Edit', color: 'green', icon: 'checkmark', disabled: '' } :
            action === 'Delete' ? secondBtnProps = { label: 'Delete', color: 'red', icon: 'delete', disabled: '' } :
                secondBtnProps = { label: 'Create', color: 'green', icon: 'checkmark', disabled: disabled };

        return (
            <Modal style={{ height: 'fit-content', top: '25%', left: '50%' }}
                centered='true'
                size='small'
                open={open}
                closeOnDimmerClick={closeOnDimmerClick}
                onClose={this.close}
            >
                <Modal.Header>{modalHeader}</Modal.Header>
                <Modal.Content >
                    {
                        confirmDialog ? <h4>Are you sure? </h4> :
                            <ProductForm
                                data={data}
                                name={data.name}
                                price={data.price}
                                errors={errors}
                                onChange={onChange} />
                    }
                </Modal.Content>
                <Modal.Actions>
                    <ButtonCustom
                        onClick={handleModalCloseWithoutChange}
                        label='Cancel'
                        color='black'
                    />
                    <ButtonCustom
                        onClick={handleModalCloseWithChange}
                        label={secondBtnProps.label}
                        color={secondBtnProps.color}
                        labelPosition='right'
                        disabled={secondBtnProps.disabled}
                        icon={secondBtnProps.icon}
                    />
                </Modal.Actions>
            </Modal>
        );
    };
}

export default ModalProductForm;
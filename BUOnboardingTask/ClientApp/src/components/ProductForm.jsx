import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import Input from './common/input';
import 'semantic-ui-css/semantic.min.css';

class CustomerForm extends Component {

    render() {
        const { data, onChange, errors } = this.props;

        return (
            <Form size='small'>
                <Form.Group widths='equal'>
                    <Input
                        value={data.name}
                        label='Name'
                        name='name'
                        onChange={onChange}
                        errors={errors.name}
                        id='form-subcomponent-shorthand-input-name' />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Input
                        value={data.price}
                        label='Price'
                        name='price'
                        onChange={onChange}
                        errors={errors.price}
                        id='form-subcomponent-shorthand-input-address' />
                </Form.Group>
            </Form>
        )
    }
}

export default CustomerForm;


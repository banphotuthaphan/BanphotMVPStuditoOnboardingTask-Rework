import React from 'react';
import { Form } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const Input = ({ value, name, label, id, errors, onChange }) => {
    return (
        <React.Fragment>
            <Form.Input
                fluid
                id={id}
                label={label}
                name={name}
                value={value}
                onChange={onChange}
            />
            <div>
                {errors && <div className="alert alert-danger">{errors}</div>}
            </div>
        </React.Fragment>
    );
};

export default Input;
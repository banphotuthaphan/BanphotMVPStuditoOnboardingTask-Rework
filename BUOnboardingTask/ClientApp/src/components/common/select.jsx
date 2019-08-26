import React from 'react';
import { Form } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';


const Select = ({ name, label, id, onChange, options, defaultValue, errors }) => {

    return (
        <React.Fragment>
            <Form.Select
                fluid
                scrolling
                id={id}
                label={label}
                name={name}
                options={options}
                defaultValue={defaultValue}
                onChange={onChange}
            />
            <div>
                {errors && <div className="alert alert-danger">{errors}</div>}
            </div>
        </React.Fragment>
    );
};

export default Select;
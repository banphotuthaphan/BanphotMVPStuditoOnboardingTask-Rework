import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';


const Select = ({ name, label, id, onChange, options, defaultValue, errors }) => {

    return (
        <React.Fragment>
            <Dropdown
                fluid
                scrolling
                id={id}
                label={label}
                name={name}
                options={options}
                defaultValue={defaultValue}
                selection
                onChange={onChange}
            />
            <div>
                {errors && <div className="alert alert-danger">{errors}</div>}
            </div>
        </React.Fragment>
    );
};

export default Select;
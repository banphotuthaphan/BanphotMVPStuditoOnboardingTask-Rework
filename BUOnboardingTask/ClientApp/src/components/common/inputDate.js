import React from 'react';
import { DateInput } from 'semantic-ui-calendar-react';
import 'semantic-ui-css/semantic.min.css';

const InputDate = ({ dateFormat, value, placeholder, iconPosition, label, name, onChange, errors, id }) => {
    return (
        <React.Fragment>
            <DateInput
                dateFormat={dateFormat}
                value={value}
                placeholder={placeholder}
                iconPosition={iconPosition}
                label={label}
                name={name}
                onChange={onChange}
                errors={errors}
                id={id}
            />
            <div>
                {errors && <div className="alert alert-danger">{errors}</div>}
            </div>
        </React.Fragment>
    );
};

export default InputDate;
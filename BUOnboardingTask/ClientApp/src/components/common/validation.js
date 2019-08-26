import React, { Component } from 'react';
import Joi from 'joi-browser';


class Validate extends Component {

    validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(this.state.data, this.schema, options);
        if (!error) return null;

        const errors = {};
        for (let item of error.details) errors[item.path[0]] = item.message;

        return errors;
    };

    validateProperty = (name, value) => {
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema);

        return error ? error.details[0].message : null;
    };


    handleChange = (e, { name, value }) => {
        const errors = { ...this.state.errors };
        let errorMessage = this.validateProperty(name, value);

        if (errorMessage) errors[name] = errorMessage;
        else delete errors[name];

        const data = { ...this.state.data };
        data[name] = value;

        this.setState({ data, errors });

        //need more work because the button is active as soon as the  first input is ok, need to have button active only all the input on form are validate
        if (Object.keys(errors).length === 0) this.setState({ disabled: '' });
    } 
}

export default Validate;

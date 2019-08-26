import React from 'react';
import { Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const ButtonCustom = ({ labelPosition, icon, label, onClick, disabled, color }) => {
    return (
        <Button
            onClick={onClick}
            labelPosition={labelPosition}
            icon={icon}
            content={label}
            disabled={disabled}
            color={color}
        />
    );
};

export default ButtonCustom;
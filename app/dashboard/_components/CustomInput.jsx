import React from 'react';
import {Input} from "@nextui-org/react";

function CustomInput({type, label, placeholder, variant, ...props}) {
    return (
        <Input
            type={type}
            label={label}
            variant={variant}
            placeholder={placeholder}
            labelPlacement="inside"
            className={"w-28"}
            {...props}
        />
    );
}

export default CustomInput;
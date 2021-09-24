import buttonStyle from "./Button.module.scss";
import React from "react";
import { Meta } from "@utils/meta";
import { Alert } from 'antd';

const ErrorImage = () => {

        return (
        <>
            <Alert
                message="Ooooops..."
                description="Well... it appears something went wrong."
                type="error"
                showIcon
                closable
            />
        </>
    );

};

export default ErrorImage;

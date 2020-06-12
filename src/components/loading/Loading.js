import React from 'react';
import { Spin } from "antd";

import './Loading.scss';

function Loading() {
    return (
        <div className="loading">
            <Spin size="large" />   
            <h5>Cargando...</h5>         
        </div>
    )
}

export default Loading;

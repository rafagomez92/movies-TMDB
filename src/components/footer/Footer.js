import React from 'react';
import { Layout } from 'antd';

import './Footer.scss';

function Footer() {
    const { Footer } = Layout;
    return(
        <Footer className="footer">
            <p>Marcos Rafael Gómez Gómez | Todos los derechos reservados.</p>
        </Footer>
    )

}

export default Footer;
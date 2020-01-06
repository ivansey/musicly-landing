import React from "react";
import {Link} from "react-router-dom"

class Footer extends React.Component {
    render() {
        return <div className="footer">
            <p>2020 - Author Site (c)</p>
            <Link to="/admin">Вход</Link>
        </div>
    }
}

export default Footer;
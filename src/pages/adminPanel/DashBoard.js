import React from "react";
import {withRouter} from "react-router";
import {Link} from "react-router-dom";
import cookies from "react-cookies";
import axios from "axios";

class DashBoard extends React.Component {
    constructor(props) {
        super(props);

        axios.post("/api/v1/users/checkToken", {token: cookies.load("token")}).then((data) => {
            if (data.data.response === "NOT_TOKEN") {
                this.props.history.push("/admin/login");
            }
        })
    }

    render() {
        return <div className="page">
            <h2 className="title">Админ-панель</h2>
            <Link to="/admin/logout">Выход с аккаунта</Link>
        </div>
    }
}

export default withRouter(DashBoard);
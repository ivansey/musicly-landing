import React from "react";
import axios from "axios";
import cookies from "react-cookies";
import {withRouter} from "react-router";
import {Link} from "react-router-dom";
import {TranslatableText} from "../App";

class Header extends React.Component {
    menu = () => {
        return <div className="menu">
            <Link to="/"><p>
                <TranslatableText dictionary={{
                    EN: "Home",
                    RU: "Главная",
                    CH: "首页",
                }}/>
            </p></Link>
            <Link to="/about"><p>
                <TranslatableText dictionary={{
                    EN: "About",
                    RU: "Обо мне",
                    CH: "关于我",
                }}/>
            </p></Link>
            <Link to="/projects"><p>
                <TranslatableText dictionary={{
                    EN: "Projects",
                    RU: "Проекты",
                    CH: "关于我",
                }}/>
            </p></Link>
            <Link to="/media"><p>
                <TranslatableText dictionary={{
                    EN: "Repertoire",
                    RU: "Репертуар",
                    CH: "剧目",
                }}/>
            </p></Link>
            <Link to="/gallery"><p>
                <TranslatableText dictionary={{
                    EN: "Gallery",
                    RU: "Галлерея",
                    CH: "艺廊",
                }}/>
            </p></Link>
            <Link to="/backstage"><p>
                <TranslatableText dictionary={{
                    EN: "Backstage",
                    RU: "Backstage",
                    CH: "后台",
                }}/>
            </p></Link>
            <Link to="/contacts"><p>
                <TranslatableText dictionary={{
                    EN: "Contact",
                    RU: "Контакты",
                    CH: "联络资料",
                }}/>
            </p></Link>
            <Link to="/social"><p>
                <TranslatableText dictionary={{
                    EN: "Social",
                    RU: "Соц сети",
                    CH: "社交网络",
                }}/>
            </p></Link>
            <select name="lang" onChange={this.props.changeLang}>
                <option value="EN" selected={this.props.lang === "EN"}>EN</option>
                <option value="RU" selected={this.props.lang === "RU"}>RU</option>
                <option value="CH" selected={this.props.lang === "CH"}>CH</option>
            </select>
        </div>
    };


    render() {
        return <div className="header">
            <p className="title" onClick={() => this.props.history.push("/")}>
                <TranslatableText dictionary={{
                    EN: "Title",
                    RU: "Заголовок",
                    CH: "标题",
                }}/>
            </p>
            <div></div>
            {this.menu()}
        </div>
    }
}

export default withRouter(Header);
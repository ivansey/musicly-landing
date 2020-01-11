import React from "react";
import axios from "axios";
import cookies from "react-cookies";
import {withRouter} from "react-router";
import {Link} from "react-router-dom";
import {TranslatableText} from "../App";

import ArrowDown from "../down.svg";

let menu = (props) => {
    return <div className="menu">
        <Link to="/"><p>
            <TranslatableText dictionary={{
                EN: "Home",
                RU: "Главная",
                CH: "首页",
            }}/>
        </p></Link>
        <p>/</p>
        <Link to="/about"><p>
            <TranslatableText dictionary={{
                EN: "About",
                RU: "Обо мне",
                CH: "关于我",
            }}/>
        </p></Link>
        <p>/</p>
        <Link to="/projects"><p>
            <TranslatableText dictionary={{
                EN: "Projects",
                RU: "Проекты",
                CH: "关于我",
            }}/>
        </p></Link>
        <p>/</p>
        <Link to="/media"><p>
            <TranslatableText dictionary={{
                EN: "Repertoire",
                RU: "Репертуар",
                CH: "剧目",
            }}/>
        </p></Link>
        <p>/</p>
        <Link to="/gallery"><p>
            <TranslatableText dictionary={{
                EN: "Gallery",
                RU: "Галлерея",
                CH: "艺廊",
            }}/>
        </p></Link>
        <p>/</p>
        <Link to="/backstage"><p>
            <TranslatableText dictionary={{
                EN: "Backstage",
                RU: "Backstage",
                CH: "后台",
            }}/>
        </p></Link>
        <p>/</p>
        <Link to="/contacts"><p>
            <TranslatableText dictionary={{
                EN: "Contact",
                RU: "Контакты",
                CH: "联络资料",
            }}/>
        </p></Link>
        <p>/</p>
        <Link to="/social"><p>
            <TranslatableText dictionary={{
                EN: "Social",
                RU: "Соц сети",
                CH: "社交网络",
            }}/>
        </p></Link>
        <p>/</p>
        <select name="lang" onChange={props.changeLang}>
            <option value="EN" selected={props.lang === "EN"}>EN</option>
            <option value="RU" selected={props.lang === "RU"}>RU</option>
            <option value="CH" selected={props.lang === "CH"}>CH</option>
        </select>
    </div>
};

class Header extends React.Component {
    render() {
        return <div className="header">
            <div className="topBar">
                {menu({changeLang: this.props.changeLang, lang: this.props.lang})}
            </div>

            <p className="title" onClick={() => this.props.history.push("/")}>
                <TranslatableText dictionary={{
                    EN: "TITLE",
                    RU: "TITLE",
                    CH: "TITLE",
                }}/>
            </p>

            <object className="arrowsSVG" data={ArrowDown} type="image/svg+xml"></object>
        </div>
    }
}

export default withRouter(Header);
export {menu};
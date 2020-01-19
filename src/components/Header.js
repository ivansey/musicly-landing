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
            
            <p className="link" onClick={() => {props.changeLang("EN")}}><img src="/gb.png" alt=""/></p>
            <p className="link" onClick={() => {props.changeLang("RU")}}><img src="/ru.png" alt=""/></p>
            <p className="link" onClick={() => {props.changeLang("CH")}}><img src="/ch.png" alt=""/></p>
        </div>
};

class Header extends React.Component {
    render() {
        return <div className="header">
            <div className="body">
                <div className="topBar">
                    {menu({changeLang: this.props.changeLang, lang: this.props.lang})}
                </div>

                <p className="title" onClick={() => this.props.history.push("/")}>
                    <TranslatableText dictionary={{
                        EN: "Volha Mezamuse",
                        RU: "Volha Mezamuse",
                        CH: "Volha Mezamuse",
                    }}/>
                </p>

                <p className="subtitle" onClick={() => this.props.history.push("/")}>
                    <TranslatableText dictionary={{
                        EN: "Professional violinist performer",
                        RU: "Профессиональный скрипач исполнитель",
                        CH: "专业的小提琴演奏家",
                    }}/>
                </p>

                <object className="arrowsSVG" data={ArrowDown} type="image/svg+xml"></object>
            </div>
            <video src="/videoHeader.mp4" width="100%" height="100%" loop="true" muted="true" autoplay="true" preload="" className="video"/>
        </div>
    }
}

export default withRouter(Header);
export {menu};
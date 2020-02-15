import React from "react";
import {withRouter} from "react-router";
import {Link} from "react-router-dom";
import {TranslatableText} from "../App";

import ArrowDown from "../down.svg";

let menu = (props, muteVideo, changeMuteVideo) => {
    return <div className="menu">
            <Link to="/"><p>
                <TranslatableText dictionary={{
                    EN: "Home",
                    RU: "Главная",
                    CH: "主页面",
                }}/>
            </p></Link>
            
            <Link to="/about"><p>
                <TranslatableText dictionary={{
                    EN: "About myself",
                    RU: "Обо мне",
                    CH: "关于我",
                }}/>
            </p></Link>
            
            <Link to="/projects"><p>
                <TranslatableText dictionary={{
                    EN: "Projects",
                    RU: "Проекты",
                    CH: "项目",
                }}/>
            </p></Link>
            
            <Link to="/repertoire"><p>
                <TranslatableText dictionary={{
                    EN: "Repertoire",
                    RU: "Репертуар",
                    CH: "保留曲目",
                }}/>
            </p></Link>
            
            <Link to="/gallery"><p>
                <TranslatableText dictionary={{
                    EN: "Gallery",
                    RU: "Галерея",
                    CH: "碌莽禄",
                }}/>
            </p></Link>
            
            <Link to="/backstage"><p>
                <TranslatableText dictionary={{
                    EN: "Backstage",
                    RU: "Закулисье",
                    CH: "后台",
                }}/>
            </p></Link>
            
            <Link to="/contacts"><p>
                <TranslatableText dictionary={{
                    EN: "Contacts",
                    RU: "Контакты",
                    CH: "联系方式",
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

            {
                muteVideo === true
                    ? <p className="link" onClick={() => {changeMuteVideo()}}><TranslatableText dictionary={{
                        EN: "UNMUTE AUDIO",
                        RU: "ВКЛЮЧИТЬ ЗВУК",
                        CH: "社交网络",
                    }}/></p>
                    : <p className="link" onClick={() => {changeMuteVideo()}}><TranslatableText dictionary={{
                        EN: "MUTE AUDIO",
                        RU: "ВЫКЛЮЧИТЬ ЗВУК",
                        CH: "社交网络",
                    }}/></p>
            }
        </div>
};

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            muteVideo: false,
        };

        this.changeMuteVideo = this.changeMuteVideo.bind(this);
    }

    changeMuteVideo = () => {
        if (this.state.muteVideo === true) {
            this.setState({muteVideo: false});
        } else {
            this.setState({muteVideo: true});
        }
    };

    render() {
        return <div className="header">
            <div className="body">
                <div className="topBar">
                    {menu({changeLang: this.props.changeLang, lang: this.props.lang}, this.state.muteVideo, this.changeMuteVideo)}
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

                <a href="#page" className="arrowsSVG"><span className="mdi mdi-arrow-down-bold-outline"/></a>
            </div>
            <video id="videoHeader" src="/videoHeader.mp4" width="100%" height="100%" loop="true" muted={this.state.muteVideo} playsinline autoplay="true" controls={false} className="video"/>
        </div>
    }
}

export default withRouter(Header);
export {menu};
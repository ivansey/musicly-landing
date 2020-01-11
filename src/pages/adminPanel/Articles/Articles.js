import React from "react";
import {withRouter} from "react-router";
import {Link} from "react-router-dom";
import cookies from "react-cookies";
import axios from "axios";
import youtube from "youtube-player";
import youtubeURLParser from "js-video-url-parser";
import {TranslatableText} from "../../../App";

class ArticlesAdmin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [{}],
            response: "LOADING",
            limit: 10,
            limitStep: 10,
            lengthData: 2,
        };

        axios.post("/api/v1/users/checkToken", {token: cookies.load("token")}).then((data) => {
            if (data.data.response === "NOT_TOKEN") {
                this.props.history.push("/admin/login");
            }
        });

        this.getList = this.getList.bind(this);
        this.returnList = this.returnList.bind(this);
        this.plusLimit = this.plusLimit.bind(this);

        this.getList();
    }

    getList = () => {
        axios.post("/api/v1/news/getAll", {limit: this.state.limit}).then((data) => {
            this.setState({
                list: data.data.data,
                lengthData: data.data.data.length,
                response: data.data.response
            }, () => console.log(this.state));
        });
    };

    returnList = () => {
        if (this.state.response === "OK") {
            return this.state.list.map((item) => {
                return <div className="article">
                    <div className="text">
                        <p className="title">
                            <TranslatableText dictionary={{
                                EN: item.titleEN,
                                RU: item.titleRU,
                                CH: item.titleCH,
                            }}/>
                        </p>
                        <p className="description">
                            <TranslatableText dictionary={{
                                EN: item.descEN,
                                RU: item.descRU,
                                CH: item.descCH,
                            }}/>
                        </p>
                    </div>
                    <div className="img">
                        <img src={item.image} alt={item._id}/>
                    </div>
                </div>
            });
        } else if (this.state.response === "NOT_FOUND") {
            return <p style={{width: "400"}}>Новостей нет</p>
        } else if (this.state.response === "LOADING") {
            return <p style={{width: "400"}}>Загрузка...</p>
        }
    };

    plusLimit = () => {
        this.setState({limit: this.state.limit + this.state.limitStep}, () => {
            this.getList();
        });
    };

    render() {
        return <div className="page">
            <h2 className="title">Управление новостями</h2>
            <br/>
            <Link to="/admin/gallery/add">Добавить новость</Link>
            <br/>
            <div className="content miniArticles">
                {this.returnList()}
            </div>
            <br/>
            <button onClick={this.plusLimit}>
                <TranslatableText dictionary={{
                    EN: "YET",
                    RU: "ЕЩЁ",
                    CH: "更多",
                }}/>
            </button>
        </div>
    }
}

export default withRouter(ArticlesAdmin);
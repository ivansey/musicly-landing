import React from "react";
import {TranslatableText} from "../App";
import axios from "axios";

class IndexPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            about: {},
            articles: [],
        };

        if (this.props.location.search === "?login=done") {
            window.location.href = "/";
        }

        this.getAbout = this.getAbout.bind(this);
        this.getArticles = this.getArticles.bind(this);
        this.returnListArticles = this.returnListArticles.bind(this);

        this.getAbout();
        this.getArticles();
    }

    getAbout = () => {
        axios.post("/api/v1/about/get", {}).then((data) => {
            this.setState({about: data.data.data});
        });
    };

    getArticles = () => {
        axios.post("/api/v1/news/getAll", {limit: 4}).then((data) => {
            this.setState({
                articles: data.data.data,
                response: data.data.response
            }, () => console.log(this.state));
        });
    };

    returnListArticles = () => {
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

    render() {
        return <div className="page">
            <div className="block">
                <h3>
                    <TranslatableText dictionary={{
                        EN: this.state.about.nameEN,
                        RU: this.state.about.nameRU,
                        CH: this.state.about.nameCH,
                    }}/>
                </h3>
                <br/>
                <i>
                    <TranslatableText dictionary={{
                        EN: this.state.about.descriptionEN,
                        RU: this.state.about.descriptionRU,
                        CH: this.state.about.descriptionCH,
                    }}/>
                </i>
                <br/>
                <br/>
                <button onClick={() => this.props.history.push("/about")}>
                    <TranslatableText dictionary={{
                        EN: "OPEN ABOUT PAGE",
                        RU: "ОТКРЫТЬ ПОДРОБНЕЕ ОБО МНЕ",
                        CH: "OPEN ABOUT PAGE",
                    }}/>
                </button>
            </div>
            <div className="block">
                <h3 className="title">
                    <TranslatableText dictionary={{
                        EN: "LAST NEWS",
                        RU: "ПОСЛЕДНИЕ НОВОСТИ",
                        CH: "最新消息",
                    }}/>
                </h3>
                <br/>
                <div className="content miniArticles">
                    {this.returnListArticles()}
                </div>
            </div>
        </div>
    }
}

export default IndexPage;
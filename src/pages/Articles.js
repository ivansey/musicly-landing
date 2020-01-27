import React from "react";
import {withRouter} from "react-router";
import axios from "axios";
import {TranslatableText} from "../App";

class Articles extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            list        : [{}],
            response    : "LOADING",
            limit       : 10,
            limitStep   : 10,
            lengthData  : 2,
        };

        this.getList    = this.getList.bind(this);
        this.returnList = this.returnList.bind(this);
        this.plusLimit  = this.plusLimit.bind(this);

        this.getList();
    }

    getList = () => {
        axios.post("/api/v1/news/getAll", {limit: this.state.limit}).then((data) => {
            this.setState({
                list        : data.data.data,
                lengthData  : data.data.data.length,
                response    : data.data.response
            });
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
            <div className="block">
                <h2 className="title">
                    <TranslatableText dictionary={{
                        EN: "NEWS",
                        RU: "НОВОСТИ",
                        CH: "艺廊",
                    }}/>
                </h2>
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
        </div>
    }
}

export default withRouter(Articles);
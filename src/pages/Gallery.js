import React from "react";
import {withRouter} from "react-router";
import {Link} from "react-router-dom";
import cookies from "react-cookies";
import axios from "axios";
import youtube from "youtube-player";
import youtubeURLParser from "js-video-url-parser";

class Gallery extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [{}],
            response: "LOADING",
            limit: 20,
            limitStep: 20,
            lengthData: 2,
        };

        this.getList = this.getList.bind(this);
        this.returnList = this.returnList.bind(this);
        this.plusLimit = this.plusLimit.bind(this);

        this.getList();
    }

    getList = () => {
        axios.post("/api/v1/gallery/getAll", {limit: this.state.limit}).then((data) => {
            this.setState({
                list: data.data.data,
                lengthData: data.data.data.length,
                response: data.data.response
            }, () => console.log(this.state));
        });
    };

    player = null;

    returnList = () => {
        if (this.state.response === "OK") {
            return this.state.list.map((item) => {
                if (item.type === "photo") {
                    return <img src={item.src} alt={item.alt} style={{width: "400"}}/>
                } else if (item.type === "youtube") {
                    // return <div id={youtubeURLParser.parse(item.src).id} style={{width: "400"}} render={}/>
                    return <iframe
                        src={`https://www.youtube.com/embed/${youtubeURLParser.parse(item.src).id}`}/>
                }
            });
        } else if (this.state.response === "NOT_FOUND") {
            return <p style={{width: "400"}}>Галерея пуста</p>
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
            <h2 className="title">Галирея</h2>
            <br/>
            <div className="gallery">
                <div className="flex-gallery" ref="container">
                    {this.returnList()}
                </div>
                <br/>
                <button onClick={this.plusLimit}>Ещё</button>
            </div>
        </div>
    }
}

export default withRouter(Gallery);
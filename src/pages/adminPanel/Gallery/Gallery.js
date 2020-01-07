import React from "react";
import {withRouter} from "react-router";
import {Link} from "react-router-dom";
import cookies from "react-cookies";
import axios from "axios";
import youtube from "youtube-player";
import youtubeURLParser from "js-video-url-parser";

class GalleryAdmin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [{}],
            response: "LOADING",
            limit: 20,
            limitStep: 20,
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
        axios.post("/api/v1/gallery/getAll", {limit: this.state.limit}).then((data) => {
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
                if (item.type === "photo") {
                    return <img src={item.src} alt={item.alt} style={{width: "400"}}/>
                } else if (item.type === "youtube") {
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
            <h2 className="title">Управление галиреей</h2>
            <br/>
            <Link to="/admin/gallery/add">Добавить фото/видео</Link>
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

export default withRouter(GalleryAdmin);
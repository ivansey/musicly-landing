import React from "react";
import {withRouter} from "react-router";
import axios from "axios";
import {TranslatableText} from "../App";
import youtubeURLParser from "js-video-url-parser";

class Gallery extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [null],
            response: "LOADING",
            limit: 20,
            limitStep: 20,
            lengthData: 2,
        };

        this.returnList = this.returnList.bind(this);

        axios.get("/api/v1/gallery/get", {}).then((data) => {
            console.log(data.data.videos);
            this.setState({list: data.data.videos, response: "OK"});
        });
    }

    returnList = () => {
        if (this.state.response === "OK") {
            // eslint-disable-next-line array-callback-return
            return this.state.list.map((item) => {
                    // return <div id={youtubeURLParser.parse(item.src).id} style={{width: "400"}} render={}/>
                    return <iframe
                        src={`https://www.youtube.com/embed/${youtubeURLParser.parse(item).id}`}/>
            });
        } else if (this.state.response === "NOT_FOUND") {
            return <p style={{width: "400"}}>Галерея пуста</p>
        } else if (this.state.response === "LOADING") {
            return <p style={{width: "400"}}><span className="mdi mdi-reload"/></p>
        }
    };

    render() {
        return <div className="page" id="page">
            <div className="block">
                <h2 className="title">
                    <TranslatableText dictionary={{
                        EN: "GALLERY",
                        RU: "ГАЛИРЕЯ",
                        CH: "艺廊",
                    }}/>
                </h2>
                <br/>
                <div className="gallery">
                    <div className="flex-gallery" ref="container">
                        {this.returnList()}
                    </div>
                </div>
            </div>
        </div>
    }
}

export default withRouter(Gallery);
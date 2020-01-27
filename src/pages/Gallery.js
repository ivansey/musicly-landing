import React from "react";
import {withRouter} from "react-router";
import axios from "axios";
import {TranslatableText} from "../App";

class Gallery extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            list        : [{}],
            response    : "LOADING",
            limit       : 20,
            limitStep   : 20,
            lengthData  : 2,
        };

        this.getList    = this.getList.bind(this);
        this.returnList = this.returnList.bind(this);
        this.plusLimit  = this.plusLimit.bind(this);

        this.getList();
    }

    getList = () => {
        axios.post("/api/v1/gallery/getAll", {limit: this.state.limit}).then((data) => {
            this.setState({
                list        : data.data.data,
                lengthData  : data.data.data.length,
                response    : data.data.response
            });
        });
    };

    returnList = () => {
        if (this.state.response === "OK") {
            // eslint-disable-next-line array-callback-return
            return this.state.list.map((item) => {
                if (item.type === "photo") {
                    return <img src={item.src} alt={item.alt} style={{width: "400"}}/>
                }
                // else if (item.type === "youtube") {
                //     // return <div id={youtubeURLParser.parse(item.src).id} style={{width: "400"}} render={}/>
                //     return <iframe
                //         src={`https://www.youtube.com/embed/${youtubeURLParser.parse(item.src).id}`}/>
                // }
            });
        } else if (this.state.response === "NOT_FOUND") {
            return <p style={{width: "400"}}>Галерея пуста</p>
        } else if (this.state.response === "LOADING") {
            return <p style={{width: "400"}}><span className="mdi mdi-reload"/></p>
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
                        EN: "GALLERY",
                        RU: "ГАЛЛИРЕЯ",
                        CH: "艺廊",
                    }}/>
                </h2>
                <br/>
                <div className="gallery">
                    <div className="flex-gallery" ref="container">
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
        </div>
    }
}

export default withRouter(Gallery);
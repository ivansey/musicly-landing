import React from "react";
import {withRouter} from "react-router";
import axios from "axios";
import {TranslatableText} from "../App";
import renderHTML from "react-render-html";

class About extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            response: "LOADING",
        };

        this.getAbout = this.getAbout.bind(this);

        this.getAbout();
    }

    getAbout = () => {
        axios.post("/api/v1/about/get", {}).then((data) => {
            this.setState({
                data: data.data.data,
                response: data.data.response
            });
            console.log(data);
        });
    };

    render() {
        return <div className="page">
            <div className="block">
                <h2 className="title">
                    <TranslatableText dictionary={{
                        EN: "ABOUT ME",
                        RU: "ОБО МНЕ",
                        CH: "艺廊",
                    }}/>
                </h2>
                <br/>
                <div className="text">
                    {
                        this.state.response === "LOADING"
                            ? <p>Загрузка...</p>
                            : null
                    }
                    {
                        this.state.response === "OK"
                            ? <pre>
                                <h2>
                                    <TranslatableText dictionary={{
                                        EN: this.state.data.nameEN,
                                        RU: this.state.data.nameRU,
                                        CH: this.state.data.nameCH,
                                    }}/>
                                </h2>
                                <br/>
                                <i>
                                    <TranslatableText dictionary={{
                                        EN: this.state.data.descriptionEN,
                                        RU: this.state.data.descriptionRU,
                                        CH: this.state.data.descriptionCH,
                                    }}/>
                                </i>
                                <br/>
                                <br/>
                                <div className="textBig">
                                <TranslatableText dictionary={{
                                    EN: renderHTML(this.state.data.bioEN),
                                    RU: renderHTML(this.state.data.bioRU),
                                    CH: renderHTML(this.state.data.bioCH),
                                }}/>
                                </div>
                            </pre>
                            : null
                    }

                </div>
            </div>
        </div>
    }
}

export default withRouter(About);
import React from "react";
import {withRouter} from "react-router";
import axios from "axios";
import {TranslatableText} from "../App";
import renderHTML from "react-render-html";

class About extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data    : {},
            response: "LOADING",
        };

        this.getAbout = this.getAbout.bind(this);

        this.getAbout();
    }

    getAbout = () => {
        axios.post("/api/v1/about/get", {}).then((data) => {
            this.setState({
                data    : data.data.data,
                response: data.data.response
            });
        });
    };

    render() {
        return <div className="page" id="page">
            <div className="block">
                <br/>
                <div className="text">
                    {
                        this.state.response === "LOADING"
                            ? <p><span className="mdi mdi-reload"/></p>
                            : null
                    }
                    {
                        this.state.response === "OK"
                            ? <pre>
                                <p className="title">
                                    <TranslatableText dictionary={{
                                        EN: this.state.data.nameEN,
                                        RU: this.state.data.nameRU,
                                        CH: this.state.data.nameCH,
                                    }}/>
                                </p>
                                <br/>
                                <p className="subtitle">
                                    <TranslatableText dictionary={{
                                        EN: this.state.data.descriptionEN,
                                        RU: this.state.data.descriptionRU,
                                        CH: this.state.data.descriptionCH,
                                    }}/>
                                </p>
                                <br/>
                                <br/>
                                <TranslatableText dictionary={{
                                    EN: renderHTML(this.state.data.bioEN),
                                    RU: renderHTML(this.state.data.bioRU),
                                    CH: renderHTML(this.state.data.bioCH),
                                }}/>

                            </pre>
                            : null
                    }

                </div>
            </div>
        </div>
    }
}

export default withRouter(About);
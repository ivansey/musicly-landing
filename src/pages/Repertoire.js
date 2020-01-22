import React from "react";
import {withRouter} from "react-router";
import axios from "axios";
import {TranslatableText} from "../App";
import renderHTML from "react-render-html";

class Repertoire extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            response: "LOADING",
        };

        this.getRepertoire = this.getRepertoire.bind(this);

        this.getRepertoire();
    }

    getRepertoire = () => {
        axios.post("/api/v1/repertoire/get", {}).then((data) => {
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
                                        EN: "Repertoire",
                                        RU: "Репертуар",
                                        CH: "Repertoire",
                                    }}/>
                                </h2>
                                <br/>
                                {<TranslatableText dictionary={{
                                        EN: renderHTML(this.state.data.descriptionEN),
                                        RU: renderHTML(this.state.data.descriptionRU),
                                        CH: renderHTML(this.state.data.descriptionCH),
                                    }}/>}
                            </pre>
                            : null
                    }
                </div>
            </div>
        </div>
    }
}

export default withRouter(Repertoire);
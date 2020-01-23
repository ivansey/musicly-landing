import React from "react";
import {withRouter} from "react-router";
import axios from "axios";
import {TranslatableText} from "../App";

class Backstage extends React.Component {
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
                               We are waiting for a perfomance with London Symphonic orchestra <br/>
                               <img src="/002.JPG" alt=""/><br/>
                               <img src="/003.JPG" alt=""/><br/>
                               <img src="/004.JPG" alt=""/><br/>
                               <br/>
                               I am so proud of all people who always beside me and would like to say thanks all of them. Bcz perfomance is not only about music. But style, good pictures and videos and others important things <br/>
                                <img src="/101.jpg" alt=""/><br/>
                               <img src="/102.jpg" alt=""/><br/>
                               <img src="/103.jpg" alt=""/><br/>
                               <img src="/104.jpg" alt=""/><br/>
                               <img src="/105.JPG" alt=""/><br/>
                               <img src="/106.jpg" alt=""/><br/>
                               <br/>
                               "Elves" I remember the first performing day like it was yestarday. <br/>
                                <img src="/201.jpg" alt=""/><br/>
                               <img src="/202.jpeg" alt=""/><br/>
                               <img src="/203.jpg" alt=""/><br/>
                               <img src="/205.jpeg" alt=""/><br/>
                               <br/>
                               How we made our video "The song from a secret garden" An amazing sunrise in Guangzhou. <br/>
                                <img src="/301.JPG" alt=""/><br/>
                                <br/>
                                Musicians are so serious in work and so funny between each other. This is a truth: humor gives you a long life. So my friends  listen to music and smile my friends <br/>
                                <img src="/401.jpg" alt=""/><br/>
                               <img src="/402.jpg" alt=""/><br/>
                               <img src="/403.jpg" alt=""/><br/>
                               <img src="/404.jpg" alt=""/><br/>
                               <img src="/405.JPG" alt=""/><br/>
                               <img src="/406.jpg" alt=""/><br/>
                               <img src="/407.jpg" alt=""/><br/>
                            </pre>
                            : null
                    }
                </div>
            </div>
        </div>
    }
}

export default withRouter(Backstage);
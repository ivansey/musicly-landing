import React from "react";
import {TranslatableText} from "../App";

class IndexPage extends React.Component {
    constructor(props) {
        super(props);

        if (this.props.location.search === "?login=done") {
            window.location.href = "/";
        }
    }

    render() {
        return <div className="page">
            <div className="block">
                <h3 className="title">
                    <TranslatableText dictionary={{
                        EN: "Last news",
                        RU: "Последние новости",
                        CH: "最新消息",
                    }}/>
                </h3>
                <br/>
                <div className="content">
                    <div className="article">
                        <p className="title">
                            <TranslatableText dictionary={{
                                EN: "News #1",
                                RU: "Новость #1",
                                CH: "新闻 #1",
                            }}/>
                        </p>
                    </div>
                    <div className="article">
                        <p className="title">
                            <TranslatableText dictionary={{
                                EN: "News #2",
                                RU: "Новость #2",
                                CH: "新闻 #2",
                            }}/>
                        </p>
                    </div>
                    <div className="article">
                        <p className="title">
                            <TranslatableText dictionary={{
                                EN: "News #3",
                                RU: "Новость #3",
                                CH: "新闻 #3",
                            }}/>
                        </p>
                    </div>
                    <div className="article">
                        <p className="title">
                            <TranslatableText dictionary={{
                                EN: "News #4",
                                RU: "Новость #4",
                                CH: "新闻 #4",
                            }}/>
                        </p>
                    </div>
                </div>
            </div>

        </div>
    }
}

export default IndexPage;
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
                        EN: "LAST NEWS",
                        RU: "ПОСЛЕДНИЕ НОВОСТИ",
                        CH: "最新消息",
                    }}/>
                </h3>
                <br/>
                <div className="content miniArticles">
                    <div className="article">
                        <div className="text">
                            <p className="title">
                                <TranslatableText dictionary={{
                                    EN: "News #1",
                                    RU: "Новость #1",
                                    CH: "新闻 #1",
                                }}/>
                            </p>
                            <p className="description">
                                Lorem sduv sdv sdfv rwtv rt rwtv rgfb
                            </p>
                        </div>
                        <div className="img">
                            <img src="http://www.onlinegazeta.info/files/images/pravda.jpeg" alt="img"/>
                        </div>
                    </div>
                    <div className="article">
                        <div className="text">
                            <p className="title">
                                <TranslatableText dictionary={{
                                    EN: "News #2",
                                    RU: "Новость #2",
                                    CH: "新闻 #2",
                                }}/>
                            </p>
                            <p className="description">
                                Lorem sduv sdv sdfv rwtv rt rwtv rgfb
                            </p>
                        </div>
                        <div className="img">
                            <img src="http://www.onlinegazeta.info/files/images/pravda.jpeg" alt="img"/>
                        </div>
                    </div>
                    <div className="article">
                        <div className="text">
                            <p className="title">
                                <TranslatableText dictionary={{
                                    EN: "News #3",
                                    RU: "Новость #3",
                                    CH: "新闻 #3",
                                }}/>
                            </p>
                            <p className="description">
                                Lorem sduv sdv sdfv rwtv rt rwtv rgfb
                            </p>
                        </div>
                        <div className="img">
                            <img src="http://www.onlinegazeta.info/files/images/pravda.jpeg" alt="img"/>
                        </div>
                    </div>
                    <div className="article">
                        <div className="text">
                            <p className="title">
                                <TranslatableText dictionary={{
                                    EN: "News #4",
                                    RU: "Новость #4",
                                    CH: "新闻 #4",
                                }}/>
                            </p>
                            <p className="description">
                                Lorem sduv sdv sdfv rwtv rt rwtv rgfb
                            </p>
                        </div>
                        <div className="img">
                            <img src="http://www.onlinegazeta.info/files/images/pravda.jpeg" alt="img"/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fixedImage" id="fi-1">
                <p>
                    <TranslatableText dictionary={{
                        EN: "AZA#ZLO - TOP",
                        RU: "Azazin - топ",
                        CH: "AZA#ZLO - 最佳",
                    }}/>
                </p>
            </div>
        </div>
    }
}

export default IndexPage;
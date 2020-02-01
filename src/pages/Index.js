import React from "react";
import {Link} from "react-router-dom";
import {TranslatableText} from "../App";
import axios from "axios";

class IndexPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            about   : {},
            articles: [],
        };

        if (this.props.location.search === "?login=done") {
            window.location.href = "/";
        }

        this.getAbout           = this.getAbout.bind(this);
        this.getArticles        = this.getArticles.bind(this);
        this.returnListArticles = this.returnListArticles.bind(this);

        this.getAbout();
        this.getArticles();
    }

    getAbout = () => {
        axios.post("/api/v1/about/get", {}).then((data) => {
            this.setState({about: data.data.data});
        });
    };

    getArticles = () => {
        axios.post("/api/v1/news/getAll", {limit: 4}).then((data) => {
            this.setState({
                articles: data.data.data,
                response: data.data.response
            });
        });
    };

    returnListArticles = () => {
        if (this.state.response === "OK") {
            return this.state.list.map((item) => {
                return <div className="article">
                    <div className="text">
                        <p className="title">
                            <TranslatableText dictionary={{
                                EN: item.titleEN,
                                RU: item.titleRU,
                                CH: item.titleCH,
                            }}/>
                        </p>
                        <p className="description">
                            <TranslatableText dictionary={{
                                EN: item.descEN,
                                RU: item.descRU,
                                CH: item.descCH,
                            }}/>
                        </p>
                    </div>
                    <div className="img">
                        <img src={item.image} alt={item._id}/>
                    </div>
                </div>
            });
        } else if (this.state.response === "NOT_FOUND") {
            return <p style={{width: "400"}}>Новостей нет</p>
        } else if (this.state.response === "LOADING") {
            return <p style={{width: "400"}}>Загрузка...</p>
        }
    };

    render() {
        return <div className="page" id="page">
            <div className="block">
                <pre>
                    <p className="title">Volha Mezamuse</p>
                    <br/>
                    <TranslatableText dictionary={{
                        EN: "Live music from Volha Mezamuse. Live music is the best decoration for any of Your events! It will make Your event unforgettable and exclusive. Live music is perfect for any business, friendly, family, adult, themed holiday or memorable event. Its perfect for weddings, anniversaries, presentations, exhibitions, fashion shows, meeting and seeing off guests, advertising Your product, sporting events, etc. And of course live music is always suitable for any big or small event.\n" +
                            "Preemptive live music from Volha Mezamuse:\n" +
                            "1. A large selection of artists: from solo to orchestra.\n" +
                            "2. High qualification and successful experience of artists in different countries of the world\n" +
                            "3. Affordable price.\n" +
                            "4. Individual approach to each client.\n" +
                            "5. Responsibility and punctuality in work.\n" +
                            "6. Nice bonuses for regular customers. ",
                        RU: "Живая музыка от Volha Mezamuse. Живая музыка украсит любое Ваше событие! Она сделает его незабываемым и эксклюзивным. Живая музыка идеально подходит для любого делового, дружеского, семейного, взрослого, тематического праздника или памятного события. Идеальна для свадеб, юбилеев, презентаций, выставок, модных показов, встречи и проводов гостей, рекламы Вашего продукта, спортивного мероприятия и др. И конечно живая музыка всегда подходит для любого большого и маленького праздника.\n" +
                            "Преимущетва живой музыки от Volha Mezamuse:\n" +
                            "1. Большой выбор артистов: от соло до оркестра.\n" +
                            "2. Высокая квалификация и успешный опыт артистов в разных странах мира\n" +
                            "3. Доступные цены.\n" +
                            "4. Индивидуальный подход к каждому клиенту.\n" +
                            "5. Ответственность и пунктуальность в работе.\n" +
                            "6. Приятные бонусы постоянным клиентам. ",
                        CH: "《Volha Mezamuse》实况音乐活动策划代理。\n" +
                            "实况音乐会对您任何一个喜庆增添光彩。\n" +
                            "会 使它 成为  一个独特难忘的 一个吉庆。\n" +
                            "实况音乐完美结合与业务会谈, 友会，家庭节日, 成年专题 或 纪念活动。\n" +
                            "完美结合与婚礼，周年会，展示会， 展览会，时装表演，接待客人，推介您的产品或体育活动等等会。\n" +
                            "以及实况音乐结合与任何一个无论大的还是小的节日。\n" +
                            "《Volha Mezamuse》实况音乐活动策划代理优点：\n" +
                            "1. 演员人多重多样的选择：从独奏曲到乐队乐团等。\n" +
                            "2. 我们演员都是高超技能的专家及有全球演出的经验。\n" +
                            "3. 价钱公道。\n" +
                            "4. 每个客人享受个别对待。\n" +
                            "5. 高执行的准确性和责任性。\n" +
                            "6. 长期客人享受优惠。",
                    }}/>
            </pre>
                <br/>
                <Link to="/about"><TranslatableText dictionary={{
                    EN: 'Open about me',
                    RU: 'Открыть обо мне',
                    CH: 'Open about me',
                }}/></Link>
            </div>
        </div>
    }
}

export default IndexPage;
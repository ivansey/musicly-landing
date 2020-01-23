import React from "react";
import {Link} from "react-router-dom";
import {TranslatableText} from "../App";
import axios from "axios";

class IndexPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            about: {},
            articles: [],
        };

        if (this.props.location.search === "?login=done") {
            window.location.href = "/";
        }

        this.getAbout = this.getAbout.bind(this);
        this.getArticles = this.getArticles.bind(this);
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
            }, () => console.log(this.state));
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
        return <div className="page">
            <div className="block">
                <pre>
                    <TranslatableText dictionary={{
                        EN: 'Живая музыка от Volha Mezamuse. Живая музыка украсит любое Ваше событие! Она сделает его незабываемым и эксклюзивным. Живая музыка идеально подходит для любого делового, дружеского, семейного, взрослого, тематического праздника или памятного события. Идеальна для свадеб, юбилеев, презентаций, выставок, модных показов, встречи и проводов гостей, рекламы Вашего продукта, спортивного мероприятия и др. И конечно живая музыка всегда подходит для любого большого и маленького праздника. \n' +
                            'Преимущетва живой музыки от Volha Mezamuse: \n\n' +
                            '1. Большой выбор артистов: от соло до оркестра. \n' +
                            '2. Высокая квалификация и успешный опыт артистов в разных странах мира \n' +
                            '3. Доступные цены. \n' +
                            '4. Индивидуальный подход к каждому клиенту. \n' +
                            '5. Ответственность и пунктуальность в работе. \n' +
                            '6. Приятные бонусы постоянпостоянным клиентам. \n',
                        RU: 'Живая музыка от Volha Mezamuse. Живая музыка украсит любое Ваше событие! Она сделает его незабываемым и эксклюзивным. Живая музыка идеально подходит для любого делового, дружеского, семейного, взрослого, тематического праздника или памятного события. Идеальна для свадеб, юбилеев, презентаций, выставок, модных показов, встречи и проводов гостей, рекламы Вашего продукта, спортивного мероприятия и др. И конечно живая музыка всегда подходит для любого большого и маленького праздника. \n' +
                            'Преимущетва живой музыки от Volha Mezamuse: \n' +
                            '1. Большой выбор артистов: от соло до оркестра. \n' +
                            '2. Высокая квалификация и успешный опыт артистов в разных странах мира \n' +
                            '3. Доступные цены. \n' +
                            '4. Индивидуальный подход к каждому клиенту. \n' +
                            '5. Ответственность и пунктуальность в работе. \n' +
                            '6. Приятные бонусы постоянпостоянным клиентам. \n',
                        CH: 'Живая музыка от Volha Mezamuse. Живая музыка украсит любое Ваше событие! Она сделает его незабываемым и эксклюзивным. Живая музыка идеально подходит для любого делового, дружеского, семейного, взрослого, тематического праздника или памятного события. Идеальна для свадеб, юбилеев, презентаций, выставок, модных показов, встречи и проводов гостей, рекламы Вашего продукта, спортивного мероприятия и др. И конечно живая музыка всегда подходит для любого большого и маленького праздника. \n' +
                            'Преимущетва живой музыки от Volha Mezamuse: \n\n' +
                            '1. Большой выбор артистов: от соло до оркестра. \n' +
                            '2. Высокая квалификация и успешный опыт артистов в разных странах мира \n' +
                            '3. Доступные цены. \n' +
                            '4. Индивидуальный подход к каждому клиенту. \n' +
                            '5. Ответственность и пунктуальность в работе. \n' +
                            '6. Приятные бонусы постоянпостоянным клиентам. \n',
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
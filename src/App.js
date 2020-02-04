import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import MetaTags from "react-meta-tags";
import cookies from "react-cookies";

import './App.css';
import "@mdi/font/css/materialdesignicons.min.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

import IndexPage from "./pages/Index";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Articles from "./pages/Articles";
import Repertoire from "./pages/Repertoire";
import Backstage from "./pages/Backstage";
import Contacts from "./pages/Contacts";
import Social from "./pages/Social";
import Projects from "./pages/Projects";

const LanguageContext = React.createContext("EN");
const LanguageConsumer = LanguageContext.Consumer;

const TranslatableText = props => {
    return (
        <LanguageConsumer>
            {({ language }) => props.dictionary[language]}
        </LanguageConsumer>
    );
};

class App extends React.Component {
    constructor(props) {
        super(props);

        if (cookies.load("lang") === undefined) {
            cookies.save("lang", "EN", {expires: new Date(Date.now()+60*60*60*24*30*12*1000), path: "/"});
        }

        this.state = {
            lang: cookies.load("lang"),
        };

        this.changeLang = this.changeLang.bind(this);
    }

    changeLang = (value) => {
        console.log(value);
        this.setState({lang: value});
        cookies.save("lang", value, {expires: new Date(Date.now()+60*60*60*24*30*12*1000), path: "/"});
    };

    render() {
        return <div className="app">
            <LanguageContext.Provider value={{
                language        : this.state.lang,
                updateLanguage  : this.changeLang,
            }}>
                <BrowserRouter>
                    <Header changeLang={this.changeLang} lang={this.state.lang}/>
                    
                    <MetaTags>
                        {
                            this.state.lang === "EN"
                                ? <meta name="description" content="Организация мероприятий с живой инструментальной музыкой. Живая музыка от Volha Mezamuse. Живая музыка украсит любое Ваше событие! Она сделает его незабываемым и эксклюзивным. Живая музыка идеально подходит для любого делового, дружеского, семейного, взрослого, тематического праздника или памятного события. Идеальна для свадеб, юбилеев, презентаций, выставок, модных показов, встречи и проводов гостей, рекламы Вашего продукта, спортивного мероприятия и др. И конечно живая музыка всегда подходит для любого большого и маленького праздника."/>
                                : null
                        }
                        {
                            this.state.lang === "RU"
                                ? <meta name="description" content="Организация мероприятий с живой инструментальной музыкой. Живая музыка от Volha Mezamuse. Живая музыка украсит любое Ваше событие! Она сделает его незабываемым и эксклюзивным. Живая музыка идеально подходит для любого делового, дружеского, семейного, взрослого, тематического праздника или памятного события. Идеальна для свадеб, юбилеев, презентаций, выставок, модных показов, встречи и проводов гостей, рекламы Вашего продукта, спортивного мероприятия и др. И конечно живая музыка всегда подходит для любого большого и маленького праздника."/>
                                : null
                        }
                        {
                            this.state.lang === "CH"
                                ? <meta name="description" content="Организация мероприятий с живой инструментальной музыкой. Живая музыка от Volha Mezamuse. Живая музыка украсит любое Ваше событие! Она сделает его незабываемым и эксклюзивным. Живая музыка идеально подходит для любого делового, дружеского, семейного, взрослого, тематического праздника или памятного события. Идеальна для свадеб, юбилеев, презентаций, выставок, модных показов, встречи и проводов гостей, рекламы Вашего продукта, спортивного мероприятия и др. И конечно живая музыка всегда подходит для любого большого и маленького праздника."/>
                                : null
                        }
                    </MetaTags>

                    <Route path="/" exact component={IndexPage}/>
                    <Route path="/gallery" exact component={Gallery}/>
                    <Route path="/about" exact component={About}/>
                    <Route path="/projects" exact component={Projects}/>
                    <Route path="/repertoire" exact component={Repertoire}/>
                    <Route path="/articles" exact component={Articles}/>
                    <Route path="/backstage" exact component={Backstage}/>
                    <Route path="/contacts" exact component={Contacts}/>
                    <Route path="/social" exact component={Social}/>

                    <Footer/>
                </BrowserRouter>
            </LanguageContext.Provider>
        </div>
    }
}

export default App;
export {TranslatableText};

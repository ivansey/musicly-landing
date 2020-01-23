import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import cookies from "react-cookies";

import './App.css';

import Header, {menu} from "./components/Header";
import Footer from "./components/Footer";

import IndexPage from "./pages/Index";
import DashBoard from "./pages/adminPanel/DashBoard";
import Login from "./pages/adminPanel/Login";
import LogOut from "./pages/adminPanel/LogOut";
import GalleryAdmin from "./pages/adminPanel/Gallery/Gallery";
import GalleryAdd from "./pages/adminPanel/Gallery/Add";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import AboutEdit from "./pages/adminPanel/About/About";
import Articles from "./pages/Articles";
import ArticlesAdmin from "./pages/adminPanel/Articles/Articles";
import ArticleAdd from "./pages/adminPanel/Articles/Add";
import Repertoire from "./pages/Repertoire";
import RepertoireEdit from "./pages/adminPanel/Repertoire/Repertoire";
import Backstage from "./pages/Backstage";

const LanguageContext = React.createContext();
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
                language: this.state.lang,
                updateLanguage: this.changeLang,
            }}>
                <BrowserRouter>
                    <Header changeLang={this.changeLang} lang={this.state.lang}/>
                    {/*<div className="topBar">*/}
                    {/*    {menu({changeLang: this.changeLang, lang: this.state.lang})}*/}
                    {/*</div>*/}

                    <Route path="/" exact component={IndexPage}/>
                    <Route path="/gallery" exact component={Gallery}/>
                    <Route path="/about" exact component={About}/>
                    <Route path="/repertoire" exact component={Repertoire}/>
                    <Route path="/articles" exact component={Articles}/>
                    <Route path="/backstage" exact component={Backstage}/>

                    <Route path="/admin" exact component={DashBoard}/>
                    <Route path="/admin/login" component={Login}/>
                    <Route path="/admin/logout" component={LogOut}/>

                    <Route path="/admin/gallery" exact component={GalleryAdmin}/>
                    <Route path="/admin/gallery/add" component={GalleryAdd}/>

                    <Route path="/admin/about" exact component={AboutEdit}/>

                    <Route path="/admin/repertoire" exact component={RepertoireEdit}/>

                    <Route path="/admin/articles" exact component={ArticlesAdmin}/>
                    <Route path="/admin/articles/add" exact component={ArticleAdd}/>

                    <Footer/>
                </BrowserRouter>
            </LanguageContext.Provider>
        </div>
    }
}

export default App;
export {TranslatableText};

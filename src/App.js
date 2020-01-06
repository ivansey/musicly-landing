import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";

import './App.css';

import Header from "./components/Header";
import Footer from "./components/Footer";

import IndexPage from "./pages/Index";
import DashBoard from "./pages/adminPanel/DashBoard";
import Login from "./pages/adminPanel/Login";
import LogOut from "./pages/adminPanel/LogOut";

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

        this.state = {
            lang: "EN",
        };

        this.changeLang = this.changeLang.bind(this);
    }

    changeLang = (e) => {
        this.setState({lang: e.target.value});
    };

    render() {
        return <div className="app">
            <LanguageContext.Provider value={{
                language: this.state.lang,
                updateLanguage: this.changeLang,
            }}>
                <BrowserRouter>
                    <Header changeLang={this.changeLang} lang={this.state.lang}/>

                    <Route path="/" exact component={IndexPage}/>

                    <Route path="/admin" exact component={DashBoard}/>
                    <Route path="/admin/login" component={Login}/>
                    <Route path="/admin/logout" component={LogOut}/>

                    <Footer/>
                </BrowserRouter>
            </LanguageContext.Provider>
        </div>
    }
}

export default App;
export {TranslatableText};

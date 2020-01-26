import React from "react";
import {withRouter} from "react-router";
import {TranslatableText} from "../App";

class Contacts extends React.Component {
    render() {
        return <div className="page">
            <div className="block">
                <br/>
                <div className="text">
                    <pre>
                          <h2>
                              <TranslatableText dictionary={{
                                  EN: "Contacts",
                                  RU: "Контакты",
                                  CH: "Contacts",
                              }}/>
                          </h2>
                        <br/>
                        <p>EMail:</p>
                        <a href="mailto:volhaviolin8@gmail.com">volhaviolin8@gmail.com</a><br/>
                        <a href="mailto:bgpy@mail.ru">bgpy@mail.ru</a><br/>
                        <br/>
                        <p><TranslatableText dictionary={{
                            EN: "Phone numbers",
                            RU: "Номера телефонов",
                            CH: "Phone numbers",
                        }}/></p>
                        <a href="tel:+8613527713372">+8613527713372</a><br/>
                        <a href="tel:+375299912900">+375299912900</a><br/>
                        <br/>
                        <a href="https://instagram.com/violin_belarus?igshid=tbmasxhbpw02">Instagram</a><br/>
                        <a href="https://www.youtube.com/channel/UCT3tfoz_QYC9bHEd3SoOoHg">YouTube</a><br/>
                        <a href="https://vk.com/id39697620">VK</a><br/>
                        <a href="https://www.facebook.com/profile.php?id=100009018009006">Facebook</a><br/>
                    </pre>
                </div>
            </div>
        </div>
    }
}

export default withRouter(Contacts);
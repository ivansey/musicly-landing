import React from "react";
import {withRouter} from "react-router";
import {TranslatableText} from "../App";

class Contacts extends React.Component {
    contactCard = (title = "", desc = "", link = "", icon = "") => {
        return <a href={link} target="_blank" rel="noopener noreferrer" className="contactCard">
            <p className="title"><span className={`mdi mdi-${icon}`}/>{title}</p>
            <p className="subtitle">{desc}</p>
        </a>
    };

    render() {
        return <div className="page" id="page">
            <div className="block">
                <br/>
                <div className="text">
                    <pre>
                          <p className="title">
                              <TranslatableText dictionary={{
                                  EN: "Contacts",
                                  RU: "Контакты",
                                  CH: "Contacts",
                              }}/>
                          </p>
                        <br/>
                        <TranslatableText dictionary={{
                            EN: "I would like to see you among the fans of good live music and I would like to share with You the most interesting news, videos and projects what we have. Contact Volha Mezamuse if you love music! And here are my contacts) \n I will answer all of your questions.",
                            RU: "Я бы хотела видеть Вас в числе поклонников хорошей живой музыки и делиться с Вами самым интересным и новым. Обращайтесь к Volha Mezamuse, если Вы любите музыку! \n А вот и контакты, по которым я Вам отвечу на все вопросы.",
                            CH: "我希望能够与你们交换音乐世界最新的最有趣的现象及能亲见你们迷上了优质的实况音乐。找好音乐就找《Volha Mezamuse》实况音乐活动策划代理。\n" +
                                "我们的联系方式（咨询）：",
                        }}/>
                        <br/>
                        {this.contactCard("EMail GMail", "volhaviolin8@gmail.com", "mailto:volhaviolin8@gmail.com", "email-edit")}
                        {this.contactCard("EMail Mail.ru", "bgpy@mail.ru", "mailto:bgpy@mail.ru", "email-edit")}
                        <br/>
                        {this.contactCard(<TranslatableText dictionary={{
                            EN: "Phone number",
                            RU: "Номер телефона",
                            CH: "Phone number",
                        }}/>, "+8613527713372", "tel:+8613527713372", "phone")}
                        {this.contactCard(<TranslatableText dictionary={{
                            EN: "Phone number",
                            RU: "Номер телефона",
                            CH: "Phone number",
                        }}/>, "+375299912900", "tel:+375299912900", "phone")}
                        <br/>
                        {this.contactCard("Instagram", "@violin_belarus", "https://instagram.com/violin_belarus?igshid=tbmasxhbpw02", "instagram")}
                        {this.contactCard("YouTube", "Volha Mezamuse", "https://www.youtube.com/channel/UCT3tfoz_QYC9bHEd3SoOoHg", "youtube")}
                        {this.contactCard("VK", "Ольга Меза-Ковалева", "https://vk.com/id39697620", "vk")}
                        {this.contactCard("Facebook", "Olga Kovalyova", "https://www.facebook.com/profile.php?id=100009018009006", "facebook")}
                    </pre>
                </div>
            </div>
        </div>
    }
}

export default withRouter(Contacts);
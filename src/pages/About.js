import React from "react";
import {withRouter} from "react-router";
import {TranslatableText} from "../App";
import renderHTML from "react-render-html";

class About extends React.Component {
    render() {
        return <div className="page" id="page">
            <div className="block">
                <br/>
                <div className="text">
                            <pre>
                                <p className="title">
                                    <TranslatableText dictionary={{
                                        EN: "About myself",
                                        RU: "Обо мне",
                                        CH: "“音乐连接人”",
                                    }}/>
                                </p>
                                <br/>
                                <p className="subtitle">
                                    <TranslatableText dictionary={{
                                        EN: "\"Music connects people.\"",
                                        RU: "«Музыка объединяет людей»",
                                        CH: "关于我自己",
                                    }}/>
                                </p>
                                <br/>
                                <br/>
                                <TranslatableText dictionary={{
                                    EN: renderHTML("Dear friend, I tell you why you came to this page and what interesting things can be found here. My name is Volha Mezamuse and I love it to bring joy and good feelings to people. For 13 years I'm professionally engaged into musical setting of any celebration, such as a wedding, exhibition, presentation, product advertising, Birthday, religious and secular holidays, etc. All these years I've been trying to instill a love of good music in my favorite students. I used to work in orchestras, ensembles and as a soloist in different parts of the World.\n" +
                                        "\n" +
                                        "I went to school and College first. Since then, I have realized that music unites hearts. With my colleagues and fellow students we have visited many competitions and festivals. After college I graduated from the Belarussian state pedagogical University named after M. TANK, the department of \"Musical art. Social pedagogy\". While studying, I went on teaching and performing.\n" +
                                        "\n" +
                                        "As an artist of the Symphonyc orchestra, I got acquainted to the music and life of Germans. 2010 was a year of an unforgettable tour of German cities. Then there was the first Belarusian musical electro-documentary project of the international level \"Elves\". We have toured in the CIS countries, Poland, the Czech Republic, Bulgaria and China.\n" +
                                        "\n" +
                                        "Then there was a contract in China for solo club and pop performances and participation in the International instrumental classical and electro trio \"Queens\". Tour to the cities of China: Macau and Hong Kong. A solo concert and perfoming in an expanded Quartet set in Dongguan, Shenzhen and Guangzhou. Participation in a Collaboration with the London Symphonyc orchestra as part of their tour 2017. Along with that gaining working experience in Guangzhou music studios and International music school as a violin teacher. Taking part at the children's art festival \"Rainbow of talents\" in Guangzhou with an ensemble of the young violinists.\n" +
                                        "\n" +
                                        "I remember all this with love. Over the years, I have made a lot of friends, raised my family and got an invaluable creative experience. In 2018 a new creative project of the trio \"Ovacion\"was created. We have performed in Mexico, Egypt, and India. Meeting amazing people, culture, new music and a hearty welcoming. These are the impressions of those colorful countries. Now being in an astonishing Vietnam. I'll gladly share my experience and impressions with you. See you soon!"),
                                    RU: renderHTML("Дорогой друг, я расскажу тебе почему ты зашел на эту страницу и что интересного тут можно найти. Меня зовут Volha Mezamuse. И я люблю приносить радость и добрые чувства людям. Вот уже 13 лет я профессионально занимаюсь музыкальным украшением любого торжества, как то: свадьба, выставка, презентация, реклама продукции, дни Рождения, религиозные и светские праздники, и многое другое. Все эти годы я стараюсь привить любовь к хорошей музыке моим любимым ученикам. Также работаю в оркестрах, ансамблях и как солист в разных уголках Земли.\n" +
                                        "\n" +
                                        "Сначала я училась в школе и колледже. С тех самых пор я поняла, что музыка обьединяет сердца. С моими коллегами, сокурсниками мы побывали на многих конкурсах и фестивалях. После колледжа я поступила и благополучно окончила Белорусский Государственном педагогический университет имени М. ТАНКА. Отделение \"Музыкальное искусство. Социальная педагогика\". Учась, я не переставала преподавать и выступать. \n\n Будучи артисткой симфонического оркестра, я познакомилась с музыкой и бытом немцев. 2010 год - незабываемые гастроли по городам Германии. Затем был период участия в первом белорусском музыкальном электроинструментальном проекте междунароного уровня \"Elves\". У нас прошли гастроли в странах СНГ, Польше, Чехии, Болгарии и Китае. \n\nЗатем был контракт с китайской стороной на сольное клубное и эстрадное исполнительство. Параллельно я участвовала в International instrumental classic and electro trio \"Queens\". Гастроли по городам Китая, Макао, Гонг Конг. И сольные концерты уже в расширенном составе квартета в Донгуане, Шеньжене и Гуанчжоу. Сотрудничество с Лондонским симфоническим оркестром в рамках гастролей 2017. Параллельная работа в музыкальных студиях Гуанчжоу и Международной музыкальной школе в качестве преподавателя по классу скрипки. Учатие в детском фестивале искусств \"Радуга талантов\" в Гуанчжоу с ансамблем юных скрипачей. \n\nВсе это я вспоминаю с любовью. За эти годы я преобрела много друзей, семью и бесценный творческий опыт. В 2018 году был создан новый творческий проект трио \"Ovacion\". Мы с девочками выступали в Мексике, Египте и в Индии. Удивительные люди, культура, новая музыка и теплый прием. Вот такие впечатления от этих колоритных стран. А сейчас мы во Вьетнаме. Очень интересно! И я обязательно с вами буду делиться опытом и впечатлениями. А пока до новых встреч."),
                                    CH: renderHTML("创意活动\n" +
                                        "\"音乐将人们联系在一起。\"亲爱的朋友，我告诉你为什么你来到这个页面,因为你所感兴趣的这里都有。 我叫Volha Mezamuse 我非常的喜欢,因为喜欢音乐带给人们的美好感受。我从事庆典音乐已经13年了，包括婚礼，展览，演讲，产品广告，生日，宗教和世俗节日等等。 这些年来，在音乐的道路上我一直不断的再学习。 我是管弦独奏演奏者，曾参加乐团世界各地的巡演。\n" +
                                        "(刚开始在学校学习音乐的时候，。 从那时起，我意识到音乐团结的心。 与我的同事，同学们，而且我们参观了许多比赛和节日。) 大学毕业后，我进入并成功毕业于以M.TANK命名的白俄罗斯国立师范大学。 音乐艺术系。 社会教育学\"。 在学习，我从来没有停止pereplavit和行为。 作为交响乐团的艺术家，我\n" +
                                        "我熟悉了德国人的音乐和生活。 2010-德国城市的难忘之旅。 此外还有一段时间参与国际层面的\"精灵\"的第一个白俄罗斯音乐电子纪录片项目。 我们参观了独联体国家，波兰，捷克共和国，保加利亚和中国。 然后与中国方面签订了个人俱乐部和流行音乐表演的合同。 平行参与\n" +
                                        "在国际器乐经典和电三重奏\"皇后\"。 中国澳门，香港的城市之旅。 并在东莞、深圳和广州举办了一场独奏音乐会。 作为2017巡演的一部分，参与与伦敦交响乐团的合作。 在广州音乐工作室和国际音乐学校担任音乐教师\n" +
                                        "小提琴课 在广州儿童艺术节\"人才的彩虹\"与青年小提琴家的合奏教学。 我记得这一切与爱。 多年来，我已经结交了很多朋友，家人和宝贵的创业经验。 在2018中，创建了三重奏\"Ovacion\"的新创意项目。 女孩和我在墨西哥，埃及进行，并\n" +
                                        "在印度 令人惊叹的人，文化，新的音乐和热烈的欢迎。 以下是这些丰富多彩的国家的印象。 现在我们在越南 非常有趣！ 我一定会与你分享我的经验和印象。 在此期间，希望再次与你相见。"),
                                }}/>

                            </pre>
                </div>
            </div>
        </div>
    }
}

export default withRouter(About);
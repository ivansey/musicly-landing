import React from "react";
import {withRouter} from "react-router";
import {TranslatableText} from "../App";
import axios from "axios";

class Social extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          data: [],
          response: "LOADING",
        }

        this.getPhotos = this.getPhotos.bind(this);
        this.returnList = this.returnList.bind(this);

        this.getPhotos();
    }

    getPhotos = () => {
      axios.post("/api/v1/social/vk/posts/get/photo").then((data) => {
        this.setState({data: data.data.data, response: "DONE"})

        console.log(data.data)
      });
    }

    returnList = () => {
      let array = [];
      console.log(this.state)
        if (this.state.response === "DONE") {
            return this.state.data.map((item) => {
                    return <img src={item} alt="" style={{width: "400"}}/>
            });
        } else if (this.state.response === "NOT_FOUND") {
            return <p style={{width: "400"}}>Галерея пуста</p>;
        } else if (this.state.response === "LOADING") {
            return <p style={{width: "400"}}>Загрузка...</p>;
        }
    }

    render() {
        return <div className="page">
            <div className="block">
                <br/>
                <div className="text">
                    <pre>

                          <h2>
                              <TranslatableText dictionary={{
                                  EN: "Social",
                                  RU: "Соц. сети",
                                  CH: "Social",
                              }}/>
                          </h2>
                        <br/>
                        <a href="https://instagram.com/violin_belarus?igshid=tbmasxhbpw02">Instagram</a><br/>
                        <a href="https://www.youtube.com/channel/UCT3tfoz_QYC9bHEd3SoOoHg">YouTube</a><br/>
                        <a href="https://vk.com/id39697620">VK</a><br/>
                        <a href="https://www.facebook.com/profile.php?id=100009018009006">Facebook</a><br/>
                        <br/>
                         <div className="flex-gallery" ref="container">
                            {this.returnList()}
                        </div>
                    </pre>
                </div>
            </div>
        </div>
    }
}

export default withRouter(Social);
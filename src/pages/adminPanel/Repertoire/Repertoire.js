import React from "react";
import {withRouter} from "react-router";
import axios from "axios";
import {TranslatableText} from "../../../App";
import cookies from "react-cookies";

class RepertoireEdit extends React.Component {
    constructor(props) {
        super(props);

        axios.post("/api/v1/users/checkToken", {token: cookies.load("token")}).then((data) => {
            if (data.data.response === "NOT_TOKEN") {
                this.props.history.push("/admin/login");
            }
        });

        this.state = {
            data: {},
            descriptionEN: "",
            descriptionRU: "",
            descriptionCH: "",
            response: "",
            image: "",
            imageResponse: "",
        };

        this.getRepertoire = this.getRepertoire.bind(this);
        this.save = this.save.bind(this);

        this.handleDescriptionEN = this.handleDescriptionEN.bind(this);
        this.handleDescriptionRU = this.handleDescriptionRU.bind(this);
        this.handleDescriptionCH = this.handleDescriptionCH.bind(this);

        this.handleUploadImage = this.handleUploadImage.bind(this);

        this.getRepertoire();
    }

    getRepertoire = () => {
        axios.post("/api/v1/repertoire/get", {}).then((data) => {
            this.setState({
                data: data.data.data
            }, () => this.setState({
                descriptionEN: this.state.data.descriptionEN,
                descriptionRU: this.state.data.descriptionRU,
                descriptionCH: this.state.data.descriptionCH,
            }));
        });
    };

    handleDescriptionEN = (e) => {
        this.setState({descriptionEN: e.target.value});
    };

    handleDescriptionRU = (e) => {
        this.setState({descriptionRU: e.target.value});
    };

    handleDescriptionCH = (e) => {
        this.setState({descriptionCH: e.target.value});
    };

    save = () => {
        console.log(this.bioEN);
        axios.post("/api/v1/repertoire/edit", {
            token: cookies.load("token"),
            descriptionEN: this.state.descriptionEN,
            descriptionRU: this.state.descriptionRU,
            descriptionCH: this.state.descriptionCH,
            _id: this.state.data._id,
        }).then((res) => {
            this.setState({response: res.data.response});
        });
    };

    image = {};

    handleUploadImage = (e) => {
        e.preventDefault();

        this.setState({imageResponse: "LOADING"});

        let data = new FormData();
        data.append("file", this.image.files[0]);
        data.append("filename", "image_" + Date.now() + ".jpg");

        axios.post("/api/v1/storage/image/upload", data).then((data) => {
            this.setState({image: data.data.url, imageResponse: data.data.response});
        });
    };

    render() {
        return <div className="page">
            <div className="block">
                <h2 className="title">
                    <TranslatableText dictionary={{
                        EN: "Repertoire",
                        RU: "РЕПЕРТУАР",
                        CH: "艺廊",
                    }}/>
                </h2>
                <br/>

                    <label htmlFor="descriptionEN">
                        <TranslatableText dictionary={{
                            EN: "Description EN",
                            RU: "Краткое описание EN",
                            CH: "艺廊 EN",
                        }}/>
                    </label>
                    <textarea cols="30" rows="10" name="descriptionEN" defaultValue={this.state.data.descriptionEN}
                           onChange={this.handleDescriptionEN}/>
                    <br/>
                    <label htmlFor="descriptionRU">
                        <TranslatableText dictionary={{
                            EN: "Description RU",
                            RU: "Краткое описание RU",
                            CH: "艺廊 RU",
                        }}/>
                    </label>
                    <textarea cols="30" rows="10" name="descriptionRU" defaultValue={this.state.data.descriptionRU}
                           onChange={this.handleDescriptionRU}/>
                    <br/>
                    <label htmlFor="descriptionCH">
                        <TranslatableText dictionary={{
                            EN: "Description CH",
                            RU: "Краткое описание CH",
                            CH: "艺廊 CH",
                        }}/>
                    </label>
                    <textarea cols="30" rows="10" name="descriptionCH" defaultValue={this.state.data.descriptionCH}
                           onChange={this.handleDescriptionCH}/>
                           <br/>
                <form>
                        <div className="card-body">
                            <div className="form-group">
                                <label htmlFor="photo">Фото</label>
                                <input type="file" className="form-control-file" name="photo"
                                       ref={(ref) => {
                                           this.image = ref;
                                       }}/>
                            </div>
                            <div className="form-group">
                                <div className="form-group">
                                    {
                                        this.state.imageResponse === "LOADING"
                                            ? <div className="alert alert-info">Загрузка...</div>
                                            : null
                                    }
                                    {
                                        this.state.imageResponse === "OK"
                                            ? <div className="alert alert-success">Загружено. Вставте этот код в текст: {`<img src="${this.state.image}" alt=""/>`} </div>
                                            : null
                                    }
                                </div>
                            </div>
                        </div>
                    <p onClick={(e) => {this.handleUploadImage(e)}}>Download</p>
                </form>
                    <br/>
                    {
                        this.state.response === "OK"
                            ? <p>
                                <TranslatableText dictionary={{
                                    EN: "DONE",
                                    RU: "ГОТОВО",
                                    CH: "艺廊",
                                }}/>
                            </p>
                            : null
                    }
                    <br/>
                    <button type="button" onClick={this.save}>
                        <TranslatableText dictionary={{
                            EN: "SAVE",
                            RU: "СОХРАНИТЬ",
                            CH: "艺廊",
                        }}/>
                    </button>

            </div>
        </div>
    }
}

export default withRouter(RepertoireEdit);
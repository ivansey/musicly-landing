import React from "react";
import {withRouter} from "react-router";
import axios from "axios";
import {TranslatableText} from "../../../App";
import cookies from "react-cookies";

class AboutEdit extends React.Component {
    constructor(props) {
        super(props);

        axios.post("/api/v1/users/checkToken", {token: cookies.load("token")}).then((data) => {
            if (data.data.response === "NOT_TOKEN") {
                this.props.history.push("/admin/login");
            }
        });

        this.state = {
            data: {},
            nameEN: "",
            nameRU: "",
            nameCH: "",
            descriptionEN: "",
            descriptionRU: "",
            descriptionCH: "",
            bioEN: "",
            bioRU: "",
            bioCH: "",
            response: "",
            image: "",
            imageResponse: "",
        };

        this.getAbout = this.getAbout.bind(this);
        this.save = this.save.bind(this);

        this.handleNameEN = this.handleNameEN.bind(this);
        this.handleNameRU = this.handleNameRU.bind(this);
        this.handleNameCH = this.handleNameCH.bind(this);

        this.handleDescriptionEN = this.handleDescriptionEN.bind(this);
        this.handleDescriptionRU = this.handleDescriptionRU.bind(this);
        this.handleDescriptionCH = this.handleDescriptionCH.bind(this);

        this.handleBioEN = this.handleBioEN.bind(this);
        this.handleBioRU = this.handleBioRU.bind(this);
        this.handleBioCH = this.handleBioCH.bind(this);

        this.handleUploadImage = this.handleUploadImage.bind(this);

        this.getAbout();
    }

    getAbout = () => {
        axios.post("/api/v1/about/get", {}).then((data) => {
            this.setState({
                data: data.data.data
            }, () => this.setState({
                nameEN: this.state.data.nameEN,
                nameRU: this.state.data.nameRU,
                nameCH: this.state.data.nameCH,
                descriptionEN: this.state.data.descriptionEN,
                descriptionRU: this.state.data.descriptionRU,
                descriptionCH: this.state.data.descriptionCH,
                bioEN: this.state.data.bioEN,
                bioRU: this.state.data.bioRU,
                bioCH: this.state.data.bioCH,
            }));
        });
    };

    handleNameEN = (e) => {
        this.setState({nameEN: e.target.value});
    };

    handleNameRU = (e) => {
        this.setState({nameRU: e.target.value});
    };

    handleNameCH = (e) => {
        this.setState({nameCH: e.target.value});
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

    handleBioEN = (e) => {
        this.setState({bioEN: e.target.value});
    };

    handleBioRU = (e) => {
        this.setState({bioRU: e.target.value});
    };

    handleBioCH = (e) => {
        this.setState({bioCH: e.target.value});
    };

    save = () => {
        console.log(this.bioEN);
        axios.post("/api/v1/about/edit", {
            token: cookies.load("token"),
            nameEN: this.state.nameEN,
            nameRU: this.state.nameRU,
            nameCH: this.state.nameCH,
            descriptionEN: this.state.descriptionEN,
            descriptionRU: this.state.descriptionRU,
            descriptionCH: this.state.descriptionCH,
            bioEN: this.state.bioEN,
            bioRU: this.state.bioRU,
            bioCH: this.state.bioCH,
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
            this.setState({image: data.data.url, imageResponse: data.data.response}, () => console.log(this.state));
        });
    };

    render() {
        return <div className="page">
            <div className="block">
                <h2 className="title">
                    <TranslatableText dictionary={{
                        EN: "ABOUT ME",
                        RU: "ОБО МНЕ",
                        CH: "艺廊",
                    }}/>
                </h2>
                <br/>
                <form>
                    <label htmlFor="nameEN">
                        <TranslatableText dictionary={{
                            EN: "Name EN",
                            RU: "Имя EN",
                            CH: "艺廊 EN",
                        }}/>
                    </label>
                    <input type="text" name="nameEN" defaultValue={this.state.data.nameEN}
                           onChange={this.handleNameEN}/>
                    <br/>
                    <label htmlFor="nameRU">
                        <TranslatableText dictionary={{
                            EN: "Name RU",
                            RU: "Имя RU",
                            CH: "艺廊 RU",
                        }}/>
                    </label>
                    <input type="text" name="nameRU" defaultValue={this.state.data.nameRU}
                           onChange={this.handleNameRU}/>
                    <br/>
                    <label htmlFor="nameCH">
                        <TranslatableText dictionary={{
                            EN: "Name CH",
                            RU: "Имя CH",
                            CH: "艺廊 CH",
                        }}/>
                    </label>
                    <input type="text" name="nameCH" defaultValue={this.state.data.nameCH}
                           onChange={this.handleNameCH}/>
                    <br/>
                    <label htmlFor="descriptionEN">
                        <TranslatableText dictionary={{
                            EN: "Description EN",
                            RU: "Краткое описание EN",
                            CH: "艺廊 EN",
                        }}/>
                    </label>
                    <input type="text" name="descriptionEN" defaultValue={this.state.data.descriptionEN}
                           onChange={this.handleDescriptionEN}/>
                    <br/>
                    <label htmlFor="descriptionRU">
                        <TranslatableText dictionary={{
                            EN: "Description RU",
                            RU: "Краткое описание RU",
                            CH: "艺廊 RU",
                        }}/>
                    </label>
                    <input type="text" name="descriptionRU" defaultValue={this.state.data.descriptionRU}
                           onChange={this.handleDescriptionRU}/>
                    <br/>
                    <label htmlFor="descriptionCH">
                        <TranslatableText dictionary={{
                            EN: "Description CH",
                            RU: "Краткое описание CH",
                            CH: "艺廊 CH",
                        }}/>
                    </label>
                    <input type="text" name="descriptionCH" defaultValue={this.state.data.descriptionCH}
                           onChange={this.handleDescriptionCH}/>
                    <br/>
                    <label htmlFor="bioEN">
                        <TranslatableText dictionary={{
                            EN: "Bio EN",
                            RU: "Биография EN",
                            CH: "艺廊 EN",
                        }}/>
                    </label>
                    <textarea name="bioRU" cols="30" rows="10" defaultValue={this.state.data.bioEN}
                              onChange={this.handleBioEN}/>
                    <br/>
                    <label htmlFor="bioRU">
                        <TranslatableText dictionary={{
                            EN: "Bio RU",
                            RU: "Биография RU",
                            CH: "艺廊 RU",
                        }}/>
                    </label>
                    <textarea name="bioRU" cols="30" rows="10" defaultValue={this.state.data.bioRU}
                              onChange={this.handleBioRU}/>
                    <br/>
                    <label htmlFor="bioCH">
                        <TranslatableText dictionary={{
                            EN: "Bio CH",
                            RU: "Биография CH",
                            CH: "艺廊 CH",
                        }}/>
                    </label>
                    <textarea name="bioCH" cols="30" rows="10" defaultValue={this.state.data.bioCH}
                              onChange={this.handleBioCH}/>
                    <br/>
                    <form onSubmit={this.handleUploadImage}>
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
                                            ? <div className="alert alert-success">Загружено. Вставте этот код в текст: {`\<img src="${this.state.image}" alt=""\/\>`} </div>
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
                </form>
            </div>
        </div>
    }
}

export default withRouter(AboutEdit);
import React from "react";
import {withRouter} from "react-router";
import axios from "axios";
import {TranslatableText} from "../../../App";
import cookies from "react-cookies";

class ArticleAdd extends React.Component {
    constructor(props) {
        super(props);

        axios.post("/api/v1/users/checkToken", {token: cookies.load("token")}).then((data) => {
            if (data.data.response === "NOT_TOKEN") {
                this.props.history.push("/admin/login");
            }
        });

        this.state = {
            data: {},
            titleEN: "",
            titleRU: "",
            titleCH: "",
            descEN: "",
            descRU: "",
            descCH: "",
            textEN: "",
            textRU: "",
            textCH: "",
            response: "",
            image: "",
            imageResponse: "",
        };
        
        this.save = this.save.bind(this);

        this.handleTitleEN = this.handleTitleEN.bind(this);
        this.handleTitleRU = this.handleTitleRU.bind(this);
        this.handleTitleCH = this.handleTitleCH.bind(this);

        this.handleDescEN = this.handleDescEN.bind(this);
        this.handleDescRU = this.handleDescRU.bind(this);
        this.handleDescCH = this.handleDescCH.bind(this);

        this.handleTextEN = this.handleTextEN.bind(this);
        this.handleTextRU = this.handleTextRU.bind(this);
        this.handleTextCH = this.handleTextCH.bind(this);

        this.handleUploadImage = this.handleUploadImage.bind(this);

        this.getAbout();
    }

    handleTitleEN = (e) => {
        this.setState({titleEN: e.target.value});
    };

    handleTitleRU = (e) => {
        this.setState({titleRU: e.target.value});
    };

    handleTitleCH = (e) => {
        this.setState({titleCH: e.target.value});
    };

    handleDescEN = (e) => {
        this.setState({descEN: e.target.value});
    };

    handleDescRU = (e) => {
        this.setState({descRU: e.target.value});
    };

    handleDescCH = (e) => {
        this.setState({descCH: e.target.value});
    };

    handleTextEN = (e) => {
        this.setState({textEN: e.target.value});
    };

    handleTextRU = (e) => {
        this.setState({textRU: e.target.value});
    };

    handleTextCH = (e) => {
        this.setState({textCH: e.target.value});
    };

    save = () => {
        console.log(this.textEN);
        axios.post("/api/v1/news/add", {
            token: cookies.load("token"),
            titleEN: this.state.titleEN,
            titleRU: this.state.titleRU,
            titleCH: this.state.titleCH,
            descEN: this.state.descEN,
            descRU: this.state.descRU,
            descCH: this.state.descCH,
            textEN: this.state.textEN,
            textRU: this.state.textRU,
            textCH: this.state.textCH,
            image: this.state.image,
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
        data.append("fileTitle", "image_" + Date.now() + ".jpg");

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
                    <label htmlFor="titleEN">
                        <TranslatableText dictionary={{
                            EN: "Title EN",
                            RU: "Имя EN",
                            CH: "艺廊 EN",
                        }}/>
                    </label>
                    <input type="text" name="titleEN" defaultValue={this.state.data.titleEN}
                           onChange={this.handleTitleEN}/>
                    <br/>
                    <label htmlFor="titleRU">
                        <TranslatableText dictionary={{
                            EN: "Title RU",
                            RU: "Имя RU",
                            CH: "艺廊 RU",
                        }}/>
                    </label>
                    <input type="text" name="titleRU" defaultValue={this.state.data.titleRU}
                           onChange={this.handleTitleRU}/>
                    <br/>
                    <label htmlFor="titleCH">
                        <TranslatableText dictionary={{
                            EN: "Title CH",
                            RU: "Имя CH",
                            CH: "艺廊 CH",
                        }}/>
                    </label>
                    <input type="text" name="titleCH" defaultValue={this.state.data.titleCH}
                           onChange={this.handleTitleCH}/>
                    <br/>
                    <label htmlFor="descEN">
                        <TranslatableText dictionary={{
                            EN: "Desc EN",
                            RU: "Краткое описание EN",
                            CH: "艺廊 EN",
                        }}/>
                    </label>
                    <input type="text" name="descEN" defaultValue={this.state.data.descEN}
                           onChange={this.handleDescEN}/>
                    <br/>
                    <label htmlFor="descRU">
                        <TranslatableText dictionary={{
                            EN: "Desc RU",
                            RU: "Краткое описание RU",
                            CH: "艺廊 RU",
                        }}/>
                    </label>
                    <input type="text" name="descRU" defaultValue={this.state.data.descRU}
                           onChange={this.handleDescRU}/>
                    <br/>
                    <label htmlFor="descCH">
                        <TranslatableText dictionary={{
                            EN: "Desc CH",
                            RU: "Краткое описание CH",
                            CH: "艺廊 CH",
                        }}/>
                    </label>
                    <input type="text" name="descCH" defaultValue={this.state.data.descCH}
                           onChange={this.handleDescCH}/>
                    <br/>
                    <label htmlFor="textEN">
                        <TranslatableText dictionary={{
                            EN: "Text EN",
                            RU: "Текст EN",
                            CH: "艺廊 EN",
                        }}/>
                    </label>
                    <textarea name="textRU" cols="30" rows="10" defaultValue={this.state.data.textEN}
                              onChange={this.handleTextEN}/>
                    <br/>
                    <label htmlFor="textRU">
                        <TranslatableText dictionary={{
                            EN: "Text RU",
                            RU: "Текст RU",
                            CH: "艺廊 RU",
                        }}/>
                    </label>
                    <textarea name="textRU" cols="30" rows="10" defaultValue={this.state.data.textRU}
                              onChange={this.handleTextRU}/>
                    <br/>
                    <label htmlFor="textCH">
                        <TranslatableText dictionary={{
                            EN: "Text CH",
                            RU: "Текст CH",
                            CH: "艺廊 CH",
                        }}/>
                    </label>
                    <textarea name="textCH" cols="30" rows="10" defaultValue={this.state.data.textCH}
                              onChange={this.handleTextCH}/>
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
                                            ? <div className="alert alert-success">Загружено</div>
                                            : null
                                    }
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-primary card-button-bottom">Загрузка фото</button>
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

export default withRouter(ArticleAdd);
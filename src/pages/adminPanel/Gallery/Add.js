import React from "react";
import axios from "axios";
import cookies from "react-cookies";


class GalleryAdd extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            type: "",
            alt: "",
            src: "",
            response: null,
            imageResponse: null,
            _id: null
        };

        this.handleType = this.handleType.bind(this);
        this.handleAlt = this.handleAlt.bind(this);
        this.handleSrc = this.handleSrc.bind(this);
        this.handleUploadImage = this.handleUploadImage.bind(this);
        this.add = this.add.bind(this);
    }

    handleType = (e) => {
        this.setState({type: e.target.value});
    };

    handleAlt = (e) => {
        this.setState({alt: e.target.value});
    };

    handleSrc = (e) => {
        this.setState({src: e.target.value});
    };

    add = () => {
        axios.post("/api/v1/gallery/add", {
            token: cookies.load("token"),
            type: this.state.type,
            alt: this.state.alt,
            src: this.state.src,
        }).then((res) => {
            this.setState({response: res.data.response, _id: res.data._id});
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
            this.setState({src: data.data.url, imageResponse: data.data.response}, () => console.log(this.state));
        });
    };

    render() {
        return <div className="page">
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title">Добавление авто</h2>
                    <br/>
                    <form>
                        <div className="form-group">
                            <label htmlFor="type">Тип</label>
                            <select className="form-control" name="type" onChange={this.handleType}>
                                <option value="photo" defaultChecked={true}>Фото</option>
                                <option value="youtube">YouTube</option>
                            </select>
                        </div>
                        {
                            this.state.type === "photo"
                                ? <div>
                                    <div className="form-group">
                                        <label htmlFor="alt">Описание</label>
                                        <input type="text" className="form-control" name="alt" onChange={this.handleAlt}/>
                                    </div>
                                    <div className="card">
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
                                    </div>
                                </div>
                                : null
                        }
                        {
                            this.state.type === "youtube"
                                ? <div>
                                    <div className="form-group">
                                        <label htmlFor="src">Ссылка на видео в YouTube</label>
                                        <input type="text" className="form-control" name="src" onChange={this.handleSrc}/>
                                    </div>
                                </div>
                                : null
                        }
                        <div className="form-group">
                            {
                                this.state.response === "DONE"
                                    ?
                                    <div className="alert alert-success">Создано</div>
                                    : null
                            }
                        </div>
                    </form>
                </div>
                <button type="button" className="btn btn-primary card-button-bottom" onClick={this.add}>Создание
                </button>
            </div>
        </div>
    }
}

export default GalleryAdd;
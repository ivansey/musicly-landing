import React from "react";
import {withRouter} from "react-router";
import {TranslatableText} from "../App";

class Projects extends React.Component {

    render() {
        document.addEventListener("DOMContentLoaded", function () {
            let lazyloadImages = document.querySelectorAll("img.lazy");
            let lazyloadThrottleTimeout;

            let lazyload = () => {
                if (lazyloadThrottleTimeout) {
                    clearTimeout(lazyloadThrottleTimeout);
                }

                lazyloadThrottleTimeout = setTimeout(() => {
                    let scrollTop = window.pageYOffset;
                    lazyloadImages.forEach((img) => {
                        if (img.offsetTop < (window.innerHeight + scrollTop)) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                        }
                    });
                    if (lazyloadImages.length === 0) {
                        document.removeEventListener("scroll", lazyload);
                        window.removeEventListener("resize", lazyload);
                        window.removeEventListener("orientationChange", lazyload);
                    }
                }, 20);
            }

            document.addEventListener("scroll", lazyload);
            window.addEventListener("resize", lazyload);
            window.addEventListener("orientationChange", lazyload);
        });
        return <div className="page" id="page">
            <div className="block">
                <br/>
                <div className="text">
                    <pre>
                                <p className="title">
                                    <TranslatableText dictionary={{
                                        EN: "Projects",
                                        RU: "Проекты",
                                        CH: "项目",
                                    }}/>
                                </p>
                                <br/>
                                <img src="/p001.jpg" alt=""/>
                                <img src="/p002.jpg" alt=""/>
                                <img src="/p003.jpg" alt=""/>
                                <img src="/p004.JPG" alt=""/>
                                <img src="/p005.JPG" alt=""/>
                                <img src="/p006.JPG" alt=""/>
                                <img src="/p007.JPG" alt=""/>
                                <img src="/p008.JPG" alt=""/>
                                <img src="/p009.JPG" alt=""/>
                                <img src="/p010.JPG" alt=""/>
                                <img src="/p011.jpg" alt=""/>
                            </pre>
                </div>
            </div>
        </div>
    }
}

export default withRouter(Projects);
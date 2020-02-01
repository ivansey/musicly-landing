import React from "react";
import {withRouter} from "react-router";
import {TranslatableText} from "../App";

class Backstage extends React.Component {

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
                                        EN: "Repertoire",
                                        RU: "Репертуар",
                                        CH: "Repertoire",
                                    }}/>
                                </p>
                                <br/>
                        <p className="subtitle">We are waiting for a perfomance with London Symphonic orchestra</p> <br/>
                               <img  src="/002.JPG" alt=""/><br/>
                               <img  src="/003.JPG" alt=""/><br/>
                               <img  src="/004.JPG" alt=""/><br/>
                               <br/>
                        <p className="subtitle">I am so proud of all people who always beside me and would like to say thanks all of them. Bcz perfomance is not only about music. But style, good pictures and videos and others important things</p> <br/>
                                <img  src="/101.jpg" alt=""/><br/>
                               <img  src="/102.jpg" alt=""/><br/>
                               <img  src="/103.jpg" alt=""/><br/>
                               <img  src="/104.jpg" alt=""/><br/>
                               <img  src="/105.JPG" alt=""/><br/>
                               <img  src="/106.jpg" alt=""/><br/>
                               <br/>
                        <p className="subtitle">"Elves" I remember the first performing day like it was yestarday.</p> <br/>
                                <img  src="/201.jpg" alt=""/><br/>
                               <img  src="/202.jpeg" alt=""/><br/>
                               <img  src="/203.jpg" alt=""/><br/>
                               <img  src="/205.jpeg" alt=""/><br/>
                               <br/>
                        <p className="subtitle">How we made our video "The song from a secret garden" An amazing sunrise in Guangzhou.</p> <br/>
                                <img  src="/301.JPG" alt=""/><br/>
                                <br/>
                        <p className="subtitle">Musicians are so serious in work and so funny between each other. This is a truth: humor gives you a long life. So my friends  listen to music and smile my friends</p> <br/>
                                <img  src="/401.jpg" alt=""/><br/>
                               <img  src="/402.jpg" alt=""/><br/>
                               <img  src="/403.jpg" alt=""/><br/>
                               <img  src="/404.jpg" alt=""/><br/>
                               <img  src="/405.JPG" alt=""/><br/>
                               <img  src="/406.jpg" alt=""/><br/>
                               {/*<img  src="/407.jpg" alt="" className="rotate90"/><br/>*/}
                            </pre>
                </div>
            </div>
        </div>
    }
}

export default withRouter(Backstage);
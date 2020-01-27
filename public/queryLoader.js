const QueryLoader = {
    /*
     * QueryLoader		Preload your site before displaying it!
     * Author:			Gaya Kessler
     * Date:			23-09-09
     * URL:				http://www.gayadesign.com
     * Version:			1.0
     *
     * A simple jQuery powered preloader to load every image on the page and in the CSS
     * before displaying the page to the user.
     */

    overlay: "",
    loadBar: "",
    preloader: "",
    items: [],
    doneStatus: 0,
    doneNow: 0,
    selectorPreload: "body",
    ieLoadFixTime: 2000,
    ieTimeout: "",

    init: () => {
        if (navigator.userAgent.match(/MSIE (\d+(?:\.\d+)+(?:b\d*)?)/) === "MSIE 6.0,6.0") {
            //break if IE6
            return false;
        }
        if (QueryLoader.selectorPreload === "body") {
            QueryLoader.spawnLoader();
            QueryLoader.getImages(QueryLoader.selectorPreload);
            QueryLoader.createPreloading();
        } else {
            $(document).ready(function () {
                QueryLoader.spawnLoader();
                QueryLoader.getImages(QueryLoader.selectorPreload);
                QueryLoader.createPreloading();
            });
        }

        //help IE drown if it is trying to die :)
        // eslint-disable-next-line no-implied-eval
        QueryLoader.ieTimeout = setTimeout("QueryLoader.ieLoadFix()", QueryLoader.ieLoadFixTime);
    },

    ieLoadFix: () => {
        const ie = navigator.userAgent.match(/MSIE (\d+(?:\.\d+)+(?:b\d*)?)/);
        if (ie[0].match("MSIE")) {
            while ((100 / QueryLoader.doneStatus) * QueryLoader.doneNow < 100) {
                QueryLoader.imgCallback();
            }
        }
    },

    imgCallback: function () {
        QueryLoader.doneNow++;
        QueryLoader.animateLoader();
    },

    getImages: (selector) => {
        const everything = $(selector).find("*:not(script)").each(function () {
            let url = "";

            if ($(this).css("background-image") != "none") {
                url = $(this).css("background-image");
            } else if (typeof ($(this).attr("src")) != "undefined" && $(this).attr("tagName").toLowerCase() == "img") {
                url = $(this).attr("src");
            }

            url = url.replace("url(\"", "");
            url = url.replace("url(", "");
            url = url.replace("\")", "");
            url = url.replace(")", "");

            if (url.length > 0) {
                QueryLoader.items.push(url);
            }
        });
    },

    createPreloading: () => {
        QueryLoader.preloader = $("<div></div>").appendTo(QueryLoader.selectorPreload);
        $(QueryLoader.preloader).css({
            height: "0px",
            width: "0px",
            overflow: "hidden"
        });

        const length = QueryLoader.items.length;
        QueryLoader.doneStatus = length;

        for (let i = 0; i < length; i++) {
            const imgLoad = $("<img/>");
            $(imgLoad).attr("src", QueryLoader.items[i]);
            $(imgLoad).unbind("load");
            $(imgLoad).bind("load", function () {
                QueryLoader.imgCallback();
            });
            $(imgLoad).appendTo($(QueryLoader.preloader));
        }
    },

    spawnLoader: () => {
        let position;
        let width;
        let height;
        if (QueryLoader.selectorPreload === "body") {
            height = $(window).height();
            width = $(window).width();
            position = "fixed";
        } else {
            height = $(QueryLoader.selectorPreload).outerHeight();
            width = $(QueryLoader.selectorPreload).outerWidth();
            position = "absolute";
        }
        const left = $(QueryLoader.selectorPreload).offset()['left'];
        const top = $(QueryLoader.selectorPreload).offset()['top'];

        QueryLoader.overlay = $("<div></div>").appendTo($(QueryLoader.selectorPreload));
        $(QueryLoader.overlay).addClass("QOverlay");
        $(QueryLoader.overlay).css({
            position: position,
            top: top,
            left: left,
            width: width + "px",
            height: height + "px"
        });

        QueryLoader.loadBar = $("<div></div>").appendTo($(QueryLoader.overlay));
        $(QueryLoader.loadBar).addClass("QLoader");

        $(QueryLoader.loadBar).css({
            position: "relative",
            top: "50%",
            width: "0%"
        });
    },

    animateLoader: () => {
        const perc = (100 / QueryLoader.doneStatus) * QueryLoader.doneNow;
        if (perc > 99) {
            $(QueryLoader.loadBar).stop().animate({
                width: perc + "%"
            }, 500, "linear", function () {
                QueryLoader.doneLoad();
            });
        } else {
            $(QueryLoader.loadBar).stop().animate({
                width: perc + "%"
            }, 500, "linear", function () {
            });
        }
    },

    doneLoad: () => {
        let height;
//prevent IE from calling the fix
        clearTimeout(QueryLoader.ieTimeout);

        //determine the height of the preloader for the effect
        if (QueryLoader.selectorPreload === "body") {
            height = $(window).height();
        } else {
            height = $(QueryLoader.selectorPreload).outerHeight();
        }

        //The end animation, adjust to your likings
        $(QueryLoader.loadBar).animate({
            height: height + "px",
            top: 0
        }, 500, "linear", function () {
            $(QueryLoader.overlay).fadeOut(800);
            $(QueryLoader.preloader).remove();
        });
    }
};
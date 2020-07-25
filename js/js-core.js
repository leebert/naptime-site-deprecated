var js_c_defaultText = "👋 I'm Lee. I direct initiatives <br> and ship products for";
var js_c_hoverText = "👀 I'm Lee. I direct initiatives <br> and ship products for";
var js_c_defaultText_Small = "👋 I'm Lee. I direct initiatives and ship products for";
var js_c_hoverText_Small = "👀 I'm Lee. I direct initiatives and ship products for";
var js_c_textInterval;
var js_c_smallBreakPoint = 670;

window.addEventListener('load', js_c_load);

function js_c_load() {

    // localStorage.clear();

    js_c_initUI();
    js_c_updateStyleSheets();
    js_c_getTitleText(false);

    document.getElementById("js-one").addEventListener("click", js_c_handleLayout);
    document.getElementById("js-two").addEventListener("click", js_c_handleLayout);
    document.getElementById("js-light").addEventListener("click", js_c_handleStyling);
    document.getElementById("js-dark").addEventListener("click", js_c_handleStyling);
    document.getElementById("js-logo").addEventListener("click", js_c_handleLogo);
    document.getElementById("js-article-one").addEventListener("mouseenter", js_c_handleArticleEnter);
    document.getElementById("js-article-two").addEventListener("mouseenter", js_c_handleArticleEnter);
    document.getElementById("js-article-three").addEventListener("mouseenter", js_c_handleArticleEnter);
    document.getElementById("js-article-one").addEventListener("mouseleave", js_c_handleArticleLeave);
    document.getElementById("js-article-two").addEventListener("mouseleave", js_c_handleArticleLeave);
    document.getElementById("js-article-three").addEventListener("mouseleave", js_c_handleArticleLeave);
}

function js_c_handleLayout(event) {
    if (event.target.id == "js-one") {
        document.getElementById("js-one").classList.add("link--selected");
        document.getElementById("js-two").classList.remove("link--selected");
        document.getElementById("js-one").style.pointerEvents = "none";
        document.getElementById("js-two").style.pointerEvents = "auto";
        localStorage.setItem("layout", "one");
    }
    else {
        document.getElementById("js-one").classList.remove("link--selected");
        document.getElementById("js-two").classList.add("link--selected");
        document.getElementById("js-one").style.pointerEvents = "auto";
        document.getElementById("js-two").style.pointerEvents = "none";
        localStorage.setItem("layout", "two");
    }
    js_c_updateStyleSheets()
}

function js_c_handleStyling(event) {
    if (event.target.id == "js-light") {
        document.getElementById("js-light").classList.add("link--selected");
        document.getElementById("js-dark").classList.remove("link--selected");
        document.getElementById("js-light").style.pointerEvents = "none";
        document.getElementById("js-dark").style.pointerEvents = "auto";
        localStorage.setItem("styling", "light");
    }
    else {
        document.getElementById("js-light").classList.remove("link--selected");
        document.getElementById("js-dark").classList.add("link--selected");
        document.getElementById("js-light").style.pointerEvents = "auto";
        document.getElementById("js-dark").style.pointerEvents = "none";
        localStorage.setItem("styling", "dark");
    }    
    js_c_updateStyleSheets();
}

function js_c_initUI() {
    if (localStorage.getItem("layout") == null) {
        localStorage.setItem("layout", "one");
        localStorage.setItem("styling", "light");
    }

    if (localStorage.getItem("layout") == "one") {
        document.getElementById("js-one").classList.add("link--selected");
        document.getElementById("js-one").style.pointerEvents = "none";
    }
    else {
        document.getElementById("js-two").classList.add("link--selected");
        document.getElementById("js-two").style.pointerEvents = "none";
    }

    if (localStorage.getItem("styling") == "light") {
        document.getElementById("js-light").classList.add("link--selected");
        document.getElementById("js-light").style.pointerEvents = "none";
    }
    else {
        document.getElementById("js-dark").classList.add("link--selected");
        document.getElementById("js-dark").style.pointerEvents = "none";
    }
}

function js_c_updateStyleSheets() {
    document.getElementById("layout-css").href = "css/l-" + localStorage.getItem("layout") + ".css";
    document.getElementById("styling-css").href = "css/s-" + localStorage.getItem("layout") + "-" + localStorage.getItem("styling") + ".css";
    document.getElementById("basics-css").href = "css/h-" + localStorage.getItem("layout") + ".css";
}

function js_c_handleLogo(event) {
    alert("Coooooool !😎");
}

function js_c_handleArticleEnter(event) {
    clearInterval(js_c_textInterval);
    document.getElementById("js-header-copy").innerHTML = js_c_getTitleText(true);
    if (document.body.clientWidth <= js_c_smallBreakPoint) { return; }
    if (event.target.id.includes("one")) {
        document.getElementById("js-description-one").style.visibility = "visible";
    }
    else if (event.target.id.includes("two")) {
        document.getElementById("js-description-two").style.visibility = "visible";

    }
    else if (event.target.id.includes("three")) {
        document.getElementById("js-description-three").style.visibility = "visible";

    }
}

function js_c_handleArticleLeave(event) {
    js_c_textInterval = setInterval(function(){ document.getElementById("js-header-copy").innerHTML = js_c_getTitleText(false); }, 750);
    if (document.body.clientWidth <= js_c_smallBreakPoint) { return; }
    if (event.target.id.includes("one")) {
        document.getElementById("js-description-one").style.visibility = "hidden";
    }
    else if (event.target.id.includes("two")) {
        document.getElementById("js-description-two").style.visibility = "hidden";

    }
    else if (event.target.id.includes("three")) {
        document.getElementById("js-description-three").style.visibility = "hidden";

    }   
}

function js_c_getTitleText(isHovering) {
    if (document.body.clientWidth <= js_c_smallBreakPoint) {
        return isHovering ? js_c_hoverText_Small : js_c_defaultText_Small;
    }
    else {
        return isHovering ? js_c_hoverText : js_c_defaultText;
    }
}
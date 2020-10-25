var js_cmn_AboutDiv;
var js_cmn_AboutModalDiv;

function js_cmn_HandleScroll(){
    var w = window.innerHeight;
    var h = document.documentElement.scrollHeight;
    var t = document.documentElement.scrollTop;
    if (w + t < h) {
        if (!document.getElementsByTagName("FOOTER")[0].classList.contains("scroll-indicator")) {
            document.getElementsByTagName("FOOTER")[0].classList.add("scroll-indicator");
        }
    }
    else {
        document.getElementsByTagName("FOOTER")[0].classList.remove("scroll-indicator");
    }
}

function js_cmn_applyBlur(parent) {
    var children = parent.children;
    for (var i = 0; i < children.length; i++) {
        children[i].classList.remove("blurOut");
        children[i].classList.add("blurIn");
    }
    js_cmn_AboutModalDiv.classList.remove("slideOut");
    js_cmn_AboutModalDiv.classList.add("slideIn");
}

function js_cmn_removeBlur(parent) {
    var children = parent.children;
    for (var i = 0; i < children.length; i++) {
        children[i].classList.add("blurOut");
        children[i].classList.remove("blurIn");
    }
    js_cmn_AboutModalDiv.classList.add("slideOut");
    js_cmn_AboutModalDiv.classList.remove("slideIn");
}

function js_cmn_LoadAbout() {
    var body = document.getElementsByTagName("BODY")[0];
    js_cmn_AboutDiv = document.createElement("div");
    js_cmn_AboutDiv.classList.add("about");
    js_cmn_AboutDiv.classList.add("fadeIn");
    body.appendChild(js_cmn_AboutDiv);
    body.classList.add("modal-open");
    
    js_cmn_AboutModalDiv = document.createElement("div");
    js_cmn_AboutModalDiv.classList.add("about__modal");
    js_cmn_AboutDiv.appendChild(js_cmn_AboutModalDiv);

    var container = document.createElement("div");
    container.classList.add("about__content");
    js_cmn_AboutModalDiv.appendChild(container);

    var i = document.createElement("img");
    i.src = "assets/animated_headshot.gif";
    i.alt = "A photo of my ugly mug.";
    container.appendChild(i);

    var copy = document.createElement("div");
    copy.classList.add("about__copy");
    container.appendChild(copy);

    var h = document.createElement("h1");
    h.innerHTML = "👋 I'm Lee. I lead teams, direct initiatives, and ship products.";
    copy.appendChild(h);
    var p = document.createElement("p");
    p.innerHTML = "You are looking at a list of some things I’ve made over the years. What’s important to know is that every single thing on this list exists, or once existed...people have used, paid for, learned from, and added to their life experience with the items on this list.<br><br>These things exist because of thoughtful exploration, hard work, and collaboration with others.";
    copy.appendChild(p);

    var close = document.createElement("a");
    close.innerHTML = "back to the stuff";
    close.href = "#";
    close.addEventListener("click", js_cmn_CloseAbout);
    js_cmn_AboutModalDiv.appendChild(close);

    js_cmn_applyBlur(body);
}

function js_cmn_CloseAbout() {
    var body = document.getElementsByTagName("BODY")[0];
    js_cmn_removeBlur(body);
    js_cmn_AboutDiv.classList.add("fadeOut");
    setTimeout(function() { 
        document.getElementsByTagName("BODY")[0].removeChild(js_cmn_AboutDiv);
        document.getElementsByTagName("BODY")[0].classList.remove("modal-open");
    }, 300);
}

function js_cmn_AssignClick() {
    const logos = document.getElementsByClassName("logo");
    for (var i = 0; i < logos.length; i++) {
        logos[i].addEventListener("click", js_cmn_NavToOld);
    }
}

function js_cmn_NavToOld() {
    window.location.replace("v-one/index.html");
}
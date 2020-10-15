var js_cmn_AboutDiv;

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

async function js_cmn_FetchHtmlAsText(url) {
    return await (await fetch(url)).text();
}

async function js_cmn_LoadAbout() {
    js_cmn_AboutDiv = document.createElement("div");
    js_cmn_AboutDiv.classList.add("about");
    var body = document.getElementsByTagName("BODY")[0];
    body.appendChild(js_cmn_AboutDiv);
    body.classList.add("modal-open");
    
    var about = document.createElement("div");
    about.classList.add("about__modal");
    js_cmn_AboutDiv.appendChild(about);

    var container = document.createElement("div");
    container.classList.add("about__content");
    about.appendChild(container);

    var i = document.createElement("img");
    i.src = "assets/animated_headshot.gif";
    i.alt = "A photo of my ugly mug.";
    container.appendChild(i);

    var copy = document.createElement("div");
    copy.classList.add("about__copy");
    container.appendChild(copy);

    var h = document.createElement("h1");
    h.innerHTML = "👋 I'm Lee. I lead teams, direct initiatives and ship products.";
    copy.appendChild(h);
    var p = document.createElement("p");
    p.innerHTML = "This portfolio is a collection of stories about the things I love to do. I talk about the imperfect process of making things, finding insights in ambiguity, collaborating with enthusiastic people, and helping others do their best work.<br><br>My know-how comes from hands-on experience as an agency and start-up owner, a creative leader, a teacher, a developer, and a designer.";
    copy.appendChild(p);

    var close = document.createElement("a");
    close.innerHTML = "back to the stuff";
    close.href = "#";
    close.addEventListener("click", js_cmn_closeAbout);
    about.appendChild(close);
}

function js_cmn_closeAbout() {
    document.getElementsByTagName("BODY")[0].removeChild(js_cmn_AboutDiv);
    document.getElementsByTagName("BODY")[0].classList.remove("modal-open");
}
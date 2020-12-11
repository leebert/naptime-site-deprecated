var js_cmn_AboutDiv;
var js_cmn_AboutModalDiv;
var js_cmn_LightBoxDiv;
var js_cmn_LightBoxImg;

function js_cmn_SetUpCommonStuff() {
    document.addEventListener("scroll", js_cmn_HandleScroll);
    window.addEventListener("resize", js_cmn_HandleResize);
    js_cmn_HandleScroll();
}

function js_cmn_SetUpLightBox() {
    const imgs = document.getElementsByTagName("IMG");
    for(var i = 0; i < imgs.length; i++) {
        imgs[i].addEventListener("click", js_cmn_ShowLightBox);
    }
}

function js_cmn_ShowLightBox(event) {
    var body = document.body;
    js_cmn_LightBoxDiv = document.createElement("div");
    js_cmn_LightBoxDiv.classList.add("lightbox");
    js_cmn_LightBoxDiv.classList.add("fadeIn");
    js_cmn_LightBoxDiv.style.height = body.clientHeight + "px";
    js_cmn_LightBoxDiv.style.width = body.clientWidth + "px";
    body.appendChild(js_cmn_LightBoxDiv);
    body.classList.add("modal-open");
    js_cmn_LightBoxDiv.addEventListener("click", js_cmn_HideLightBox);
    js_cmn_LightBoxImg = document.createElement("img");
    js_cmn_LightBoxImg.classList.add("lightbox__image");
    js_cmn_LightBoxImg.src = event.target.src;
    js_cmn_LightBoxImg.alt = event.target.alt;
    js_cmn_SetBoundingBox(js_cmn_LightBoxImg, body, event.target);
    js_cmn_LightBoxDiv.appendChild(js_cmn_LightBoxImg);
    js_cmn_applyBlur(body, js_cmn_LightBoxImg);
}

function js_cmn_HideLightBox() {
    if (!document.body.classList.contains("modal-open")) { return; }
    var body = document.body;
    js_cmn_removeBlur(body, js_cmn_LightBoxImg);
    js_cmn_LightBoxDiv.classList.add("fadeOut");
    setTimeout(function() { 
        document.body.removeChild(js_cmn_LightBoxDiv);
        document.body.classList.remove("modal-open");
    }, 300);
}

function js_cmn_SetBoundingBox(item, container, sourceItem) {
    var w = container.clientWidth * 0.95;
    var h = w * (sourceItem.height/sourceItem.width);        ;
    if (h + 64 > container.clientHeight) {
        h = container.clientHeight * 0.95 - 64;
        w = h * (sourceItem.width/sourceItem.height);        
    }
    const l = (container.clientWidth - w)/2;
    const t = document.documentElement.scrollTop + (window.innerHeight-h)/2 - 32;
    item.style.top = t + "px";
    item.style.left = l + "px";
    item.style.width = w + "px";
    item.style.height = h + "px";
}

function js_cmn_HandleScroll() {
    js_cmn_HandleScrollIndicatorDisplay();
}

function js_cmn_HandleResize() {
    js_cmn_HandleScrollIndicatorDisplay();
    js_cmn_HideLightBox();
}

function js_cmn_HandleScrollIndicatorDisplay() {
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

function js_cmn_AssignClick() {
    const logos = document.getElementsByClassName("logo");
    for (var i = 0; i < logos.length; i++) {
        logos[i].addEventListener("click", js_cmn_NavToOld);
    }
}

function js_cmn_applyBlur(parent, slider) {
    var children = parent.children;
    for (var i = 0; i < children.length; i++) {
        children[i].classList.remove("blurOut");
        children[i].classList.add("blurIn");
    }
    slider.classList.remove("slideOut");
    slider.classList.add("slideIn");
}

function js_cmn_removeBlur(parent, slider) {
    var children = parent.children;
    for (var i = 0; i < children.length; i++) {
        children[i].classList.add("blurOut");
        children[i].classList.remove("blurIn");
    }
    slider.classList.add("slideOut");
    slider.classList.remove("slideIn");
}

function js_cmn_LoadAbout() {
    var body = document.body;
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
    p.innerHTML = "You are looking at a subset of some of my favorite things I've made over the years.<br><br>What’s important to know is that every single thing on this list exists, or once existed...people have used them, learned from them, added to their life experience from them, and even paid for them.<br><br>These things exist because of thoughtful exploration, hard work, and most importantly: collaboration with others.";
    copy.appendChild(p);

    var close = document.createElement("a");
    close.innerHTML = "back to the stuff";
    close.href = "#";
    close.addEventListener("click", js_cmn_CloseAbout);
    js_cmn_AboutModalDiv.appendChild(close);

    js_cmn_applyBlur(body, js_cmn_AboutModalDiv);
}

function js_cmn_CloseAbout() {
    var body = document.body;
    js_cmn_removeBlur(body, js_cmn_AboutModalDiv);
    js_cmn_AboutDiv.classList.add("fadeOut");
    setTimeout(function() { 
        document.body.removeChild(js_cmn_AboutDiv);
        document.body.classList.remove("modal-open");
    }, 300);
}

function js_cmn_NavToOld() {
    window.location.replace("v-one/index.html");
}

function js_cmn_HandleNav(event) {
    event.preventDefault();
    const offset = 50;
    var children = document.body.children;
    for (var i = 0; i < children.length; i++) {
        children[i].classList.add(event.target.href.includes("index") ? "navFrom" : "navTo");
        children[i].style.animationDelay = ((offset/500) * i) + "s";
    }
    setTimeout(function() { 
        var fileName = location.href.split("/").slice(-1)[0]; 
        history.pushState(null, null, fileName);
        window.location.replace(event.target.href); 
    }, 250 + (offset * children.length));
}

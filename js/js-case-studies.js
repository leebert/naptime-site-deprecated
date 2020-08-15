
var j_cs_bigpicture;
var j_cs_spacer;
var j_cs_footer;

window.addEventListener('load', js_cs_load);

function js_cs_load() {
    document.getElementById("c-case-study-transition-shim").style.opacity = 0;
    j_cs_bigpicture = document.getElementsByClassName("c-cs-bigpicture")[0];
    j_cs_spacer = document.getElementsByClassName("c-cs-asidespacer")[0];
    j_cs_footer = document.getElementsByClassName("c-cs-footer")[0];
    window.addEventListener("resize", js_cs_handleResize);
    js_cs_handleResize();
}

function js_cs_handleResize(event) {
    if (window.innerWidth <= 670) {
        j_cs_spacer.style.height = "0px";
        document.getElementsByTagName("MAIN")[0].appendChild(document.getElementsByClassName("c-cs-nav")[0]);
        document.getElementsByTagName("MAIN")[0].appendChild(document.getElementsByClassName("c-cs-article-header")[0]);
        document.getElementsByTagName("MAIN")[0].appendChild(document.getElementsByClassName("c-cs-bigpicture")[0]);
        document.getElementsByTagName("MAIN")[0].appendChild(document.getElementsByClassName("c-cs-article")[0]);
        document.getElementsByTagName("MAIN")[0].appendChild(document.getElementsByClassName("c-cs-footer")[0]);
    }
    else {
        var h = window.innerHeight;
        var bp = j_cs_bigpicture.getBoundingClientRect();
        var ft = j_cs_footer.getBoundingClientRect();
        var actual = h - bp.top * 1.35 - bp.height - ft.height;
        var smallest = bp.height + ft.height - bp.top * 1.35;
        j_cs_spacer.style.height = actual < smallest ? "0" : actual + "px";
        document.getElementsByTagName("SECTION")[0].appendChild(document.getElementsByClassName("c-cs-bigpicture")[0]);
        document.getElementsByTagName("SECTION")[0].appendChild(document.getElementsByClassName("c-cs-asidespacer")[0]);
        document.getElementsByTagName("SECTION")[0].appendChild(document.getElementsByClassName("c-cs-footer")[0]);
    }
}
var js_d_HasSmallLayout = false;
var js_d_HasLargeLayout = false;

window.addEventListener('load', js_d_load);

function js_d_load() {
    // window.addEventListener("resize", js_d_handleResize);
    document.addEventListener("scroll", js_cmn_HandleScroll);
    // js_d_handleResize();
    js_cmn_HandleScroll();
}

function js_d_handleResize(event) {
    if (window.innerWidth <= 768 && !js_d_HasSmallLayout) {
        js_d_HasSmallLayout = true;
        js_d_HasLargeLayout = false;
        document.getElementsByTagName("MAIN")[0].appendChild(document.getElementsByTagName("NAV")[0]);
        document.getElementsByTagName("MAIN")[0].appendChild(document.getElementsByTagName("ASIDE")[0]);
        document.getElementsByTagName("MAIN")[0].appendChild(document.getElementsByTagName("HEADER")[0]);
        document.getElementsByTagName("MAIN")[0].appendChild(document.getElementsByTagName("ARTICLE")[0]);
    }
    else if (window.innerWidth > 768 && !js_d_HasLargeLayout) {
        js_d_HasSmallLayout = false;
        js_d_HasLargeLayout = true;
        document.getElementsByTagName("BODY")[0].appendChild(document.getElementsByTagName("ASIDE")[0]);
    }
}
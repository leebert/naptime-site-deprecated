

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
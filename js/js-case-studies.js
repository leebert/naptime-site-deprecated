
window.addEventListener('load', js_cs_load);

function js_cs_load() {
    if (localStorage.getItem("layout") != "one") {
        document.getElementById("c-case-study-transition-shim").style.transition = "none";
    }
    document.getElementById("c-case-study-transition-shim").style.opacity = 0;
}
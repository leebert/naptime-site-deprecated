// structure is: link title, resource type, resource url, design, code, words, year
var js_c_data = [
    {title: "An augmented reality game", type: "page", url: "stackimalsar.html", design: true, code: true, words: false, year: 2021},
    {title: "A sound visualizer", type: "page", url: "funsize/vibez.html", design: true, code: true, words: false, year: 2021},
    {title: "An iOS Scouting App for Directors & Cinematographers", type: "page", url: "cinescope.html", design: true, code: true, words: false, year: 2020},
    {title: "A SaaS Platform for Data Scientists", type: "page", url: "alegion-saas.html", design: true, code: false, words: true, year: 2020},
    {title: "A Video Annotation Tool for Data Labelers", type: "page", url: "alegion-va.html", design: true, code: false, words: false, year: 2020},
    // {title: "A Video Timeline Prototype", type: "page", url: "alegion-proto.html", design: false, code: true, words: false, year: 2020},
    // {title: "Lots Marketing Content", type: "page", url: "alegion-marketing.html", design: true, code: true, words: true, year: 2020},
    // {title: "A Case Study for Data Labeling", type: "page", url: "alegion-case-study.html", design: false, code: false, words: true, year: 2020},
    // {title: "A Content Review Portal for Data Scientists", type: "page", url: "alegion-qc-portal.html", design: true, code: false, words: false, year: 2019},
    {title: "A Design Token Plugin for Figma", type: "external", url: "https://www.figma.com/community/plugin/767048666042724266/Design-Tokenizer", design: true, code: true, words: true, year: 2019},
    {title: "An iOS Art Experiment Using AR", type: "external", url: "https://medium.com/@leebert/augmented-art-cards-475689e877bd", design: true, code: true, words: false, year: 2019},
    {title: "A Machine Learning Product for Cybersecurity Analysts", type: "page", url: "duo-ueba.html", design: true, code: false, words: false, year: 2019},
    {title: "An Introduction to Computer Science Course for UT Austin", type: "page", url: "ut-cs.html", design: false, code: true, words: true, year: 2018},
    // {title: "A Building Maintenance App Using AR", type: "page", url: "honeywell-building.html", design: true, code: true, words: false, year: 2018},
    // {title: "A Thermostat Upgrade Assistant App Using AR", type: "page", url: "honeywell-upgrade.html", design: true, code: false, words: true, year: 2018},
    {title: "An iOS Design Case Study", type: "external", url: "https://medium.com/@leebert/designing-cinescope-v2-3e443f93b238", design: false, code: false, words: true, year: 2018},
    {title: "An iOS Development Case Study", type: "external", url: "https://medium.com/@leebert/developing-cinescope-v2-c6ab1639b727", design: false, code: false, words: true, year: 2018},
    // {title: "A Responsive Design System for a Flight Data Company's Website", type: "page", url: "flightaware-site.html", design: true, code: false, words: false, year: 2017},
    {title: "An iOS App for Airline Travelers & Pilots", type: "page", url: "flightaware-app.html", design: true, code: true, words: false, year: 2016},
    {title: "Austin's First Ride-Sharing Startup", type: "page", url: "heyride.html", design: true, code: true, words: true, year: 2013},
    {title: "A Mobile Design & Development Agency", type: "page", url: "bbb.html", design: true, code: true, words: true, year: 2011},
];

var js_c_ContentHolder;
var js_c_Filter = 0; //0 == none, 1 == design, 2 == code, 3 == words
var js_c_StartYear = 2021;
var js_c_EndYear = 2011;
var js_c_LastButton;

window.addEventListener('load', js_c_load);

function js_c_load() {
    js_c_ContentHolder = document.getElementById("js_main");
    js_c_LastButton = document.getElementById("js_filter_0");
    js_c_LastButton.addEventListener("click", js_c_HandleFilter);
    js_c_LastButton.classList.toggle("selected--all");
    document.getElementById("js_filter_1").addEventListener("click", js_c_HandleFilter);
    document.getElementById("js_filter_2").addEventListener("click", js_c_HandleFilter);
    document.getElementById("js_filter_3").addEventListener("click", js_c_HandleFilter);
    js_c_loadContent();
    js_cmn_SetUpCommonStuff();
}

function js_c_HandleFilter(event) {
    var n = Number(event.target.id.charAt(event.target.id.length - 1));
    var l = Number(js_c_LastButton.id.charAt(event.target.id.length - 1));
    if (n == l) { return; }
    js_c_Filter = n;
    js_c_CycleButtonStyle(js_c_LastButton);
    if (!js_c_LastButton || (js_c_LastButton.id != event.target.id)) { 
        js_c_CycleButtonStyle(event.target); 
        js_c_LastButton = event.target;
    }
    else {
        js_c_LastButton = null;
    }
    js_c_loadContent()
    js_cmn_HandleScroll();
}

function js_c_CycleButtonStyle(button) {
    if (!button) { return; }
    var n = Number(button.id.charAt(button.id.length - 1));
    var mod = "all";
    if (n == 1) {
        mod = "design";
    }
    else if (n == 2) {
        mod = "code";
    }
    else if (n == 3) {
        mod = "words";
    }
    button.classList.toggle("selected--" + mod);
}

function js_c_loadContent() {
    js_c_ContentHolder.innerHTML = "";

    for (var i = js_c_StartYear; i >= js_c_EndYear; i--) {
        var links = js_c_GetLinks(i);
        if (links == 0) { continue; }
        var group = document.createElement("div");
        group.classList.add("content");
        var timeline = document.createElement("div");
        timeline.classList.add("content__timeline");
        timeline.innerHTML = i;
        group.appendChild(timeline);
        if (i != js_c_EndYear) {
            var line =  document.createElement("div");
            line.classList.add("content__timeline-line");
            timeline.appendChild(line);
        }
        var linkList = document.createElement("div");
        linkList.classList.add("content__links");
        group.appendChild(linkList);
        for (link of links) {
            var container = document.createElement("div");
            container.classList.add("content__link");
            container.appendChild(js_c_GetTypes(link.design, link.code, link.words));
            var item = document.createElement("a");
            item.href = link.url;
            if (link.type == "external") {
                item.target = "_blank";
            }
            else {
                item.addEventListener("click", js_cmn_HandleNav);
            }
            item.textContent = link.title;
            container.appendChild(item);
            linkList.appendChild(container);
        }
        js_c_ContentHolder.appendChild(group);
        if (i != js_c_EndYear) {
            var padder = document.createElement("div");
            padder.classList.add("content__padder");
            linkList.appendChild(padder);
        }
    }
}

function js_c_GetLinks(year) {
    if (js_c_Filter == 1) {
        return js_c_data.filter(link => link.year == year && link.design == true);
    }
    else if (js_c_Filter == 2) {
        return js_c_data.filter(link => link.year == year && link.code == true);
    }
    else if (js_c_Filter == 3) {
        return js_c_data.filter(link => link.year == year && link.words == true);
    }
    return js_c_data.filter(link => link.year == year);
}

function js_c_GetTypes(design, code, words) {
    var container = document.createElement("div");
    container.classList.add("content__types");
    var d = document.createElement("div");
    d.classList.add("type");
    d.classList.add("type__" + (design ? "" : "no-") + "design");
    container.appendChild(d);
    var c = document.createElement("div");
    c.classList.add("type");
    c.classList.add("type__" + (code ? "" : "no-") + "code");
    container.appendChild(c);
    var w = document.createElement("div");
    w.classList.add("type");
    w.classList.add("type__" + (words ? "" : "no-") + "words");
    container.appendChild(w);
    return container;
}
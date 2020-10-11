// structure is: link title, resource type, resource url, design, code, words, year
var js_c_data = [
    {title: "A Scouting App for Directors & Cinematographers", type: "", url: "", design: true, code: true, words: true, year: 2020},
    {title: "A SaaS Product for Data Scientists", type: "", url: "", design: true, code: false, words: true, year: 2020},
    {title: "A Video Annotation Tool for Data Labelers", type: "", url: "", design: true, code: false, words: true, year: 2020},
    {title: "Interaction Prototypes", type: "", url: "", design: true, code: true, words: false, year: 2020},
    {title: "Website Content for Branding & Marketing", type: "", url: "", design: true, code: true, words: true, year: 2020},
    {title: "A Case Study for Data Labeling", type: "", url: "", design: false, code: false, words: true, year: 2020},
    {title: "A Content Review Portal for Data Scientists", type: "", url: "", design: true, code: false, words: true, year: 2019},
    {title: "A Design Token Plugin for Figma", type: "", url: "", design: true, code: true, words: true, year: 2019},
    {title: "An Interactive Art Experiment Using AR", type: "", url: "", design: true, code: true, words: false, year: 2019},
    {title: "A Machine Learning Behavioral Tool for Cybersecurity Analysts", type: "", url: "", design: true, code: false, words: true, year: 2019},
    {title: "An Introducton to Computer Science Course for UT Austin", type: "", url: "", design: false, code: false, words: true, year: 2018},
    {title: "A Building Maintenance App Using AR", type: "", url: "", design: true, code: true, words: false, year: 2018},
    {title: "A Thermostat Upgrade Assistant App Using AR", type: "", url: "", design: true, code: false, words: true, year: 2018},
    {title: "Two Case Studies on iOS Design & Development", type: "", url: "", design: false, code: false, words: true, year: 2018},
    {title: "An iOS App for Airline Travelers & Pilots", type: "", url: "", design: true, code: true, words: false, year: 2017},
    {title: "An Responsive Design System for a Flight Data Company's Website", type: "", url: "", design: true, code: false, words: false, year: 2017},
    {title: "Austin's First Ride-Sharing Startup", type: "", url: "", design: true, code: true, words: true, year: 2013},
    {title: "A Mobile Design & Development Agency", type: "", url: "", design: true, code: true, words: true, year: 2011},
        ];

var js_c_ContentHolder;
var js_c_Filter = 0; //0 == none, 1 == design, 2 == code, 3 == words
var js_c_StartYear = 2020;
var js_c_EndYear = 2011;

window.addEventListener('load', js_c_load);

function js_c_load() {
    js_c_ContentHolder = document.getElementById("js_main");
    document.getElementById("js_filter_1").addEventListener("click", js_c_HandleFilter);
    document.getElementById("js_filter_2").addEventListener("click", js_c_HandleFilter);
    document.getElementById("js_filter_3").addEventListener("click", js_c_HandleFilter);
    js_c_loadContent()
}

function js_c_HandleFilter(event) {
    js_c_Filter = js_c_Filter == Number(event.target.id.charAt(event.target.id.length - 1)) ? 0 : Number(event.target.id.charAt(event.target.id.length - 1));
    js_c_loadContent()
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
        var line =  document.createElement("div");
        line.classList.add("content__timeline-line");
        timeline.appendChild(line);
        var linkList = document.createElement("div");
        linkList.classList.add("content__links");
        group.appendChild(linkList);
        for (link of links) {
            var container = document.createElement("div");
            var item = document.createElement('a');
            item.href = "#";
            item.textContent = link.title;
            container.append(item)
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
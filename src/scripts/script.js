window.onload = function() {
    defaultContent();    
    textSlider('details-content', 'details__button', 'details__active_true');
    textSlider('services-content', 'services__button', 'services__active_true');
    addListener('services__button', 'click', loadGraphCircular, servicesPercent);
    addListener('features__gallery-item', 'mouseleave', resizeContainer);
    addListener('team__content-upper', 'mouseenter', overlayElement);
    addListener('team__content-upper', 'mouseleave', overlayElement);
    addListener('team__button', 'click', slideTeam, teamSliderData);
    addListener('testimonials__button', 'click', slideTestimonial, testimonialSliderData);
    addListener('map__button', 'click', displayMap, mapData);
    addListener('blog__button', 'click', slideBlog, blogSliderData);
    addListener('price__content', 'mouseenter', priceUp);
    addListener('price__content', 'mouseleave', priceDown);
    addListener('contact-form__form', 'submit', validateForm);
    addListener('subscribe__form', 'submit', validateForm);
    mqxl.addListener(getGallery);
    mqlg.addListener(getGallery);
    mqmd.addListener(getGallery);
    mqsm.addListener(getGallery);
};

const details = {
    btnHeart: getContent1,
    btnMouse: getContent2,
    btnLamp: getContent3,
    btnPlug: getContent4,
    btnPlay: getContent5,
    btnWork: getContent6,
    btnRepair: getContent7,
    teamSlider1: getContent9,
    testimonialSlider1: getContent12,
    blogSlider1: getContent15,
};
const testimonialSliderData = {
    rdbtnClass: 'testimonials__button',
    srcChecked: "../assets/img/icon-team-radio-checked.png",
    src: "../assets/img/icon-team-radio.png",
    testimonialSlider1: getContent12,
    testimonialSlider2: getContent13,
    testimonialSlider3: getContent14,
}
const teamSliderData = {
    rdbtnClass: 'team__button',
    srcChecked: "../assets/img/icon-team-radio-checked.png",
    src: "../assets/img/icon-team-radio.png",
    teamSlider1: getContent9,
    teamSlider2: getContent10,
    teamSlider3: getContent11,
}
const teamChartData = {
    teamSlider1: ['chart__inner_width_70', 'chart__inner_width_90', 'chart__inner_width_30'],
    teamSlider2: ['chart__inner_width_50', 'chart__inner_width_35', 'chart__inner_width_90'],
    teamSlider3: ['chart__inner_width_90', 'chart__inner_width_90', 'chart__inner_width_30']
}
const mapData = {
    classSearch: '.map__curtain',    
};
const priceData = {
    priceSlider1: getContent18,
    priceSlider2: getContent19,
    priceSlider3: getContent20,    
}
const priceInfo = {
    priceSlider1: getContent21,
    priceSlider2: getContent22,
    priceSlider3: getContent23,    
}
const blogSliderData = {
    rdbtnClass: 'blog__button',
    srcChecked: "../assets/img/icon-blog-button-checked.png",
    src: "../assets/img/icon-blog-button.png",
    blogSlider1: getContent15,
    blogSlider2: getContent16,
    blogSlider3: getContent17,
}
const servicesPercent = {
    btnPlug: [70, 30, 90],
    btnPlay: [20, 85, 65],
    btnWork: [80, 40, 70],
    btnRepair: [45, 65, 85],
}
const mqxl = window.matchMedia('(min-width: 1200px)');
const mqlg = window.matchMedia('(min-width: 992px)');
const mqmd = window.matchMedia('(min-width: 768px)');
const mqsm = window.matchMedia('(min-width: 576px)');

const loadGraphCircular = function(event, action, dataObj) {
    const container = document.querySelector('.services__chart-container');
    const elems = Array.from(document.getElementsByClassName("services__chart"));
    elems.forEach((item, index) => {
        const arr = Array.isArray(dataObj) ? dataObj[index] : dataObj[event.target.id][index];
        getCirculeGraph(`servicesSvg${index}`, arr);
    });
}

// check screen onresize
const getMediaSize = function(e) {
    return e.media.slice(12).replace(/\D/g, "");
}
const resizeColumns = function(e) {
    let columns = 0;
    switch (getMediaSize(e)) {
        case '1200': columns = 4;
            break;
        case '992': columns = 3;
            break;
        case '768': columns = 3;
            break;
        case '576': columns = 2
            break;
        default : columns = 1;
            break;
    }
    return columns;
}
const onloadColumns = function() {
    const width = window.outerWidth;
    switch (true) {
        case (width < 576):
            return 1;
        case (width >= 576 && width < 768):
            return 2;
        case (width >= 768 && width < 992):
            return 3;
        case (width >= 992 && width < 1200):
            return 3;
        case (width >= 1200):
            return 4;
        default:
            return 1;
    }    
}
const getGallery = function(e) {
    const gallery = document.querySelector('.portfolio__gallery');    
    const elements = Array.from(document.querySelectorAll('.portfolio__gallery-container'));    
    let columns = (e !== undefined) ? resizeColumns(e) : onloadColumns();
    const arr = [];
    for(var i = 0; i < columns; i++) {
        const newDiv = document.createElement("div");
        newDiv.id = `portfolio-column-${i + 1}`;
        newDiv.className = 'portfolio__margin_all';
        arr.push(newDiv);
    }
    let counter = 0;
    const limit = elements.length / columns;
    arr.forEach((item, index) => {
        do {
            item.appendChild(elements.shift());
            ++counter;
        } while (counter < limit);
        counter = 0;
    });
    gallery.innerHTML = '';
    arr.forEach(item => {
        gallery.appendChild(item);
    });
}

const validateForm = function(event) {
    const content = event.target.email.value;
    if(!validateEmail(content)) {
        event.preventDefault();
        alert('Your email address is wrong :(');
    }
}
const validateEmail = function(email){ 
    const reg =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // /^([A-Za-z0-9_-.])+@([A-Za-z0-9_-.])+.([A-Za-z]{2,4})$/;
    if (reg.test(email)) {
     return true;
    }
    return false; 
} 
const scrollSmoothAnchor = function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();    
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
}
const priceUp = function(event) {
    event.preventDefault();
    event.target.children[1].innerHTML = priceData[event.target.id]();
    event.target.classList.add('price__content_reverse_true');
}
const priceDown = function(event) {
    event.preventDefault();
    event.target.children[1].innerHTML = priceInfo[event.target.id]();
    event.target.classList.remove('price__content_reverse_true');
}
const slideBlog = function(event, action, dataObj) {
    switchSlider(dataObj)
    document.getElementById("blog-slider").innerHTML = dataObj[event.target.id]();
}
const displayMap = function(event, action, dataObj) {
    if(fadeIn(dataObj.classSearch)) {        
        setTimeout(function(){ 
            const el2 = document.querySelector(".map__container");
        el2.classList.add('element_visibility_visible');
         }, 1000);
    }    
}
// fade an element in (the element is searched by the unique class)
const fadeIn = function(classSearch) {
    try {
        const el = document.querySelector(classSearch);
        el.classList.remove('is-paused');
        return true;
    } catch (error) {
        return false;
    }       
}
//
const getChart = function(charData = teamChartData['teamSlider1']) {
    const charts = Array.from(document.getElementsByClassName("team__graph-line"));
    charts.forEach((item, index) => {
        const html = `
            <div class="chart">
                <div class="chart__inner ${charData[index]}"></div>
            </div>
            `;
        item.innerHTML = html;
    });
}
// inject percent figure into html
const getPercent = function(charData = teamChartData['teamSlider1']) {    
    const percents = Array.from(document.getElementsByClassName("team__chart-percent"));
    percents.forEach((item, index) => {
        item.innerHTML = charData[index].slice(19) + '%';
    });
}

// change apperance of a slider's buttons
const switchSlider = function(dataObj) {   
        const buttons = Array.from(document.getElementsByClassName(dataObj.rdbtnClass));
        buttons.forEach(item => item.src = dataObj.src);
        event.target.src = dataObj.srcChecked;
        return event.target.id;
}

// change content of the team block slider
const slideTestimonial = function(event, action, dataObj) {
    switchSlider(dataObj);
    document.getElementById("testimonials-body").innerHTML = dataObj[event.target.id]();
}
// change content of the team block slider
const slideTeam = function(event, action, dataObj) {    
    switchSlider(dataObj);
    document.getElementById("team-body").innerHTML = dataObj[event.target.id]();
    addListener('team__content-upper', 'mouseenter', overlayElement);
    addListener('team__content-upper', 'mouseleave', overlayElement);
    getChart(teamChartData[event.target.id]);
    getPercent(teamChartData[event.target.id]);
}

const overlayElement = function(event, action) {
    switch (action) {
        case "mouseenter": event.target.classList.add('element_opacity_05');
            break;
            case "mouseleave": event.target.classList.remove('element_opacity_05');
            break;
        default:
            break;
    }  
}

const placeContainer = function() {
    const elem = document.getElementById("portfolio__inner");
    const height = getImgSize(document.getElementById("portfolio-img")).height;
    elem.style.height = height/16;
}
const getImgSize = function(img) {
    var i = new Image();
    i.src = img.src;
    return { width: i.width, height: i.height };
}

// add default content to the page
const defaultContent = function() {
    getChart();
    getPercent();
    scrollSmoothAnchor();
    getGallery();
    loadGraphCircular(null, null, servicesPercent['btnWork']);
};

const resizeContainer = function(e, action) {
    const media1 = window.matchMedia("(min-width: 768px)");
    const media2 = window.matchMedia("(min-width: 1px)");
    const target = e.target.classList;
    if(media1.matches) {
        action === 'mouseenter' ? target.add('features__gallery-item_width_50') : target.remove('features__gallery-item_width_50');
    } else if(media2.matches) {        
        action === 'mouseleave' ? target.remove('features__gallery-item_height_30em') : target.add('features__gallery-item_height_30em');
    }
}

const addListener = function (myClass, action, myFunc, dataObj) {
    // get all elements with the same class
    const elemArr = Array.from(document.getElementsByClassName(myClass));
    // travers through the array
    elemArr.forEach(item => {
        item.addEventListener(action, function(event) {
            // add function to the element
            myFunc(event, action, dataObj);
        }, false); // prevent 
    });
};

function textSlider(container, button, activeClass) {
    document.addEventListener('click', function (event) {
    	if (!event.target.classList.contains(button)) return;
        Array.from(event.target.parentNode.children).forEach(function(item){
            item.classList.remove(activeClass);
        });
        event.target.classList.add(activeClass);
        const parent = document.getElementById(container);
        parent.innerHTML = details[event.target.id]();
    }, false);
};
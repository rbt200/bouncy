window.onload = function() {
    defaultContent();
    slowScrolling();
    textSlider('details-content', 'details__button', 'details__active_true');
    textSlider('services-content', 'services__button', 'services__active_true');
    addListener('features__gallery-item', 'mouseenter', resizeContainer);
    addListener('features__gallery-item', 'mouseleave', resizeContainer);
    addListener('team__content-upper', 'mouseenter', overlayElement);
    addListener('team__content-upper', 'mouseleave', overlayElement);
    addListener('team__button', 'click', slideTeam, teamSliderData);
    addListener('testimonials__button', 'click', slideTestimonial, testimonialSliderData);
    addListener('map__button', 'click', displayMap, mapData);
    addListener('blog__button', 'click', slideBlog, blogSliderData);
    addListener('price__content', 'mouseenter', priceUp);
    addListener('price__content', 'mouseleave', priceDown);
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
// const temp = {
//     elem: ''
// };
// change the places of the price__content element
// const priceUpsidedown = function(event, action, dataObj) {
//     if(action === 'mouseenter') {
//         // temp.elem = JSON.parse(JSON.stringify(event.target.children[1].innerHTML));
//         event.target.children[1].innerHTML = dataObj[event.target.id]();
//     } else if(action === 'mouseleave') {
//         event.target.children[1].innerHTML = priceInfo[event.target.id]();
//         // temp.elem = '';
//     }
// }
// const initPrice = function() {
//     const arrHtml = Array.from(document.getElementsByClassName('price__content-lower'));
//     arrHtml.forEach((item, index) => {
//         item.innerHTML = priceInfo['priceSlider' + (index + 1)]();
//     });
// }
const priceUp = function(event) {
        event.target.children[1].innerHTML = priceData[event.target.id]();
        event.target.classList.add('price__content_reverse_true');
}
const priceDown = function(event) {
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
    document.getElementById('details-content').innerHTML = details.btnHeart();
    document.getElementById('services-content').innerHTML = details.btnPlug();
    document.getElementById('team-body').innerHTML = details.teamSlider1();
    document.getElementById('testimonials-body').innerHTML = details.testimonialSlider1();
    document.getElementById('blog-slider').innerHTML = details.blogSlider1();
    getChart();
    getPercent();
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
        document.getElementById(container).innerHTML = details[event.target.id]();
    }, false);
};



function slowScrolling() {
    
// собираем все якоря; устанавливаем время анимации и количество кадров
const anchors = [].slice.call(document.querySelectorAll('a[href*="#"]')),
animationTime = 300,
framesCount = 20;

    anchors.forEach(function(item) {        
    // каждому якорю присваиваем обработчик события
        item.addEventListener('click', function(e) {
        // убираем стандартное поведение
        e.preventDefault();

        // для каждого якоря берем соответствующий ему элемент и определяем его координату Y
        let coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top;

            // запускаем интервал, в котором
            let scroller = setInterval(function() {
            // считаем на сколько скроллить за 1 такт
            let scrollBy = coordY / framesCount;
            
            // если к-во пикселей для скролла за 1 такт больше расстояния до элемента
            // и дно страницы не достигнуто
            if(scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
              // то скроллим на к-во пикселей, которое соответствует одному такту
              window.scrollBy(0, scrollBy);
            } else {
              // иначе добираемся до элемента и выходим из интервала
              window.scrollTo(0, coordY);
              clearInterval(scroller);
            }
            // время интервала равняется частному от времени анимации и к-ва кадров
            }, animationTime / framesCount);
        });
    });
}
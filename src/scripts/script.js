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
        console.log(event.target.id);
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





// const dicreaseSizeFeature = function(e) {
//     const media1 = window.matchMedia("(min-width: 768px)");
//     const media2 = window.matchMedia("(min-width: 1px)");
//     if(media1.matches) {
//         e.target.classList.remove('features__gallery-item_width_50');
//     } else if(media2.matches) {
//         e.target.classList.remove('features__gallery-item_height_30em');
//     }   
// }

// const increaseSizeFeature = function(e) {  
//     const media1 = window.matchMedia("(min-width: 768px)");
//     const media2 = window.matchMedia("(min-width: 1px)");
//     if(media1.matches) {
//         e.target.classList.add('features__gallery-item_width_50');
//     } else if(media2.matches) {        
//         e.target.classList.add('features__gallery-item_height_30em');
//     }
// }

// function listenDetailBtn() {
//     const elemArr = Array.from(document.getElementsByClassName('details__button'));
//     elemArr.forEach(item => {
//         item.addEventListener('click', function (event) {
//             // if (!event.target.classList.contains('details__button')) return;
//             Array.from(event.target.parentNode.children).forEach(function(item){
//                 item.classList.remove(classActive);
//             });
//             event.target.classList.add(classActive);
//         }, false);
//     });
        
// }

// function makeActive(classSearch, classActive) {
//     const elemArr = Array.from(document.getElementsByClassName(classSearch));
//     elemArr.forEach(item => {
//         item.classList.remove(classActive);
//     });
// }


// add event listener to table
// var el = document.getElementById("outside");
// el.addEventListener("click", modifyText, false);

// function displayNone(className) {
//     const elementArr = document.getElementsByClassName(className);
//     Array.from(elementArr).forEach(item => item.style.display = "none");
// }

// function removeClass(className, rmClass) {
//     const elementArr = document.getElementsByClassName(className);
//     Array.from(elementArr).filter(item => {
//         if(item.classList.contains(rmClass)) {
//             item.classList.remove(rmClass)
//         }
//     });
// }

// function makeActive(classSearch, classActive) {
//     document.addEventListener('click', function (event) {
//     	if (!event.target.classList.contains(classSearch)) return;
//         Array.from(event.target.parentNode.children).forEach(function(item){
//             item.classList.remove(classActive);
//         });
//         event.target.classList.add(classActive);
//     }, false);
// }

// var classname = document.getElementsByClassName("classname");

// var myFunction = function() {
//     var attribute = this.getAttribute("data-myattribute");
//     alert(attribute);
// };

// for (var i = 0; i < classname.length; i++) {
//     classname[i].addEventListener('click', myFunction, false);
// }
///////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////
// // Listen to all clicks on the document
// document.addEventListener('click', function (event) {

// 	// If the event target doesn't match bail
// 	if (!event.target.classList.contains('details__button')) return;

//     // Otherwise, run your code...
//     alert(event.target.classList);

// }, false);
////////////////////////////////////////////////////////////////////////////

// const removeActiveState = function() {

// }

// const addListener = function (myClass, myFunc) {
//         // Listen to all clicks on the document
//     document.addEventListener('click', function (event) {

//     	// If the event target doesn't match bail
//     	if (!event.target.classList.contains(myClass)) return;

//         // Otherwise, run your code...
//         myFunc(event.target.classList);

//     }, false);
// };




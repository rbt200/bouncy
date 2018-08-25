window.onload = function() {
    defaultContent();
    slowScrolling();
    detailSlider();
    addListener('features__gallery-item', 'mouseenter', increaseSizeFeature);
    addListener('features__gallery-item', 'mouseleave', dicreaseSizeFeature);
};

const details = {
    btnHeart: detailsContainer1,
    btnMouse: detailsContainer2,
    btnLamp: detailsContainer3
};



const dicreaseSizeFeature = function(e) {
    // console.log(e.target.classList);
    const media1 = window.matchMedia("(min-width: 768px)");
    const media2 = window.matchMedia("(min-width: 1px)"); // .style.gridTemplateAreas = '"z z z" "a b c" "d e f"';
    if(media1.matches) {
        // console.log(e.target.parentNode);
        // // e.target.parentNode.style.gridTemplateAreas = '"whiskey" "vintage" "branding"';
        // e.target.classList.add('features__gallery__orientation_horizontal');
        e.target.classList.remove('features__gallery-item_width_50');
    } else if(media2.matches) {
        // console.log(e.target);
        e.target.classList.remove('features__gallery-item_height_30em');
    }   
}

const increaseSizeFeature = function(e) {
    // console.log(e.target.classList);    
    const media1 = window.matchMedia("(min-width: 768px)");
    const media2 = window.matchMedia("(min-width: 1px)");
    if(media1.matches) {
        e.target.parentNode.style.gridTemplateAreas = '"whiskey whiskey whiskey" "vintage" "branding"';
        // e.target.classList.add('features__gallery_orientation_horizontal');
        console.log(e.target.classList);
        e.target.classList.add('features__gallery-item_width_50');
    } else if(media2.matches) {        
        e.target.classList.add('features__gallery-item_height_30em');
    }
}


const addListener = function (myClass, action, myFunc) {
    // get all elements with the same class
    const elemArr = Array.from(document.getElementsByClassName(myClass));
    // travers through the array
    elemArr.forEach(item => {
        item.addEventListener(action, function(event) {
            // add function to the element
            myFunc(event);
        }, false); // prevent 
    });
};

// add default content to the page
const defaultContent = function() {
    document.getElementById('details-content').innerHTML = details.btnHeart();
};

function detailSlider() {
    document.addEventListener('click', function (event) {
    	if (!event.target.classList.contains('details__button')) return;
        Array.from(event.target.parentNode.children).forEach(function(item){
            item.classList.remove('details__active_true');
        });
        event.target.classList.add('details__active_true');
        console.log(event.target.id);
        document.getElementById('details-content').innerHTML = details[event.target.id]();
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




//grab showcase preview
var showcaseContainer = document.querySelector(".eureka-showcase-container");

showcaseContainer.addEventListener("click", function (event) {
    
    var clicked = event.target;
    var showcase = document.getElementsByClassName("eureka-showcase");
    //if user clicked on a preview image, display the showcase with that image.
    if (clicked.classList.contains('eureka-showcase-preview-img')) {
        var viewImage = document.getElementsByClassName("eureka-showcase-img");
        viewImage[0].src = clicked.src;
        //add filter class based on html attribute
        viewImage[0].className = "eureka-showcase-img "+"showcase-filter-" + clicked.getAttribute("data-showcase-filter");
        showcase[0].style.display="flex";
    } else {
        showcase[0].style.display="none";
    }
    
});

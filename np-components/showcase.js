//grab showcase preview
var preview = document.querySelector(".eureka-showcase-preview");

preview.addEventListener("click", function (event) {
    
    var clicked = event.target;

    //if user clicked on a preview image, display the showcase with that image.
    if (clicked.getElementsByClassName = "eureka-showcase-preview-img") {
        var viewImage = document.getElementsByClassName("eureka-showcase-img");
        var showcase = document.getElementsByClassName("eureka-showcase");
        viewImage[0].src = clicked.src;
        //add filter class based on html attribute
        viewImage[0].className = "eureka-showcase-img "+"showcase-filter-" + clicked.getAttribute("data-showcase-filter");
        showcase[0].style.display="flex";
    };
});

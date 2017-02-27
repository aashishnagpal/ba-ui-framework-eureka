window.onload = function () {
  var gallery = {
    init: function () {
      this.cacheDOM();
      this.bindEvent();
    },
    cacheDOM: function () {
      this.viewer = document.getElementsByClassName("c-gallery-viewer");
      this.img = document.getElementsByClassName("c-gallery--clickable");
      this.gallery = document.getElementsByClassName("c-gallery")[0];
    },
    bindEvent: function () {
      this.gallery.addEventListener("click", this.displayImg.bind(this));
    },
    displayImg: function (e) {
      if (e.target.classList.contains("c-gallery--clickable")) {
        var style = e.target.currentStyle || window.getComputedStyle(e.target, false),
        img = style.backgroundImage.slice(4, -1);
        this.viewer[0].style.backgroundImage = "url(" + img + ")";
      }
    }
  };

  gallery.init();
};

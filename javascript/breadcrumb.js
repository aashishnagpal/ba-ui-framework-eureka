window.onload = function () {

var breadcrumb = {
  init: function () {
    this.cacheDOM();
    this.bindEvent();
  },
  cacheDOM: function () {
    this.a = document.getElementsByClassName("c-breadcrumb__a--rbn");
  },
  bindEvent: function () {
    for (var i = 0; i < this.a.length; i++) {
      this.a[i].addEventListener("click",this.addClass.bind(this));
    }
  },
  addClass: function (e) {
    for (var i = 0; i < this.a.length; i++) {
      if (this.a[i].classList.contains("c-breadcrumb--act-col")) {
        this.a[i].classList.remove("c-breadcrumb--act-col");
      }
    }
    if (!e.target.classList.contains("c-breadcrumb--act-col")) {
      e.target.classList.add("c-breadcrumb--act-col");
    }
  }
};

breadcrumb.init();
};

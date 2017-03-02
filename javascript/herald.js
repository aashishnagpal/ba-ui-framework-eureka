(function(){
  var herald = {
    init: function () {
      this.cacheDOM();
      this.bindEvent();
    },
    cacheDOM: function () {
      this.classes = {
        chip: document.getElementsByClassName("herald__chip")[0],
        scroll: document.getElementsByClassName("herald__scroll")[0],
      };
    },
    bindEvent: function () {
      this.classes.chip.addEventListener("click",this.test.bind(this));
    },
    test: function () {
      this.classes.scroll.classList.toggle("herald-announce");
    }
  };
  herald.init();

})();

(function(){
  var herald = {
    init: function () {
      this.cacheDOM();
      this.bindEvent();
    },
    cacheDOM: function () {
      this.chip = document.getElementsByClassName("c-chip__media--o")[0];
      this.classes = {
        chip: document.getElementsByClassName("herald__chip")[0],
        scroll: document.getElementsByClassName("herald__scroll")[0],
        chipValue: document.getElementsByClassName("c-chip__media--o")[0].innerHTML
      };
    },
    bindEvent: function () {
      this.classes.chip.addEventListener("click",this.announce.bind(this));
    },
    announce: function () {
      this.classes.scroll.classList.toggle("herald-announce");
      this.chip.innerHTML = "X";
      if (!this.classes.scroll.classList.contains("herald-announce")) {
        this.chip.innerHTML = this.classes.chipValue;
      }
    }
  };
  herald.init();
})();

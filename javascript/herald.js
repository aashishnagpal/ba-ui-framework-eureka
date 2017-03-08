window.addEventListener("load", function () {
  var herald = {
    init: function () {
      this.cacheDOM();
      this.setUp();
      this.bindEvent();
    },
    cacheDOM: function () {
      this.component = document.getElementsByClassName("c-herald")[0];
      this.chip = document.getElementsByClassName("c-herald-c-chip__media--o")[0];
      this.ribbon = document.getElementsByClassName("c-herald__ribbon")[0];
      this.message = document.getElementsByClassName("c-herald__message")[0];
      this.scroll = document.getElementsByClassName("c-herald__scroll")[0];
      this.chipValue = this.chip.innerHTML;
    },
    setUp: function () {
      this.componentHeight = this.chip.offsetHeight + this.scroll.offsetHeight;
      this.messageHeight = this.message.offsetHeight + this.componentHeight;
      this.messageWidth = window.getComputedStyle(this.message).width;
      this.message.style.webkitTransform = "translateY(-" + this.messageHeight + "px)";
      this.message.style.height = this.messageHeight + "px";
      this.message.style.width = this.messageWidth;
    },
    bindEvent: function () {
      this.chip.addEventListener("click",this.announce.bind(this));
    },
    announce: function () {
      this.component.style.width = this.messageWidth;
      this.scroll.style.height = this.messageHeight + "px";
      this.scroll.style.width = this.messageWidth;
      this.component.classList.toggle("c-herald-announce");
      this.ribbon.classList.toggle("lengthen");
      this.scroll.classList.toggle("c-herald-announce");
      this.chip.innerHTML = "X";
      if (!this.scroll.classList.contains("c-herald-announce")) {
        this.chip.innerHTML = this.chipValue;
      }
    },
  };
  herald.init();
});

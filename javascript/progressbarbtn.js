(function () {
var progressToggler = {
  init: function () {
    this.cacheDOM();
    this.bindEvent();
  },
  cacheDOM: function () {
    this.pBtn = document.getElementsByClassName("c-progress-toggler")[0];
    this.pBar = document.querySelector("[data-animProgress='false']");
  },
  bindEvent: function () {
    this.pBtn.addEventListener("click", this.toggleIt.bind(this));
  },
  toggleIt: function () {

    this.pBar.classList.toggle("progress-animate");
    if (this.pBar.dataset.animprogress === "false") {
      this.pBar.dataset.animprogress = "true";
    } else {
      this.pBar.dataset.animprogress = "false";
    }
  }
};
progressToggler.init();
})();

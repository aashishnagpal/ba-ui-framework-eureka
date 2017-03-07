(function () {
  var demoWTF = {
    init: function () {
      this.cacheDOM();
      this.bindEvents();
    },
    cacheDOM: function () {
      this.wtfBtn = document.getElementById("wtf-try");
      this.component = document.getElementsByClassName("c-wtf")[0];
      this.component.style.display = "none";
    },
    bindEvents: function () {
      this.wtfBtn.addEventListener("click", this.activateWTF.bind(this));
    },
    activateWTF: function () {
      this.component.style.display = "block";
      dictionaryLinker.init();
    }
  };
  demoWTF.init();
})();

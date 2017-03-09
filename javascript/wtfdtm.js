(function () {
  var dictionaryLinker = {
    init: function () {
      this.cacheDOM();
      this.bindEvents();
    },
    cacheDOM: function () {
      this.ol = document.getElementsByClassName("c-wtf__list")[0];
      this.component = document.getElementsByClassName("c-wtf")[0];
      this.text = document.getElementsByClassName("wtf-text-container")[0];
      this.clear = document.getElementsByClassName("c-wtf__clear-all")[0];
      this.currentHeight = window.getComputedStyle(this.component).height;
    },
    bindEvents: function () {
      this.text.addEventListener("mouseup",this.lookUp.bind(this));
      this.component.addEventListener("mouseover",this.show.bind(this));
      this.component.addEventListener("mouseleave",this.hide.bind(this));
      this.clear.addEventListener("click",this.clearIt.bind(this));
    },
    lookUp: function () {
       this.highlighted = window.getSelection();
       var str = this.highlighted.toString();
      if (str !== "") {
        term = this.highlighted.getRangeAt(0);
        window.open('https://www.merriam-webster.com/dictionary/' + term, 'lookitup');
        this.createList();
      }
    },
    createList: function () {
      var newLI = document.createElement('li');
      this.newHeight = "";
      newLI.innerHTML = term.toString();
      this.ol.appendChild(newLI);
      this.newHeight = window.getComputedStyle(this.component).height;
      this.component.style.webkitTransform = "translateY(" + this.newHeight + ")";
    },
    show: function () {
      this.component.style.webkitTransform = "translateY(" + 0 + ")";
    },
    hide: function () {
      this.component.style.webkitTransform = "translateY(" + this.currentHeight + ")";
    },
    clearIt: function () {
      this.ol.innerHTML = "";
    }
  };
    dictionaryLinker.init();
})();

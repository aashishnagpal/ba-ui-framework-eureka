window.addEventListener("load", function () {
  var herald = {
    init: function () {
      this.cacheDOM();
      this.bindEvent();
      this.loadStyles();
    },
    cacheDOM: function () {
      this.component = document.getElementById("c-herald");
      this.content = document.getElementById("c-herald__content");
      this.trigger = document.getElementById("c-herald__trigger");
      this.furlBorder = document.getElementById("c-herald__furled-border");
      this.rbn = document.getElementById("c-herald__ribbon");
      this.messageHeight = this.content.offsetHeight;
      this.triggerValue = this.trigger.innerHTML;
    },
    bindEvent: function () {
      this.trigger.addEventListener("click",this.announce.bind(this));
    },
    announce: function () {
      this.component.classList.toggle("announce");
      this.rbn.classList.toggle("lengthen");
      this.trigger.innerHTML = "X";
      if (!this.component.classList.contains("announce")) {
        this.trigger.innerHTML = this.triggerValue;
      } else if (document.querySelector(".announce") !== null) {
        document.querySelector(".announce").style.height = this.messageHeight + "px";
      }
    },
    loadStyles: function () {
      this.component.classList.remove('no-js');
      this.trigger.classList.add("clickable");
      this.content.style.webkitTransform = "translateY(-" + this.messageHeight + "px)";
    }
  };
  herald.init();
});

(function () {

var inputSwitch = {
  init: function () {
    this.cacheDOM();
    this.bindEvents();
  },
  cacheDOM: function () {
    this.switch = document.getElementsByClassName("c-switch__slider")[0];
    this.checkbox = document.getElementById("c-input-switch");
  },
  bindEvents: function () {
    this.switch.addEventListener("click", this.toggleOn.bind(this));
  },
  toggleOn: function () {
    this.checkbox.checked = this.checkbox.checked ? false : true;
  }
};
inputSwitch.init();
})();

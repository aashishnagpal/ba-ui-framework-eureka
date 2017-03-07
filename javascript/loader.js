/**
 * Created by Aashish on 3/1/2017.
 */
var loader = (function () {
  'use strict';

  var show = function (id) {
    var loaderElement = document.getElementById(id) || document.querySelector('.loader');
    loaderElement.classList.remove('loader-overlay--hidden');
    loaderElement.classList.add('loader-overlay--visible');
    loaderElement.parentNode.classList.remove('loader-parent--scroll-show');
    loaderElement.parentNode.classList.add('loader-parent--scroll-hide');
  };

  var hide = function (id) {
    var loaderElement = document.getElementById(id) || document.querySelector('.loader');
    loaderElement.classList.remove('loader-overlay--visible');
    loaderElement.classList.add('loader-overlay--hidden');
    loaderElement.parentNode.classList.remove('loader-parent--scroll-hide');
    loaderElement.parentNode.classList.add('loader-parent--scroll-show');
  };

  var toggle = function (id) {
    var loaderElement = document.getElementById(id) || document.querySelector('.loader');
    loaderElement.classList.toggle('loader-overlay--visible');
    loaderElement.classList.toggle('loader-overlay--hidden');
    loaderElement.parentNode.classList.toggle('loader-parent--scroll-show');
    loaderElement.parentNode.classList.toggle('loader-parent--scroll-hide');
  };

  var init = function (id) {
    loader.show(id);
    loader.hide(id);
  };

  return {
    init: init,
    show: show,
    hide: hide,
    toggle: toggle
  };
})();

/**
 * Created by Aashish on 3/1/2017.
 */
var loader = (function () {
  'use strict';

  var show = function () {
    var loaderElement = document.getElementById('loader') || document.querySelector('.loader');

    loaderElement.classList.remove('loader-overlay--hidden');
    loaderElement.classList.add('loader-overlay--visible');

    var clientWindow = document.documentElement || document.body;
    clientWindow.setAttribute("style", "overflow: hidden;");
  };

  var hide = function () {
    var loaderElement = document.getElementById('loader') || document.querySelector('.loader');

    loaderElement.classList.remove('loader-overlay--visible');
    loaderElement.classList.add('loader-overlay--hidden');

    var clientWindow = document.documentElement || document.body;
    clientWindow.setAttribute("style", "overflow: auto;");
  };

  var toggle = function () {
    var loaderElement = document.getElementById('loader') || document.querySelector('.loader');

    loaderElement.classList.toggle('loader-overlay--visible');
    loaderElement.classList.toggle('loader-overlay--hidden');
  };

  return {
    show: show,
    hide: hide,
    toggle: toggle
  };
})();

(function () {
  loader.show();

  window.addEventListener('load', function () {
    loader.hide();
  });
})();

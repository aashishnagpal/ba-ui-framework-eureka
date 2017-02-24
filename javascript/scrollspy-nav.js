/**
 * Created by Aashish on 2/25/2017.
 */
(function () {
  'use strict';
  var nav = document.querySelector('.nav');
  var links = nav.querySelectorAll('a[href]:not([href="#"]');
  var targets = {};

  Array.prototype.forEach.call(links, function (element) {
    var id = element.hash.slice(1);
    targets[id] = {
      element: element.parentNode,
      position: document.getElementById(id).offsetTop
    }
  });


  var scrollspyNav = function () {
    var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

    for (var targetKey in targets) {
      var previousTarget = nav.querySelector('.nav__item--active');
      var currentTargetObj = targets[targetKey];
      // var target = document.querySelector('a[href="#'+section+'"]');
      if (currentTargetObj.position <= (scrollPosition + (2 * nav.offsetHeight))) {
        if (previousTarget !== null)
          previousTarget.classList.remove('nav__item--active');
        currentTargetObj.element.classList.add('nav__item--active');
      }
    }
  };
  window.addEventListener('load', function () {
    window.addEventListener('scroll', scrollspyNav);
  });

})();
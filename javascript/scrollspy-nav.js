/**
 * Created by Aashish on 2/25/2017.
 */
(function () {
  'use strict';
  var nav = document.querySelector('.nav[data-scrollspy]');
  var links = nav.querySelectorAll('a[href]:not([href="#"]');
  var targets = [];

  var clientHeight = window.innerHeight;
  Array.prototype.forEach.call(links, function (element) {
    var domTarget = document.getElementById(element.hash.slice(1));
    targets.push({
      navItem: element.parentNode,
      domTarget: domTarget,
      top: domTarget.offsetTop,
      height: domTarget.offsetHeight + domTarget.offsetTop
    });
  });


  var scrollspyNav = function () {
    var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

    if (nav.classList.contains('nav--horizontal')) {
      scrollPosition += nav.offsetHeight;
    }

    for (var i = 0; i < targets.length; i++) {
      var checkTarget = targets[i];

      if (scrollPosition >= checkTarget.top && scrollPosition <= checkTarget.top + checkTarget.height) {
        checkTarget.navItem.classList.add('nav__item--active');
        if (i > 0) {
          targets[i - 1].navItem.classList.remove('nav__item--active');
        }
      } else {
        checkTarget.navItem.classList.remove('nav__item--active');
      }
    }
  };

  window.addEventListener('load', function () {
    window.addEventListener('scroll', scrollspyNav);
  });

})();
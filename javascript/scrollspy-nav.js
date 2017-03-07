/**
 * Created by Aashish on 2/25/2017.
 */
(function () {
  'use strict';

  var body = document.documentElement || document.body;
  body.scrollTop = 0;

  // Fetch navigation list and the anchor tags within it to form the scrollspy checkpoints
  var nav = document.querySelector('.nav[data-scrollspy]');
  var links = nav.querySelectorAll('a[href]:not([href="#"]');
  var targets = [];

  // Create the target checkpoints array.
  Array.prototype.forEach.call(links, function (element) {
    var domTarget = document.getElementById(element.hash.slice(1));
    targets.push({
      navItem: element.parentNode, // this is used to mark the active nav item
      top: window.pageYOffset + domTarget.getBoundingClientRect().top, // this will become the start bound condition for
      // active nav item
      bottom: window.pageYOffset + domTarget.getBoundingClientRect().bottom // this will become the end bound condition for active nav item
    });
    element.parentNode.addEventListener('click', function() {
      this.classList.add('nav__item--active');
    });
  });


  var scrollspyNav = function () {
    // read current scroll position
    var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

    // add navigation list's bottom position to scroll for more precision (only in case of horizontal navigation
    if (nav.classList.contains('nav--horizontal')) {
      scrollPosition += nav.getBoundingClientRect().bottom;
    }

    for (var i = 0; i < targets.length; i++) {
      var checkTarget = targets[i];

      if (scrollPosition >= checkTarget.top && scrollPosition <= checkTarget.bottom) { // activate item
        checkTarget.navItem.classList.add('nav__item--active');
        // if (i > 0) {
        //   targets[i - 1].navItem.classList.remove('nav__item--active');
        // }
      } else {
        checkTarget.navItem.classList.remove('nav__item--active'); //deactivate item
      }
    }
  };

  window.addEventListener('load', function () {
    window.addEventListener('scroll', scrollspyNav);
  });

})();
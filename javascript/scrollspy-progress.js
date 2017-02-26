/**
 * Created by Aashish on 2/25/2017.
 */
(function () {
  'use strict';
  var scrollspy = document.querySelector('.scrollspy[data-spyOn]');
  var contentId = scrollspy.getAttribute('data-spyOn');
  var content = document.getElementById(contentId);

  var initialOffset = scrollspy.offsetTop;

  var scrollspyProgress = function () {
    var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

    if (initialOffset > scrollPosition) {
      scrollspy.classList.remove('scrollspy--sticky');
    }
    else if (scrollspy.offsetTop <= scrollPosition) {
      scrollspy.classList.add('scrollspy--sticky');
    }

    var clientHeight = window.innerHeight;
    var scrollableHeight = content.offsetHeight - clientHeight;
    var translate = (((scrollableHeight - scrollPosition) * 101) / scrollableHeight);
    document.querySelector('.scrollspy--progress').style.transform = 'translateX(-' + translate + "%)";
  };

  window.addEventListener('load', function () {
    window.addEventListener('scroll', scrollspyProgress);
  });

})();
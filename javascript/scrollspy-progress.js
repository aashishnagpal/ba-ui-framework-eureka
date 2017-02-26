/**
 * Created by Aashish on 2/25/2017.
 */
(function () {
  'use strict';
  var scrollspy = document.querySelector('.scrollspy[data-spyOn]');
  var progressBar = scrollspy.querySelector('.c-progressbar__meter');
  var label = progressBar.querySelector('.c-progress__label');

  var contentId = scrollspy.getAttribute('data-spyOn');
  var content = document.getElementById(contentId);

  var clientHeight = window.innerHeight;
  var initialOffset = scrollspy.offsetTop;

  progressBar.style.width = '0%';

  var scrollspyProgress = function () {
    var scrollPosition = (document.documentElement.scrollTop || document.body.scrollTop);

    if (initialOffset > scrollPosition) {
      scrollspy.classList.remove('scrollspy--sticky');
    }
    else if (scrollspy.offsetTop <= scrollPosition) {
      scrollspy.classList.add('scrollspy--sticky');
    }

    var scrollableHeight = content.offsetHeight - clientHeight;
    var percentageCompleted = (((scrollPosition - initialOffset) * 100) / scrollableHeight).toFixed(0);

    if (percentageCompleted < 0)
      percentageCompleted = 0;
    else if (percentageCompleted > 100)
      percentageCompleted = 100;

    progressBar.style.width = percentageCompleted + '%';
    progressBar.setAttribute('aria-valuenow', percentageCompleted);
    label.innerHTML = percentageCompleted + '%';
  };

  window.addEventListener('load', function () {
    window.addEventListener('scroll', scrollspyProgress);
  });

})();
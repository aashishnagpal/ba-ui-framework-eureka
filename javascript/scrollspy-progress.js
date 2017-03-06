/**
 * Created by Aashish on 2/25/2017.
 */
(function () {
  'use strict';
  // Fetch scrollspy nav, progressbar within it and the label
  // these three will get modified based on the scroll position
  var scrollspy = document.querySelector('.scrollspy[data-spy-on]');
  var progressBar = scrollspy.querySelector('.c-progressbar__meter');
  var label = progressBar.querySelector('.c-progress__label');

  // Fetch the content on which the scrollspy would work
  var contentId = scrollspy.getAttribute('data-spy-on');
  var content = document.getElementById(contentId);

  // initial boundary values
  var clientHeight = window.innerHeight;
  var initialOffset = scrollspy.offsetTop;
  progressBar.style.width = '0%';

  var scrollspyProgress = function () {
    // read current scroll position
    var scrollPosition = (document.documentElement.scrollTop || document.body.scrollTop);

    // make the scrollspy progress bar sticky
    if (initialOffset > scrollPosition) {
      scrollspy.classList.remove('scrollspy--sticky');
    }
    else {
      scrollspy.classList.add('scrollspy--sticky');
    }

    // Calculate the percentage completion for scrollspy
    var scrollableHeight = content.getBoundingClientRect().height - clientHeight;
    var percentageCompleted = (((scrollPosition - initialOffset) * 100) / scrollableHeight).toFixed(0);

    // Round to nearest hundred in case the calculated value go outside bounds
    // This can happen as the dom elements are moved in and out of the bounding box (the window)
    if (percentageCompleted < 0)
      percentageCompleted = 0;
    else if (percentageCompleted > 100)
      percentageCompleted = 100;

    // Set the values
    progressBar.style.width = percentageCompleted + '%';
    progressBar.setAttribute('aria-valuenow', percentageCompleted);
    label.innerHTML = percentageCompleted == 0 ? '' : percentageCompleted + '%';
  };

  window.addEventListener('load', function () {
    window.addEventListener('scroll', scrollspyProgress);
  });

})();
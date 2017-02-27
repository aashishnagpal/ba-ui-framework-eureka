/**
 * Created by Aashish on 2/26/2017.
 */
(function () {
  'use strict';
  var containers = Array.from(document.querySelectorAll('.tabs'));

  if (containers !== null && containers.length > 0) {
    containers.forEach(function (container) {

      var tabsArr = Array.from(container.querySelectorAll('.tabs__tab'));
      var panesArr = Array.from(container.querySelectorAll('.tabs__pane'));
      if (tabsArr !== null && tabsArr.length > 0) {

        tabsArr.forEach(function (tab, index) {
          tab.addEventListener('click', function () {
            tabsArr.forEach(function (element) {
              element.classList.remove('tabs__tab--active');
            });
            panesArr.forEach(function (element) {
              element.classList.remove('tabs__pane--active');
            });

            tab.classList.add('tabs__tab--active');
            panesArr[index].classList.add('tabs__pane--active');
          });
        });

      }

    });
  }

})();

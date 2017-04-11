(function () {
    loader.init('loader-site');
    loader.show('loader-site');
    window.addEventListener('load', function () {
      loader.hide('loader-site');
    });

    loader.init('loader-demo');
    loader.show('loader-demo');
  })();

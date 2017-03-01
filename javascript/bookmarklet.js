(function() {
  window.addEventListener('keydown', _keysDown, false);
  window.addEventListener('keyup', _keysUp, false);

  var keysPressed = [];
  var bookmarkId = 0;

  function _keysDown(e) {
    keysPressed[e.keyCode] = true;

    // keyboard shortcut Shift(16) + Control(17) + M(77)
    if (keysPressed[16] && keysPressed[17] && keysPressed[77]) {
      _bookmarkSelection();
    }

    // keyboard shortcut Shift(16) + Control(17) + X(88)
    if (keysPressed[16] && keysPressed[17] && keysPressed[88]) {
      _clearBookmark();
    }

  }

  function _keysUp(e) {
    keysPressed[e.keyCode] = false;
  }

  function _bookmarkSelection() {
    console.log('Shortcut initiated!');
    var selection = window.getSelection();
    var bookmarkNode;
    console.log(selection);
    if (selection.anchorNode) {
      bookmarkNode = selection.anchorNode.parentNode;
      if (bookmarkNode.dataset.bookmark === undefined) {
        bookmarkNode.setAttribute('data-bookmark', bookmarkId);
        bookmarkNode.style.color = 'red';
        bookmarkId += 1;
      } else {
        console.log('already bookmarked!');
      }
    }
  }

  function _clearBookmark() {
    var selection = window.getSelection();
    var bookmarkNode = selection.anchorNode.parentNode;
    if (bookmarkNode && bookmarkNode.dataset.bookmark) {
      bookmarkNode.removeAttribute('data-bookmark');
      bookmarkNode.style.color = 'green';
      console.log('bookmark removed!');
    }
  }

})();


(function() {
  var deleteBtns = document.querySelectorAll('.c-chip__delete');

  function deleteChip(deleteBtn) {
    deleteBtn.parentNode.remove();
  }

  for (var i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener('click', function() {
      deleteChip(this);
    });
  }
})();
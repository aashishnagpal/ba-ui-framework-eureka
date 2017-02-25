(function() {
  var demoBadge = document.querySelector('.c-badge-demo');
  var todoItems = document.querySelectorAll('.demo-badge__list li');
  var todoCheckboxes = document.querySelectorAll('.demo-badge__list li input');
  var closeBtns = document.querySelectorAll('.demo-badge__list li .fa');

  demoBadge.innerHTML = todoItems.length;

  function updateBadge() {
    console.log('enter func');
    var checkboxes = document.querySelectorAll('.demo-badge__list li input');
    var count = 0;
    for (var i = 0; i < checkboxes.length; i++) {
      console.log('enter loop');
      if (!checkboxes[i].checked) {
        console.log('one item checked');
        count++;
      }
    }

    if (count > 0) {
      demoBadge.innerHTML = count;
      console.log(demoBadge.innerHTML);
    } else {
      demoBadge.innerHTML = '';
    }
  }

  for (var j = 0; j < todoItems.length; j++) {
    todoCheckboxes[j].addEventListener('click', updateBadge);
    closeBtns[j].addEventListener('click', function() {
      this.parentNode.remove();
      updateBadge();
    });
  }
})();

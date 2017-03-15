(function() {
  var notes = JSON.parse(window.sessionStorage.getItem('inline-notes'));
  var noteList = document.querySelector('.c-inline-note__list');

  function printNotes() {
    while (noteList.lastChild) {
      noteList.removeChild(noteList.lastChild);
    }
    for (var prop in notes){
      var listItem = document.createElement('li');
      var listSelectedTxt = document.createElement('span');
      listItem.classList.add('c-list__item', 'c-list--ol__item');
      listSelectedTxt.classList.add('c-inline-note__list-selected-txt');
      listSelectedTxt.innerHTML = notes[prop].selectedText;
      listItem.appendChild(listSelectedTxt);
      listItem.innerHTML += ": " + notes[prop].note;
      noteList.appendChild(listItem);
    }
  }

  printNotes();
})();
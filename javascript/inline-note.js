(function() {
  var inlineNote = document.querySelector('.c-inline-note');
  var notes = {};
  var index = 0;
  var activeIndex;
  // var selectedTxt = '';



  function createNote() {
    var selectedTxt = window.getSelection();

    if (selectedTxt !== '') {
      var highlight = document.createElement('span');
      var note = document.createElement('textarea');
      highlight.className = 'c-inline-note__highlight';
      highlight.setAttribute('id', 'hl' + index);
      note.className = 'c-inline-note__note';
      note.setAttribute('id', 'note' + index);
      note.style.display = 'block';
      activeIndex = index;
      index++;
      // highlight the selected text
      selectedTxt.getRangeAt(0).surroundContents(highlight);
      // add note
      highlight.appendChild(note);

      // add open feature to highlight
      highlight.addEventListener('click', function(e) {
        console.log("style: " + note.style.display);
        e.stopPropagation();

        // note.style.display = 'block';
        openNote(this.getAttribute('id'));
      });
    }
  }
  
  function openNote(highlightId) {
    var i = highlightId.slice(2);
    document.getElementById('note' + i).style.display = 'block';
    activeIndex = i;
  }
  
  function closeNote() {
    if (activeIndex === undefined) return;
    document.getElementById('note' + activeIndex).style.display = 'none';

    // activeIndex = undefined;
  }
  function removeNote() {
    
  }
  function clearNotes() {
    
  }
  function printNotes() {
    
  }

  document.body.addEventListener('click', closeNote);

  // If shift, control and i keys are all pressed down, create a note
  document.addEventListener('keydown', function(e) {
    if (e.keyCode === 73 && e.shiftKey && e.ctrlKey) {
      closeNote();
      createNote();
    }
  });
})();
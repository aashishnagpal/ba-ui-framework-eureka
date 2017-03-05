(function(){

    /* Get all demo items from page */
    var demoItems = document.querySelectorAll('.c-tooltip-help');
    var demoItemsArray = [];

    var prevIndex = -1;
    var nextIndex = -1;


    /* Add items from nodeList into an array */
    var x;
    for(x = 0; x < demoItems.length; x++){
        demoItemsArray.push(demoItems[x]);
    }
    
    /* sort Array */

    demoItemsArray.sort(function(a,b){
        if(a.attributes['help-order'].value > b.attributes['help-order'].value){
            return 1;
        }else{
            if(a.attributes['help-order'].value < b.attributes['help-order'].value){
                return -1;
            }else{
                return 0;
            }
        }
    });



    var i;
    var numDemos = demoItems.length;

    /* Get dimensions of screen  */

    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    for(i=0; i < numDemos; i++){
        demoItems[i].innerHTML = '<span class="c-tooltip-help__message-icon"><i class="fa fa-question-circle-o" title="Click for tip." aria-hidden="true"></i></span>' + demoItems[i].innerHTML;

        /* Ensure that help message shows within the bounds of the screen */

        var helpMessage = demoItems[i].querySelector('.c-tooltip-help__message');
        var rect = helpMessage.getBoundingClientRect();
        var totalLeft = rect.left + rect.width; //get current left position of the element
        var totalTop = rect.top + rect.height; // get current top position of the element
        if(totalLeft > w){  // change the position if element extends the width or height of the screen
            var negativeWidth = rect.width * -1
            helpMessage.style.left = negativeWidth + 'px';
        }/*else{
            if(totalTop > h){
                helpMessage.style.top = rect.height * -1 + 'px';
            }
        }*/

        /* Make help message appear when clicking the help icon [closure] */

        (function(){
            var block = demoItems[i];
            var message = demoItems[i].querySelector('.c-tooltip-help__message');
            block.addEventListener('click',function(){
                message.classList.toggle('is-hidden');
            });
        }());
    }

    /* handle prev and next controls */

    var prevButtonList = document.querySelectorAll('.c-tooltip-help__controls-prev');
    var nextButtonList = document.querySelectorAll('.c-tooltip-help__controls-next');
    var j,l;
    for (j = 0; j < prevButtonList.length; j++){

        (function(){
            prevButtonList[j].addEventListener('click', function () {
                var parent = findAncestor(this, 'c-tooltip-help');
                showPrevious(parent);
            });
        })();
    }

    for (l = 0; l < nextButtonList.length; l++){

        (function(){
            nextButtonList[l].addEventListener('click', function () {
                var parent = findAncestor(this, 'c-tooltip-help');
                showNext(parent);
            });
        })();
    }


    /*Function used to find and ancestor node with a particular class */

    function findAncestor (el, cls) {
        while ((el = el.parentElement) && !el.classList.contains(cls));
        return el;
    }


    /* Show previous */
    function showPrevious(node){
        prevIndex = demoItemsArray.indexOf(node);
        if(prevIndex > 0){
            var message = node.querySelector('.c-tooltip-help__message');
            message.classList.remove('is-hidden');
            var previousMessage = demoItemsArray[prevIndex-1].querySelector('.c-tooltip-help__message');
            previousMessage.classList.remove('is-hidden');
        }
    }

    /* Show next */
    function showNext(node){
        nextIndex = demoItemsArray.indexOf(node);
        if(nextIndex > -1 && nextIndex < demoItemsArray.length - 1){
            var message = node.querySelector('.c-tooltip-help__message');
            message.classList.remove('is-hidden');
            var nextMessage = demoItemsArray[nextIndex+1].querySelector('.c-tooltip-help__message');
            nextMessage.classList.remove('is-hidden');

        }
    }
})();
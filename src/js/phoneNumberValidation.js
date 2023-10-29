
const input = document.querySelector('[name="phone number"]');
const mask = '+7 xxx xxx-xx-xx'
        //    0123456789012345

input.addEventListener('focus', (event) => {

    let inputLine = event.target.value;
    let lastIndex = event.target.value.length;

    let selectionStart = input.selectionStart;
    let selectionEnd = input.selectionEnd;
    let selectionRange = 0;

    codeNumberAutoComplete();

    input.addEventListener('keydown', (event) => {

        codeNumberAutoComplete();

        if(lastIndex > 3 && event.key === 'Backspace') {

            if (selectionRange < 1 && selectionStart > 3) {
                selectionEnd = selectionStart;
                selectionStart -= 1;
                selectionRange = selectionEnd - selectionStart;
            }

            deleteSelection(selectionStart, selectionEnd);
            return;
        } 

        let matchDigit = event.key.match(/\d/);

        if(matchDigit !== null) {

            deleteSelection(selectionStart, selectionEnd);

            if(lastIndex > 15) {
                event.preventDefault();
                return;
            }

            if(selectionStart > 3) {
                inputLine = inputLine.slice(0, selectionStart) + event.key + inputLine.slice(selectionStart);
            } else {
                inputLine += event.key;
            }

            selectionStart ++;
            lastIndex++;   
        }
    });

    input.addEventListener('keyup', (event) => {
        inputLine = bringInputValueToMask(inputLine);
        updateTargetValue();
        updateSelectionStart();
    });

    input.addEventListener('paste', (event) => {

        let clipboardData = event.clipboardData.getData('text/plain');
        clipboardData = clipboardData.replace(/\D/g,'');
        if(clipboardData.length === 0) return;

        if(selectionStart <= 3) {
            deleteSelection(3, selectionEnd);    
            inputLine = inputLine.slice(0, 3) + clipboardData + inputLine.slice(3);
        } else {
            deleteSelection(selectionStart, selectionEnd);
            inputLine = inputLine.slice(0, selectionStart) + clipboardData + inputLine.slice(selectionStart);
        }

        inputLine = bringInputValueToMask(inputLine);
        updateTargetValue();       

    });

    input.addEventListener('cut', (event) => {
        deleteSelection(selectionStart, selectionEnd);
    });

    input.addEventListener('select', (event) => {
        updateSelectionStart();
        updateSelectionEnd();
        selectionRange = Math.abs(selectionStart - selectionEnd);
    });

    input.addEventListener('click', (event) => {
        updateSelectionStart();
    })

    function updateTargetValue() {
        event.target.value = inputLine; 
        lastIndex = event.target.value.length; 
    }

    function codeNumberAutoComplete() {
        if(lastIndex < 3) {
            inputLine = '+7 ';
            lastIndex = 3;
            event.target.value = inputLine;
        }
    }

    function deleteSelection(start = 0, end = lastIndex) {

        if(selectionRange >= 1) {
            inputLine = inputLine.slice(0, start) + inputLine.slice(end).replace(/\D/g,'');
            inputLine = bringInputValueToMask(inputLine);

            lastIndex = start;
            selectionRange = 0;
            
            codeNumberAutoComplete();
        } 
    }

    function bringInputValueToMask(inputLine) {

        inputLine = inputLine.slice(0,3) + inputLine.slice(3).replace(/\D/g,'');
        for( lastIndex = 3; lastIndex < inputLine.length; lastIndex++) {

            if(lastIndex === 6 
            && inputLine[lastIndex] !== ' ') {

                inputLine = inputLine.slice(0,lastIndex) + ' ' + inputLine.slice(lastIndex);
                lastIndex ++;

            } else if((lastIndex === 10 || lastIndex === 13) 
            && inputLine[lastIndex] !== '-') {

                inputLine = inputLine.slice(0,lastIndex) + '-' + inputLine.slice(lastIndex);
                lastIndex ++; 
            } 
        }

        if (inputLine.length > 15) inputLine = inputLine.slice(0, 15 + 1);

        return inputLine;
    }

    function updateSelectionStart() {
        selectionStart = input.selectionStart;
    }

    function updateSelectionEnd() {
        selectionEnd = input.selectionEnd;
    }
});


// Курсор в конце строки +
// Удаление
// Вставка
// Запись
// Удаление выделенного фрагмента
// Перезапись выделенного фрагмента 

// Курсор в середине строки
// Удаление -
// Вставка -
// Запись -
// Удаление выделенного фрагмента -
// Перезапись выделенного фрагмента -

const input = document.querySelector('[name="phone number"]');
const mask = '+7 xxx xxx-xx-xx'
        //    0123456789012345

input.addEventListener('focus', (event) => {

    let inputLine = event.target.value;
    let lastIndex = event.target.value.length;
    let maskLength = mask.length;

    let selectionStart;
    let selectionEnd;
    let selectionRange = 0;

    codeNumberAutoComplete();

    input.addEventListener('keydown', (event) => {

        codeNumberAutoComplete();

        if(lastIndex > 0 && event.key === 'Backspace') {

            if (selectionRange <= 1) {
                inputLine = inputLine.slice(0, -1);
                lastIndex--;
            } else {
                deleteSelection();
            }

            return;
        } 

        let matchDigit = event.key.match(/\d/);

        if(matchDigit !== null) {

            deleteSelection();

            if(lastIndex > 15) {
                event.preventDefault();
                return;
            }

            if(lastIndex === 6) {
                inputLine += ' ';
                lastIndex++;
            } else if(lastIndex === 10 || lastIndex === 13) {
                inputLine += '-';
                lastIndex++; 
            }

            inputLine += event.key;
            lastIndex++;
        }
 
    });

    input.addEventListener('keyup', (event) => {
        updateTargetValue();
        updateSelectionStart();
    });

    input.addEventListener('paste', (event) => {

        deleteSelection();

        let clipboardData = event.clipboardData.getData('text/plain');
        clipboardData = clipboardData.replace(/\D/g,'');
        if(clipboardData.length === 0) return;
    
        inputLine += clipboardData;

        for( ; lastIndex < inputLine.length; lastIndex++) {

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

        updateTargetValue();       

    });

    input.addEventListener('select', (event) => {
        updateSelectionStart();
        selectionEnd = input.selectionEnd;
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
        if(selectionRange > 1) {
            end -= selectionRange;

            inputLine = inputLine.slice(start, end);
            lastIndex = inputLine.length; 
            selectionRange = 0;

            codeNumberAutoComplete();
        }
    }

    function updateSelectionStart() {
        selectionStart = input.selectionStart;
    }

});


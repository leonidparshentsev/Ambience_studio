const input = document.querySelector('[name="phone number"]');
// const mask = '+7 xxx xxx-xx-xx'
        //    0123456789012345

input.addEventListener('focus', (event) => {

    let inputLine = event.target.value;
    let focusIndex = event.target.value.length;

    codeNumberAutoComplete();

    input.addEventListener('keydown', (event) => {

        codeNumberAutoComplete();

        let matchDigit = event.key.match(/\d/);

        if(matchDigit !== null) {
            if(focusIndex > 15) {
                event.preventDefault();
                return;
            }

            if(focusIndex === 6) {
                inputLine += ' ';
                focusIndex++;
            } else if(focusIndex === 10 || focusIndex === 13) {
                inputLine += '-';
                focusIndex++; 
            }

            inputLine += event.key;
            focusIndex++;
        }

        if(focusIndex > 0 && event.key === 'Backspace') {
            inputLine = inputLine.slice(0, -1);
            focusIndex--;
        }  
    })

    input.addEventListener('keyup', (event) => {
            event.target.value = inputLine;
    })

    function codeNumberAutoComplete() {
        if(focusIndex < 3) {
            inputLine = '+7 ';
            focusIndex = 3;
            event.target.value = inputLine;
        }
    }

})


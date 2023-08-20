const orderForm = document.querySelector('.order_page__form');
const inputForms = document.querySelectorAll('input.form__input');


for (let inputForm of inputForms) {
    inputForm.addEventListener('focus', (e) => {
        hideInvalidDataMessage(e.target);
    });
}

orderForm.addEventListener('submit', submitHandler);


function submitHandler(e) {
    e.preventDefault();

    for (let order of orderForm) {
        if(order.type !== 'submit' && order.type !== undefined) {
            validateInput(order);
        }
    }
}

function validateInput (inputNode) {
    if(inputNode.name === 'name') {
        if(inputNode.value.match(/[0-9]/) !== null) {
            showInvalidDataMessage(inputNode);
        }
    } else if(inputNode.name === 'phone number') {
        if(inputNode.value.match(/[a-z]/i) !== null) {
            showInvalidDataMessage(inputNode);
        }
    }
}

function showInvalidDataMessage(inputNode) {
    inputNode.style.borderBottom = "1px solid red";
    inputNode.nextElementSibling.hidden = false;
}

function hideInvalidDataMessage(inputNode) {
    inputNode.style.borderBottom = "";
    inputNode.nextElementSibling.hidden = true;
}


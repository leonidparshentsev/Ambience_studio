const buttons = document.querySelectorAll('.plan_page__section .button');
const formSelect = document.querySelector('.form__select');

for (let button of buttons) {
    button.addEventListener('click', (e) => {
        let plan = e.target.id.match(/\w+[^(_btn)]/)[0];
        for(let select of formSelect) {
            if(select.value === plan) {
                select.selected = 'true';
            }
        }

    })
}
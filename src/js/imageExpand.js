const stylePage = document.querySelector('#styles_page');

stylePage.addEventListener('click', stylePageClickHandler);


function stylePageClickHandler(e) {

    if(!e.target.classList.contains('section__plus') &&
    !e.target.classList.contains('section__minus') ) return;
    
    let targetNode = e.target;
    let parentNode = targetNode.parentElement;

    let imgNodes = parentNode.querySelectorAll('.section__hidden_img');
    let closeButton = parentNode.querySelector('.section__minus');
    let openButton = parentNode.querySelector('.section__plus');

    if(targetNode.classList.contains('section__plus')) {

        for(let img of imgNodes) {
            addClass(img, 'active');;
        }

        addClass(parentNode, 'active');

        // if(parentNode.classList.contains('expand')) {
        //     addClass(parentNode, 'span2');
        // }

        closeButton.hidden = !closeButton.hidden;
        openButton.hidden = !openButton.hidden;

    } else if(targetNode.classList.contains('section__minus')) {

        for(let img of imgNodes) {
            removeClass(img, 'active');
        }

        removeClass(parentNode, 'active');

        // if(parentNode.classList.contains('expand')) {
        //     removeClass(parentNode, 'span2');
        // }
    
        closeButton.hidden = !closeButton.hidden;
        openButton.hidden = !openButton.hidden;
    }
}

function addClass(node, className) {
    node.classList.add(className);
}

function removeClass(node, className) {
    node.classList.remove(className);
}

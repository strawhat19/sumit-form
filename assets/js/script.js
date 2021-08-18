// Main Script

// Fading In Main Body
const body = $(`body`);
body.attr(`style`,`display: none`);
body.fadeIn(1000);

// Getting Modal
var modal = $(`.modal`);
modal.hide();

// Open Modal Animation
var openModal = $(`.openModal`);
openModal.on(`click`,event => {
    modal.addClass(`active`);
    modal.fadeIn(1000);
})

// If User Clicks Out Of Modal
modal.on(`click`,event => {
    if ($(event.target).hasClass(`active`)) {
        modal.fadeOut(1000);
    }
})

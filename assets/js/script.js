// Main Script
var modal = $(`.modal`);
modal.hide();

var openModal = $(`.openModal`);
openModal.on(`click`,event => {
    modal.fadeIn(1000);
})
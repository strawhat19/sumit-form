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
openModal.on(`click`, event => {
    modal.addClass(`active`);
    modal.fadeIn(1000);
})

// If User Clicks Out Of Modal
modal.on(`click`, event => {
    if ($(event.target).hasClass(`active`)) modal.fadeOut(1000)
})

// Modal Variables
var actualInput = $(`.modalInput`);
var dropZone = $(`.dropZone`);
console.log(dropZone);

// Window Events
window.addEventListener(`dragenter`, event => {
    event.preventDefault();
    event.stopPropagation();
})

window.addEventListener(`drop`, event => {
    event.preventDefault();
    event.stopPropagation();
})

// On File Upload Button Click
dropZone.on(`click`, event => {
    actualInput.click();
})

dropZone.on(`dragenter`, event => {
    event.preventDefault();
    event.stopPropagation();
    dropZone.addClass(`draggedOver`);
})

dropZone.on(`dragleave`, event => {
    event.preventDefault();
    event.stopPropagation();
    dropZone.removeClass(`draggedOver`);
})

dropZone.on(`drop`, event => {
    event.preventDefault();
    event.stopPropagation();
    dropZone.removeClass(`draggedOver`);
    dropZone.addClass(`dropped`);
    actualInput.click();
})

// User File Handler
actualInput.change((event,fileList) => {
    fileList = event.target.files;
    console.log(fileList);
    var modalContent = $(`<div class="modalContent"></div>`);

    // Generating Elements for Each File
    Object.values(fileList).forEach((file,index) => {
        console.log(file);
        iconType(icon => {
            icon = file.type;
            switch (icon) {
                case `audio/mp3`:
                return icon = `<i class="fas fa-file-audio"></i>`;
                break;
                case `video/mp4`: 
                return icon = `<i class="fas fa-file-video"></i>`;
                break;
            } // Generating Icon Based on Which File Type
            return icon;
        }) // Generating File Card Elements
        var fileCard = $(`
            <div class="fileCard">
                <div class="fileIcon">${iconType()}</div>
                <div class="fileName">${file.name}</div>
                <div class="fileType">${file.type}</div>
            </div>
        `);
        modalContent.append(fileCard);
    })
    modal.append(modalContent);
})
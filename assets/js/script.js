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

// Modal Variables
var actualInput = $(`.modalInput`);
var customButton = $(`.fileInput`);

// On File Upload Button Click
customButton.on(`click`,event => {
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
        var fileCard = $(`
            <div class="fileCard">
                <div class="fileIcon">${
                    function iconType(icon) {
                        icon = file.type;
                        switch (icon) {
                            case `video/mp4`: 
                            return `<i class="fas fa-file-video"></i>`;
                            break;
                            case `audio/mp3`:
                            return `<i class="fas fa-file-audio"></i>`;;
                            break;
                        }
                    }
                }</div>
                <div class="fileName">${file.name}</div>
                <div class="fileType">${file.type}</div>
            </div>
        `);
        modalContent.append(fileCard);
    })
    modal.append(modalContent);
})
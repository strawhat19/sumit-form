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
    modal.fadeIn(500);
})

// If User Clicks Out Of Modal
modal.on(`click`, event => {
    if ($(event.target).hasClass(`active`)) modal.fadeOut(500)
})

// Modal Variables
var actualInput = $(`.modalInput`);
// var dropZone = $(`.dropZone`);
// console.log(dropZone);

// // Window Events
// // window.addEventListener(`dragenter`, event => {
// //     event.preventDefault();
// //     // event.stopPropagation();
// // })

// // window.addEventListener(`drop`, event => {
// //     event.preventDefault();
// //     // event.stopPropagation();
// // })


// dropZone.on(`dragenter`, event => {
    //     event.preventDefault();
    //     // event.stopPropagation();
    // })
    
    // dropZone.on(`dragleave`, event => {
        //     event.preventDefault();
        //     // event.stopPropagation();
        // })
        
// On File Upload Button Click
var dropZone = document.querySelector(`.dropZone`);
dropZone.addEventListener(`click`, event => {
    actualInput.click();
})

dropZone.addEventListener(`drop`, (event,fileList) => {
    event.preventDefault();
    fileList = event.dataTransfer.files;
    // event.stopPropagation();
    // if (event.dataTransfer.files.length) {
        console.log(event.dataTransfer.files);
        console.log(fileList);
        var modalContent = $(`<div class="modalContent"></div>`);

        // Generating Elements for Each File
        Object.values(fileList).forEach((file,index) => {
            console.log(file);
            iconType = (icon => {
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
    // }
})

actualInput.on('change', (e) => {
    if (actualInput.files.length) {
      updateThumbnail(dropZone, actualInput.files[0]);
    }
  });

  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("drop-zone--over");
  });

  ["dragleave", "dragend"].forEach((type) => {
    dropZone.addEventListener(type, (e) => {
      dropZone.classList.remove("drop-zone--over");
    });
  });

  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();

    if (e.dataTransfer.files.length) {
      actualInput.files = e.dataTransfer.files;
      updateThumbnail(dropZone, e.dataTransfer.files[0]);
    }

    dropZone.classList.remove("drop-zone--over");
  });


function updateThumbnail(dropZone, file) {
  let thumbnailElement = dropZone.querySelector(".drop-zone__thumb");

  // First time - remove the prompt
  if (dropZone.querySelector(".drop-zone__prompt")) {
    dropZone.querySelector(".drop-zone__prompt").remove();
  }

  // First time - there is no thumbnail element, so lets create it
  if (!thumbnailElement) {
    thumbnailElement = document.createElement("div");
    thumbnailElement.classList.add("drop-zone__thumb");
    dropZone.appendChild(thumbnailElement);
  }

  thumbnailElement.dataset.label = file.name;

  // Show thumbnail for image files
  if (file.type.startsWith("image/")) {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
    };
  } else {
    thumbnailElement.style.backgroundImage = null;
  }
}

// User File Handler
var actualInput = $(`.modalInput`);
actualInput.change((event,fileList) => {
    fileList = event.target.files;
    console.log(fileList);
    var modalContent = $(`<div class="modalContent"></div>`);

    // Generating Elements for Each File
    Object.values(fileList).forEach((file,index) => {
        console.log(file);
        iconType = (icon => {
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
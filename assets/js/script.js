// Main Script

// Fading In Main Body
const body = $(`body`);
body.attr(`style`,`display: none`);
body.fadeIn(1000);

// Getting Modal
var modal = $(`.modal`);
modal.hide();

// Intersection Observer
// An API That Lets Us Detect When Elements Are In ViewPort
let options = {
  root: null,
  // rootMargin: `-150px 0px`,
  // threshhold: 0.05
};

// Declaring New Observer To Use for Observing All Elements with Class of .observe

// If The Element Is In The View Port
function inView(entries) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            $(entry.target).children().attr(`style,animation:none;`)
            $(entry.target).fadeIn(5000);
            $(entry.target).toggleClass(`inView`);
            $(entry.target).removeClass(`notInView`);
            $(entry.target).removeClass(`animationEnded`);
        } else {
            $(entry.target).toggleClass(`notInView`);
            $(entry.target).removeClass(`inView`);
        }
    })
}

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

// On File Upload Button Click
var dropZone = document.querySelector(`.dropZone`);
dropZone.addEventListener(`click`, event => {
    actualInput.click();
})

dropZone.addEventListener(`drop`, (event,fileList) => {
    event.preventDefault();
    $(`.modalContent`).hide(500);
    
    fileList = event.dataTransfer.files;
    console.log(event.dataTransfer.files);
    var observedItems = $(`.observe`);
console.log(`Total Elements Being Observed: ${observedItems.length}`);

let observer = new IntersectionObserver(inView, options);
observedItems.each((index,element) => {
    observer.observe(element);
})
    console.log(fileList);
    var modalContent = $(`<div class="files"></div>`);

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
                case `audio/mpeg`:
                return icon = `<i class="fas fa-file-audio"></i>`;
            } // Generating Icon Based on Which File Type
            return icon;
        }) // Generating File Card Elements
        var fileCard = $(`
            <div class="fileCard observe">
                <div class="fileIcon">${iconType()}</div>
                <div class="fileName">${file.name}</div>
                <div class="fileType">${file.type}</div>
            </div>
        `);
        modalContent.append(fileCard);
    })
    modal.append(modalContent);
})

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
    var observedItems = $(`.observe`);
console.log(`Total Elements Being Observed: ${observedItems.length}`);

let observer = new IntersectionObserver(inView, options);
observedItems.each((index,element) => {
    observer.observe(element);
})
    var modalContent = $(`<div class="files"></div>`);

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
            <div class="fileCard observe">
                <div class="fileIcon">${iconType()}</div>
                <div class="fileName">${file.name}</div>
                <div class="fileType">${file.type}</div>
            </div>
        `);
        modalContent.append(fileCard);
    })
    modal.append(modalContent);
})
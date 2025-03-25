const rectangles = document.querySelectorAll(".rectangle");
const rhombi = document.querySelectorAll(".rhombus");
const dropzones = document.querySelectorAll(".dropzone");
const lines = document.querySelectorAll(".line");

lines.forEach(line => {
    line.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("text/plain", line.id);
    });
})


rectangles.forEach(rectangle => {
    rectangle.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("text/plain", rectangle.id);
    });
})

rhombi.forEach(rhombus => {
    rhombus.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("text/plain", rhombus.id);
    });
})

dropzones.forEach(dropzone => {
    dropzone.addEventListener("dragover", (event) => {
        event.preventDefault();
    });

    dropzone.addEventListener("drop", (event) => {
        event.preventDefault();
        const data = event.dataTransfer.getData("text/plain");
        dropzone.appendChild(document.getElementById(data));
    });
})

function resetTask() {
    location.reload();
}
function checkSolution() {
    const dropzones = document.querySelectorAll('.dropzone');
    let isValid = true;

    const firstDropzone = dropzones[0];
    const lastDropzone = dropzones[dropzones.length - 1];
    if (dropzones[0].children[0].className !== "rectangle" || dropzones[1].children[0].className !== "line" || dropzones[2].children[0].className !== "rhombus" || dropzones[3].children[0].className !== "line") {
        isValid = false;
    }

    if (firstDropzone.children.length === 0 || lastDropzone.children.length === 0) {
        isValid = false;
    } else {
        const firstText = firstDropzone.children[0].querySelector('input')?.value;
        const lastText = lastDropzone.children[lastDropzone.children.length - 1].querySelector('input')?.value;

        if (firstText !== 'Firma' || lastText !== 'Firmenbezeichnung') {
            isValid = false;
        }
    }

    const aufgabeContainer = document.getElementById('aufgabe-container');
    let message = document.getElementById("check")
    if (message === null) {
        message = document.createElement('p');
        message.setAttribute('id', 'check');
        aufgabeContainer.appendChild(message);
    }
    message.textContent = isValid ? "Richtig!:)" : "Falsch:(";
}

function shuffleDraggables() {
    const container = document.querySelector('.draggableContainer');
    const elements = Array.from(container.children);

    // Fisher-Yates shuffle algorithm
    for (let i = elements.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [elements[i], elements[j]] = [elements[j], elements[i]];
    }

    // Append shuffled elements back to the container
    elements.forEach(element => container.appendChild(element));
}

// Call shuffleDraggables() to shuffle on page load or event
shuffleDraggables();

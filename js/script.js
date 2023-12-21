var bookmarks = [];

bookmarkRegex = /^.{2,}$/; // Permite cualquier caracter en el nombre
urlRegex = /^(https?:\/\/\S+)$/i; // Acepta cualquier tipo de URL

if (localStorage.getItem("bookmarks") != null) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
}
displayBookmarks();

function addBookmark() {
    var bookmarkInput = document.getElementById("bookmarkName").value;
    var bookmarkUrl = document.getElementById("bookmarkUrl").value;

    if (bookmarkRegex.test(bookmarkInput) && urlRegex.test(bookmarkUrl)) {
        var bookmark = {
            name: bookmarkInput,
            url: bookmarkUrl
        };
        bookmarks.push(bookmark);
        console.log(bookmarks);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        displayBookmarks();
        closeForm();
        emptyForm();
    } else {
        alert("Ingrese un nombre válido y una URL válida.");
    }
}

function displayBookmarks() {
    if (bookmarks.length == 0) {
        document.getElementById("bookmarksDisplay").innerHTML = "Haz clic en el ícono de agregar para empezar a añadir tus marcadores.";
    } else {
        var display = "";
        for (var i = 0; i < bookmarks.length; i++) {
            display += `
            <div class="bookmark">
                <button class="deletebtn" onclick="deleteBookmark(${i})"><i class="fa-solid fa-xmark "></i></button>
                <a target="_blank" href="${bookmarks[i].url}">
                    <img src="https://www.google.com/s2/favicons?domain=${bookmarks[i].url}">  ${bookmarks[i].name}
                </a>
            </div>`;
        }
        document.getElementById("bookmarksDisplay").innerHTML = display;
    }
}

function deleteBookmark(index) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn",
            cancelButton: "btn"
        },
        buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: "¿Estás seguro?",
        text: "No podrás revertir esto.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            bookmarks.splice(index, 1);
            displayBookmarks();
            localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
            swalWithBootstrapButtons.fire({
                title: "Eliminado",
                text: "Tus favoritos han sido eliminados.",
                icon: "success"
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
                title: "Cancelado",
                text: "Operación cancelada",
                icon: "error"
            });
        }
    });
}

function openForm() {
    document.getElementById("myForm").style.display = "block";
    emptyForm();
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

function emptyForm() {
    document.getElementById("bookmarkName").value = "";
    document.getElementById("bookmarkUrl").value = "";
}

// Agrega esta función para cambiar entre modos claro y oscuro
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

import { Form } from './Form';
import { DocumentList } from './DocumentList';
import { Router } from './Router';
import { FormCreator } from './FormCreator';

class App {
    activeForm = new Form();
    documentList = new DocumentList();
    formList = new FormCreator();
}


window.onload = () => {

    let appClass = new App();
    let path = window.location.pathname;
    let page = path.split("/").pop();

    if (page == "new-document.html") {
        let id = Router.getParam("id");

        appClass.activeForm.render();

        let saveButton = document.getElementById("save");
        saveButton.addEventListener("click", () => {
            appClass.activeForm.getValue();
            appClass.activeForm.save();
        });

        let backButton = document.getElementById("back");
        backButton.addEventListener("click", () => {
            window.location.href = "index.html";
        });
    }

    if (page == "document-list.html") {
        appClass.documentList.render();

        let deleteButton = document.querySelectorAll(".delete");
        deleteButton.forEach(element => {
            element.addEventListener("click", function () {
                localStorage.removeItem(this.getAttribute("docID"));
                window.location.href = "";
            })
        });


        let editButton = document.querySelectorAll(".edit");
        editButton.forEach(element => {
            element.addEventListener("click", function () {
                let key = this.getAttribute("docID");
                window.location.href = "/edit-document.html?id=" + key;
            })
        });

    }


    if (page == "form-list.html") {
        appClass.formList.render();

        let deleteButton = document.querySelectorAll(".delete");
        deleteButton.forEach(element => {
            element.addEventListener("click", function () {
                localStorage.removeItem(this.getAttribute("docID"));
                window.location.href = "";
            })
        });

    }


    if (page == "edit-document.html") {
        let id = Router.getParam("id");
        let json = JSON.parse(appClass.documentList.getDocument(id));
        let main = document.getElementById("main");

        for (let i = 0; i < appClass.activeForm.fields.length; i++) {
            appClass.activeForm.fields[i].value = json[appClass.activeForm.fields[i].name];
            main.appendChild(appClass.activeForm.fields[i].render());
        }

        let editButton = document.createElement("button");
        editButton.name = "edit";
        editButton.id = "edit";
        editButton.innerText = "Zapisz";
        main.appendChild(editButton)

        let backButton = document.createElement("button");
        backButton.name = "back";
        backButton.id = "back";
        backButton.innerText = "Wstecz";
        main.appendChild(backButton)

        document.getElementById("edit").addEventListener("click", function () {
            let json = appClass.activeForm.getValue();
            localStorage.setItem(id, JSON.stringify(json));
            window.location.href = "/edit-document.html?id=" + id;
        });

        document.getElementById("back").addEventListener("click", function () {
            window.location.href = "/document-list.html";
        });
    }

};





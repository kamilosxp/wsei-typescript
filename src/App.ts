import { Form } from './form';
import { DocumentList } from './DocumentList';
import { Router } from './Router';

class App {
    activeForm = new Form();
    documentList = new DocumentList();
}


window.onload = () => {

    let myClass = new App();
    let path = window.location.pathname;
    let page = path.split("/").pop();

    if (page == "new-document.html") {
        myClass.activeForm.render();

        let saveButton = document.getElementById("save");
        saveButton.addEventListener("click", () => {
            myClass.activeForm.getValue();
            myClass.activeForm.save();
        });

        let backButton = document.getElementById("back");
        backButton.addEventListener("click", () => {
            window.location.href = "index.html";
        });
    }

    if (page == "document-list.html") {
        myClass.documentList.render();

        let deleteButton = document.querySelectorAll(".delete");
        deleteButton.forEach(element => {
            element.addEventListener("click", function () {
                localStorage.removeItem(this.getAttribute("data-id"));
                window.location.href = "";
            })
        });


        let editButton = document.querySelectorAll(".edit");
        editButton.forEach(element => {
            element.addEventListener("click", function () {
                let key = this.getAttribute("data-id");
                window.location.href = "/edit-document.html?id=" + key;
            })
        });

    }


    if (page == "edit-document.html") {
        let id = Router.getParam("id");
        let json = JSON.parse(myClass.documentList.getDocument(id));
        let main = document.getElementById("main");

        for (let i = 0; i < myClass.activeForm.fields.length; i++) {
            myClass.activeForm.fields[i].value = json[myClass.activeForm.fields[i].name];
            main.appendChild(myClass.activeForm.fields[i].render());;
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
            let json = myClass.activeForm.getValue();
            localStorage.setItem(id, JSON.stringify(json));
            window.location.href = "/edit-document.html?id=" + id;
        });

        document.getElementById("back").addEventListener("click", function () {
            window.location.href = "/document-list.html";
        });
    }

};





import { Field } from "./fields/Field";
import { LocStorage } from "./LocStorage";
import { Guid } from "guid-typescript";

export class FormCreator {
    fields: Field[];

    documents: Map<string, string>;

    getFormList() {

        let locStorage = new LocStorage();
        let array = locStorage.getDocuments();

        let map = new Map<string, string>();
        array.forEach(key => {
            if (Guid.isGuid(key))
                map.set(key, localStorage.getItem(key));
        });

        this.documents = map;
    }

    getForm(id: string) {
        return JSON.parse(localStorage.getItem(id));
    }


    render() {
        this.getFormList();
        let docList = "";

        this.documents.forEach((value, key) => {
            let Json = JSON.parse(JSON.parse(value));
            let head = "";
            let body = "";

            Object.keys(Json).forEach(function (k) {
                head += "<th scope='col'>" + k + "</th>";
                body += "<td scrope='row'>" + Json[k] + "</td>";
            });

            let str = "<button class='btn btn-dark delete' docID='" + key + "'>Usuń</button><table class='table' id='" + key + "'><tr><th>id</th>" + head + "</tr><tr><td>" +
                key + "</td>" + body + "</tr></table>"
                docList += str;

            document.getElementById("documents").innerHTML = docList;

        });
    }

    newForm(): any {

    }


    saveForm(): any {
        let locStorage = new LocStorage();
        //locStorage.saveDocument(this.getValue());
        window.location.href = "index.html";
    }
}
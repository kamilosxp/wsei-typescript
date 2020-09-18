import { Guid } from "guid-typescript";
import { LocStorage } from './LocStorage'

export class DocumentList {

    documents: Map<string, string>;

    getDocumentList() {

        let locStorage = new LocStorage();
        let array = locStorage.getDocuments();

        let map = new Map<string, string>();
        array.forEach(key => {
            if (Guid.isGuid(key))
                map.set(key, localStorage.getItem(key));
        });

        this.documents = map;
    }

    getDocument(id: string) {
        return JSON.parse(localStorage.getItem(id));
    }


    render() {
        this.getDocumentList();
        let docList = "";

        this.documents.forEach((value, key) => {
            let Json = JSON.parse(JSON.parse(value));
            let nav = "";
            let data = "";

            Object.keys(Json).forEach(function (k) {
                nav += "<th scope='col'>" + k + "</th>";
                data += "<td scrope='row'>" + Json[k] + "</td>";
            });

            let str = "<button class='btn btn-dark edit' docID='" + key + "'>Edytuj</button><button class='btn btn-dark delete' docID='" + key + "'>Usuń</button><table class='table' id='" + key + "'><tr><th>id</th>" + nav + "</tr><tr><td>" +
                key + "</td>" + data + "</tr></table>"
                docList += str;

            document.getElementById("documents").innerHTML = docList;

        });
    }
}

import { Guid } from "guid-typescript";
import { TSMap } from "typescript-map"
import { LocStorage } from './locStorage'

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

    removeDocument(id: string) {
        localStorage.removeItem(id);
        window.self.location.href = "/document-list.html";
    }

    getDocument(id: string) {
        return JSON.parse(localStorage.getItem(id));
    }


    render() {

        this.getDocumentList();
        let res = "";

        this.documents.forEach((value, key) => {
            let Json = JSON.parse(JSON.parse(value));
            let head = "";
            let body = "";

            Object.keys(Json).forEach(function (k) {
                head += "<th>" + k + "</th>";
                body += "<td>" + Json[k] + "</td>";
            });

            let str = "<button class='edit' data-id='" + key + "'>Edytuj</button><button class='delete' data-id='" + key + "'>Usuń</button><table id='" + key + "'><tr><th>id</th>" + head + "</tr><tr><td>" +
                key + "</td>" + body + "</tr></table>"
            res += str;

            document.getElementById("documents").innerHTML = res;

        });



    }
}

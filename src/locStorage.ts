import { DataStorage } from './DataStorage'
import { Guid } from "guid-typescript";

export class LocStorage implements DataStorage {
    saveDocument(object: any) {
        let guid = Guid.create();
        localStorage.setItem("" + guid, JSON.stringify(object));
    }

    loadDocument(id: string) {
        return JSON.parse(localStorage.getItem(id));
    }

    getDocuments() {
        const documentsArray = [""];
        Object.keys(localStorage).forEach(function (key) {
            if (Guid.isGuid(key))
                documentsArray.push(key);
        });
        return documentsArray;
    }

    removeDocument(id: string) {
        localStorage.removeItem(id);
    }

    saveForm(object: any) {
        let guid = Guid.create();
        localStorage.setItem("" + guid, JSON.stringify(object));
    }

    loadForm(id: string) {
        return JSON.parse(localStorage.getItem(id));
    }
}
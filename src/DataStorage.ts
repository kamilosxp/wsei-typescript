export interface DataStorage {
    saveDocument(obj: any): void;
    loadDocument(doc: string): string;
    getDocuments(): string[];
}
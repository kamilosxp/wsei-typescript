export class Router {
    static getParam(key: string) {
        const query: string = window.location.search.substr(1);
        const urlParams = new URLSearchParams(query);
        const id = urlParams.get(key)
        return id;
    }
}
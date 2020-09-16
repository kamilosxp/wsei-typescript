export class FieldLabel {
    showLabel(text: string): HTMLLabelElement {
        var label = <HTMLLabelElement>document.createElement("label")
        label.setAttribute("for", text);
        label.innerText = text + ": ";
        return label;
    }
}
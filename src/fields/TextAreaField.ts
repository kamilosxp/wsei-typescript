import { Field } from "./Field"
import { FieldType } from "./FieldType"
import { FieldLabel } from "./FieldLabel"

export class TextAreaField implements Field {
    name: string;
    label: FieldLabel;
    labelHTML: HTMLLabelElement;
    type = FieldType.TextArea;
    value: string = "";
    element: HTMLTextAreaElement;


    constructor(name: string) {
        this.name = name;
    }

    render(): HTMLElement {
        return this.createTextAreaField();
    }

    getValue(): string {
        return this.element.value;
    }

    createTextAreaField() {
        this.label = new FieldLabel;
        this.labelHTML = this.label.showLabel(this.name);
        this.element = document.createElement("textarea");
        this.element.setAttribute("name", this.name)
        this.element.innerText = this.value;

        let textarea = document.createElement("div");
        textarea.setAttribute("name", this.name);
        textarea.appendChild(this.labelHTML);
        textarea.appendChild(this.element)

        return textarea;
    }
}
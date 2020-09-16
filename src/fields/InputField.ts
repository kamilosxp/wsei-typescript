import { Field } from "./Field"
import { FieldType } from "./FieldType"
import { FieldLabel } from "./FieldLabel"

export class InputField implements Field {
    name: string;
    label: FieldLabel;
    labelHTML: HTMLLabelElement;
    type = FieldType.Input;
    value: string = "";
    element: HTMLInputElement;

    
    constructor(name: string) {
        this.name = name;
    }

    render(): HTMLElement {
        return this.createInput();
    }

    getValue(): string {
        return this.element.value;
    }

    createInput() {

        this.label = new FieldLabel;
        this.labelHTML = this.label.showLabel(this.name);

        this.element = document.createElement("input");
        this.element.setAttribute("name", this.name)
        this.element.value = this.value; 

        let input = document.createElement("div");
        input.setAttribute("name", this.name);
        input.appendChild(this.labelHTML);
        input.appendChild(this.element)

        return input;
    }
}
import { Field } from "./Field"
import { FieldType } from "./FieldType"
import { FieldLabel } from "./FieldLabel"

export class CheckboxField implements Field {
    name: string;
    label: FieldLabel;
    labelHTML: HTMLLabelElement;
    type = FieldType.Checkbox;
    value: string = "";
    element: HTMLInputElement;

    
    constructor(name: string) {
        this.name = name;
    }

    render(): HTMLElement {
        return this.createCheckBox();
    }

    getValue(): string {
        return this.element.checked + "";
    }

    createCheckBox() {

        this.label = new FieldLabel;
        this.labelHTML = this.label.showLabel(this.name);

        this.element = document.createElement("input");
        this.element.type = "checkbox";
        this.element.name = this.name;
        this.element.checked = this.value == "true" ? true : false;

        let checkBox = document.createElement("div");
        checkBox.setAttribute("name", this.name);
        checkBox.appendChild(this.labelHTML);
        checkBox.appendChild(this.element);

        return checkBox;
    }
}
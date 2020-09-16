import { Field } from "./Field"
import { FieldType } from "./FieldType"
import { FieldLabel } from "./FieldLabel"

export class SelectField implements Field {
    name: string;
    label: FieldLabel;
    labelHTML: HTMLLabelElement;
    options: string[];
    type = FieldType.Input;
    value: string = "";
    element: HTMLSelectElement


    constructor(name: string, options: string[]) {
        this.name = name;
        this.options = options;
    }

    render(): HTMLElement {
        return this.createSelectField();
    }

    getValue(): string {
        return this.element.value;
    }

    createSelectField() {
        this.label = new FieldLabel;
        this.labelHTML = this.label.showLabel(this.name);


        this.element = document.createElement("select");
        this.element.setAttribute("name", this.name);

        for (let i = 0; i < this.options.length; i++) {
            var option = document.createElement("option");
            this.element.appendChild(option);
            option.innerText = this.options[i];
        }

        this.element.value = this.value;
        let selectField = document.createElement("div");
        selectField.setAttribute("name", this.name);
        selectField.appendChild(this.labelHTML);
        selectField.appendChild(this.element)

        return selectField;
    }
}
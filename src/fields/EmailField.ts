import { Field } from "./Field"
import { FieldType } from "./FieldType"
import { FieldLabel } from "./FieldLabel"

export class EmailField implements Field{
    name: string;
    label: FieldLabel;
    labelHTML: HTMLLabelElement;
    type = FieldType.Email;
    value: string = "";
    element: HTMLInputElement;
    

    constructor(name: string){
        this.name = name;
    }

    render():HTMLElement{
       return this.createEmailField();
    }

    getValue(): string{   
        return this.element.value;
    }

    createEmailField(){
        
        this.label = new FieldLabel;
        this.labelHTML = this.label.showLabel(this.name);
        this.element= document.createElement("input");
        this.element.setAttribute("name", this.name)
        this.element.setAttribute("type", "email")
        this.element.value = this.value;  
        
        let email = document.createElement("div");
        email.setAttribute("name", this.name);
        email.appendChild(this.labelHTML);
        email.appendChild(this.element)
        
        return email;
    }
}
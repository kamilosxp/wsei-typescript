import { Field } from "./Field"
import { FieldType } from "./FieldType"
import { FieldLabel } from "./FieldLabel"

export class DateField implements Field{
    name: string;
    label: FieldLabel;
    labelHTML: HTMLLabelElement;
    type = FieldType.Date;
    value: string;
    element: string

    
    constructor(name: string){
        this.name = name;
    }

    render():HTMLElement{
       return this.createDateField();
    }
    
    getValue(): string{   
         return this.element;
    }
    
    createDateField(){
   
        var year = new Date().toISOString().slice(0,10);
        var time = new Date();
        var today = ("0" + time.getHours()).slice(-2) + ":" + ("0" + time.getMinutes()).slice(-2) + ":" + ("0" + time.getSeconds()).slice(-2);

        this.label = new FieldLabel;
        this.labelHTML = this.label.showLabel(this.name);
        this.labelHTML.innerText = this.name + " " + year + " " + today;

        let date = document.createElement("div");
        date.setAttribute("name", this.name);
        date.appendChild(this.labelHTML);
        
        return date;
    }
}
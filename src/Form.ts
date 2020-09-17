import { TSMap } from 'typescript-map'
import { Field } from '../src/fields/Field';
import { LocStorage } from './locStorage';
import { InputField } from '../src/fields/InputField';
import { TextAreaField } from '../src/fields/TextAreaField';
import { EmailField } from '../src/fields/EmailField';
import { SelectField } from '../src/fields/SelectField';
import { DateField } from '../src/fields/DateField';
import { CheckboxField } from '../src/fields/CheckboxField';

export class Form {
  fields: Field[] = [new DateField("Data formularza"), new SelectField("Wykształcenie", ["Podstawowe", "Średnie", "Wyższe"]), new InputField("Ulubiony kolor"), new InputField("Wiek"), new EmailField("Email"), new CheckboxField("Czy czytasz książki?"), new TextAreaField("Uwagi")];

  render(): any {
    const div = document.getElementById("main");
    const backButton = document.createElement("button");
    const saveButton = document.createElement("button");


    backButton.setAttribute("id", "back");
    backButton.innerHTML = "Back"

    saveButton.setAttribute("id", "save");
    saveButton.innerHTML = "Save"

    for (let i = 0; i < this.fields.length; i++) {
      div.appendChild(this.fields[i].render());
      div.appendChild(backButton);
      div.appendChild(saveButton);
    }

  }

  getValue(): string {
    let tsMap = new TSMap();

    this.fields.forEach(element => {
      tsMap.set(element.name, element.getValue())
    });

    return JSON.stringify(tsMap);
  }

  save() {
    let locStorage = new LocStorage();
    locStorage.saveDocument(this.getValue());
    window.location.href = "index.html";
  }
}
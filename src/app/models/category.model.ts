import { Attribute } from "./attribute.model";

export class Category{
    id: number;
    name: string;
    attributes: Attribute[] = [];

    constructor(id: number, name: string, attributes: Attribute[]){
        this.id = id;
        this.name = name;
        this.attributes = attributes;
    }
}
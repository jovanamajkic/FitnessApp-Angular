export class ProgramHasAttributeValueRequest {
    programId: number;
    attributeValueId: number;

    constructor(programId: number, attributeValueId: number){
        this.programId = programId;
        this.attributeValueId = attributeValueId;
    }
}
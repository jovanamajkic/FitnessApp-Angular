export class ActivityTrackerRequest{
    exercise: ExerciseType;
    duration: number;
    intensity: string;
    result: string;
    bodyWeight: number;
    userId: number;

    constructor(exercise: ExerciseType, duration: number, intensity: string, result: string, bodyWeight: number ,userId: number){
        this.exercise = exercise;
        this.duration = duration;
        this.intensity = intensity;
        this.result = result;
        this.bodyWeight = bodyWeight;
        this.userId = userId;
    }
}

enum ExerciseType{
    CARDIO, STRENGTH, FLEXIBILITY, HIIT
}
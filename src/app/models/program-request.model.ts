import { DifficultyLevel } from "./difficulty-level";
import { Image } from "./image.model";
import { Location } from "./location";

export class ProgramRequest{
    title: string;
    description: string;
    price: number;
    dificultyLevel: DifficultyLevel;
    duration: number;
    location: Location;
    instructor: string;
    contact: string;
    videoUrl: string;
    images: Image[];
    categoryId: number;
    userId: number;

    constructor(title: string, description: string, price: number, dificultyLevel: DifficultyLevel, duration: number, 
        location: Location, instructor: string, contact: string, videoUrl: string, images: Image[], 
        categoryId: number, userId: number){
        
        this.title = title;
        this.description = description;
        this.price = price;
        this.dificultyLevel = dificultyLevel;
        this.duration = duration;
        this.location = location;
        this.instructor = instructor;
        this.contact = contact;
        this.videoUrl = videoUrl;
        this.images = images;
        this.categoryId = categoryId;
        this.userId = userId;
    }
}
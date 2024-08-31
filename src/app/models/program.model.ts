import { Category } from "./category.model";
import { Comment } from "./comment.model";
import { DifficultyLevel } from "./difficulty-level";
import { Image } from "./image.model";
import { Location } from "./location";
import { User } from "./user.model";

export class Program{
    id: number;
    title: string;
    description: string;
    price: number;
    dificultyLevel: DifficultyLevel;
    duration: number;
    location: Location;
    instructor: string;
    contact: string;
    videoUrl: string;
    comments: Comment[];
    images: Image[];
    category: Category;
    user: User;

    constructor(id: number, title: string, description: string, price: number, dificultyLevel: DifficultyLevel, duration: number, 
        location: Location, instructor: string, contact: string, videoUrl: string, comments: Comment[], images: Image[], 
        category: Category, user: User){
        
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.dificultyLevel = dificultyLevel;
        this.duration = duration;
        this.location = location;
        this.instructor = instructor;
        this.contact = contact;
        this.videoUrl = videoUrl;
        this.comments = comments;
        this.images = images;
        this.category = category;
        this.user = user;
    }
}
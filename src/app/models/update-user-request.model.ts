export class UserUpdateRequest {
    firstName: string;
    lastName: string;
    email: string;
    city: string;
    avatar?: string | null;

    constructor(firstName: string, lastName: string, email: string, city: string, avatar: string){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.city = city;
        this.avatar = avatar;
    }
}
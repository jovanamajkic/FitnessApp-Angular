export class RegistrationRequest {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    city: string;
    avatar: string;

    constructor(firstName: string, lastName: string, username: string, password: string, email: string, city: string, avatar: string){
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.email = email;
        this.city = city;
        this.avatar = avatar;
    }
}
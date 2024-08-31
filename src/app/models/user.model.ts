export class User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    city: string;
    avatar: string;
    status: UserStatus;

    constructor(id: number, firstName: string, lastName: string, username: string, password: string, email: string, city: string, avatar: string, status: UserStatus) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.email = email;
        this.city = city;
        this.avatar = avatar;
        this.status = status;
    }
}

enum UserStatus {
    REQUESTED, 
    ACTIVE, 
    INACTIVE
}
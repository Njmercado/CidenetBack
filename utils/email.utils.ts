export class EmailModel {

    Username: String;
    Host: String;
    ID: String;
    Name: String;
    Lastname: String;

    constructor(Username: string, Host: string, ID: string = "") {
        this.Username = Username.toLowerCase();
        this.Host = Host;
        this.ID = ID;
        this.Name = Username.split(".")[0].toLowerCase();
        this.Lastname = Username.split(".")[1].toLowerCase();
    }

    getCompleteEmail() {
        if(this.ID != "") return `${this.Username}.${this.ID}@${this.Host}`;
        else return `${this.Username}@${this.Host}`;
    }

    getEmailWithoutID() {
        return `${this.Username}@${this.Host}`;
    }

    getRegexEmail() {
        return new RegExp(`^${this.Name}\.${this.Lastname}.*@${this.Host}`);
    }
}
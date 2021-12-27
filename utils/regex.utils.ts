export class Validator {

    IsValidName(name: string): Boolean {
        return /[AZ^Ñ]{2,20}/.test(name)
    }
}
export class Response
{
    constructor(message = "", data = null, isSuccess = true)
    {
        this.status = isSuccess;
        this.message = message;
        switch (isSuccess) {
            case true:
                    this.data = data
                break;
            case false:
                    this.error = data
                break;
            default:
                break;
        }
    }
}
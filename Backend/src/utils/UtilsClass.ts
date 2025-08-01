export class CoustomError extends Error {
    constructor(public message: string , public status: number=500 ){
        super(message)
        this.status = status
    }
}

export class ApiRespones {
    constructor(
        public message: string, public data: object
    ){
        this.message = message
        this.data = data;
    }
}
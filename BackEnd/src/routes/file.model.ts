export interface fileModel {

    fieldname: string,
    originalname: string,
    encoding: string,
    mimetype: string,
    destination: string,
    filename: string,
    path: string,
    size: number

}

export interface queryModel {
    fullname?: RegExp,
    role: {
        $ne: string;
    }
}
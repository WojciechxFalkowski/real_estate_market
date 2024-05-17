export interface FileImage {
    src: string;
    file?: File;
}
export interface ImageUploaderI extends FileImage {
    id: number;
    newId: number | null;
    publicId: string | null;
}
export interface NewOrderI {
    publicId: string;
    orderId: number
}
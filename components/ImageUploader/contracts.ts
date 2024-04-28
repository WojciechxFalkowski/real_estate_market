export interface FileImage {
    src: string;
    file?: File;
}
export interface ImageUploaderI extends FileImage {
    id: number;
    newId: number | null;
    publicId: string | null;
    isSaved: boolean;
}
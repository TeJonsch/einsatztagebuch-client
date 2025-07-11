export interface DiaryEntryDto {
    uuid: string;
    creationTimestamp: string;
    messageTimestamp: string;
    message: string;
    messageType: string;
    reporter: string;
    receiver: string;
    author: string;
}

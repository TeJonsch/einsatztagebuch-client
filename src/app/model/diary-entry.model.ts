export interface DiaryEntryDto {
    uuid: string;
    messageTimestampTechnical: string;
    messageTimestampReadable: string;
    message: string;
    messageType: string;
    reporter: string;
    receiver: string;
    author: string;
}

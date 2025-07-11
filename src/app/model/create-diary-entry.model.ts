export interface CreateDiaryEntryDto {
    message: string | null;
    messageType: string | null;
    reporter: string | null;
    receiver: string | null;
    messageTimestamp: string | null;
    author: string | null;
}

export interface OrderServiceInterface{
  exists(documentId: string): Promise<boolean>;
}

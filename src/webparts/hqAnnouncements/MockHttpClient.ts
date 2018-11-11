import { ISPList } from './HqAnnouncementsWebPart';

export default class MockHttpClient {
    private static _items: ISPList[] =[{Title: 'New HQ', Body:"sdg has lauched and updated, fresh, new and excting HQ. Please come back frequently for updates."},];
    public static get(restURL: string, options?: any): Promise<ISPList[]> {
        return new Promise<ISPList[]>((resolve) => {
            resolve(MockHttpClient._items);
        }); 
    }
}


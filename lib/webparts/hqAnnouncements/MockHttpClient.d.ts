import { ISPList } from './HqAnnouncementsWebPart';
export default class MockHttpClient {
    private static _items;
    static get(restURL: string, options?: any): Promise<ISPList[]>;
}

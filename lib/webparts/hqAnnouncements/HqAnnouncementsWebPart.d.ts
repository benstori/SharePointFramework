import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration } from '@microsoft/sp-webpart-base';
export interface IHqAnnouncementsWebPartProps {
    description: string;
    SPListName: string;
}
export interface ISPLists {
    value: ISPList[];
}
export interface ISPList {
    Title: string;
    Body: string;
}
export default class HqAnnouncementsWebPartWebPart extends BaseClientSideWebPart<IHqAnnouncementsWebPartProps> {
    render(): void;
    protected readonly dataVersion: Version;
    private _getMockListData();
    private _getListData();
    private _renderListAsync();
    private _renderList(items);
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}

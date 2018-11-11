import { 
  Version, 
  Environment,  
  EnvironmentType} from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import {  
  SPHttpClient  
} from '@microsoft/sp-http';  

import { escape } from '@microsoft/sp-lodash-subset';

import styles from './HqAnnouncementsWebPart.module.scss';
import * as strings from 'HqAnnouncementsWebPartStrings';

export interface IHqAnnouncementsWebPartProps {
  description: string;
  SPListName: string;
}

import MockHttpClient from './MockHttpClient'; 

export interface ISPLists {
  value: ISPList[];  
}

export interface ISPList{
  Title: string;
  Body: string;
}

export default class HqAnnouncementsWebPartWebPart extends BaseClientSideWebPart<IHqAnnouncementsWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.hqAnnouncements}">
        <div class="${styles.container}">  
          <div class="ms-Grid-row ${styles.row}">   
            <div id="spListContainer" /></div>  
          </div>
      </div>`;
      this._renderListAsync();
  }

  
  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  //this method is used in testing the web part, fake data
  private _getMockListData(): Promise<ISPLists> {  
    return MockHttpClient.get(this.context.pageContext.web.absoluteUrl).then(() => {  
        const listData: ISPLists = {  
            value:  
            [  
                { Title: 'New HQ', Body: 'Modern designed and fully responsive' },  
                 { Title: 'Congrats to Kyle', Body: 'Kyle Bakker wins best SPS preasentation award after raving reviews!'  },  
                { Title: 'Welcome Jon Doe to sdg', Body: 'John Doe is the newest member of the OS team, please welcome John!' },  
                { Title: 'Open Enrollment Time!', Body: 'make sure you get any updated done to benefits' },
                { Title: 'Nintex Workflow Cloud', Body: 'Extend Nintex worlflow across a multiitude of content sources and platforms.' }    
            ]  
          };  
        return listData;  
    }) as Promise<ISPLists>;  
}
  
//production method for the REST Call
private _getListData(): Promise<ISPLists> {  
  return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists/GetByTitle('${this.properties.SPListName}')/Items?select=ID,Title,Body&$top%205`, SPHttpClient.configurations.v1)  
      .then((response: Response) => {   
        debugger;  
        return response.json();  
      });  
  } 

  //this checks to see what envoroment the web part is render  and is the main method called from the webpart above.
  private _renderListAsync(): void {  
    
  if (Environment.type === EnvironmentType.Local) {  
    this._getMockListData().then((response) => {  
      this._renderList(response.value);  
    });  
  }  
   else {  
     this._getListData()  
    .then((response) => {  
      this._renderList(response.value);  
    });  
 }  
} 

// this methid will render the HTML output for the list data
private _renderList(items: ISPList[]): void {  
  let html: string = ``;   
  items.forEach((item: ISPList) => {  
    html += `  
         <h3>${item.Title}</h3>
          <p>${item.Body}</p>
        `;  
  });  
  const listContainer: Element = this.domElement.querySelector('#spListContainer');  
  listContainer.innerHTML = html;  
} 
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('SPListName', {
                  label: 'SharePoint List Name'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

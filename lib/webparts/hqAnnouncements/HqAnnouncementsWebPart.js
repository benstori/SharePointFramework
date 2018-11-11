"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var sp_core_library_1 = require("@microsoft/sp-core-library");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var sp_http_1 = require("@microsoft/sp-http");
var HqAnnouncementsWebPart_module_scss_1 = require("./HqAnnouncementsWebPart.module.scss");
var strings = require("HqAnnouncementsWebPartStrings");
var MockHttpClient_1 = require("./MockHttpClient");
var HqAnnouncementsWebPartWebPart = (function (_super) {
    __extends(HqAnnouncementsWebPartWebPart, _super);
    function HqAnnouncementsWebPartWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HqAnnouncementsWebPartWebPart.prototype.render = function () {
        this.domElement.innerHTML = "\n      <div class=\"" + HqAnnouncementsWebPart_module_scss_1.default.hqAnnouncements + "\">\n        <div class=\"" + HqAnnouncementsWebPart_module_scss_1.default.container + "\">  \n          <div class=\"ms-Grid-row " + HqAnnouncementsWebPart_module_scss_1.default.row + "\">   \n            <div id=\"spListContainer\" /></div>  \n          </div>\n      </div>";
        this._renderListAsync();
    };
    Object.defineProperty(HqAnnouncementsWebPartWebPart.prototype, "dataVersion", {
        get: function () {
            return sp_core_library_1.Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    //this method is used in testing the web part, fake data
    HqAnnouncementsWebPartWebPart.prototype._getMockListData = function () {
        return MockHttpClient_1.default.get(this.context.pageContext.web.absoluteUrl).then(function () {
            var listData = {
                value: [
                    { Title: 'New HQ', Body: 'Modern designed and fully responsive' },
                    { Title: 'Congrats to Kyle', Body: 'Kyle Bakker wins best SPS preasentation award after raving reviews!' },
                    { Title: 'Welcome Jon Doe to sdg', Body: 'John Doe is the newest member of the OS team, please welcome John!' },
                    { Title: 'Open Enrollment Time!', Body: 'make sure you get any updated done to benefits' },
                    { Title: 'Nintex Workflow Cloud', Body: 'Extend Nintex worlflow across a multiitude of content sources and platforms.' }
                ]
            };
            return listData;
        });
    };
    //production method for the REST Call
    HqAnnouncementsWebPartWebPart.prototype._getListData = function () {
        return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + ("/_api/web/lists/GetByTitle('" + this.properties.SPListName + "')/Items?select=ID,Title,Body&$top%205"), sp_http_1.SPHttpClient.configurations.v1)
            .then(function (response) {
            debugger;
            return response.json();
        });
    };
    //this checks to see what envoroment the web part is render  and is the main method called from the webpart above.
    HqAnnouncementsWebPartWebPart.prototype._renderListAsync = function () {
        var _this = this;
        if (sp_core_library_1.Environment.type === sp_core_library_1.EnvironmentType.Local) {
            this._getMockListData().then(function (response) {
                _this._renderList(response.value);
            });
        }
        else {
            this._getListData()
                .then(function (response) {
                _this._renderList(response.value);
            });
        }
    };
    // this methid will render the HTML output for the list data
    HqAnnouncementsWebPartWebPart.prototype._renderList = function (items) {
        var html = "";
        items.forEach(function (item) {
            html += "  \n         <h3>" + item.Title + "</h3>\n          <p>" + item.Body + "</p>\n        ";
        });
        var listContainer = this.domElement.querySelector('#spListContainer');
        listContainer.innerHTML = html;
    };
    HqAnnouncementsWebPartWebPart.prototype.getPropertyPaneConfiguration = function () {
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
                                sp_webpart_base_1.PropertyPaneTextField('description', {
                                    label: strings.DescriptionFieldLabel
                                }),
                                sp_webpart_base_1.PropertyPaneTextField('SPListName', {
                                    label: 'SharePoint List Name'
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return HqAnnouncementsWebPartWebPart;
}(sp_webpart_base_1.BaseClientSideWebPart));
exports.default = HqAnnouncementsWebPartWebPart;

//# sourceMappingURL=HqAnnouncementsWebPart.js.map

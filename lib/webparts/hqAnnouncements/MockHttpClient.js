"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MockHttpClient = (function () {
    function MockHttpClient() {
    }
    MockHttpClient.get = function (restURL, options) {
        return new Promise(function (resolve) {
            resolve(MockHttpClient._items);
        });
    };
    MockHttpClient._items = [{ Title: 'New HQ', Body: "sdg has lauched and updated, fresh, new and excting HQ. Please come back frequently for updates." },];
    return MockHttpClient;
}());
exports.default = MockHttpClient;

//# sourceMappingURL=MockHttpClient.js.map

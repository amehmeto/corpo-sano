"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var native_base_1 = require("native-base");
var react_1 = require("react");
var TabRouter_1 = require("./src/routers/TabRouter");
var AuthRouter_1 = require("./src/routers/AuthRouter");
function App() {
    var _a = react_1.useState(false), isAuthenticated = _a[0], setIsAuthenticated = _a[1];
    react_1.useEffect(function () {
        AuthRouter_1.checkAuthorization().then(function (isAuth) {
            setIsAuthenticated(isAuth);
        });
    });
    var router = !isAuthenticated ? <AuthRouter_1.AuthRouter /> : <TabRouter_1.default />;
    return (<native_base_1.NativeBaseProvider>
        {router}
    </native_base_1.NativeBaseProvider>);
}
exports.default = App;

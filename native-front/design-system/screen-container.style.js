"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.screenContainerStyle = void 0;
var react_native_1 = require("react-native");
var margin_enum_1 = require("./enums/margin.enum");
exports.screenContainerStyle = react_native_1.StyleSheet.create({
    container: {
        margin: margin_enum_1.Margin.MEDIUM,
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
});

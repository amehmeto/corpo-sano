"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsActiveTextInputStyle = exports.TextInputStyle = void 0;
var colors_enum_1 = require("./enums/colors.enum");
exports.TextInputStyle = {
    backgroundColor: 'rgba(5, 154, 34, 0.1)',
    color: 'black',
};
exports.IsActiveTextInputStyle = {
    backgroundColor: 'rgba(5, 154, 34, 0.1)',
    borderBottomColor: colors_enum_1.Colors.PRIMARY_700,
    borderBottomWidth: 2.25,
    color: 'black',
};

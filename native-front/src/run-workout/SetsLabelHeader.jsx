"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.styles = exports.SetsLabelHeader = void 0;
var react_native_1 = require("react-native");
var React = require("react");
var font_size_enum_1 = require("../../design-system/enums/font-size.enum");
function SetsLabelHeader() {
    return (<react_native_1.View style={exports.styles.labelsHeader}>
      <react_native_1.Text style={exports.styles.label}/>
      <react_native_1.Text style={exports.styles.label}>Last Session</react_native_1.Text>
      <react_native_1.Text style={exports.styles.label}>Goal</react_native_1.Text>
      <react_native_1.Text style={exports.styles.label}>Today</react_native_1.Text>
    </react_native_1.View>);
}
exports.SetsLabelHeader = SetsLabelHeader;
exports.styles = react_native_1.StyleSheet.create({
    labelsHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '80%',
        flex: 1,
    },
    label: {
        paddingLeft: 10,
        paddingRight: 10,
        margin: 10,
        fontSize: font_size_enum_1.FontSize.BODY_TEXT_SMALL,
    },
});

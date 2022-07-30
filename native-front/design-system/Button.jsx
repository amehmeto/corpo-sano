"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.styles = exports.Button = void 0;
var react_native_1 = require("react-native");
var react_1 = require("react");
var colors_enum_1 = require("./enums/colors.enum");
var padding_enum_1 = require("./enums/padding.enum");
var font_size_enum_1 = require("./enums/font-size.enum");
function Button(_a) {
    var text = _a.text, onPress = _a.onPress, _b = _a.style, additionalStyle = _b === void 0 ? {} : _b;
    return (<react_native_1.Pressable style={[exports.styles.button, additionalStyle]} onPress={onPress}>
      <react_native_1.Text style={exports.styles.buttonText}>{text}</react_native_1.Text>
    </react_native_1.Pressable>);
}
exports.Button = Button;
exports.styles = react_native_1.StyleSheet.create({
    button: {
        backgroundColor: colors_enum_1.Colors.PRIMARY_700,
        borderRadius: 5,
        paddingVertical: padding_enum_1.Padding.MEDIUM,
        paddingHorizontal: padding_enum_1.Padding.EXTRA_LARGE,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: font_size_enum_1.FontSize.HEADING_4,
    },
});

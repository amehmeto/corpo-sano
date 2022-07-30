"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
var react_native_1 = require("react-native");
var react_1 = require("react");
function Card(_a) {
    var children = _a.children, onPress = _a.onPress, text = _a.text, additionalStyle = _a.style;
    return (<react_native_1.Pressable style={[styles.card, additionalStyle]} onPress={onPress}>
      <react_native_1.Text>{text}</react_native_1.Text>
    </react_native_1.Pressable>);
}
exports.Card = Card;
var styles = react_native_1.StyleSheet.create({
    card: {
        padding: 10,
        paddingLeft: 30,
        borderRadius: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'gray',
        width: '90%',
    },
});

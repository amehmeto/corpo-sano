"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberSetter = void 0;
var react_native_1 = require("react-native");
var react_1 = require("react");
var Button_1 = require("../../../design-system/Button");
var font_size_enum_1 = require("../../../design-system/enums/font-size.enum");
var TextInput_1 = require("../../../design-system/TextInput");
function NumberSetter(_a) {
    var _number = _a._number;
    var _b = react_1.useState(_number), number = _b[0], setNumber = _b[1];
    function addNumber() {
        setNumber(function (prevNumber) { return prevNumber + 1; });
    }
    function subtractNumber() {
        setNumber(function (prevNumber) { return prevNumber - 1; });
    }
    return (<react_native_1.View style={styles.numberSetter}>
      <Button_1.Button text={'-'} onPress={subtractNumber} style={styles.button}/>
      <react_native_1.TextInput style={[styles.number, TextInput_1.IsActiveTextInputStyle]} value={number.toString()} onChange={function () {
            setNumber(number);
        }}/>
      <Button_1.Button text={'+'} onPress={addNumber} style={styles.button}/>
    </react_native_1.View>);
}
exports.NumberSetter = NumberSetter;
var styles = react_native_1.StyleSheet.create({
    numberSetter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    number: {
        textAlign: 'center',
        fontSize: font_size_enum_1.FontSize.HEADING_4,
        paddingLeft: 10,
        paddingRight: 10,
        width: 60,
    },
    button: {
        paddingTop: 3,
        paddingBottom: 3,
        borderRadius: 5,
    },
});

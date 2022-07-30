"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestTimeSetter = void 0;
var react_native_1 = require("react-native");
var react_1 = require("react");
var font_size_enum_1 = require("../../../design-system/enums/font-size.enum");
var TextInput_1 = require("../../../design-system/TextInput");
function RestTimeSetter(_a) {
    var time = _a.time;
    return (<react_native_1.View style={styles.numberSetter}>
      <react_native_1.TextInput style={[styles.number, TextInput_1.TextInputStyle]} value={time.minutes.toString()}/>
      <react_native_1.Text style={styles.number}>min</react_native_1.Text>
      <react_native_1.TextInput style={[styles.number, TextInput_1.TextInputStyle]} value={time.seconds}/>
    </react_native_1.View>);
}
exports.RestTimeSetter = RestTimeSetter;
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
});

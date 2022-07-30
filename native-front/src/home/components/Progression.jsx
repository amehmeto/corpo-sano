"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var native_base_1 = require("native-base");
var react_1 = require("react");
function Progression() {
    return (<react_native_1.View style={styles.container}>
      <native_base_1.Progress colorScheme="secondary" style={styles.bar} value={34}/>
      <react_native_1.View style={styles.barLabel}>
        <native_base_1.Text>3/22</native_base_1.Text>
        <native_base_1.Text>Program Lafay</native_base_1.Text>
      </react_native_1.View>
      <native_base_1.Progress colorScheme="emerald" style={styles.bar} value={34}/>
      <react_native_1.View style={styles.barLabel}>
        <native_base_1.Text>4/22</native_base_1.Text>
        <native_base_1.Text>Assouplissement</native_base_1.Text>
      </react_native_1.View>
    </react_native_1.View>);
}
exports.default = Progression;
var styles = react_native_1.StyleSheet.create({
    container: {
        padding: 20,
        flexGrow: 1,
    },
    bar: {
        margin: 5,
        width: '100%',
    },
    barLabel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

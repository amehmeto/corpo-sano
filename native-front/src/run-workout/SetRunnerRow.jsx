"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetRunnerRow = void 0;
var react_native_1 = require("react-native");
var react_1 = require("react");
var colors_enum_1 = require("../../design-system/enums/colors.enum");
function SetRunnerRow(_a) {
    var set = _a.set, index = _a.index, isRunning = _a.isRunning;
    var styles = isRunning ? isRunningStyles : isNotRunningStyles;
    return (<react_native_1.View style={styles.setRow}>
      <react_native_1.Text style={styles.setTitle}>{index + 1}st set:</react_native_1.Text>
      <react_native_1.Text style={styles.exerciseName}>{set[0]}</react_native_1.Text>
      <react_native_1.Text style={styles.exerciseName}>{set[1]}</react_native_1.Text>
      <react_native_1.TextInput style={styles.newPerf} value={set[2].toString()}/>
    </react_native_1.View>);
}
exports.SetRunnerRow = SetRunnerRow;
var isRunningStyles = react_native_1.StyleSheet.create({
    setRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 10,
    },
    exerciseName: {
        paddingLeft: 10,
        paddingRight: 10,
        margin: 20,
        fontSize: 28,
        color: colors_enum_1.Colors.PRIMARY_700,
    },
    setTitle: {
        fontWeight: 'bold',
        fontSize: 22,
        color: colors_enum_1.Colors.PRIMARY_700,
    },
    newPerf: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        margin: 20,
        fontSize: 28,
        textAlign: 'center',
        textDecorationStyle: 'solid',
        textDecorationColor: 'green',
        color: colors_enum_1.Colors.PRIMARY_700,
        width: 10,
    },
});
var isNotRunningStyles = react_native_1.StyleSheet.create({
    setRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 10,
    },
    exerciseName: {
        paddingLeft: 10,
        paddingRight: 10,
        margin: 20,
        fontSize: 28,
        color: 'gray',
    },
    setTitle: {
        fontWeight: 'bold',
        fontSize: 22,
        color: 'gray',
    },
    newPerf: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        margin: 20,
        fontSize: 28,
        textAlign: 'center',
        textDecorationStyle: 'solid',
        textDecorationColor: 'green',
        color: 'gray',
        width: 10,
    },
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.styles = void 0;
var react_native_1 = require("react-native");
var react_1 = require("react");
var SetRunnerRow_1 = require("./SetRunnerRow");
var Button_1 = require("../../design-system/Button");
var SetsLabelHeader_1 = require("./SetsLabelHeader");
var screen_container_style_1 = require("../../design-system/screen-container.style");
function SetsRunnerScreen(_a) {
    var navigation = _a.navigation;
    var setsStatistics = [
        [4, 8, 9],
        [4, 8, 9],
        [4, 8, 9],
        [4, 8, 9],
        [4, 8, 9],
    ];
    var setRunnerRows = setsStatistics.map(function (set, index) {
        var isRunning = index === 1;
        return (<SetRunnerRow_1.SetRunnerRow key={index} set={set} index={index} isRunning={isRunning}/>);
    });
    return (<react_native_1.View style={screen_container_style_1.screenContainerStyle.container}>
      <react_native_1.Text style={exports.styles.title}>Push-ups</react_native_1.Text>

      <SetsLabelHeader_1.SetsLabelHeader />

      <react_native_1.ScrollView contentContainerStyle={exports.styles.scroll}>
        {setRunnerRows}
      </react_native_1.ScrollView>

      <Button_1.Button style={exports.styles.button} text={'Start First Set'} onPress={function () { return navigation.navigate('WorkoutSessionSummary'); }}/>
    </react_native_1.View>);
}
exports.default = SetsRunnerScreen;
exports.styles = react_native_1.StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 30,
        margin: 20,
    },
    scroll: {
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    button: {
        marginTop: 20,
    },
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var react_1 = require("react");
var RestTimeSetter_1 = require("./components/RestTimeSetter");
var NumberSetter_1 = require("./components/NumberSetter");
var Button_1 = require("../../design-system/Button");
var font_size_enum_1 = require("../../design-system/enums/font-size.enum");
var HomeRouter_1 = require("../routers/HomeRouter");
var screen_container_style_1 = require("../../design-system/screen-container.style");
var exercise_entity_1 = require("./entities/exercise.entity");
var exercise_template_entity_1 = require("./entities/exercise-template.entity");
function CreateExerciseScreen(_a) {
    var navigation = _a.navigation;
    var _b = react_1.useState(new exercise_entity_1.Exercise('', new exercise_template_entity_1.ExerciseTemplate('', 'Abdominal'), 120, 0, { minutes: 0, seconds: '04' }, { minutes: 0, seconds: '40' })), exercise = _b[0], setExercise = _b[1];
    react_1.useEffect(function () {
    }, []);
    function goToAddExercise() {
        navigation.navigate(HomeRouter_1.Routes.ADD_EXERCISE);
    }
    return (<react_native_1.View style={screen_container_style_1.screenContainerStyle.container}>
      <react_native_1.Text style={styles.subTitle}>Exercise Title</react_native_1.Text>
      <react_native_1.TextInput style={styles.textInput}/>

      <react_native_1.Text style={styles.subTitle}>Number of sets</react_native_1.Text>
      <NumberSetter_1.NumberSetter _number={exercise.numberOfSets}/>

      <react_native_1.Text style={styles.subTitle}>Number of reps</react_native_1.Text>
      <NumberSetter_1.NumberSetter _number={exercise.numberOfReps}/>

      <react_native_1.Text style={styles.subTitle}>Inter sets rest time</react_native_1.Text>
      <RestTimeSetter_1.RestTimeSetter time={exercise.interSetsRestTime}/>

      <react_native_1.Text style={styles.subTitle}>Final rest time</react_native_1.Text>
      <RestTimeSetter_1.RestTimeSetter time={exercise.finalRestTime}/>

      <Button_1.Button text={'Save Exercise'} onPress={goToAddExercise}/>
    </react_native_1.View>);
}
exports.default = CreateExerciseScreen;
var styles = react_native_1.StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: font_size_enum_1.FontSize.HEADING_2,
    },
    subTitle: {
        fontWeight: 'bold',
        fontSize: font_size_enum_1.FontSize.HEADING_4,
    },
    textInput: {
        display: 'flex',
        backgroundColor: 'white',
        height: 30,
    }
});

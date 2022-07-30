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
var get_exercise_usecase_1 = require("./usecases/get-exercise.usecase");
var dependency_injection_container_1 = require("../_infrastructure/dependency-injection.container");
var exercise_template_entity_1 = require("./entities/exercise-template.entity");
var getExerciseUseCase = new get_exercise_usecase_1.GetExerciseUseCase(dependency_injection_container_1.exerciseGateway);
function ExerciseSettingsScreen(_a) {
    var navigation = _a.navigation, route = _a.route;
    var exerciseId = route.params.exerciseId;
    var _b = react_1.useState(new exercise_entity_1.Exercise('', new exercise_template_entity_1.ExerciseTemplate('', ''), 120, 0, { minutes: 0, seconds: '04' }, { minutes: 0, seconds: '40' })), exercise = _b[0], setExercise = _b[1];
    react_1.useEffect(function () {
        getExerciseUseCase.execute(exerciseId).then(function (_exercise) {
            if (_exercise)
                setExercise(_exercise);
        });
    }, []);
    function goToHomeScreen() {
        navigation.navigate(HomeRouter_1.Routes.HOME);
    }
    if (!exercise)
        return <react_native_1.Text> Loading exercise ... </react_native_1.Text>;
    return (<react_native_1.View style={screen_container_style_1.screenContainerStyle.container}>
      <react_native_1.Text style={styles.title}>{exercise.template.title}</react_native_1.Text>

      <react_native_1.Text style={styles.subTitle}>Number of sets</react_native_1.Text>
      <NumberSetter_1.NumberSetter _number={exercise.numberOfSets}/>

      <react_native_1.Text style={styles.subTitle}>Number of reps</react_native_1.Text>
      <NumberSetter_1.NumberSetter _number={exercise.numberOfReps}/>

      <react_native_1.Text style={styles.subTitle}>Inter sets rest time</react_native_1.Text>
      <RestTimeSetter_1.RestTimeSetter time={exercise.interSetsRestTime}/>

      <react_native_1.Text style={styles.subTitle}>Final rest time</react_native_1.Text>
      <RestTimeSetter_1.RestTimeSetter time={exercise.finalRestTime}/>

      <Button_1.Button text={'Save Exercise Settings'} onPress={goToHomeScreen}/>
    </react_native_1.View>);
}
exports.default = ExerciseSettingsScreen;
var styles = react_native_1.StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: font_size_enum_1.FontSize.HEADING_2,
    },
    subTitle: {
        fontWeight: 'bold',
        fontSize: font_size_enum_1.FontSize.HEADING_4,
    },
});

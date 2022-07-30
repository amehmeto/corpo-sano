"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteWorkoutModal = void 0;
var react_native_1 = require("react-native");
var Button_1 = require("../../../../design-system/Button");
var react_1 = require("react");
var margin_enum_1 = require("../../../../design-system/enums/margin.enum");
var padding_enum_1 = require("../../../../design-system/enums/padding.enum");
function DeleteWorkoutModal(_a) {
    var visible = _a.visible, cancelWorkoutDelete = _a.cancelWorkoutDelete, deleteWorkout = _a.deleteWorkout;
    return (<react_native_1.Modal animationType={'slide'} transparent={true} visible={visible}>
      <react_native_1.View style={styles.modalContainer}>
        <react_native_1.View style={styles.deleteExerciseModal}>
          <react_native_1.Text style={styles.deleteExerciseModalQuestion}>
            {'Remove this workout from the program?'}
          </react_native_1.Text>
          <react_native_1.View style={styles.deleteExerciseModalButtons}>
            <Button_1.Button style={[styles.deleteExerciseModalButton, styles.cancelButton]} text={'Cancel'} onPress={cancelWorkoutDelete}/>
            <Button_1.Button style={[styles.deleteExerciseModalButton, styles.deleteButton]} text={'Remove'} onPress={deleteWorkout}/>
          </react_native_1.View>
        </react_native_1.View>
      </react_native_1.View>
    </react_native_1.Modal>);
}
exports.DeleteWorkoutModal = DeleteWorkoutModal;
var styles = react_native_1.StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteExerciseModal: {
        backgroundColor: 'white',
        borderRadius: 10,
    },
    deleteExerciseModalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: margin_enum_1.Margin.LARGE,
    },
    deleteExerciseModalQuestion: {
        margin: margin_enum_1.Margin.LARGE,
    },
    deleteExerciseModalButton: {
        borderRadius: 5,
        paddingVertical: padding_enum_1.Padding.SMALL,
        paddingHorizontal: padding_enum_1.Padding.LARGE,
    },
    cancelButton: {
        backgroundColor: 'grey',
        marginRight: margin_enum_1.Margin.LARGE,
    },
    deleteButton: {
        backgroundColor: 'red',
    },
});

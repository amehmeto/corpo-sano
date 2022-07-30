"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutPreviewCard = void 0;
var react_native_1 = require("react-native");
var vector_icons_1 = require("@expo/vector-icons");
var react_1 = require("react");
var margin_enum_1 = require("../../../design-system/enums/margin.enum");
var padding_enum_1 = require("../../../design-system/enums/padding.enum");
function WorkoutPreviewCard(_a) {
    var _b;
    var workout = _a.workout, openDeleteModal = _a.openDeleteModal, dayInitials = _a.dayInitials, navigate = _a.navigate;
    return (<react_native_1.Pressable style={styles.workoutPreview}>
      <react_native_1.View style={styles.titleAndEditIconsRow}>
        <react_native_1.Text style={styles.workoutTitle}>{workout.title}</react_native_1.Text>
        <react_native_1.View style={styles.editIcons}>
          <react_native_1.Pressable onPress={navigate}>
            <vector_icons_1.MaterialCommunityIcons name={'square-edit-outline'} size={20} color={'gray'}/>
          </react_native_1.Pressable>
          <react_native_1.Pressable onPress={openDeleteModal}>
            <vector_icons_1.MaterialCommunityIcons name={'delete-outline'} size={20} color={'gray'}/>
          </react_native_1.Pressable>
        </react_native_1.View>
      </react_native_1.View>
      <react_native_1.Text>{(((_b = workout.exercises) === null || _b === void 0 ? void 0 : _b.length) || 0) + " exercises"}</react_native_1.Text>
      <react_native_1.View style={styles.dayInitialContainer}>{dayInitials}</react_native_1.View>
    </react_native_1.Pressable>);
}
exports.WorkoutPreviewCard = WorkoutPreviewCard;
var styles = react_native_1.StyleSheet.create({
    workoutPreview: {
        margin: margin_enum_1.Margin.MEDIUM,
        padding: padding_enum_1.Padding.MEDIUM,
        flexGrow: 1,
        borderRadius: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'gray',
    },
    titleAndEditIconsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    editIcons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    workoutTitle: {
        fontWeight: 'bold',
        marginBottom: margin_enum_1.Margin.SMALL,
    },
    dayInitialContainer: {
        flexDirection: 'row',
    },
});

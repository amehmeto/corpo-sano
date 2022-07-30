"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditExerciseButton = void 0;
var react_native_1 = require("react-native");
var vector_icons_1 = require("@expo/vector-icons");
var react_1 = require("react");
function EditExerciseButton(props) {
    return (<react_native_1.Pressable onPress={props.onPress}>
      <vector_icons_1.MaterialCommunityIcons name={'square-edit-outline'} size={20} color={'gray'}/>
    </react_native_1.Pressable>);
}
exports.EditExerciseButton = EditExerciseButton;

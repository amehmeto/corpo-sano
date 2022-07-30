"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteExerciseButton = void 0;
var react_native_1 = require("react-native");
var vector_icons_1 = require("@expo/vector-icons");
var react_1 = require("react");
function DeleteExerciseButton(_a) {
    var openDeleteModal = _a.openDeleteModal;
    return (<react_native_1.Pressable onPress={openDeleteModal}>
      <vector_icons_1.MaterialCommunityIcons name={'delete-outline'} size={20} color={'gray'}/>
    </react_native_1.Pressable>);
}
exports.DeleteExerciseButton = DeleteExerciseButton;

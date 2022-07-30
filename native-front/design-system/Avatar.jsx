"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Avatar = void 0;
var react_native_1 = require("react-native");
var React = require("react");
function Avatar(_a) {
    var source = _a.source;
    if (source === 'default')
        source = require('../assets/default-picture.png');
    return (<react_native_1.Image style={styles.avatar} source={{
            uri: source,
        }}/>);
}
exports.Avatar = Avatar;
var styles = react_native_1.StyleSheet.create({
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
});

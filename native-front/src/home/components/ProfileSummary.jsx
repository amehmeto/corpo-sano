"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var font_size_enum_1 = require("../../../design-system/enums/font-size.enum");
var Avatar_1 = require("../../../design-system/Avatar");
function ProfileSummary(_a) {
    var athlete = _a.athlete;
    var name = athlete.name, avatar = athlete.avatar, _b = athlete.biometrics, weight = _b.weight, bodyFat = _b.bodyFat, weightUnit = _b.weightUnit;
    return (<react_native_1.View style={styles.container}>
      <react_native_1.Text style={styles.name}>{name}</react_native_1.Text>

      <Avatar_1.Avatar source={avatar}/>

      <react_native_1.View style={styles.biometrics}>
        <react_native_1.Text style={styles.biometricsData}>{weight + "\n" + weightUnit}</react_native_1.Text>
        <react_native_1.Text style={styles.biometricsData}>{bodyFat + "%\nb. fat"}</react_native_1.Text>
      </react_native_1.View>
    </react_native_1.View>);
}
exports.default = ProfileSummary;
var styles = react_native_1.StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 16,
        width: '20%',
    },
    name: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    biometrics: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 5,
        paddingBottom: 5,
        width: '100%',
    },
    biometricsData: {
        fontSize: font_size_enum_1.FontSize.BODY_TEXT_VERY_SMALL,
        textAlign: 'center',
    },
});

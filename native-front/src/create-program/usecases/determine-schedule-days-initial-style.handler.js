"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.determineDayInitialStyle = void 0;
var font_size_enum_1 = require("../../../design-system/enums/font-size.enum");
var margin_enum_1 = require("../../../design-system/enums/margin.enum");
var padding_enum_1 = require("../../../design-system/enums/padding.enum");
var react_native_1 = require("react-native");
function determineDayInitialStyle(workout) {
    var dayInitialStyle = [styles.dayInitial];
    workout.scheduledDays.forEach(function (day) {
        if (day.isScheduled)
            dayInitialStyle.push(styles.scheduledDayInitial);
    });
    return dayInitialStyle;
}
exports.determineDayInitialStyle = determineDayInitialStyle;
var styles = react_native_1.StyleSheet.create({
    dayInitial: {
        fontSize: font_size_enum_1.FontSize.BODY_TEXT_EXTRA_SMALL,
        fontWeight: 'bold',
        backgroundColor: 'gray',
        color: 'white',
        textTransform: 'uppercase',
        margin: margin_enum_1.Margin.SMALL,
        marginLeft: margin_enum_1.Margin.NONE,
        marginBottom: margin_enum_1.Margin.NONE,
        padding: padding_enum_1.Padding.EXTRA_SMALL,
        borderRadius: 2,
        width: 15,
        textAlign: 'center',
    },
    scheduledDayInitial: {
        backgroundColor: 'green',
    },
});

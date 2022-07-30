"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatForButton = void 0;
function formatForButton(day) {
    return "" + day.name.charAt(0).toUpperCase() + day.name.slice(1, 3);
}
exports.formatForButton = formatForButton;

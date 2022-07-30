"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Progression_1 = require("../home/components/Progression");
var bottom_tabs_1 = require("@react-navigation/bottom-tabs");
var native_1 = require("@react-navigation/native");
var vector_icons_1 = require("@expo/vector-icons");
var HomeRouter_1 = require("./HomeRouter");
var colors_enum_1 = require("../../design-system/enums/colors.enum");
var Tab = bottom_tabs_1.createBottomTabNavigator();
var tabRoutes = [
    {
        name: 'Dashboard',
        component: HomeRouter_1.HomeRouter,
        iconName: 'home',
    },
    {
        name: 'Progression',
        component: Progression_1.default,
        iconName: 'trending-up',
    },
    {
        name: 'Workouts',
        component: Progression_1.default,
        iconName: 'dumbbell',
    },
    {
        name: 'Settings',
        component: Progression_1.default,
        iconName: 'settings',
    },
];
function generateTabIcon(tab) {
    var elementAttributes = {
        name: tab.iconName,
        size: tab.iconName === 'settings' ? 38.5 : 40,
        color: tab.focused ? colors_enum_1.Colors.PRIMARY_700 : 'gray',
    };
    return tab.iconName === 'settings' ? (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <vector_icons_1.Ionicons {...elementAttributes}/>) : (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <vector_icons_1.MaterialCommunityIcons {...elementAttributes}/>);
}
var tabScreens = tabRoutes.map(function (tabRoute, index) {
    return (<Tab.Screen key={index} name={tabRoute.name} component={tabRoute.component} options={{
            tabBarIcon: function (_a) {
                var focused = _a.focused;
                return generateTabIcon({
                    name: tabRoute.name,
                    iconName: tabRoute.iconName,
                    focused: focused,
                });
            },
            tabBarLabelPosition: 'below-icon',
            tabBarActiveTintColor: 'green',
            tabBarStyle: { marginVertical: 5, borderTopColor: 'white' },
            headerShown: false,
        }}/>);
});
function TabRouter() {
    return (<native_1.NavigationContainer>
      <Tab.Navigator screenOptions={{ tabBarStyle: { position: 'absolute' } }}>
        {tabScreens}
      </Tab.Navigator>
    </native_1.NavigationContainer>);
}
exports.default = TabRouter;

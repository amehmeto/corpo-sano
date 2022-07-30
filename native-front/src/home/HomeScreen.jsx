"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeScreen = void 0;
var ProfileSummary_1 = require("./components/ProfileSummary");
var Progression_1 = require("./components/Progression");
var react_native_1 = require("react-native");
var React = require("react");
var get_athlete_use_case_1 = require("./usecases/get-athlete.use-case");
var margin_enum_1 = require("../../design-system/enums/margin.enum");
var dependency_injection_container_1 = require("../_infrastructure/dependency-injection.container");
var HomeRouter_1 = require("../routers/HomeRouter");
var react_1 = require("react");
var getAthleteUseCase = new get_athlete_use_case_1.GetAthleteUseCase(dependency_injection_container_1.athleteGateway);
function HomeScreen(_a) {
    var navigation = _a.navigation;
    var athleteId = '93c87b16-9c92-4440-9ce3-658050ba8dd8';
    var _b = react_1.useState(undefined), athlete = _b[0], setAthlete = _b[1];
    // TODO: when user registered to be remove default daily task
    var defaultDailyTask = {
        id: '',
        description: 'Create your first program',
        route: HomeRouter_1.Routes.CREATE_PROGRAM,
    };
    react_1.useEffect(function () {
        dependency_injection_container_1.initializeTokenCheatCode()
            .then(function () { return getAthleteUseCase.execute(athleteId); })
            .then(function (_athlete) {
            _athlete.dailyTasks.unshift(defaultDailyTask);
            setAthlete(_athlete);
        });
    }, []);
    var renderDailyTask = function (_a) {
        var dailyTask = _a.item;
        return (<react_native_1.Pressable style={styles.card} onPress={function () { return navigation.navigate(dailyTask.route); }}>
      <react_native_1.Text>{dailyTask.description}</react_native_1.Text>
    </react_native_1.Pressable>);
    };
    return (<>
      <react_native_1.View style={styles.container}>
        {athlete ? (<>
            <react_native_1.View style={styles.header}>
              <ProfileSummary_1.default athlete={athlete}/>
              <Progression_1.default />
            </react_native_1.View>
            <react_native_1.FlatList data={athlete.dailyTasks} renderItem={renderDailyTask} keyExtractor={function (item) { return item.id; }}/>
          </>) : (<react_native_1.Text>Loading...</react_native_1.Text>)}
      </react_native_1.View>
    </>);
}
exports.HomeScreen = HomeScreen;
var styles = react_native_1.StyleSheet.create({
    container: {
        margin: margin_enum_1.Margin.MEDIUM,
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        height: '20%',
    },
    dailyTasks: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
    },
    card: {
        padding: 10,
        paddingLeft: 30,
        borderRadius: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'gray',
        margin: 10,
        width: '90%',
    },
});

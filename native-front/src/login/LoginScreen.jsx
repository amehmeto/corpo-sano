"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var react_native_1 = require("react-native");
var dependency_injection_container_1 = require("../_infrastructure/dependency-injection.container");
var login_handler_1 = require("./usecases/login.handler");
var loginUseCase = new login_handler_1.LoginUseCase(dependency_injection_container_1.loginGateway);
function LoginScreen(_a) {
    var navigation = _a.navigation;
    var _b = react_1.useState(''), email = _b[0], setEmail = _b[1];
    var _c = react_1.useState(''), password = _c[0], setPassword = _c[1];
    function login() {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, loginUseCase.execute({ email: email, password: password })];
                    case 1:
                        _a.sent();
                        window.location.reload();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        throw new Error(e_1);
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    return (<react_native_1.View style={styles.container}>
      <react_native_1.View style={styles.image}/>

      <react_native_1.Text style={styles.inputTitle}>Email</react_native_1.Text>
      <react_native_1.View style={styles.inputView}>
        <react_native_1.TextInput style={styles.inputText} placeholderTextColor="#003f5c" onChangeText={function (email) { return setEmail(email); }}/>
      </react_native_1.View>

      <react_native_1.Text style={styles.inputTitle}>Password</react_native_1.Text>
      <react_native_1.View style={styles.inputView}>
        <react_native_1.TextInput style={styles.inputText} placeholderTextColor="#003f5c" secureTextEntry={true} onChangeText={function (password) { return setPassword(password); }}/>
      </react_native_1.View>

      <react_native_1.TouchableOpacity style={styles.loginButton} onPress={login}>
        <react_native_1.Text>LOGIN</react_native_1.Text>
      </react_native_1.TouchableOpacity>

      <react_native_1.View style={styles.bottomContainer}>
        <react_native_1.TouchableOpacity>
          <react_native_1.Text style={styles.forgotPassword}>Forgot Password?</react_native_1.Text>
        </react_native_1.TouchableOpacity>

        <react_native_1.TouchableOpacity>
          <react_native_1.Text style={styles.signUp}>Sign Up</react_native_1.Text>
        </react_native_1.TouchableOpacity>
      </react_native_1.View>
    </react_native_1.View>);
}
exports.default = LoginScreen;
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E2E2E0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        backgroundColor: '#fff',
        width: 150,
        height: 150,
        borderRadius: 100,
        marginBottom: 40,
    },
    inputView: {
        width: '80%',
        backgroundColor: '#fff',
        height: 45,
        marginBottom: 20,
        alignItems: 'center',
    },
    inputTitle: {
        width: '80%',
        textAlign: 'left',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    inputText: {
        width: '100%',
        height: 50,
        flex: 1,
        padding: 10,
    },
    loginButton: {
        width: '80%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        backgroundColor: 'gray',
    },
    bottomContainer: {
        flexDirection: 'row',
        width: '80%',
        marginTop: 10,
        justifyContent: 'space-between',
    },
    forgotPassword: {
        flexDirection: 'row',
        textAlign: 'left',
    },
    signUp: {
        flexDirection: 'row',
        textAlign: 'right',
    },
});

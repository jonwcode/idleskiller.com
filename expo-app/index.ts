import { registerRootComponent } from "expo";
// OR if you are using AsyncStorage
// import "react-native-devsettings/withAsyncStorage";
// import App from "./App";
import App from "./App";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

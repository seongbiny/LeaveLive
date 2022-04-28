import { NavigationContainer } from "@react-navigation/native";
import UserTabNav from "./UserTab";
// import CeoTabNav from "./CeoTab";

const Navigation = () => {
  return (
    <NavigationContainer>
      <UserTabNav />
      {/* <CeoTabNav /> */}
    </NavigationContainer>
  );
};

export default Navigation;

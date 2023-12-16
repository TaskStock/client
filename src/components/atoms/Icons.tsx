import { MaterialCommunityIcons, Ionicons, Feather } from "@expo/vector-icons";
import { Image } from "react-native";

type IconProps = {
  type: "material" | "ionicons" | "feather";
  name: string;
  size?: number;
  color?: string;
};

const Icons: React.FC<IconProps> = ({
  type = "material",
  name,
  size = 20,
  color = "black",
}) => {
  let IconComponent: any;
  if (type === "material") IconComponent = MaterialCommunityIcons;
  else if (type === "ionicons") IconComponent = Ionicons;
  else if (type === "feather") IconComponent = Feather;
  else return null;

  return <IconComponent name={name} size={size} color={color} />;
};

export default Icons;

export const IconsPic = ({ source, size }) => {
  return (
    <Image
      source={source}
      style={{
        width: size,
        height: size,
        resizeMode: "contain",
      }}
    />
  );
};

import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, TouchableOpacity } from "react-native";

type IconProps = {
  type: "material" | "ionicons" | "feather";
  name: string;
  size?: number;
  color?: string;
  onPress?: () => void;
};

const Icons: React.FC<IconProps> = ({
  type = "material",
  name,
  size = 20,
  color = "black",
  onPress,
}) => {
  let IconComponent: any;
  if (type === "material") IconComponent = MaterialCommunityIcons;
  else if (type === "ionicons") IconComponent = Ionicons;
  else if (type === "feather") IconComponent = Feather;
  else return null;

  return (
    <TouchableOpacity onPress={onPress}>
      <IconComponent name={name} size={size} color={color} />
    </TouchableOpacity>
  );
};

export default Icons;

export const IconsPic = ({
  source,
  size,
  onPress,
}: {
  source: any;
  size: number;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={source}
        style={{
          width: size,
          height: size,
          resizeMode: "contain",
        }}
      />
    </TouchableOpacity>
  );
};

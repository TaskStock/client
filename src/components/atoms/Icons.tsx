import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";
import { Image, TouchableOpacity } from "react-native";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";

type IconProps = {
  type: "material" | "ionicons" | "feather" | "entypo" | "materialIcons";
  name: string;
  size?: number;
  color?: string;
  onPress?: () => void;
  hitSlop?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
};

const Icons: React.FC<IconProps> = ({
  type = "material",
  name,
  size = useResponsiveFontSize(20),
  color = "black",
  onPress,
  hitSlop,
}) => {
  let IconComponent: any;
  if (type === "material") IconComponent = MaterialCommunityIcons;
  else if (type === "ionicons") IconComponent = Ionicons;
  else if (type === "feather") IconComponent = Feather;
  else if (type === "entypo") IconComponent = Entypo;
  else if (type === "materialIcons") IconComponent = MaterialIcons;
  else return null;

  return (
    <TouchableOpacity onPress={onPress} hitSlop={hitSlop}>
      <IconComponent
        name={name}
        size={useResponsiveFontSize(size)}
        color={color}
      />
    </TouchableOpacity>
  );
};

export default Icons;

export const IconsWithoutFeedBack: React.FC<IconProps> = ({
  type = "material",
  name,
  size = useResponsiveFontSize(20),
  color = "black",
}) => {
  let IconComponent: any;
  if (type === "material") IconComponent = MaterialCommunityIcons;
  else if (type === "ionicons") IconComponent = Ionicons;
  else if (type === "feather") IconComponent = Feather;
  else if (type === "entypo") IconComponent = Entypo;
  else if (type === "materialIcons") IconComponent = MaterialIcons;
  else return null;

  return (
    <IconComponent
      name={name}
      size={useResponsiveFontSize(size)}
      color={color}
    />
  );
};

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
          width: useResponsiveFontSize(size),
          height: useResponsiveFontSize(size),
          resizeMode: "contain",
        }}
      />
    </TouchableOpacity>
  );
};

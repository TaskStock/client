import { MaterialCommunityIcons, Ionicons, Feather } from "@expo/vector-icons";

const Icons = ({
  type = "material",
  name,
  size = 20,
  color = "black",
}: {
  type: "material" | "ionicons" | "feather";
  name: string;
  size?: number;
  color?: string;
}) => {
  if (type === "material")
    return <MaterialCommunityIcons name={name} size={size} color={color} />;
  else if (type === "ionicons")
    return <Ionicons name={name} size={size} color={color} />;
  else if (type === "feather")
    return <Feather name={name} size={size} color={color} />;
  else return null;
};

export default Icons;

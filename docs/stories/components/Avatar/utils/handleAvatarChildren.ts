import userIcon from "../../../shared/icons/userIcon";
import type { Props } from "../Avatar";

const handleChildren = ({
  imageUrl,
  children,
}: Pick<Props, "imageUrl" | "children">) => {
  if (imageUrl) {
    return "";
  }
  const baseChildren = children ? children : userIcon;
  return baseChildren;
};

export default handleChildren;

import getChildren from "../../shared/utils/getChildren";
import joinClassnames from "../../shared/utils/joinClassnames";
import userIcon from "../../shared/icons/userIcon";
import getClasses from "./utils/getClasses";
import handleChildren from "./utils/handleAvatarChildren";

export const SIZES = ["xs", "sm", "md", "lg", "xl", "2xl"] as const;
export const VARIANTS = ["soft", "outline", "fill"] as const;

export type Props = {
  imageUrl: string;
  hasChildren: boolean;
  children?: React.ReactNode;
  size: (typeof SIZES)[number];
  variant: (typeof VARIANTS)[number];
};

const createAvatar = (args: Props) => {
  const { imageUrl, children = userIcon, size, variant } = args;
  const avatar = document.createElement("div");
  const baseChildren = handleChildren({ imageUrl, children });
  const avatarChildren = getChildren({ children: baseChildren });
  avatar.appendChild(avatarChildren);
  if (imageUrl) {
    avatar.style.backgroundImage = `url('${imageUrl}')`;
  }
  avatar.className = joinClassnames([
    "moon-avatar",
    getClasses(size),
    getClasses(variant),
  ]);
  return avatar;
};

export default createAvatar;

import Icon from "../../shared/Icon";
import { createHTMLComponent } from "../../shared/utils/createHTMLComponent";
import joinClassnames from "../../shared/utils/joinClassnames";
import getClasses from "./utils/getClasses";

export const SIZES = ["xs", "sm", "md", "lg", "xl", "2xl"] as const;
export const VARIANTS = ["soft", "fill"] as const;

export type Props = {
  imageUrl: string;
  hasChildren: boolean;
  children?: React.ReactNode;
  size: (typeof SIZES)[number];
  variant: (typeof VARIANTS)[number];
};

const Avatar = ({ imageUrl, children, size, variant, hasChildren }: Props) => {
  const avatarContent = hasChildren ? children : <Icon name="star" />;
  const style = imageUrl ? { backgroundImage: `url('${imageUrl}')` } : {};

  return (
    <div
      className={joinClassnames([
        "moon-avatar",
        getClasses(size),
        getClasses(variant),
      ])}
      style={style}
    >
      {avatarContent}
    </div>
  );
};

export default createHTMLComponent(Avatar);

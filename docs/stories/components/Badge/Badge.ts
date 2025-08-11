import getChildren from "../../shared/utils/getChildren";

export type Props = {
  children: React.ReactNode;
};

const createBadge = (args: Props) => {
  const { children } = args;
  const badge = document.createElement("div");
  const badgeChildren = getChildren({ children });
  badge.appendChild(badgeChildren);
  badge.className = "moon-badge";
  return badge;
};

export default createBadge;

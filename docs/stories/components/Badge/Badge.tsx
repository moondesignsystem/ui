import { createHTMLComponent } from "../../shared/utils/createHTMLComponent";

export type Props = {
  children: React.ReactNode;
};

export const Badge = ({ children }: Props) => (
  <div className="moon-badge">{children}</div>
);

const createBadge = createHTMLComponent(Badge);

export default createBadge;

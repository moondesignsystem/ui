import { createHTMLComponent } from "../../shared/utils/createHTMLComponent";
import Icon from "../../shared/Icon";
import joinClassnames from "../../shared/utils/joinClassnames";
import getClasses from "./utils/getClasses";

export const POSITIONS = ["start", "end"] as const;

export type Props = {
  hasCloseButton: boolean;
  title: string;
  hasTitle: boolean;
  position: (typeof POSITIONS)[number];
};

const Drawer = ({ title, hasTitle, hasCloseButton, position }: Props) => (
  <div>
    <button className="moon-button">Open Drawer</button>
    <dialog
      className={joinClassnames(["moon-drawer", getClasses(position)])}
      id="drawer"
    >
      <div className="moon-drawer-box">
        {hasTitle && (
          <p className="moon-drawer-header">
            {title}
            {hasCloseButton && (
              <button className="moon-drawer-close">
                <Icon name="close" />
              </button>
            )}
          </p>
        )}
        <div className="w-full flex items-center justify-center h-full bg-brand-subtle text-brand">
          Content
        </div>
      </div>
      <form method="dialog" className="moon-backdrop">
        <button />
      </form>
    </dialog>
  </div>
);

export default createHTMLComponent(Drawer);

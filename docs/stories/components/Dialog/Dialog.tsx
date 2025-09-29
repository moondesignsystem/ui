import { createHTMLComponent } from "../../shared/utils/createHTMLComponent";
import Icon from "../../shared/Icon";

export type Props = {
  hasCloseButton: boolean;
  title: string;
  hasTitle: boolean;
};

const Dialog = ({ title, hasTitle, hasCloseButton }: Props) => (
  <div>
    <button className="moon-button">Open Dialog</button>
    <dialog className="moon-dialog" id="dialog">
      <div className="moon-dialog-box">
        {hasTitle && (
          <p className="moon-dialog-header">
            {title}
            {hasCloseButton && (
              <button className="moon-dialog-close">
                <Icon name="close" />
              </button>
            )}
          </p>
        )}
        <div className="w-full flex items-center justify-center h-40 bg-brand-subtle text-brand">
          Content
        </div>
      </div>
      <form method="dialog" className="moon-backdrop">
        <button />
      </form>
    </dialog>
  </div>
);

export default createHTMLComponent(Dialog);

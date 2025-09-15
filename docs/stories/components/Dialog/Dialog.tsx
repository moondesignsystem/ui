import { createHTMLComponent } from "../../shared/utils/createHTMLComponent";
import Icon from "../../shared/Icon";

export type Props = {
  hasDismissButton: boolean;
  title: string;
  hasTitle: boolean;
};

const Dialog = ({ title, hasTitle, hasDismissButton }: Props) => (
  <div>
    <button
      className="moon-button"
      {...({ onclick: "document.getElementById('dialog').showModal()" } as any)}
    >
      Open Dialog
    </button>
    <dialog className="moon-dialog" id="dialog">
      <div className="moon-dialog-box">
        {hasTitle && (
          <p className="moon-dialog-header">
            {title}
            {hasDismissButton && (
              <button
                className="moon-dialog-close"
                {...({
                  onclick: "document.getElementById('dialog').close()",
                } as any)}
              >
                <Icon name="close" />
              </button>
            )}
          </p>
        )}
        <div className="w-full flex items-center justify-center h-space-160 bg-brand-subtle text-brand">
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

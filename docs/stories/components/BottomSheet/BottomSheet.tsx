import Icon from "../../shared/Icon";
import { createHTMLComponent } from "../../shared/utils/createHTMLComponent";

export type Props = {
  hasDismissButton: boolean;
  title: string;
  hasTitle: boolean;
  hasHandle: boolean;
};

const BottomSheet = ({
  title,
  hasTitle,
  hasDismissButton,
  hasHandle,
}: Props) => {
  const handleOpenClick = () => {
    const dialog = document.getElementById("bottomSheet") as HTMLDialogElement;
    dialog?.showModal();
  };
  const handleCloseClick = () => {
    const dialog = document.getElementById("bottomSheet") as HTMLDialogElement;
    dialog?.close();
  };

  return (
    <div>
      <button className="moon-button" onClick={handleOpenClick}>
        Open Bottom Sheet
      </button>
      <dialog className="moon-bottom-sheet" id="bottomSheet">
        <div className="moon-bottom-sheet-box">
          {hasHandle && <div className="moon-bottom-sheet-handle" />}
          {hasTitle && (
            <div className="moon-bottom-sheet-header">
              <span>{title}</span>
              {hasDismissButton && (
                <button
                  className="moon-bottom-sheet-close"
                  onClick={handleCloseClick}
                >
                  <Icon name="close" />
                </button>
              )}
            </div>
          )}
          <div className="w-full flex items-center justify-center h-full bg-brand-subtle text-brand overflow-y-auto">
            Content
          </div>
        </div>
        <form method="dialog" className="moon-backdrop">
          <button />
        </form>
      </dialog>
    </div>
  );
};

export default createHTMLComponent(BottomSheet);

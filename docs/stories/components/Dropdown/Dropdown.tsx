import { createHTMLComponent } from "../../shared/utils/createHTMLComponent";

export type Props = {};

const Dropdown = ({}: Props) => (
  <div className="moon-dropdown">
    <div role="button" tabIndex={0} className="moon-button">
      Open Dropdown
    </div>
    <div tabIndex={0} className="moon-dropdown-content">
      <div className="w-full flex items-center justify-center h-20 bg-brand-subtle text-brand">
        Content
      </div>
    </div>
  </div>
);

export default createHTMLComponent(Dropdown);

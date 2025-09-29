import {
  DocsContainer,
  DocsContextProps,
  DocsPage,
} from "@storybook/addon-docs/blocks";
import { Renderer } from "storybook/internal/types";

type Props = {
  context: DocsContextProps<Renderer>;
  moon: string;
  github: string;
};

const LinksBlock = ({ context, moon, github }: Props) => (
  <DocsContainer context={context}>
    <div className="sb-unstyled flex flex-col sm:flex-row gap-space-12 mb-space-40">
      <a
        href={`https://beta.moon.io/docs/components/${moon}`}
        target="_blank"
        className="overflow-hidden flex items-center border border-primary rounded-4 h-space-48"
      >
        <div className="flex items-center justify-center h-full aspect-square bg-tertiary">
          <img src="/logo.png" alt="Website" className="w-space-40" />
        </div>
        <div className="flex flex-col px-space-8">
          <span className="text-md font-medium">View component</span>
          <span className="text-sm text-secondary">Moon Design System</span>
        </div>
      </a>
      <a
        href="https://www.npmjs.com/package/@heathmont/moon-ui"
        target="_blank"
        className="overflow-hidden flex items-center border border-primary rounded-4 h-space-48"
      >
        <div className="flex items-center justify-center h-full aspect-square bg-tertiary">
          <img src="/npm.png" alt="NPM" className="w-space-40" />
        </div>
        <div className="flex flex-col px-space-8">
          <span className="text-md font-medium">View package</span>
          <span className="text-sm text-secondary">NPM</span>
        </div>
      </a>
      <a
        href={`https://github.com/coingaming/moon-ui/blob/main/packages/src/styles/components/${github}`}
        target="_blank"
        className="overflow-hidden flex items-center border border-primary rounded-4 h-space-48"
      >
        <div className="flex items-center justify-center h-full aspect-square bg-tertiary">
          <img src="/github.png" alt="GitHub" className="w-space-40" />
        </div>
        <div className="flex flex-col px-space-8">
          <span className="text-md font-medium">View component</span>
          <span className="text-sm text-secondary">GitHub</span>
        </div>
      </a>
    </div>
    <DocsPage />
  </DocsContainer>
);

export default LinksBlock;

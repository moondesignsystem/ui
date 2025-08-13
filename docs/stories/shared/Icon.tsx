import joinClassnames from "./utils/joinClassnames";

type Props = {
  name: string;
  className?: string;
};

const Icon = ({ name, className }: Props) => (
  <div
    className={joinClassnames(["moon-icon mask-cover bg-[currentColor]", className])}
    style={{
      maskImage: `url(https://assets.moon.io/icons/${name}.svg)`,
    }}
  />
);

export default Icon;

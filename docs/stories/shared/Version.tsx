/// <reference types="vite/client" />

const Version = () => {
  const version = import.meta.env?.VITE_MOON_UI_VERSION ?? "2.0.0";
  return <span>v{version}</span>;
};

export default Version;

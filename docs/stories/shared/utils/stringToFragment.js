const stringToFragment = (string) => {
  const temp = document.createElement("template");
  temp.innerHTML = string;
  const firstChild = temp.content.firstElementChild;

  return firstChild ? firstChild : document.createTextNode(string);
};

export default stringToFragment;

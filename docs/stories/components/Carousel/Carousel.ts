import getChildren from "../../shared/utils/getChildren";
import chevronLeft from "../../shared/icons/chevronLeft";
import chevronRight from "../../shared/icons/chevronRight";

export type Props = {
  length: number;
  hasPagination: boolean;
  hasArrows: boolean;
};

const createCarousel = (args: Props) => {
  const { length, hasPagination, hasArrows } = args;
  const carousel = document.createElement("div");
  const carouselReel = document.createElement("ul");
  carousel.className = "moon-carousel";
  carouselReel.className = "moon-carousel-reel";
  carousel.appendChild(carouselReel);
  const items = new Array(length).fill("");
  items.forEach((_, item) => {
    const carouselItem = document.createElement("li");
    const content = document.createElement("div");
    content.className =
      "flex items-center justify-center h-space-160 w-2xs bg-brand-subtle text-brand";
    carouselItem.className = "moon-carousel-item";
    content.textContent = `Item ${item + 1}`;
    carouselItem.appendChild(content);
    carouselReel.appendChild(carouselItem);
  });
  if (hasArrows) {
    const startArrow = document.createElement("button");
    const endArrow = document.createElement("button");
    startArrow.className = "moon-carousel-control";
    endArrow.className = "moon-carousel-control";
    startArrow.appendChild(getChildren({ children: chevronLeft }));
    endArrow.appendChild(getChildren({ children: chevronRight }));
    carousel.appendChild(startArrow);
    carousel.appendChild(endArrow);
  }
  if (hasPagination) {
    const pagination = document.createElement("div");
    pagination.className = "moon-pagination";
    carousel.appendChild(pagination);
    items.forEach((_, i) => {
      const button = document.createElement("button");
      button.className = "moon-pagination-item";
      button.className = `moon-pagination-item${
        i === 2 ? " moon-pagination-item-active" : ""
      }`;
      button.textContent = (i + 1).toString();
      pagination.appendChild(button);
    });
  }
  return carousel;
};

export default createCarousel;

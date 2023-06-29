export const highLightCircles = (url) => {
  let element = "";
  switch (url) {
    case "/":
      element = document.querySelector("#info");
      element.classList.add("active");
      return element;
    case "/plan":
      element = document.querySelector("#plan");
      element.classList.add("active");
      return element;
    case "/addOn":
      element = document.querySelector("#addOn");
      element.classList.add("active");
      return element;

    case "/summary":
      element = document.querySelector("#summary");
      element.classList.add("active");
      return element;
    default:
      return element;
  }
};

import type { JSXElement } from "solid-js";
function onIntersect(entries: IntersectionObserverEntry[]) {
  entries.forEach((entry: IntersectionObserverEntry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    } else {
      entry.target.classList.remove("visible");
    }
  });
}
const observer = new IntersectionObserver(onIntersect, { threshold: 0.2 });
export default function FadeOnView(props: {
  class: string;
  children: string | JSXElement;
}) {
  const element = (
    <div class={props.class + " fadeInSection"}>{props.children}</div>
  );
  observer.observe(element);
  return element;
}

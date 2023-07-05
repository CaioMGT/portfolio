import { Show, type Component, createSignal } from "solid-js";
function setTitle(title: string) {
  document.title = title;
}
setTitle("Main Page");
const App: Component = () => {
  return <div>Hello World!</div>;
};

export default App;

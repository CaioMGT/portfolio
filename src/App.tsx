import { Show, type Component, createSignal, lazy } from "solid-js";
import { Router, Route, Routes } from "@solidjs/router";
const Home = lazy(() => import("./pages/Home"));
function setTitle(title: string) {
  document.title = title;
}
const App: Component = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" component={Home}></Route>
      </Routes>
    </Router>
  );
};

export default App;

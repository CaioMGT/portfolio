document.title = "Home";
import Ellie from "../components/Ellie";
export default function () {
  return (
    <div class="grid grid-cols-2 mx-4 px-8 h-[100vh] justify-between">
      <div class="my-12">
        <Ellie></Ellie>
        <div class="text-2xl text-slate-300">Programmer, UI Designer</div>
        <div class="text-1xl text-slate-300">Here's a little about me:</div>
      </div>
    </div>
  );
}

document.title = "Home";
import Topbar from "../components/Topbar";
const date = new Date();
const birthday = new Date("April 10 2008");
let age = date.getFullYear() - birthday.getFullYear();
if (date.getMonth() <= birthday.getMonth()) {
  // not hit birthday month, should subtract one from age.
  age--;
}
export default function () {
  return (
    <div>
      <Topbar activeButton=""></Topbar>
      <div class="md:grid grid-cols-2 mx-4 px-8 h-full justify-between">
        <div class="my-12 text-slate-300">
          <div class="text-6xl text-white">
            Hi, I'm <span class="glow text-pink-200">Ellie</span>
          </div>
          <div class="text-2xl">Programmer, UI Designer</div>
          <div class="text-1xl">Here's a little about me:</div>
          <div>
            I'm a {age} year old from Brazil, well-versed in programming both
            front-end and back-end applications.
          </div>
        </div>
      </div>
    </div>
  );
}

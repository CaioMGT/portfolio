document.title = "Home";
import Topbar from "../components/Topbar";
import { Motion } from "@motionone/solid";
const date = new Date();
const birthday = new Date("April 10 2008");
let age = date.getFullYear() - birthday.getFullYear();
if (date.getMonth() <= birthday.getMonth()) {
  // birthday month not hit, should subtract one from age.
  age--;
}
export default function () {
  return (
    <div>
      <Topbar activeButton=""></Topbar>
      <div class="md:grid grid-cols-2 mx-4 px-8 h-full justify-between">
        <div class="my-12 text-slate-300">
          <Motion
            class="text-6xl text-white"
            animate={{
              transform: ["translateX(-500px)", null, "translateX(0px)"],
            }}
            transition={{ duration: 1, transform: { offset: [0, 0.5, 1] } }}
          >
            Hi, I'm <span class="glow text-pink-200">Ellie</span>
          </Motion>
          <Motion
            class="text-2xl"
            animate={{
              transform: ["translateX(-500px)", null, "translateX(0px)"],
            }}
            transition={{ duration: 2, transform: { offset: [0, 0.5, 1] } }}
          >
            Programmer, UI Designer
          </Motion>
          <Motion
            animate={{ opacity: [0, null, 1] }}
            transition={{ duration: 4, opacity: { offset: [0, 0.75, 1] } }}
          >
            <div class="text-1xl">Here's a little about me:</div>
            <div>
              I'm a {age} year old from Brazil, well-versed in programming both
              front-end and back-end applications. Starting at an early age,
              I've started developing applications at the age of 10, with the
              goal of becoming a professional programmer. I'm currently still on
              that path and plan to major in Computer Science. I'm trans and use
              She/Her pronouns.
            </div>
          </Motion>
        </div>
      </div>
    </div>
  );
}

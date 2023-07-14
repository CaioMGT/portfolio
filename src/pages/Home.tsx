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
      <div class="md:grid grid-cols-2 mx-4 px-8 justify-center overflow-x-hidden my-12">
        <div class="my-12 text-slate-300 lg:pr-32 xl:pr-64">
          {/* I have to animate transform because the motion one wiki says using x: is not hardware accelerated,
              which is a no-no for performance. 
              Check https://motion.dev/guides/performance#css-variables-and-individual-transforms for more info
              */}
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
              that path and plan to major in Computer Science. I'm trans-fem and
              use She/Her pronouns.
            </div>
          </Motion>
        </div>
        <div class="my-12 text-slate-200  lg:pl-32 xl:pl-64">
          <Motion
            class="text-6xl text-white pb-2"
            animate={{
              opacity: ["0", null, "1"],
            }}
            transition={{ duration: 6, opacity: { offset: [0, 0.8, 1] } }}
          >
            My <span class="glow text-pink-200">Likes </span>
          </Motion>
          <Motion
            animate={{ opacity: [0, null, 1] }}
            transition={{ duration: 6, opacity: { offset: [0, 0.8, 1] } }}
          >
            I like playing video games, developing them and generally anything
            tech-related. I've experimented with a little bit of hardware
            engineering using my arduino and breadboards before but decided it's
            not the right field for me. I have a fascination with modding games
            and would love to some day learn how to make my own mods for the
            games I play. My favorite programming languages are Typescript, Lua
            and C#.
          </Motion>
        </div>
      </div>
      <Motion
        class="text-4xl text-center"
        animate={{
          transform: [
            "translateY(500px)",
            null,
            screen.availHeight < 768
              ? "translateY(0px)"
              : screen.availHeight < 900
              ? "translateY(100px)"
              : "translateY(200px)",
          ],
          opacity: [0, null, 1],
        }}
        transition={{
          duration: 6,
          transform: { offset: [0, 0.9, 1] },
          opacity: { offset: [0, 0.9, 0.9] },
        }}
      >
        Take a look at some stuff I did:
      </Motion>
      <Motion initial={false} animate={{ x: 100 }}></Motion>
    </div>
  );
}

document.title = "Home";
import FadeOnView from "../components/FadeOnView";
import Topbar from "../components/Topbar";
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
          <div class="text-6xl text-white popLeft">
            Hi, I'm <span class="glow text-pink-200">Ellie</span>
          </div>
          <div class="text-2xl popLeftLong">Programmer, UI Designer</div>
          <div class="fadeLong">
            <div class="text-1xl">Here's a little about me:</div>
            <div>
              I'm a {age} year old from Brazil, well-versed in programming both
              front-end and back-end applications. Starting at an early age,
              I've started developing applications at the age of 10, with the
              goal of becoming a professional programmer. I'm currently still on
              that path and plan to major in Computer Science. I'm trans-fem and
              use She/Her pronouns.
            </div>
          </div>
        </div>
        <div class="my-12 text-slate-200  lg:pl-32 xl:pl-64">
          <div class="fadeLonger text-6xl">
            My <span class="glow text-pink-200">Likes </span>
          </div>
          <div class="fadeLonger">
            I like playing video games, developing them and generally anything
            tech-related. I've experimented with a little bit of hardware
            engineering using my arduino and breadboards before but decided it's
            not the right field for me. I have a fascination with modding games
            and would love to some day learn how to make my own mods for the
            games I play. My favorite programming languages are Typescript, Lua
            and C#.
          </div>
        </div>
      </div>
      <div class="popUp text-4xl text-center md:py-32">
        Take a look at some stuff I did:
      </div>
      <FadeOnView class="your mom">
        <div> your mom</div>
      </FadeOnView>
    </div>
  );
}

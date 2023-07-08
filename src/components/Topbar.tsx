import { A } from "@solidjs/router";

function TopbarButton(props: { name: string; href: string }) {
  return (
    <A href={props.href} class="hover:bg-slate-300/30 rounded-lg px-2 py-2">
      {props.name}
    </A>
  );
}
export default function Topbar(props: { activeButton: string }) {
  return (
    <div class="w-full border-slate-800/5 border-b-4 py-2 flex flex-row-reverse px-2 bg-transparent sticky backdrop-blur top-0">
      <TopbarButton href="/" name="Home"></TopbarButton>
    </div>
  );
}

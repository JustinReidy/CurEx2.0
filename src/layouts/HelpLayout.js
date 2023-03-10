import { Outlet } from "react-router-dom";

export default function HelpLayout() {
  return (
    <div>
        <h2>Website Help</h2>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut, veritatis?</p>

        <Outlet />
    </div>
  )
}

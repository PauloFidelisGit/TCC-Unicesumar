import logo from "../../assets/logo.svg";

export function DashboardFallback() {
  return (
    <div className="grid h-screen w-screen place-content-center">
      <img src={logo} className="m-auto" />
    </div>
  );
}

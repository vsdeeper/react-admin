import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <>
      <header>顶部</header>
      <div className="container">
        <aside>侧栏</aside>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}

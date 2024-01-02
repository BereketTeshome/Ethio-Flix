import { lazy, Suspense } from "react";

const Main = ({ toggleTheme }) => {
  const Home = lazy(() => import("./Home"));
  const Section = lazy(() => import("./Section"));

  return (
    <Suspense>
      <Home toggleTheme={toggleTheme} />
      <Section />
    </Suspense>
  );
};

export default Main;

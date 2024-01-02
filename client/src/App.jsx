import "./App.css";
import { lazy, Suspense, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";

function App() {
  const Main = lazy(() => import("./components/Main"));
  const Footer = lazy(() => import("./components/Footer"));
  const Movies = lazy(() => import("./pages/Movies"));
  const TvSeries = lazy(() => import("./pages/TvSeries"));
  const MovieDetail = lazy(() => import("./pages/MovieDetail"));
  const TvShowDetail = lazy(() => import("./pages/TvShowDetail"));
  const PersonDetail = lazy(() => import("./pages/PersonDetail"));
  const SearchPage = lazy(() => import("./pages/SearchPage"));
  const SignIn = lazy(() => import("./pages/SignIn"));
  const SignUp = lazy(() => import("./pages/SignUp"));
  const UpdateUser = lazy(() => import("./pages/UpdateUser"));
  const Reviews = lazy(() => import("./pages/Reviews"));
  const Favorites = lazy(() => import("./pages/Favorites"));
  const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  return (
    <div className="App" id={theme}>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Main toggleTheme={toggleTheme} />} />
            <Route
              path="/movies"
              element={<Movies toggleTheme={toggleTheme} />}
            />
            <Route
              path="/tvshows"
              element={<TvSeries toggleTheme={toggleTheme} />}
            />
            <Route
              path="/movie/:id"
              element={<MovieDetail toggleTheme={toggleTheme} />}
            />
            <Route
              path="/tv/:id"
              element={<TvShowDetail toggleTheme={toggleTheme} />}
            />
            <Route
              path="/person/:id"
              element={<PersonDetail toggleTheme={toggleTheme} />}
            />
            <Route
              path="/search"
              element={<SearchPage toggleTheme={toggleTheme} />}
            />
            <Route
              path="/login"
              element={<SignIn toggleTheme={toggleTheme} />}
            />
            <Route
              path="/signUp"
              element={<SignUp toggleTheme={toggleTheme} />}
            />
            <Route
              path="/updateProfile/:id"
              element={<UpdateUser toggleTheme={toggleTheme} />}
            />
            <Route
              path="/reviews"
              element={<Reviews toggleTheme={toggleTheme} />}
            />
            <Route
              path="/favorites"
              element={<Favorites toggleTheme={toggleTheme} />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;

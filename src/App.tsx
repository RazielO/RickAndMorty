import { CharacterInfo } from "./components/characters/CharacterInfo";
import { CharacterNotFound } from "./components/characters/CharacterNotFound";
import { Characters } from "./components/characters/Characters";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Characters />,
    },
    {
      path: "/character/:characterId",
      element: <CharacterInfo />,
      errorElement: <CharacterNotFound />
    },
  ]);

  return (
    <>
      <h1 className="mb-4 text-6xl text-gray-100 bold text-center">
        <a href="/">Rick & Morty</a>
      </h1>

      <RouterProvider router={router} />
    </>
  );
}

export default App;

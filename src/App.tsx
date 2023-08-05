import { CharacterInfo } from "./components/characters/CharacterInfo";
import { CharacterNotFound } from "./components/characters/CharacterNotFound";
import { Characters } from "./components/characters/Characters";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LocationInfo } from "./components/locations/LocationInfo";
import { LocationNotFound } from "./components/locations/LocationNotFound";
import { EpisodeInfo } from "./components/episodes/EpisodeInfo";
import { EpisodeNotFound } from "./components/episodes/EpisodeNotFound";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Characters />,
    },
    {
      path: "/character/:characterId",
      element: <CharacterInfo />,
      errorElement: <CharacterNotFound />,
    },
    {
      path: "/location/:locationId",
      element: <LocationInfo />,
      errorElement: <LocationNotFound />,
    },
    {
      path: "/episode/:episodeId",
      element: <EpisodeInfo />,
      errorElement: <EpisodeNotFound />,
    },
  ]);

  return (
    <>
      <h1 className="mb-4 text-6xl text-gray-100 bold text-center hover:text-blue-200 hover:underline">
        <a href="/">Rick & Morty</a>
      </h1>

      <RouterProvider router={router} />
    </>
  );
}

export default App;

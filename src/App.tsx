import { CharacterInfo, characterLoader } from "./components/characters/CharacterInfo";
import { Characters } from "./components/characters/Characters";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LocationInfo, locationLoader } from "./components/locations/LocationInfo";
import { EpisodeInfo, episodeLoader } from "./components/episodes/EpisodeInfo";
import { ItemNotFound } from "./components/ItemNotFound";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Characters />,
    },
    {
      path: "/character/:characterId",
      element: <CharacterInfo />,
      errorElement: <ItemNotFound type="character" />,
      loader: characterLoader
    },
    {
      path: "/location/:locationId",
      element: <LocationInfo />,
      errorElement: <ItemNotFound type="location" />,
      loader: locationLoader
    },
    {
      path: "/episode/:episodeId",
      element: <EpisodeInfo />,
      errorElement: <ItemNotFound type="episode" />,
      loader: episodeLoader
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

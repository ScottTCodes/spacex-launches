import { Launch } from '../../types/launch';

const fetchLaunches = async (page: number) => {
  try {
    const data = await fetch(`https://api.spacexdata.com/v3/launches?limit=9&offset=${page * 9}`);

    if (data.ok) {
      const launches: Launch[] = await data.json();

      return launches;
    }

    const error = await data.json();
    return new Error(error.message || error.statusText);
  } catch (error) {
    return new Error(error);
  }
};

export default fetchLaunches;

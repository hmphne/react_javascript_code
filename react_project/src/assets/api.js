export const getUserInfo = async () => {
    const response = await fetch(
      `https://dummyjson.com/users?limit=3`
    );
    return await response.json();
  };

  export const getCountry = async (name) => {
    const response = await fetch(
      `http://localhost:3000/?q=${name}`
    );
    return await response.json()
  }

  export const getCurrency = async (code) => {
    const response = await fetch(
      `http://localhost:3000/chart/${code}`
    );
    return await response.json();
  }
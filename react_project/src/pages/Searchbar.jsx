import { SearchRounded } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { getCountry } from "../assets/api";
import { useEffect, useState } from "react";
import { Card, CircularProgress, Divider } from "@mui/material";
import Chart from "../components/Chart";
import React from "react";

const Searchbar = () => {
  const [countryName, setCountryName] = useState("");
  const [chartTitle, setChartTitle] = useState("");
  const [countryData, setCountryData] = useState([]);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [showChart, setShowChart] = useState(false);

  const { isError, data, error } = useQuery(
    ["countries", countryName],
    () => getCountry(countryName),
    {
      enabled: !!countryName && countryName.length >= 3,
    }
  );

  const inputChangeHandler = (e) => {
    console.log(e.target.value);
    const searchTxt = e.target.value;
    setLoading(true);
    if (searchTxt.length >= 3) setCountryName(searchTxt);
    if (searchTxt.length < 3) {
      setCountryData([]);
      setShowChart(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data) {
      setCountryData(data.data.results);
      setLoading(false);
      console.log(data);
    }
  }, [countryName, data]);

  return (
    <div className="w-[50%] m-auto my-11">
      <form onSubmit={(e) => e.preventDefault()}>
        <label
          htmlFor="search"
          className="mb-2 text-xl font-medium text-gray-900 sr-only"
        >
          جستجو
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchRounded
              fontSize="large"
              className="pr-2 "
              color="disabled"
            />
          </div>
          <input
            type="search"
            id="search"
            className="block w-full p-4 pl-10 text-xl text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-teal-500"
            placeholder="Enter country name..."
            required
            onChange={inputChangeHandler}
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-teal-700 hover:bg-teal-800 focus:outline-none font-medium rounded-lg text-xl px-4 py-2 "
          >
            Search
          </button>
        </div>
      </form>
      <Divider className="py-3" />
      <div className="flex justify-center gap-5 flex-wrap mt-8">
        {loading ? (
          <CircularProgress data-testid="loading" />
        ) : isError ? (
          <div>{error}</div>
        ) : countryData ? (
          <div data-testid="results" className="flex justify-center gap-5 flex-wrap mt-8">
            {
              countryData.map((i) => {
                return (
                  <Card
                    key={i.item.id}
                    className={`px-4 py-3 text-center flex gap-1 w-[250px] h-[50px] justify-around items-center ${
                      chartTitle === i.item.name ? "border-2 border-black" : ""
                    }`}
                    sx={{ background: "#d0d0d0ed", borderRadius: 1, fontSize: 14 }}
                    onClick={() => {
                      setCode(i.item.code);
                      setChartTitle(i.item.name);
                      setShowChart(true);
                    }}
                  >
                    <span className="text-black w-[150px] text-ellipsis overflow-hidden">
                      {i.item.name}
                    </span>
                    <span className="font-bold text-black">{i.item.code}</span>
                  </Card>
                );
              })
            }
          </div>
        ) : (
          ""
        )}
      </div>
      {showChart && (
        <div>
          <Divider className="py-3" />
          <Chart code={code} country={chartTitle} />
        </div>
      )}
    </div>
  );
};

export default Searchbar;

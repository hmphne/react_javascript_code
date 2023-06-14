import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Searchbar from "../pages/Searchbar";
import "@testing-library/jest-dom";
import { getCountry } from "../assets/api";


jest.mock("../assets/api");

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

test("renders search results correctly", async () => {

  const mockData = {
    data: {
      results: [
        { item: { id: 1, name: "Canada", code: "CA" } },
        { item: { id: 2, name: "United States", code: "US" } },
      ],
    },
  };

  getCountry.mockResolvedValue(mockData); // Mock the API call


  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={["/searchbar"]}>
        <Routes>
          <Route path="/searchbar" element={<Searchbar />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );

  const searchInput = screen.getByPlaceholderText("Enter country name...");
  fireEvent.change(searchInput, { target: { value: "germany" } });

 await waitFor(() => {
    expect(getCountry).toHaveBeenCalledTimes(1); 
    expect(screen.getByTestId("results")).toBeInTheDocument(); // Assert the presence of search results
  });

});

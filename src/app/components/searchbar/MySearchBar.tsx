import React, { useState } from 'react';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

const SearchBar = ({ setSearchQuery }: { setSearchQuery: Function }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <form>
      <TextField
        id="search-bar"
        className="text"
        onChange={handleInputChange}
        label="Enter a city name"
        variant="outlined"
        placeholder="Search..."
        size="small"
      />
      <IconButton type="submit" aria-label="search">
        <SearchIcon style={{ fill: "blue" }} />
      </IconButton>
    </form>
  );
};

const MySearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const data = [
    "Paris",
    "London",
    "New York",
    "Tokyo",
    "Berlin",
    "Buenos Aires",
    "Cairo",
    "Canberra",
    "Rio de Janeiro",
    "Dublin"
  ];
  const dataFiltered = filterData(searchQuery, data);

  return (
    <div
      style={{
        display: "flex",
        alignSelf: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: 20
      }}
    >
      <SearchBar setSearchQuery={setSearchQuery} />
      <div style={{ padding: 3 }}>
        {dataFiltered.map((d, idx) => (
          <div
            className="text"
            style={{
              padding: 5,
              justifyContent: "normal",
              fontSize: 20,
              color: "blue",
              margin: 1,
              width: "250px",
              borderColor: "green",
              borderWidth: "10px"
            }}
            key={idx}
          >
            {d}
          </div>
        ))}
      </div>
    </div>
  );
};

const filterData = (query: string, data: string[]) => {
  if (!query.trim()) {
    return data;
  } else {
    const searchTerms = query.trim().toLowerCase().split(" ");
    return data.filter((d) => {
      return searchTerms.every(term => d.toLowerCase().includes(term));
    });
  }
};

export default MySearchBar;

// export default function () {
'use client'
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

// const filterData = (query, data) => {
const filterData = (query:string, data:string[]) => {
  if (!query) {
    return data;
  } else {
    return data.filter((d) => d.toLowerCase().includes(query));
  }
};

const SearchBar = ({setSearchQuery}:any) => (
  <form>
    <TextField
      id="search-bar"
      className="text"
      onInput={(e) => {
        // setSearchQuery(e.target.value);
        // setSearchQuery(e.target.value);
      }}
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

// export default const MySearchBar = () => {
const MySearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dataFiltered = filterData(searchQuery, data);

  return (
    <div
      className={{
        display: "flex",
        alignSelf: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: 20
      }}
    >
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className={{ padding: 3 }}>
        {
          false &&
          dataFiltered.map((d, idx) => (
            <div
              className="text"
              className={{
                padding: 5,
                justifyContent: "normal",
                fontSize: 20,
                color: "blue",
                margin: 1,
                width: "250px",
                borderColor: "green",
                borderWidth: "10px"
              }}
              // key={d.id}
              key={idx}
            >
              {d}
            </div>
          ))}
      </div>
    </div>
  );
}

export default MySearchBar
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useRef } from "react";

function SearchCity({ weatherCity, getWeather }) {
  const inputRef = useRef();

  const functions = () => {
    weatherCity(inputRef.current.value);
    getWeather();
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="City Name"
        className="searchInput"
        ref={inputRef}
      />
      <button className="buttonSearch" type="submit" onClick={functions}>
        <MagnifyingGlass size={20} />
      </button>
    </div>
  );
}

export default SearchCity;

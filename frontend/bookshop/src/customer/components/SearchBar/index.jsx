import "./SearchBar.css";
import axios from "axios";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../../config/apiConfig";
import { useTranslation } from "react-i18next";

function SearchBar({ setResults, setVisible }) {
  const [input, setInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState(""); // Thêm state cho debounced input
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    // Chỉ gọi API nếu debouncedInput có ít nhất 2 ký tự và không phải chỉ là khoảng trắng
    if (debouncedInput.trim().length >= 2) {
      fecthData(debouncedInput);
      setVisible(true);
    } else {
      setResults([]);
      setVisible(false);
    }
  }, [debouncedInput]); // Gọi API khi debouncedInput thay đổi

  const normalizeString = (value) => {
    return value.trim().replace(/\s+/g, " ");
  };

  const fecthData = async (value) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
      };
      const results = await axios.get(
        `${API_BASE_URL}/api/products/search?q=${normalizeString(value)}`,
        config
      );
      setResults(results.data);
      console.log("fetch product call");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (value) => {
    setInput(value);
    setVisible(value.trim().length >= 2); // Ẩn `ResultsList` nếu input ít hơn 2 ký tự không khoảng trắng
  };

  // Debouncing input với useEffect để trì hoãn API call
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(input);
    }, 1000); // Trì hoãn 1 giây

    // Cleanup debounce timeout khi input thay đổi hoặc component unmount
    return () => {
      clearTimeout(handler);
    };
  }, [input]);

  const { t } = useTranslation();

  return (
    <div className="container-search mr-4">
      <input
        spellCheck="false"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={t("search")}
        onFocus={() => setVisible(true)}
        onBlur={() => {
          setTimeout(() => {
            setVisible(false);
          }, 125);
        }}
      />
      <button className="search-button">
        <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  );
}

export default SearchBar;

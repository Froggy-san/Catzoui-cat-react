import React, { createContext, forwardRef, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import useSearchTerm from "@/features/products/useSearch";
import useDebounce from "@/hooks/useDebounce";

import UilityButton from "./UilityButton";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CgSearchLoading } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";

interface images {
  image_url: string | null;
}

interface searchResult {
  ProductImages: images[];
  category: string;
  id: number;
  name: string;
}

interface SearchContextValue {
  handleOpen: (e?: MouseEvent) => void;
  isOpen: boolean;
  searchTerm: string;
  close: () => void;
  setSearchTerm: (value: string) => void;
  results: searchResult[] | [];
  isLoading: boolean;
}

// Create the context with the interface as a type parameter
const SearchContext = createContext<SearchContextValue>({
  handleOpen: () => {},
  isOpen: false,
  searchTerm: "",
  close: () => {},
  setSearchTerm: () => {},
  results: [],
  isLoading: false,
});

const Searching = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");

  // this is a hook provided by react query , that allows us to set a timeout while searching so we don't make alot of requests to the api.
  const debouncedValue = useDebounce(searchTerm, 500);

  const { isLoading, seachResults } = useSearchTerm(debouncedValue);

  const results = seachResults || [];
  console.log(seachResults, "Search results here !!!??>>>>");

  const handleOpen = (e?: MouseEvent) => {
    e?.stopPropagation();
    setIsOpen((is) => !is);
  };

  const close = () => {
    // console.log("is the clsoe function working ?? !!");
    // setSearchTerm("");
    setIsOpen(false);
  };
  return (
    <SearchContext.Provider
      value={{
        handleOpen,
        isOpen,
        close,
        searchTerm,
        setSearchTerm,
        results,
        isLoading,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

function Toggle() {
  const { handleOpen } = useContext(SearchContext);

  return (
    <UilityButton onClick={handleOpen}>
      <CiSearch />
    </UilityButton>
  );
}

const SearchBar = forwardRef(function SearchBar(
  _,
  ref?: React.Ref<HTMLDivElement>
) {
  const { isOpen, searchTerm, setSearchTerm, results, isLoading } =
    useContext(SearchContext);

  // const navigate = useNavigate();

  // const ref = useOutsideClick(close, false);
  return (
    <>
      {isOpen &&
        createPortal(
          <div
            ref={ref}
            id="search-bar"
            className=" fixed top-20 left-1/2 translate-x-[-50%] container z-50  px-2"
          >
            <div className="relative   mx-auto mb-2 shadow-xl rounded-bl-xl rounded-br-xl">
              <input
                type="text"
                autoFocus
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="w-full h-full px-3 py-[5px] border border-gray-500 outline-none rounded"
              />

              <button className="absolute top-1/2 -translate-y-1/2 right-2">
                <CiSearch />
              </button>
            </div>
            {searchTerm.length ? (
              <div className="w-full flex flex-col  overflow-y-auto  h-[450px] rounded-lg bg-[#ffffff]  gap-6 px-2 py-3 shadow-lg">
                {isLoading && (
                  <div className="h-full flex justify-center items-center">
                    <div className="flex items-center space-x-2">
                      <h1>Loading...</h1>
                      <AiOutlineLoading3Quarters
                        className=" animate-spin"
                        size={12}
                      />
                    </div>
                  </div>
                )}

                {!isLoading && !results.length ? (
                  <div className="h-full flex justify-center items-center">
                    <div className="flex items-center space-x-2">
                      <h1>No matchs</h1>
                      <CgSearchLoading size={20} />
                    </div>
                  </div>
                ) : null}
                {/* /?product=61 */}
                {results.length && !isLoading ? (
                  <>
                    {results.map((result) => (
                      <Link
                        key={result.id}
                        to={`/?product=${result.id}`}
                        className="flex items-center space-x-7 h-32 hover:bg-oldCatBg/60 px-2 py-3 rounded-lg"
                      >
                        <div className="w-[120px] h-full overflow-hidden rounded-lg ">
                          <img
                            src={result.ProductImages[0].image_url || ""}
                            alt={result?.name || ""}
                            className="h-full w-full  "
                          />
                        </div>
                        <div className="flex-1 truncate">
                          <h1>{result.name}</h1>
                          <p>
                            <strong>Category: </strong> {result.category}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </>
                ) : null}
              </div>
            ) : null}
          </div>,
          document.body
        )}
    </>
  );
});

export function useSearchBarContext() {
  const context = useContext(SearchContext);
  if (context === undefined)
    throw new Error(`you have used the SearchContext wrong`);
  return context;
}

Searching.Toggle = Toggle;
Searching.SearchBar = SearchBar;
export default Searching;

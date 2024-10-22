import React, { FormEvent, useState } from "react";
import { PhosphorIcon } from "./phosphor-icon";
import { useRouter } from "next/navigation";

type SearchInputPorps = {
  isScrolled: boolean;
};

export const SearchInput = ({ isScrolled }: SearchInputPorps) => {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    router.push(`/${inputValue.toLocaleLowerCase()}`);
  }

  return (
    <div className="w-fit h-fit relative rounded-full overflow-hidden">
      <form onSubmit={handleSearch}>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
          placeholder="Pesquisar..."
          className={`w-[180px] h-[28px] md:focus:w-[480px] md:h-[35px] border-2 rounded-full focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none px-2 text-sm transition-all ${
            isScrolled ? "md:w-[430px]" : "md:w-[480px]"
          }`}
        />

        <button type="submit">
          <PhosphorIcon
            className="absolute top-0 right-1 text-gray-600 w-12 h-full border-l-2 p-2 md:p-3 block cursor-pointer z-10"
            name="MagnifyingGlass"
          />
        </button>
      </form>
    </div>
  );
};

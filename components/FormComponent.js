import { Button, Input, InputGroup } from "reactstrap";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

export default function FormComponent( {onSearch}) {

  const [textSearch, setTextSearch] = useState("");

  console.log("---textSearch--",textSearch);

  return (
    <div className="bg-violet-50 py-6 px-4">
      <form 
      className="flex flex-col sm:flex-row justify-center items-center gap-3"
      onSubmit={(event) =>{ 
        event.preventDefault();
        onSearch(textSearch);
      }}
      >
        <InputGroup className="max-w-md" >
          <Input 
          placeholder="Search products here!"
          value={textSearch}
          onChange={(event)=> setTextSearch(event.target.value)}
          />
        </InputGroup>

        <Button
        style={{
    background: "linear-gradient(90deg, #b43e8f, #3b0086)",
    color: "white",
    border: "none",
  }}
          color="success "
          size="sm"
          type="submit"
          className="flex! items-center gap-1"
        >
          <FaSearch />
          Search
        </Button>
      </form>
    </div>
  );
}

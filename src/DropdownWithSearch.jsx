import React, { useState } from "react";

const DropdownWithSearch = ({ options, onChange }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredOptions, setFilteredOptions] = useState(options);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        if (!event.target.value) {
            setFilteredOptions(options);
        } else {
            setFilteredOptions(
                options.filter(([id, name]) =>
                    name
                        .toLowerCase()
                        .includes(event.target.value.toLowerCase())
                )
            );
        }
    };

    return (
        <div>
            <input type="text" value={searchTerm} onChange={handleSearch} />
            <select onChange={onChange}>
                {filteredOptions.map((option) => {
                    const [id, name] = option;
                    return (
                        <option key={id} value={id}>
                            {name}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

export default DropdownWithSearch;

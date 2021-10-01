import React, { useState } from 'react'

function Searchs({onSearch}) {

    const [search, setSearch] = useState("");

    const onInputChange = value => {
        // console.log(value,'value ani')
        setSearch(value);
        onSearch(value);
    };
    return (
        <>
             <input
                    type="text"
                    className="form-control"
                    style={{ width: "240px" }}
                    placeholder="Search"
                    value={search}
                    onChange={e => onInputChange(e.target.value)}
        />
        </>
    )
}

export default Searchs

import React from 'react'

const SearchBar = () => {
    return (
        <form className="" role="search">

            <div className="input-group mb-3">
            <span className="input-group-text"> <i className="fa-solid fa-magnifying-glass"></i></span>
                <input type="text" className="form-control" placeholder="Place or area" aria-label="" />
                <input type="text" className="form-control" placeholder="Search service or worker" aria-label="Server" />
            </div>
        </form>

    )
}

export default SearchBar
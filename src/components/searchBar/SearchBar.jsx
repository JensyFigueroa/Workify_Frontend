import React from 'react'
import styles from './SearchBar.module.css'

const SearchBar = () => {
    return (
        <form className={styles.search}>
                <div className="input-group">
                    <span className="input-group-text"> <i className="fa-solid fa-magnifying-glass"></i></span>
                    <input type="text" className="form-control" placeholder="Place or area" aria-label="" />
                    <input type="text" className="form-control" placeholder="Search service or worker" aria-label="Server" />
                </div>
        </form>
    )
}

export default SearchBar
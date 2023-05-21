import { useState } from 'react';
import styles from './SearchBar.module.css'

const SearchBar = () => {

  const [name, setName] = useState()

    return (
        <>
            <form className={styles.search}>
                <div className="input-group">
                    <input type="text" className={`${styles.inputSearch} form-control`} placeholder="Search service" aria-label="Server" />
                    <span className={`${styles.inputGroupText} input-group-text`}><button className={styles.location}><i className="fa-solid fa-magnifying-glass"></i></button></span>
                </div>
            </form>


        </>
    )
}

export default SearchBar;

import { useState } from 'react';
import styles from './SearchBar.module.css'
import { useDispatch } from 'react-redux';
import {getServicesByName} from '../../redux/actions'

const SearchBar = () => {
  const [name, setName] = useState('')

  const dispatch = useDispatch()

  const handleChange = (e) => {
    setName(e.target.value)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    dispatch(getServicesByName(name))
  }


  return (
    <>
      <form onClick={handleSearch } className={styles.search}>
        <div className="input-group">
          <input type="text" className={`${styles.inputSearch} form-control`} placeholder="Search service" aria-label="Server" onChange={handleChange} />
          <span className={`${styles.inputGroupText} input-group-text`}><button className={styles.location} type='submit'><i className="fa-solid fa-magnifying-glass"></i></button></span>
        </div>
      </form>


    </>
  )
}

export default SearchBar;

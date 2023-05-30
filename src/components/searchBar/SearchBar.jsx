import { useState } from 'react';
import styles from './SearchBar.module.css'
import { useDispatch } from 'react-redux';
import {getServicesByName} from '../../redux/actions'
import { useNavigate } from 'react-router';

const SearchBar = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')

  const dispatch = useDispatch()

  const handleChange = (e) => {
    setName(e.target.value)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    navigate('/home')
    dispatch(getServicesByName(name))
  }


  return (
    <>
      <form onSubmit={handleSearch } className={styles.search}>
        <div className="input-group">
          <input type="text" className={`${styles.inputSearch} form-control`} placeholder="Search service" aria-label="Server" onChange={handleChange} />
          <span className={`${styles.inputGroupText} input-group-text`}><button className={styles.location} type='submit'><i className="fa-solid fa-magnifying-glass"></i></button></span>
        </div>
      </form>

    </>
  )
}

export default SearchBar;

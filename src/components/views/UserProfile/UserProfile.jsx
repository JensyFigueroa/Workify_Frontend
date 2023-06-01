import React, { useState } from 'react';
import styles from './UserProfile.module.css';

export default function UserProfile() {
  const [showForm, setShowForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleProfileClick = () => {
    setShowForm(true);
  };

  const handleComprasClick = () => {
    setShowForm(false);
  };

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  const handleImageReset = () => {
    setSelectedImage(null);
  };

  return (
    <div className={styles.containerPrincipal}>
      <div className={styles.columnLeft}>
        <input type="button" value="Mi Perfil" onClick={handleProfileClick} />
        <input type="button" value="Servicios" onClick={handleComprasClick} />
        <input type="button" value="Logout"  onClick={handleComprasClick}/>
      </div>
      <div className={styles.columnRight}>
        {showForm && (
          <form className={styles.formPersonal}>
            <input type="text" placeholder="Nombre" />
            <input type="text" placeholder="Apellido" />
            <input type="email" placeholder="Email" />
            <input type="text" placeholder="Dirección" />
            <button type="submit">Guardar</button>
          </form>
        )}
       
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import styles from './UserProfile.module.css';

export default function UserProfile() {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className={styles.containerPrincipal}>
      <div className={styles.leftColumn}>
        <label htmlFor="imageUpload">Imagen:</label>
        <input
          type="file"
          id="imageUpload"
          name="imageUpload"
          accept="image/*"
          onChange={handleImageChange}
        />
        {image && (
          <img src={image} alt="Profile" width="300" height="300" />
        )}
      </div>
      <div className={styles.rightColumn}>
        <ul className={styles.userDataList}>
          <li>
            <span>Nombre:</span> Pepe
          </li>
          <li>
            <span>Apellido:</span> Argento
          </li>
          <li>
            <span>Email:</span> pepito78@gmail.com
          </li>
          <li>
            <span>Compras:</span> Ninguna
          </li>
          <li>
            <span>Perfil:</span> User
          </li>
        </ul>
      </div>
    </div>
  );
}

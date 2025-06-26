'use client';  // added because of onClick prop which is a browser interaction -- 458

import { useRef, useState } from 'react';
import Image from 'next/image';

import classes from './image-picker.module.css';

export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState();
  const imageInput = useRef();

  function handlePickClick() {
    imageInput.current.click();  // We're using ref to trigger the click function so when we call .click(), its just like simulating actually clicking it.
  }

  function handleImageChange(event) {
    const file = event.target.files[0];  // check 458 or ask chat

    if (!file) {  //safety check  // Is possible for the user to not pick a file or cancel so we need to set this here to avoid "undefined" errors
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();  // wtf is this find out  //459

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && (
            <Image
              src={pickedImage}
              alt="The image selected by the user."
              fill
            />
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
          // required                // This ensures that the <form> can't be submitted without an image being selected. 
        />
        <button
          className={classes.button}
          type="button"
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}

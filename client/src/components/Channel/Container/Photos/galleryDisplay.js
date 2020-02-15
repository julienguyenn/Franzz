import React from 'react';

export default function GalleryDisplay({ change, content }) {
  // formats the images for the grid
  const images = [[], [], [], []];
  let column = 0;
  content.forEach((image) => {
    images[column].push(image);
    if (column === 3) {
      column = 0;
    } else {
      column += 1;
    }
  });

  return (
    <div>
      <button onClick={() => change('albumForm')}>New Album</button>
      <h4>Chat Images</h4>
      <div className="row">
        <div className="column">
          {images[0]}
        </div>
        <div className="column">
          {images[1]}
        </div>
        <div className="column">
          {images[2]}
        </div>
        <div className="column">
          {images[3]}
        </div>
      </div>
    </div>
  );
}

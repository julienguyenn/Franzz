import React, { useState } from 'react';
import { handleFiles } from './Scripts/DragAndDropPhotos';

export default function AlbumForm({
  channelId, emitSendMessage, albumName, newAlbum, viewAlbum,
}) {
  const [fields, changeFields] = useState(
    {
      album: albumName,
      files: [],
      originalName: albumName,
    },
  );

  // Handles form events when adding files and
  // creating a name
  function handleOnChange(event) {
    event.preventDefault();
    if (event.target.name === 'album') {
      const value = event.target.value.replace(/ /g, '-');
      changeFields({
        ...fields,
        [event.target.name]: value,
        originalName: event.target.value,
      });
    } else {
      changeFields({
        album: fields.album,
        files: [...fields.files, event.target.files],
      });
    }
  }

  function viewUpdatedAlbum() {
    viewAlbum(`${channelId}/albums/${albumName}`, albumName);
  }

  function viewAlbums() {
    viewAlbum('albums');
  }

  function handleSubmit(event) {
    event.preventDefault();
    [...fields.files].forEach((file) => {
      if (!newAlbum) {
        handleFiles(file, channelId, fields.album, emitSendMessage, viewUpdatedAlbum);
      } else {
        handleFiles(file, channelId, fields.album, emitSendMessage, viewAlbums);
      }
    });
    document.getElementById('album-upload-form').reset();
    let message = `🚨A new album '${fields.album}' has been uploaded🚨`;
    if (!newAlbum) {
      message = `👀 New photos were added to ${fields.album}`;
    } else {
      setTimeout(() => viewAlbum('albums'), 3000);
    }
    setTimeout(() => emitSendMessage(message, false, false), 3000);
  }

  return (
    <div>
      <div className="popup-title">New Album</div>
      <form id="album-upload-form" onSubmit={handleSubmit}>
        { newAlbum && (
          <input id="input-album" type="text" name="album" placeholder="Choose an album name" onChange={handleOnChange} />
        )}
        { !newAlbum && (
          <div>{`Adding photos to: ${albumName}`}</div>
        )}
        <div id="album-submission"><input className="submit-button" type="submit" value="Create >> " /></div>
        <div id="input-display" value="drag">
        <input
          id="album-upload"
          name="files"
          type="file"
          multiple
          accept="image/*"
          onChange={handleOnChange}
        />
        </div>
      </form>
    </div>
  );
}

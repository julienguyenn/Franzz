import React from 'react';
import UserList from '../../UserList/UserList';

const RightUI = ({ userList, userStatus, changeView }) => {
  function toggleStalkerMap() {
    changeView((prev) => (
      {
        imageBox: false,
        stalkerMap: !prev.stalkerMap,
        video: false,
        canvasBox: false,
      }));
  }

  function toggleImageBox() {
    changeView((prev) => (
      {
        stalkerMap: false,
        imageBox: !prev.imageBox,
        video: false,
        canvasBox: false,
      }));
  }

  function toggleVideoSync() {
    changeView((prev) => (
      {
        stalkerMap: false,
        imageBox: false,
        video: !prev.video,
        canvasBox: false,
      }
    ));
  }

  function toggleCanvasBox() {
    changeView((prev) => (
      {
        stalkerMap: false,
        imageBox: false,
        video: false,
        canvasBox: !prev.canvasBox,
      }
    ));
  }

  return (
    <div className="rightBarUI">
      <div className="widgetList">
        <button type="button" aria-label="stalker" id="stalkerMapButton" onClick={toggleStalkerMap} />
        <button type="button" aria-label="gallery" id="photoGalleryButton" onClick={toggleImageBox} />
        <button type="button" aria-label="video" id="videoSyncButton" onClick={toggleVideoSync} />
        <button type="button" aria-label="canvas" id="photoCanvasButton" onClick={toggleCanvasBox} />
      </div>
      <hr />
      <UserList userList={userList} userStatus={userStatus} />
    </div>
  );
};

export default RightUI;

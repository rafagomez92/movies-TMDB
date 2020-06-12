import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import ReactPlayer from "react-player"

import "./ModalVideo.scss";

function ModalVideo(props) {
    const { videoKey, videoPlatform, isOpen, close } = props;
    const [urlVideo, setUrlVideo] = useState(null);
  
    useEffect(() => {
      switch (videoPlatform) {
        case "YouTube":
          setUrlVideo(urlVideo => `https://youtu.be/${videoKey}`);
          break;
        case "Vimeo":
          setUrlVideo(urlVideo => `https://vimeo.com/${videoKey}`);
          break;
        default:
          break;
      }
    }, [videoKey, videoPlatform]);
  
    return (
      <Modal
        className="modal-video"
        visible={isOpen}
        centered
        onCancel={close}
        footer={false}
      >
        <ReactPlayer url={urlVideo} controls />
      </Modal>
    );
  }

export default ModalVideo;
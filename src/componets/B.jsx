import React, { useState } from "react";
import { Modal, Button, message } from "antd";
import { FaPlayCircle } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";





export default function PhonicsModal({ isModalOpen, handleOk, handleCancel, data }) {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const startRecording = async (target) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      let chunks = [];

      recorder.ondataavailable = e => chunks.push(e.data);

      recorder.onstop = async () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        const formData = new FormData();
        formData.append("audio", blob);
        formData.append("type", target);
        formData.append("expected", data?.[target]); // word / meaning / sentence

        const response = await fetch("/api/check-pronunciation", {
          method: "POST",
          body: formData
        });

        const result = await response.json();
        if (result.correct) {
  toast.success(`✅ Correct pronunciation for ${target}`);
} else {
  toast.error(`❌ Incorrect. You said: "${result.transcript}"`);
}
      };

      recorder.start();
      setIsRecording(true);
      setMediaRecorder(recorder);

      setTimeout(() => {
        recorder.stop();
        setIsRecording(false);
      }, 3000); // record for 3 seconds
    } catch (err) {
      console.error(err);
      message.error("Microphone access denied or error.");
    }
  };

  return (
    <Modal
      title="English Phonics Sentence Practice"
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p><span className='heading'>Word:</span>  <span className='subheading'>{data?.word}</span></p>
      <p><span className='heading'>Meaning:</span>  <span className='subheading'>{data?.meaning}</span></p>
      <p><span className='heading'>Sentence:</span>  <span className='subheading'>{data?.sentence}</span></p>

      <div className='play-btn' style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
        <Button type="primary" onClick={() => startRecording("word")}>
          <FaPlayCircle /> Speak Word
        </Button>
        <Button type="primary" onClick={() => startRecording("meaning")}>
          <FaPlayCircle /> Speak Meaning
        </Button>
        <Button type="primary" onClick={() => startRecording("sentence")}>
          <FaPlayCircle /> Speak Sentence
        </Button>
      </div>
    </Modal>
  );
}

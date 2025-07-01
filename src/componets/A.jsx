import React, { useState } from "react";
import { Modal, Button, message } from "antd";
import { FaPlayCircle } from "react-icons/fa";

const { webkitSpeechRecognition } = window;
const recognition = new webkitSpeechRecognition() || new window.SpeechRecognition();

recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

export default function PhonicsModal({ isModalOpen, handleOk, handleCancel, data }) {
  const [recordTarget, setRecordTarget] = useState("");

  const startRecording = (type) => {
    setRecordTarget(type);
    recognition.start();
    message.info(`Listening for ${type}...`);
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase().trim();
    let expected = "";

    if (recordTarget === "word") expected = data?.word?.toLowerCase().trim();
    if (recordTarget === "meaning") expected = data?.meaning?.toLowerCase().trim();
    if (recordTarget === "sentence") expected = data?.sentence?.toLowerCase().trim();

    if (transcript === expected) {
      message.success("✅ Correct pronunciation!");
    } else {
      message.error(`❌ Incorrect! You said: "${transcript}"`);
    }
  };

  recognition.onerror = (event) => {
    message.error("Speech recognition error: " + event.error);
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

      <div className='play-btn' style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
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

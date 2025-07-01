import React ,{useState}from 'react'
import { Table ,Button,Modal,message} from "antd";
import { FaPlayCircle } from "react-icons/fa";


import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const { webkitSpeechRecognition } = window;
const recognition = new webkitSpeechRecognition() || new window.SpeechRecognition();

recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

export const TextTable = () => {


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

        console.log("transcript",transcript)
        
        console.log(transcript)
        
       alert(" Correct pronunciation!");
    } else {

      alert(` Incorrect! You said: "${transcript}"`);
    }
  };

  recognition.onerror = (event) => {
    toast.error("Speech recognition error: " + event.error);
  };

     const [data,setData ] = useState()
     const [isModalOpen, setIsModalOpen] = useState(false);
      const showModal = () => {
        setIsModalOpen(true);
      };
      const handleOk = () => {
        setIsModalOpen(false);
      };
      const handleCancel = () => {
        setIsModalOpen(false);
      };


    const dataSource = [
  {
    key: 1,
    word: 'adventure',
    meaning: 'an exciting or unusual experience',
    sentence: '10 Downing Street',
  },
  {
    key: 2,
    word: 'beamed',
    meaning: 'smiled Brightly',
    sentence: '10 Downing Street',
  },
  {
    key: 3,
    word: 'cosy',
    meaning: 'comfortable and warm',
    sentence: '10 Downing Street',
  },
  {
    key: 4,
    word: 'Mike',
    meaning: 32,
    sentence: '10 Downing Street',
  },
  {
    key: 5,
    word: 'Mike',
    meaning: 32,
    sentence: '10 Downing Street',
  },

];


const handleSpeak = (record)=>{
    showModal()
    console.log(record)
    setData(record)
}


const columns = [
  {
    title: 'Word',
    dataIndex: 'word',
    key: 'word',
  },
  {
    title: 'Meaning',
    dataIndex: 'meaning',
    key: 'meaning',
  },
//   {
//     title: 'Sentence',
//     dataIndex: 'sentence',
//     key: 'sentence',
//   },


  {
    title: 'Sentence',
    key: 'key',
    dataIndex: 'key',
    render: (_, record) => (
      <>
       <Button type="primary" onClick={()=>{handleSpeak(record)}}>
        read sentence
      </Button>
      </>
    ),
  },
];

  return (

    <div>

      <ToastContainer/>
      <Table dataSource={dataSource} columns={columns} />
        
        



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
    </div>

  )
}

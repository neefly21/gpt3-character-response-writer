import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import {useState} from 'react';


const Home = () => {

  const [userInput, setUserInput] = useState("");
  const [userNameInput, setUserNameInput] = useState("");
  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    console.log("Calling openAI...");
    const formattedPrompt = "This is a conversation with " + userNameInput + ". Me: " + userInput + "Response:\n";
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({formattedPrompt}),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text);

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }

  const onNameChangedText = (event) => {
    console.log(event.target.value);
    setUserNameInput(event.target.value);
  };

  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };

  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Character Chats</h1>
          </div>
          <div className="header-subtitle">
            <h2>Ever wondered what your favorite person or show character thought if they were in YOUR shoes? Well now you can!</h2>
          </div>
        </div>
        <div className="prompt-container">
          <input className="prompt-name-box" placeholder="Enter the character or persons name here..." type="text" value={userNameInput} onChange={onNameChangedText}/>
          <textarea placeholder="Type your question for them here!" className="prompt-box" value={userInput} onChange={onUserChangedText}/>
          <div className="prompt-buttons">
            <a className={isGenerating ? 'generate-button loading' : 'generate-button'} onClick={callGenerateEndpoint}>
              <div className="generate">
                {isGenerating ? <span className='loader'></span> : <p>Generate</p>}
              </div>
            </a>
          </div>
        </div>
        <div className="generated-response">
          <h3>Output</h3>
          <p>
            {apiOutput}
          </p>
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;

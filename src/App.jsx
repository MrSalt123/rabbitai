import React, { useState, useRef, useEffect } from 'react';
import Typewriter from './Typewriter';
import video from './assets/rabbitjump.mp4';

function App() {
  const [showTerminal, setShowTerminal] = useState(false);
  const videoRef = useRef(null);

  // Handles the "Dive In" button click
  const handleDive = () => {
    if (videoRef.current) {
      videoRef.current.play();
      videoRef.current.onended = () => setShowTerminal(true);
    }
  };


  return (
    <div className="font-cascadia text-xs text-white bg-black h-screen flex">
      {!showTerminal ? (
        <div className='w-screen items-center justify-center'>
          <div className='flex flex-col items-center justify-center text-center h-1/5'>
            {/* Static content */}
            <Typewriter text="Yoou have stumbled upon the rabbit hole — a place where questions outnumber answers, and truths are hidden beneath layers of illusion. Will you venture deeper to uncover what lies beyond? Click on the rabbit to start." />
          </div>

          <div className='flex items-center justify-center'>
            <video
              ref={videoRef}
              src={video}
              className="inset-0 w-3/4 h-auto object-cover"
              muted
              playsInline
              style={{ display: showTerminal ? 'none' : 'block' }}
              onClick={handleDive}
            ></video>
          </div>
        </div>
      ) : (
        <Terminal />
      )}
    </div>
  );
}


function Terminal() {
  const [commands, setCommands] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [apiLoadingIndex, setApiLoadingIndex] = useState(null); // Tracks which command is loading

  const terminalEndRef = useRef(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [commands]);

  const handleInputChange = (e) => {
    setCurrentCommand(e.target.value);
  };

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (currentCommand.trim()) {
        const newCommand = { input: currentCommand, output: '' };
        const newCommands = [...commands, newCommand];
        setCommands(newCommands);
        setCurrentCommand('');

        // Start API call
        const commandIndex = newCommands.length - 1;
        setApiLoadingIndex(commandIndex);
        const response = await handleCommand(currentCommand);
        setApiLoadingIndex(null);

        // Update command output
        setCommands((prevCommands) =>
          prevCommands.map((cmd, index) =>
            index === commandIndex ? { ...cmd, output: response } : cmd
          )
        );
      }
    }
  };

  const handleCommand = async (command) => {
    if (command.toLowerCase().startsWith('ask ')) {
      const query = command.slice(4).trim();
      if (query) {
        return await fetchOpenAIResponse(query);
      }
    } else if (command.toLowerCase() === '/help') {
      return 'Help Guide:\n  /help      Show this help guide\n  cls         Clear the screen\n  about       Display information about RabbitAI\n  ask [text]  Ask the AI a question\n  ca          Official contract address of RabbitAI token';
    } else if (command.toLowerCase() === 'cls') {
      setCommands([]);
      return '';
    } else if (command.toLowerCase() === 'about') {
      return 'RabbitAI Terminal - Created by Conspirator Corporation';
    } else if (command.toLowerCase() === 'ca') {
      return 'F5UJz1eoyDu4S8Dswz8WsYjiw4GAyY3UZia3avzmpump';
    } else {
      return `'${command}' is not recognized as an internal or external command.`;
    }
  };

  const fetchOpenAIResponse = async (query) => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    const url = 'https://api.openai.com/v1/chat/completions';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content:
                'You are an expert in conspiracy theories. When asked about any conspiracy theory, always provide a detailed response that includes the following sections with this exact format: \n\n' +
                '[Description]\nProvide a detailed overview of the conspiracy theory.\n\n' +
                '[Claims]\nList key claims made by proponents of the theory in bullet points.\n\n' +
                '[Evidence]\nProvide supporting evidence for each claim, including references to studies, experts, or organizations that have advocated for the theory.\n\n' +
                '[Sources]\nProvide links to credible sources or studies that users can explore for more information. If no credible sources are available, do not include this section.' +
                'Do not use numbers to bullet point anything, you must use the format provided with.',
            },
            { role: 'user', content: query },
          ],
          max_tokens: 2000,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content.trim();
    } catch (error) {
      console.error('Error fetching OpenAI response:', error);
      return 'Error: Unable to connect to the AI.';
    }
  };

  return (
    <div className="font-cascadia text-xs text-white bg-black p-4 h-screen overflow-y-auto">
      <p>RabbitAI Terminal</p>
      <p>Copyright (C) Conspirator Corporation. All rights reserved</p>
      <br />
      <p>Use /help for a help guide.</p>
      <p>Use ask [input] to prompt the AI</p>
      <p>Begin your dive into the rabbit hole...</p>
      <br />

      {/* Display the command history */}
      {commands.map((cmd, index) => (
        <div key={index}>
          <p>{`C:\\Users\\anonymousrabbit> ${cmd.input}`}</p>
          {apiLoadingIndex === index && <p className="ml-4 text-yellow-400">Thinking...</p>}
          {cmd.output && (
            <pre className="ml-4 text-gray-400 whitespace-pre-wrap">
              {cmd.output}
            </pre>
          )}
        </div>
      ))}

      <div ref={terminalEndRef} />

      {/* Input for typing commands */}
      <p className="flex items-center">
        <span className="text-white">{"C:\\Users\\anonymousrabbit>"}</span>
        <input
          type="text"
          className="bg-transparent text-white outline-none w-full ml-2"
          value={currentCommand}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      </p>
    </div>
  );
}

export default App;

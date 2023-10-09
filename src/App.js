import { useEffect, useState } from "react"
const App = () => {
  const [message, setMessage] = useState(null)
  const [value, setValue] = useState(null)
  const [previousChats, setpreviousChats] = useState([])
  const [currentTitle, setcurrentTitle] = useState(null)

  const createNewChat = () => {
    setValue("");
    setMessage(null);
    setcurrentTitle(null);
    console.log('clicked');
    document.getElementById('inputChatBox').focus();
  }

  const handleClick = (uniqueTitle) => {
    setcurrentTitle(uniqueTitle)
    setValue("")
    setMessage(null)
  }

  const getMessages = async () => {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        message: value
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try{
      const response = await fetch('http://localhost:8080/chat/completions', options)
      const data = await response.json()
      setMessage(data.choices[0].message)
      // console.log(data, message)
    }
    catch(err) {
      console.error(err)
    }
  
  }

  useEffect(()=>{
    // console.log(currentTitle, value, message)
    if(!currentTitle && value && message)
    {
      setcurrentTitle(value)
    }
    if(currentTitle && value && message)
    {
      setpreviousChats(
        prevChats => (
          [...prevChats, {
            title: currentTitle,
            role:'user',
            content: value
          },
          {
            title: currentTitle,
            role: message.role,
            content: message.content
          }]
        )

      )
    }
  },[message, currentTitle, value])

  

  const currentChat = previousChats.filter(previousChat => previousChat.title === currentTitle)

  const uniqueTitles = Array.from(previousChats.map(previousChat => previousChat.title))
  
  // console.log('return mess - > ', message)
  // console.log('PCHAT ->  ',previousChats) 
  return (
    <div className="app">
      <section className="side-bar">
        <button onClick={() => createNewChat()}>+ New Chat</button>
        <ul className="history">
         { uniqueTitles?.map((uniqueTitle, index) => {
          return(
          <li key={index} onClick={() => handleClick(uniqueTitle)}>
            {uniqueTitle}
          </li>
          )
         })}
        </ul>
        <nav>
          <p> made by codeWithAC</p>
        </nav>
      </section>
      
      <section className="main">
        {!currentTitle && <h1>codeWithAC</h1>}
        <ul className="feed">
          {
            currentChat?.map(
              (chatMessage, index) => 
                
                    <li key={index}>
                      <p>{chatMessage.role}</p>
                      <p>{chatMessage.content}</p>
                    </li>
                
              )
          }
        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input id='inputChatBox' value={value} onChange={(e)=>{setValue(e.target.value)}}/>
            <div id="submit" onClick={getMessages}>➢</div>
          </div>
          <p className="info">
            Copyright by CodeWithAC
            </p>
        </div>
      </section>
    </div>
  );
}

export default App;

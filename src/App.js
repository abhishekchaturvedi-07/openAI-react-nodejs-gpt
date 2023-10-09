
const App = () => {
  const getMessages = async () => {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        message: 'Hello How are you?'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try{
      const response = await fetch('http://localhost:8080/chat/completions', options)
      const data = await response.json()
      console.log(data)
    }
    catch(err) {
      console.error(err)
    }
  }
  return (
    <div className="app">
      <section className="side-bar">
        <button>+ New Chat</button>
        <ul className="history">
          <li>ABC</li>
        </ul>
        <nav>
          <p> made by codeWithAC</p>
        </nav>
      </section>
      
      <section className="main">
        <h1>codeWithAC</h1>
        <ul className="feed">

        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input />
            <div id="submit" onClick={getMessages}>➢</div>
          </div>
          <p className="info">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            </p>
        </div>
      </section>
    </div>
  );
}

export default App;

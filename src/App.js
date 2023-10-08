
const App = () => {
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
            <div id="submit">➢</div>
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

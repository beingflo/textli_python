import React from 'react';
import './App.css';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

function App() {
    const divStyle = {
        width: '80%',
        height: '80vh',
        fontSize: '20px',
      };

    return (
        <div className="App">
            <header className="App-header">
                <div style={divStyle}>
                    <SimpleMDE options={{
                        autofocus: true,
                        spellChecker: false,
                        toolbar: false,
                        minHeight: '80vh',
                    }} />
                </div>
            </header>
        </div>
    );
}

export default App;

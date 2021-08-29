import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get(`https://1tz4y5lnl9.execute-api.ap-southeast-2.amazonaws.com/dev/getEmail/168909`).then((res) => {
            setData(res.data.body);
        });
    }, []);

    function createMarkup() {
        return {
            __html: data,
        };
    }

    const generatePdf = async () => {
        // send the modified HTML which has the signature image
        const res = await axios.post("https://1tz4y5lnl9.execute-api.ap-southeast-2.amazonaws.com/dev/createPdf", data.body);
        console.log(res.data.message);
    };

    return (
        <div className="App" style={{ padding: "2rem" }}>
            <div dangerouslySetInnerHTML={createMarkup()} />
            <button className="button" onClick={() => generatePdf()}>
                Generate PDF
            </button>
        </div>
    );
}

export default App;

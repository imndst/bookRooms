import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Date from "./component/GetDate";
import { Outlet, Link, useParams } from "react-router-dom";

function App() {
  const [eventData, setEventData] = useState([{}]);
  const cookies = new Cookies();

  async function fetchEvents() {
    const response = await axios
      .get("https://localhost:44356/api/Event?ID=12345")
      .then((response) => {
        setEventData(response.data);
      });
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="text-sm font-bold  mt-14">
      <ul>
        {eventData.map((index, i) => (
          <Link
            className="block m-auto w-64 bg-blue-400 item-center mt-4 p-12 text-center text-lg  m-auto"
            key={i}
            to={cookies.get("Lgn") != null ? `/time/${index.id}` : `/Register`}
          >
            {index.title}
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import axios from "axios";
import Date from "./component/GetDate";
import { Outlet, Link, useParams } from "react-router-dom";
import UserRegister from "./component/RegisterForm";

function App() {
  const [eventData, setEventData] = useState([{}]);

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
      <UserRegister />
      <ul>
        {eventData.map((index, i) => (
          <Link
            className="block m-auto w-64 bg-blue-400 item-center mt-4 p-12 text-center text-lg  m-auto"
            key={i}
            to={`/time/${index.id}`}
          >
            {index.title}
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default App;

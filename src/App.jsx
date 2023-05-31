import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Date from "./component/GetDate";
import { Outlet, Link, useParams } from "react-router-dom";
import api from "./devjss.json";

function App() {
  const [eventData, setEventData] = useState([{}]);
  const cookies = new Cookies();
  const [isLoaading, SetIsLoading] = useState(false);

  async function fetchEvents() {
    const response = await axios.get(`${api.API}/Event`).then((response) => {
      setEventData(response.data);
      SetIsLoading(true);
    });
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  return isLoaading ? (
    <div
      style={{ fontFamily: "danamedium" }}
      className="text-sm font-bold text-white rounded  mt-14 "
    >
      <ul>
        {eventData.map((index, i) => (
          <Link
            className="block m-auto rounded  w-64 bg-blue-400 item-center mt-4 p-12 text-center text-lg  m-auto"
            key={i}
            to={
              cookies.get("Lgn") != "Error" ? `/time/${index.id}` : `/Register`
            }
          >
            {index.title}
          </Link>
        ))}
      </ul>
    </div>
  ) : (
    <div className="text-white item-center text-xl"> Loading...</div>
  );
}

export default App;

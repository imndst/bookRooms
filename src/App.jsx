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
      className="text-sm text-white rounded mt-14  md:p-64"
    >
      <div className="grid grid-cols-2  sm:grid-cols-2  p-12 md:gap-2 flex items-center">
        {eventData.map((index, i) => (
          <Link
            className="rounded  ml-1 px-1 border-[#6ee7b7] border-2 py-8 text-center mt-1 text-xl"
            key={i}
            to={
              cookies.get("Lgn") != "Error" ? `/time/${index.id}` : `/Register`
            }
          >
            {index.title}
          </Link>
        ))}
      </div>
      <div className="md:w-96 sm:w-64 w-64  m-auto text-right  md:text-lg">
        REgister Role
      </div>
    </div>
  ) : (
    <div className="text-white item-center text-xl"> Loading...</div>
  );
}

export default App;

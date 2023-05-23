import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
function GetDate() {
  const params = useParams();
  const [eventDate, setEventDate] = useState([{}]);
  useEffect(() => {
    axios
      .get("https://localhost:44356/api/SubEvent/" + params.ID)
      .then((response) => {
        setEventDate(response.data);
      });
  }, []);
  return (
    <div className="text-sm font-bold  mt-14">
      {eventDate.map((index, i) => (
        <Link
          className="block m-auto w-64 bg-red-400 item-center mt-4 p-12 text-center  m-auto"
          key={i}
          to={`/time/book/${index.id}`}
        >
          {index.dateTime}
        </Link>
      ))}
    </div>
  );
}
export default GetDate;

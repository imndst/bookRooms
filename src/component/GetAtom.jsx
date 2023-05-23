import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
function GetDate() {
  const params = useParams();
  const [eventDate, setEventDate] = useState([{}]);
  useEffect(() => {
    axios
      .get("https://localhost:44356/api/ineach/" + params.ID)
      .then((response) => {
        setEventDate(response.data);
      });
  }, []);
  return (
    <div className="text-sm font-bold  mt-14">
      {eventDate.map((item, i) => (
        <div
          className="block m-auto w-64 bg-yellow-400 item-center mt-4 p-12 text-center  m-auto"
          key={i}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
}
export default GetDate;

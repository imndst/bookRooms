import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import api from "../devjss.json";
function GetDate() {
  const navigate = useNavigate();
  const params = useParams();
  const [eventDate, setEventDate] = useState([{}]);
  const [isLoaading, SetIsLoading] = useState(false);
  const [filterdItem, SetFilteredItem] = useState([]);
  useEffect(() => {
    axios.get(`${api.API}/SubEvent/` + params.ID).then((response) => {
      setEventDate(response.data);
      SetIsLoading(true);
    });
  }, []);

  useEffect(() => {
    const cookies = new Cookies();
    cookies.get("Lgn") ? null : navigate("/Register/");
  }, []);
  const cookies = new Cookies();

  return (
    <div style={{ fontFamily: "danamedium" }} className="  mt-14">
      {eventDate.map((index, u) => {
        let DateObj = new Date(index.dateTime);
        let todate = DateObj.toLocaleDateString("fa-IR");
        let today = DateObj.toLocaleDateString("fa-IR", { weekday: "long" });
        let a;

        return isLoaading ? (
          <Link
            className="block rounded border-[#6ee7b7] border-2  m-auto w-64 bg-stone item-center mt-4 p-2 text-center  text-white  m-auto"
            key={u}
            to={index.countOfInEach != 0 ? `/time/book/${index.id}` : null}
          >
            <div>
              {index.countOfInEach == 0 ? <span>تاریخ ورود</span> : ""}
              <span className="mr-4 bg-blue-400 runded  block ">
                {todate + " " + today}
              </span>

              <span className="mr-4 block">
                {index.countOfInEach == 0 ? (
                  <span className="bg-red-700 p-2 runded">ظرفیت تکمیل </span>
                ) : (
                  "باقی مانده" + " "
                )}
              </span>

              {index.inEaches.map((indexI, i, c) => {
                return (
                  indexI.opacity == 0 &&
                  a != indexI.memberCount && (
                    <div>
                      <span className="ml-2">ویلا</span>
                      <span key={i + u}>{(a = indexI.memberCount)} خواب </span>
                    </div>
                  )
                );
              })}
            </div>
          </Link>
        ) : (
          <div className="text-white item-center text-xl"> Loading...</div>
        );
      })}
    </div>
  );
}
export default GetDate;

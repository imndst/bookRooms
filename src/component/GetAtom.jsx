import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import api from "../devjss.json";
const GetDate = () => {
  const params = useParams();
  const cookies = new Cookies();
  const [eventDate, setEventDate] = useState([{}]);
  const navigate = useNavigate();
  const [formData, SetFormData] = useState({
    phoneNumber: "",
    uesrHash: "",
    orderNumber: 2,
    inEachId: 2,
  });

  useEffect(() => {
    axios.get(`${api.API}/ineach/` + params.ID).then((response) => {
      setEventDate(response.data);
    });
  }, []);

  //   if (!cookies.get("Lgn")) {
  //     navigate("/");
  //     return;
  //   }

  const PostData = (hash, id) => {
    axios({
      method: "post",
      url: `${api.API}/Order`,
      data: {
        orderNumber: id,
        inEachId: id,
        uesrHash: hash,
      },
    })
      .then(function (response) {
        response.data.status === "Error"
          ? alert("ظرفیت تکمیل")
          : navigate(`/wallet/${hash}`);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };
  return (
    <div
      style={{ fontFamily: "danamedium" }}
      className="text-sm font-bold  mt-14"
    >
      {eventDate.map((item, i) => {
        let DateObj = new Date(item.status);
        let today = DateObj.toLocaleDateString("fa-IR", { weekday: "long" });
        let todate = DateObj.toLocaleDateString("fa-IR");

        let DateObjI = new Date(item.location);
        let todayI = DateObjI.toLocaleDateString("fa-IR", { weekday: "long" });
        let todateI = DateObjI.toLocaleDateString("fa-IR");

        var days = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        var d = new Date(today);
        var dayName = days[d.getDay()];

        return (
          <div
            className="block  m-auto w-64 bg-teal-500 text-white item-center mt-2 p-8 rounded text-center  m-auto"
            key={i}
          >
            <div>{item.overideTitle}</div>
            <div>{item.title}</div>
            <div>
              {" "}
              <span className="ml-2 mb-2 block text-lg bg-red-500 p-1">
                تعداد خواب {item.memberCount}
              </span>
            </div>
            <div>
              {" "}
              <span className="ml-2 mt-12">متراژ اتاق</span>
              <span className="ml-2">{item.metre}</span>
            </div>
            <div>
              {" "}
              <span>تاریخ ورود </span>
              <span className="ml-2">{todayI}</span>
              <span className="ml-2">{todateI}</span>
            </div>
            <div>
              {" "}
              <span>تاریخ خروج </span>
              <span className="ml-2">{today}</span>
              <span className="ml-2">{todate}</span>
            </div>
            <div>
              {" "}
              <span className="ml-2">توضیحات</span>
              <span>{item.AdDetails}</span>
            </div>
            <div>
              {" "}
              <span className="ml-2">قیمت</span>
              <span>{item.price}</span>
            </div>

            <button
              className="bg-yellow-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              id={item.id}
              onClick={(e) => {
                PostData(cookies.get("Lgn"), e.target.id);
              }}
            >
              ر ز ر و
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default GetDate;

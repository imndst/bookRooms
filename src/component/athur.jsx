import { useState } from "react";

import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";
import api from "../devjss.json";
const Ath = () => {
  const params = useParams();
  const cookies = new Cookies();
  const [orderNumber, SetOrderNumber] = useState();
  const [hashNumber, SetHashNumber] = useState();

  const getdata = () => {
    axios
      .get(`${api.API}/pay/${orderNumber}?hash=` + cookies.get("Lgn"))
      .then((response) => {
        if (response.data === "") {
          alert("شماره اشتباه است");
        } else {
          SetHashNumber(response.data);
          alert("بلیت صادر شده است");
        }
      });
  };

  const putdata = () => {
    axios
      .put(`${api.API}/pay/${orderNumber}?hash=` + cookies.get("Lgn"))
      .then((response) => {
        if (response.data === "") {
          alert("شماره اشتباه است");
        } else {
          SetHashNumber(response.data);
          alert("تایید نهایی انجام شد");
        }
      })
      .catch(function (response) {
        //handle error
        alert("بروز خطا");
      });
  };

  return (
    <div className="w-64 m-auto gap-3 p-8">
      <input
        type="number"
        placeholder="شماره سفارش"
        className="border rounded p-2 text-right"
        onChange={(e) => {
          SetOrderNumber(e.target.value);
        }}
      />
      <button
        className="p-2  mt-2 m-auto  text-white text-center  bg-blue-600 block rounded"
        onClick={(e) => {
          e.preventDefault(), getdata();
        }}
      >
        {" "}
        بررسی
      </button>
      <Link
        className="p-2  mt-2 m-auto  text-white text-center  bg-blue-600 block rounded"
        to={`/wallet/${hashNumber}`}
      >
        مشاهده
      </Link>
      <button
        className="p-2  mt-2 m-auto  text-white text-center  bg-blue-600 block rounded"
        onClick={(e) => {
          e.preventDefault(), putdata();
        }}
      >
        {" "}
        تایید پرداخت
      </button>
    </div>
  );
};
export default Ath;

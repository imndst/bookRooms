import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import api from "../devjss.json";

const VeriFy = () => {
  const [RndCode, SetRndCOde] = useState();
  const [CountBad, SetCountBad] = useState(0);

  const params = useParams();
  const navigate = useNavigate();
  const PostData = (e) => {
    e.preventDefault();
    axios({
      method: "put",
      url: `${api.API}/Verify/${params.phone}?rand=${RndCode}`,
    })
      .then(function (response) {
        response.data.status !== "Error"
          ? HandelVerify(response.data.status)
          : HandelVerify(response.data.status);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

  const HandelVerify = (respons) => {
    const cookies = new Cookies();
    cookies.set("Lgn", respons, { path: "/" });
    const ck = cookies.get("Lgn");
    ck === "Error" ? SetCountBad(CountBad + 1) : (window.location.href = `/`);

    CountBad > 1 ? navigate("/Register/") : null;
  };

  return (
    <div
      style={{ fontFamily: "danamedium" }}
      className="rtl-grid h-auto container w-96 block m-auto  bg-blue-400 item-center mt-4 p-2 text-center text-lg  m-auto"
    >
      <input
        type="number"
        placeholder="کد پیامک شده "
        className="border p-2 text-right"
        onChange={(e) => {
          SetRndCOde(e.target.value);
        }}
        name="Verify"
      />
      <button
        className="h-12 bg-green-300 w-24 rounded mt-2 block item-center m-auto"
        onClick={PostData}
      >
        تایید
      </button>
      {CountBad > 0 && <span className="block">کد وارد شده اشتباه است</span>}
    </div>
  );
};

export default VeriFy;

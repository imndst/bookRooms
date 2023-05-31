import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import api from "../devjss.json";
const Wallet = () => {
  const [myWallet, SetMyWallet] = useState([{}]);
  const params = useParams();
  const ReadData = () => {};

  useEffect(() => {
    axios({
      method: "get",
      url: `${api.API}/wallet/${params.id}`,
    })
      .then(function (response) {
        response.data.Status != "Error" ? SetMyWallet(response.data) : null;
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  }, []);

  return (
    <div>
      {myWallet.map((item) => {
        let DateObj = new Date(item.bookDate);
        let today = DateObj.toLocaleDateString("fa-IR");
        let DateObjO = new Date(item.timeTORef);
        let todayO = DateObjO.toLocaleDateString("fa-IR");
        return (
          <div className="rtl-grid h-auto  container w-96 block m-auto  bg-blue-400 item-center mt-4 p-8 text-center text-lg  m-auto ">
            <span className="block text-white font-bold">
              شماره سفارش {item.id}
            </span>
            <span className="block text-white font-bold">
              نام عضو {item.userFamily}
            </span>
            <span className="block text-white font-bold">
              {item.ququ <= 0.1
                ? "مهلت پرداخت در حال پایان"
                : "" + item.ququ + `: فرصت پرداخت ساعت`}
            </span>
            <span className="block text-white font-bold">
              وضعیت پرداخت {item.payStatus == 1 ? "تایید شده" : "پرداخت نشده"}
            </span>
            <ul className="block text-white font-bold">
              <li>{item.overrideTitle}</li>
              <li>{item.orderContext}</li>
              <li>متراژ {item.metre}</li>
              <li>تعداد اتاق {item.room}</li>
            </ul>
            <span className="block text-white font-bold">
              تاریخ ورود {today}
            </span>
            <span className="block text-white font-bold">
              تاریخ خروج{todayO}
            </span>

            <span className="block text-white font-bold ml-4 ">
              قیمت {item.price}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Wallet;

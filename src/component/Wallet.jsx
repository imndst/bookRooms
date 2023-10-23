import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../devjss.json";
const Wallet = () => {
  const [myWallet, SetMyWallet] = useState([{}]);
  const params = useParams();
  const navigate = useNavigate();

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
        alert("برای شما ویلا رزرو نشده است");
        navigate("/");
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
          <div
            style={{ fontFamily: "danamedium" }}
            className="rtl-grid h-auto  container w-96 block m-auto  bg-blue-400 item-center mt-4 p-8 text-center text-lg  m-auto "
          >
            <span className="block text-white font-bold">
              شماره سفارش {item.id}
            </span>
            <span className="block text-white font-bold">
              نام عضو {item.userFamily}
            </span>
            <span className="block text-white font-bold">
              {item.ququ <= 0.1
                ? "مهلت پرداخت در حال پایان"
                : "" + "فرصت پرداخت " + item.ququ + ` ساعت  `}
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
            <span className="block text-white font-bold ml-4">
              ساعت ورود : روز اول ساعت 14:۰۰ ساعت خروج : روز چهارم ساعت 11:۰۰
              مدت استفاده از ویلاها ، سه شب و چهار روز می باشد. ظرفیت میهمانان
              در ویلاهای دو خوابه حداکثر ۶ نفر و ویلاهای سه خوابه حداکثر 8 نفر
              می باشد.
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Wallet;

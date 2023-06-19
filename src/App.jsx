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
        شرایط ثبت نام و استفاده از ویلاها تاریخ شروع ویلا ها از اول تیرماه لغایت
        2 مهر می باشد ساعت ورود : روز اول ساعت 14:۰۰ ساعت خروج : روز چهارم ساعت
        11:۰۰ مدت استفاده از ویلاها ، سه شب و چهار روز می باشد. ظرفیت میهمانان
        در ویلاهای دو خوابه حداکثر ۶ نفر و ویلاهای سه خوابه حداکثر 8 نفر می
        باشد. هزینه استفاده از ویلاهای دو خوابه بابت سه شب و چهار روز ، از
        4.000.000 تومان لغایت 5.200.000 تومان می باشد. هزینه استفاده از ویلاهای
        سه خوابه بابت سه شب و چهار روز ، از 4.300.000 تومان لغایت 5.950.000
        تومان می باشد. ویلاهای دو خواب دارای ۴ تخت و ویلاهای 3 خواب دارای 6 تخت
        و به همان تعداد پتو و بالشت می باشد و جهت مابقی مهمانان بایستی لوازم
        موردنیاز برداشته شود. جهت استفاده از خدمات ویلا ، اصل معرفی نامه به
        همراه کارت شناسایی معتبر (شناسنامه یا کارت ملی یا کارت عضویت سازمان)
        تحویل مدیریت محترم ویلا گردد. پس از رزرو الکترونیکی به عضو سازمان 24
        ساعت مهلت داده می شود نسبت به ثبت نهایی و رزرو قطعی آن اقدام فرمایید. در
        صورت عدم مراجعه ، زمان رزرو شده را مجدد در دسترس سایر اعضا قرار خواهد
        داد و دیگر امکان ثبت آن برای شما نخواهد بود. در رزرو و انتخاب تاریخ دقت
        لازم را مبذول فرمایید، زیرا امکان حذف و جابجایی آن پس از قطعی شدن ثبت
        نام وجود نخواهد داشت. آدرس ویلاها : محمود آباد ، سیاهرود ، رستم رود ،
        نور
      </div>
    </div>
  ) : (
    <div className="text-white item-center text-xl"> Loading...</div>
  );
}

export default App;

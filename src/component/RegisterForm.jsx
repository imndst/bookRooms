import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import api from "../devjss.json";
const UserRegister = () => {
  const navigate = useNavigate();
  const [isLoaading, SetIsLoading] = useState(false);

  const [PositionStatus, SetPositionStatus] = useState("برسی عضویت");
  const params = useParams();
  const [formdata, SetFormData] = useState({
    UserName: "",
    Userphone: "",
    UserRandomeCode: 1,
    UserCapacity: 10,
    UserHash: "x0c",
    UserStatus: 1,
    ip: "90",
  });

  const [errorMessage, SetErrorMessage] = useState({
    validname: false,
    InputName: false,
    InputPhone: false,
    inputClick: false,
    MultiRequestStatus: "",
    BanedStaticUser: "",
  });

  const cookies = new Cookies();
  const p2e = (s) => s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

  const PostData = (e) => {
    SetIsLoading(true);
    SetErrorMessage((item) => ({
      ...item,
      InputName: true,
      InputPhone: true,
    }));
    errorMessage.InputName && errorMessage.InputPhone
      ? axios({
          method: "post",
          url: `${api.API}/UserTime`,
          data: formdata,
        })
          .then(function (response) {
            response.data.userStatus === 200
              ? navigate(`/verify/${formdata.Userphone}`)
              : SetErrorMessage((item) => ({
                  ...item,
                  MultiRequestStatus: response.data.userStatus,
                }));
            SetIsLoading(true);
          })
          .catch(function (response) {
            //handle error
            console.log(response);
          })
      : null;
  };

  const GetStaticUser = (ID) => {
    SetErrorMessage((item) => ({
      ...item,
      InputName: true,
      InputPhone: true,
    }));
    axios({
      method: "get",
      url: `${api.API}/StaticUser/${ID}`,
    })
      .then(function (response) {
        SetErrorMessage((PrevItem) => ({
          ...PrevItem,
          BanedStaticUser: response.data.status,
        }));
        response.data.status === "OK" ? SetPositionStatus("دریافت کد") : "";
      })
      .catch(function (response) {
        console.log(response);
      });
  };

  const handleNameChange = (event) => {
    const inputValue = event;
    SetFormData((PrevItem) => ({
      ...PrevItem,
      UserName: inputValue,
    }));
    SetErrorMessage((item) => ({
      ...item,
      validname: validateName(inputValue),
    }));
  };

  const validateName = (name) => {
    const pattern = /^[a-zA-Zآ-ی\s]+$/;
    return pattern.test(name);
  };
  return (
    <div
      style={{ fontFamily: "danamedium" }}
      className="rtl-grid h-auto  container w-96 block m-auto  bg-[#164e63] item-center mt-4 p-2 text-center text-lg  m-auto "
    >
      <span className="text-white">{PositionStatus}</span>
      <form
        className="rtl-grid h-auto  container block m-auto  bg-[#164e63] item-center mt-4 p-1 text-center text-lg  m-auto "
        onSubmit={PostData}
      >
        <input
          required
          name="UserName "
          className="border  text-right p-1 rounded item-center"
          type="text"
          placeholder="نام و نام خانوادگی"
          onChange={(e) => {
            handleNameChange(e.target.value);
          }}
        />
        <span className="block text-right">
          {errorMessage.inputClick &&
          !errorMessage.InputName &&
          !errorMessage.validname
            ? "ورود نام  فارسی اجباری"
            : ""}
        </span>
        <input
          required
          name="PhoneNumber "
          className="border  mt-2 text-right p-1 rounded"
          type="number"
          placeholder="شماره همراه"
          onChange={(e) => {
            SetFormData((PrevItem) => ({
              ...PrevItem,
              Userphone: p2e(String("0" + e.target.value).slice(-11)),
            }));
          }}
        />
        <span className="block text-right">
          {errorMessage.inputClick && !errorMessage.InputPhone
            ? "ورود شماره همراه اجباری"
            : ""}
        </span>
        {errorMessage.BanedStaticUser != "OK" &&
          errorMessage.validname &&
          (!isLoaading ? (
            <button
              className="bg-green-400 rounded p-2 mt-2 w-24"
              onClick={(e) => {
                e.preventDefault();

                formdata.UserName.trim().length != 0 &&
                formdata.Userphone.trim().length != 0
                  ? GetStaticUser(formdata.Userphone)
                  : SetErrorMessage((item) => ({
                      ...item,

                      InputName:
                        formdata.UserName.trim().length === 0 &&
                        errorMessage.validname
                          ? false
                          : true,
                      InputPhone:
                        formdata.Userphone.trim().length < 10 ? false : true,
                      inputClick: true,
                    }));
              }}
            >
              ادامه
              {isLoaading && (
                <div
                  class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              )}
            </button>
          ) : (
            "Loading..."
          ))}

        {errorMessage.BanedStaticUser === "Error" && (
          <span className="block">
            شماره شما در سازمان نظام مهندسی ثبت نشده است{" "}
          </span>
        )}
        {errorMessage.MultiRequestStatus === 300 && (
          <span className="block">درخواست شما برای مدت یک دقیقه محدود شد </span>
        )}

        {errorMessage.BanedStaticUser === "OK" &&
          errorMessage.InputName &&
          errorMessage.validname && (
            <Link
              style={{}}
              className="button mt-2 text-white border p-2 bg-green-400 text-color:red font-bold"
              onClick={() => {
                formdata.UserName.trim().length != 0 &&
                formdata.Userphone.trim().length != 0
                  ? PostData()
                  : SetErrorMessage((item) => ({
                      ...item,
                      InputName:
                        formdata.UserName.trim().length === 0 ? false : true,
                      InputPhone:
                        formdata.Userphone.trim().length < 10 ? false : true,
                      inputClick: true,
                    }));
              }}
              type="submit"
            >
              دریافت کد پیامکی
              {isLoaading && (
                <div
                  class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              )}
            </Link>
          )}
      </form>
      <span className="block text-white text-right text-sm">
        لطفا نام و نام خانوادگی را به درستی و بدون اعداد و کد وارد کنید
      </span>
      <span className="block text-white text-right text-sm">
        لطفا شماره ثبت شده در نظام مهندسی را وارد کنید
      </span>
      <span className="block text-white text-right text-sm">
        لطفا در صورت خطای عدم ثبت شماره با سازمان تماس بگیرید
      </span>

      <span className="block text-white text-right text-sm">
        ممکن است برای ماه جاری تمام ویلا ها تکمیل ظرفیت باشد لطفا در این صورت از
        سیستم خارج نشوید تا با باز شدن ظرفیت ازاد به سرعت رزرو خود را انجام دهید
      </span>

      <span className="block text-white text-right text-sm">
        بعد از رزرو حتما برای پرداخت و قظعی نمودن به صورت حضوری به سازمان مراجعه
        کنید
      </span>
    </div>
  );
};

export default UserRegister;

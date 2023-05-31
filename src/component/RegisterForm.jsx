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
    InputName: false,
    InputPhone: false,
    inputClick: false,
    MultiRequestStatus: "",
    BanedStaticUser: "",
  });
  const cookies = new Cookies();

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

  return (
    <div className="rtl-grid h-auto  container w-96 block m-auto  bg-blue-400 item-center mt-4 p-2 text-center text-lg  m-auto ">
      <span className="text-white">{PositionStatus}</span>
      <form
        className="rtl-grid h-auto  container block m-auto  bg-blue-400 item-center mt-4 p-1 text-center text-lg  m-auto "
        onSubmit={PostData}
      >
        <input
          required
          name="UserName "
          className="border  text-right p-1 rounded item-center"
          type="text"
          placeholder="نام و نام خانوادگی"
          onChange={(e) => {
            SetFormData((PrevItem) => ({
              ...PrevItem,
              UserName: e.target.value,
            }));
          }}
        />
        <span className="block text-right">
          {errorMessage.inputClick && !errorMessage.InputName
            ? "ورود نام اجباری"
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
              Userphone: e.target.value,
            }));
          }}
        />
        <span className="block text-right">
          {errorMessage.inputClick && !errorMessage.InputPhone
            ? "ورود شماره همراه اجباری"
            : ""}
        </span>
        {errorMessage.BanedStaticUser != "OK" &&
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
                        formdata.UserName.trim().length === 0 ? false : true,
                      InputPhone:
                        formdata.Userphone.trim().length < 10 ? false : true,
                      inputClick: true,
                    }));
              }}
            >
              ادامه
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

        {errorMessage.BanedStaticUser === "OK" && (
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
          </Link>
        )}
      </form>
    </div>
  );
};

export default UserRegister;

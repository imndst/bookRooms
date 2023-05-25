import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import Cookies from "universal-cookie";

const UserRegister = () => {
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
  });
  const cookies = new Cookies();

  const PostData = (e) => {
    axios({
      method: "post",
      url: "https://localhost:44356/api/UserTime",
      data: formdata,
    })
      .then(function (response) {
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

  return (
    <div>
      <form onSubmit={PostData}>
        <label>شماره همراه</label>
        <input
          required
          name="UserName "
          className="border"
          type="text"
          placeholder="نام و نام خانوادگی"
          onChange={(e) => {
            SetFormData((PrevItem) => ({
              ...PrevItem,
              UserName: e.target.value,
            }));
          }}
        />
        <input
          required
          name="PhoneNumber "
          className="border"
          type="number"
          placeholder="شماره همراه"
          onChange={(e) => {
            SetFormData((PrevItem) => ({
              ...PrevItem,
              Userphone: e.target.value,
            }));
          }}
        />

        <Link
          onClick={() => {
            formdata.UserName.trim().length === 0 &&
            formdata.Userphone.trim().length === 0
              ? PostData()
              : SetErrorMessage((item) => ({
                  ...item,
                  InputName:
                    formdata.UserName.trim().length === 0 ? false : true,
                  InputPhone:
                    formdata.Userphone.trim().length === 0 ? false : true,
                }));
          }}
          to={
            errorMessage.InputName && errorMessage.InputPhone
              ? `/verify/${formdata.Userphone}`
              : null
          }
          type="submit"
        >
          send
        </Link>
        {<span>{!errorMessage.InputName ? "name can not null" : ""}</span>}
        {<span>{!errorMessage.InputPhone ? "phone can not null" : ""}</span>}
      </form>
    </div>
  );
};

export default UserRegister;

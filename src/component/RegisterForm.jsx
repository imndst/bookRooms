import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserRegister = () => {
  const person = {
    UserName: "ali",
    Userphone: "09151898815",
    UserRandomeCode: 123,
    UserCapacity: 10,
    UserHash: "x0c",
    UserStatus: 1,
    ip: "90",
  };

  const PostData = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "https://localhost:44356/api/UserTime",
      data: person,
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
          name="UserName "
          className="border"
          type="text"
          placeholder="ali"
        />
        <button onClick={PostData} type="submit">
          send
        </button>
      </form>
    </div>
  );
};

export default UserRegister;

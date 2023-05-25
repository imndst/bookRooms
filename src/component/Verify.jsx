import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cookies from "universal-cookie";

const VeriFy = () => {
  const [RndCode, SetRndCOde] = useState();
  const params = useParams();
  const PostData = (e) => {
    const cookies = new Cookies();
    e.preventDefault();
    axios({
      method: "put",
      url: `https://localhost:44356/api/Verify/${params.phone}?rand=${RndCode}`,
    })
      .then(function (response) {
        response.data.Status != "Error"
          ? cookies.set("Lgn", response.data.status, { path: "/" })
          : null;
        console.log(cookies.get("Lgn"));
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

  return (
    <div>
      <input
        onChange={(e) => {
          SetRndCOde(e.target.value);
        }}
        name="Verifi"
        type="text"
      />
      <button onClick={PostData}>تایید</button>
    </div>
  );
};

export default VeriFy;

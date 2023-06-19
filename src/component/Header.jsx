import Cookies from "universal-cookie";
import { Route, Outlet, Link, useParams } from "react-router-dom";

const WalletRoute = () => {
  const cookies = new Cookies();
  const cokn = cookies.get("Lgn");

  return (
    <div
      style={{ fontFamily: "danamedium" }}
      className="flex justify-between py-5 bg-[#164e63] text-white text-center px-4"
    >
      {cokn == null ||
        (cokn !== "Error" && (
          <button
            style={{ fontFamily: "danamedium" }}
            className="block bg-yellow-300 rounded p-2 text-black"
            onClick={(e) => (
              e.preventDefault(),
              (window.location.href = `../../wallet/${cookies.get("Lgn")}`)
            )}
          >
            پیگیری سفارش
          </button>
        ))}
      {/* //cookies.remove("Lgn") */}
      {cokn == null ? (
        <button
          className="block bg-green-400 p-2"
          onClick={(e) => {
            e.preventDefault(), (window.location.href = `../../Register/`);
          }}
        >
          ورود{" "}
        </button>
      ) : (
        <button
          className="block rouned bg-red-400 p-2"
          onClick={(e) => {
            e.preventDefault(),
              cookies.remove("Lgn"),
              (window.location.href = `/`);
          }}
        >
          خروج{" "}
        </button>
      )}
      <a href="https://golshanonline.ir/main" className="block  rounded p-2 ">
        Home
      </a>
    </div>
  );
};

export default WalletRoute;

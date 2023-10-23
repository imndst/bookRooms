import { useEffect, useState } from "react";

const About = () => {
  const [offset, SetOffset] = useState(-100);
  console.log(offset);
  useEffect(() => {
    const timer = setTimeout(() => {
      SetOffset(95);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-gray-400 space-y-4 p-4 ">
      <div
        style={{
          position: "absolute",
          left: `${offset}%`,
          transition: "left 15s ease-in-out",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          left: `${offset}%`,
          transition: "left 17s ",
        }}
      ></div>

      <div className="grid gap-4 items-center h-36">
        <div className="flex gap-2 justify-start items-center">
          <li className="bg-blue-900 w-12"></li>
          <li className="bg-green-900 w-12"></li>
        </div>
        <div className="grid flex sm:grid-cols-2 md:grid-cols-8 gap-12">
          <li className="bg-white min-w-24 w-24"></li>
          <li className="bg-white min-w-24 w-24"></li>
          <li className="bg-white min-w-24 w-24"></li>
          <li className="bg-white min-w-24 w-24"></li>
          <li className="bg-white min-w-24 w-24"></li>
        </div>

        <div className="flex gap-4 items-center justify-end">
          <li className="bg-red-900 w-12"></li>
          <li className="bg-green-900 w-12"></li>
        </div>
      </div>
    </div>
  );
};

export default About;

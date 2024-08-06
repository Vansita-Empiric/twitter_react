import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdatePost() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [values, setValues] = useState({
    id: "id",
    content: "",
  });

  useEffect(() => {
    axios
      .get("/api/posts/getPostById/" + id)
      .then((res) => {
        setValues({
          ...values,
          content: res.data.findById[0].content,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(values);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // axios
    //   .put("/api/posts/" + id, { values })
    //   .then((res) => {
    //     navigate("/home");
    //   })
    //   .catch((err) => console.log(err));

    // try {
    //   const apiSignup = "/api/posts/";
    //   const response = await axios.post(apiSignup, formData, {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });

    //   if (response.status === 201) {
    //     console.log("Registered successfully");
    //   } else {
    //     console.log("Registration failed");
    //   }
    // } catch (error) {
    //   console.error("Internal server error");
    // }
  };

  //   console.log(res.data.findById[0].content)

  return (
    <>
      <>
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                <h3 className="text-3xl font=semibold">Edit Post</h3>
                <button
                  className="bg-transparent border-0 text-black float-right"
                  onClick={() => navigate("/home")}
                >
                  <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                    x
                  </span>
                </button>
              </div>
              <div className="relative p-6 flex-auto">
                <form
                  className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full"
                  onSubmit={handleSubmit}
                >
                  <label className="block text-black text-sm font-bold mb-1">
                    Post Content
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                    value={values.content}
                    onChange={(e) =>
                      setValues({ ...values, content: e.target.value })
                    }
                  />
                </form>
              </div>
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={() => navigate("/home")}
                >
                  Close
                </button>
                <button
                  className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={() => navigate("/home")}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default UpdatePost;

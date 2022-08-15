// import axios from "axios";
// import React, { useState } from "react";
// import { api } from "../constants/api";
// import { useAuth } from "../context/auth/authContext";

// const Profile = () => {
//   const {
//     state: { user },
//     dispatch,
//     isAuth,
//     token,
//   } = useAuth();
//   console.log(user.token);
//   const [name, setName] = useState(user.username);
//   const [email, setEmail] = useState(user.email);
//   const [password, setPassword] = useState(" ");
//   const [cnfPassword, setCnfPassword] = useState(" ");

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       const config = {
//         headers: { Authorization: `Bearer ${user.token}` },
//       };
//       if (isAuth) {
//         const { data } = await axios.put(
//           `${api}/users/${user._id}`,
//           config,

//           {
//             name,
//             email,
//             password,
//           }
//         );
//         dispatch({ type: "UPDATE_USER", payload: data });
//         localStorage.setItem("user", JSON.stringify(data));
//         console.log("user upadted succesfully");
//       } else {
//         console.log("not authorized");
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   console.log(user.password);
//   return (
//     <div
//       style={{
//         maxWidth: "600px",
//         height: "300px",
//         backgroundColor: "#ccc",
//         margin: "0 auto",
//         display: "flex",
//         // justifyContent: "center",
//         alignItems: "center",
//         flexDirection: "column",

//         // textAlign: "center",
//       }}
//     >
//       Profile
//       <form
//         onSubmit={submitHandler}
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           //   justifyContent: "center",
//         }}
//       >
//         <label>name:</label>
//         <input
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           style={{ padding: "10px" }}
//         />
//         <label>email:</label>
//         <input
//           style={{ padding: "10px" }}
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <label>password:</label>
//         <input
//           style={{ padding: "10px" }}
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <label>confirm password:</label>
//         <input
//           style={{ padding: "10px" }}
//           value={cnfPassword}
//           onChange={(e) => setCnfPassword(e.target.value)}
//         />
//         {/* <input
//           style={{ padding: "10px" }}
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         /> */}
//         <button
//           style={{ padding: "10px", backgroundColor: "blue" }}
//           type="submit"
//         >
//           update
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Profile;

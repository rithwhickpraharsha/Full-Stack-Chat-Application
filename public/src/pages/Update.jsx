import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import loader from "../assets/loader.gif";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUser, host, loginRoute, setUpdateRoute } from "../utils/APIRoutes";
import { Buffer } from "buffer";
import { io } from "socket.io-client";


export const Update = () => {
  const navigate = useNavigate();
  const api = `https://api.multiavatar.com/4645646`;
  const socket = useRef();

  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const [values, setValues] = useState({ username: "", avatar: "" });
  const [user_id, setId] = useState("");
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    async function setAttr() {
      const data = [];
      socket.current = io(host);
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
      const userData_str = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY
      );
      const userData = JSON.parse(userData_str);
      if (userData) {
        console.log(userData["username"]);
        setId(userData._id);
        const user = await axios.post(getUser, { userId: userData._id });
        setValues({ username: user.data.user.username, avatar: user.data.user.username })
      }
      else {
        navigate("/login");
      }
    }
    setAttr();
  }, [])


  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    console.log(values);
  };



  const handleSubmit = async (event) => {

    try {
      if (user_id == "" || values.username == "" || values.avatar == "") {
        toast.error("Dont leave Empty", toastOptions);
        return;
      }
      const data = await axios.put(setUpdateRoute, { userId: user_id, username: values.username, avatar: values.avatar });
      console.log(data);
      toast.success(data.data.message, toastOptions);
      socket.current.emit('UserUpdate');

      navigate("/");
    } catch (err) {
      toast.error(err.response.data, toastOptions);
    }

  };

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <FormContainer>
          <div className="form">
            <div className="brand">
              <img src={Logo} alt="logo" />
              <h1>Animic World</h1>
            </div>
            <input
              type="text"
              placeholder="Username"
              value={values.username}
              name="username"
              onChange={(e) => handleChange(e)}
              min="3"
            />
            <div className="avatars">
              {avatars.map((avatar, index) => {
                return (
                  <div
                    className={`avatar ${selectedAvatar === index ? "selected" : ""
                      }`}
                  >
                    <img
                      src={`data:image/svg+xml;base64,${avatar}`}
                      alt="avatar"
                      key={avatar}
                      onClick={() => {
                        setValues({ username: values.username, avatar: avatars[index] })
                        setSelectedAvatar(index)
                        console.log(values);
                      }}
                    />
                  </div>
                );
              })}
            </div>

            <button type="submit" onClick={() => { handleSubmit() }}>Update Profile</button>

          </div>
        </FormContainer>)}
      <ToastContainer />
    </>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }
`

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #0F5298;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: #D5F3FE;
      text-transform: uppercase;
    }
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: black;
    border-radius: 2rem;
    padding: 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #0F5298;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #D5F3FE;
      outline: none;
    }
  }
.avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  button {
    background-color: #0F5298;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #0F5298;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

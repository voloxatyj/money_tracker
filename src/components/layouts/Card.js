import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import moment from "moment";
import { Link } from "react-router-dom";
import { logOutUser } from "../../redux/actions/userActions";
import store from "../../redux/store";
import diary from "./img/paper.png";
import FunctionsIcon from "@material-ui/icons/Functions";
import { uploadImage } from "../../redux/actions/userActions";

export const Card = () => {
  const authenticated = useSelector((state) => state.user.authenticated);
  const info = useSelector((state) => state.user.info.userCredentials);
  const dispatch = useDispatch();
  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    dispatch(uploadImage(formData));
  };

  const handleEditImage = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  return (
    authenticated &&
    info !== undefined && (
      <CardContainer
        className="animate__animated animate__fadeInDownBig"
        style={{
          display: "inline-flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "100%",
          transition: "all 1s ease-out",
        }}
      >
        <section>
          <img className="img" src={info.imageUrl} alt="avatar" />
          <div>
            <h2>{info.name}</h2>
            <p>{info.email}</p>
            <p>Joined {moment(info.createdAt).fromNow()}</p>
          </div>
          <div className="social-container card">
            <input
              type="file"
              id="imageInput"
              hidden="hidden"
              onChange={(event) => handleImageChange(event)}
            />
            <Link to="#" className="icons" onClick={handleEditImage}>
              <i className="fas fa-users-cog"></i>
            </Link>
            <Link to="/table" className="icons">
              <i className="fas fa-table"></i>
            </Link>
            <Link to="/diagrams" className="icons">
              <i className="fas fa-chart-bar"></i>
            </Link>
            <Link
              to="/authform"
              className="icons"
              onClick={() => {
                store.dispatch(logOutUser());
              }}
            >
              <i className="fas fa-sign-out-alt"></i>
            </Link>
          </div>
        </section>
        <div className="balance">
          <img src={diary} alt="diary" />
          <div className="context">
            <h1 style={{ color: "green" }}>earnings</h1>
            <i className="fas fa-minus"></i>
            <h1 style={{ color: "red" }}>spending</h1>
            <span className="span-line"></span>
            <FunctionsIcon style={{ color: "var(--second-color)" }} />
          </div>
        </div>
      </CardContainer>
    )
  );
};

const CardContainer = styled.div`
  .context {
    justify-items: flex-end;
    display: inline-grid;
    transform: rotate(-8deg);
    top: 20%;
    left: 68%;
    position: absolute;
  }
  img {
    transform: rotate(5deg);
  }
  .span-line {
    margin-top: 0.1rem;
    height: 0.2rem;
    width: 80%;
    color: black;
    background-color: black;
  }
  section {
    display: inline-grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: center;
    align-items: center;
    position: relative;
    max-width: 300px;
    max-height: 175px;
    padding: 1em;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    margin: 2rem;
    border-radius: 3%;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 100px 70px;
    grid-template-areas:
      "a b"
      "c c";
    justify-items: center;
    align-items: end;
  }
  .img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid var(--main-color);
    padding: 2px;
    margin-right: 1rem;
    grid-area: a;
  }
  div {
    grid-area: b;
    text-align: end;
  }
  h2 {
    font-size: 1em;
    text-transform: uppercase;
    color: var(--second-color);
  }
  p {
    margin: 0;
    padding: 0;
    font-size: 0.5em;
    text-transform: uppercase;
    color: var(--main-color);
  }
  .card {
    display: inline-flex;
    grid-area: c;
    padding: 0.5em;
  }
  .social-container a:before,
  .social-container a:after {
    height: 35px !important;
    width: 35px !important;
  }
`;

import React, { Fragment } from "react";
import { Logo } from "../components/layouts/Logo";
import styled from "styled-components";

export default function Home() {
  return (
    <section className="landing">
      <Logo />
      <Circle>
        <svg
          className="svg"
          width="400"
          height="297"
          viewBox="0 0 200 197"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="72" cy="72" r="72" fill="#ae5fce" />
          <g className="landing2">
            <circle cx="158" cy="72" r="72" fill="#5b78c7" />
          </g>
        </svg>
      </Circle>
    </section>
  );
}

const Circle = styled.div`
  svg {
    position: fixed;
    top: 64%;
    left: 50%;
    transform: translate(-50%, -60%);
  }
`;

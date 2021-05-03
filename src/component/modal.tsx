import React from "react";
import styled from "styled-components";
import { CustomColumn, CustomRow, NormalButton } from "../styles/globalStyle";
import { TableDataType } from "../utils/types";
import ReactHtmlParser from "react-html-parser";

const ModalWrapper = styled.div`
  display: none;
  position: fixed;
  z-index: 10;
  padding-top: 10%;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);

  .body-html-parser {
    color: black;
  }

  .modal-content {
    margin: auto;
    padding: 20px 20px 00px 20px;
    width: 900px;
    top: 10%;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 10px;

    .title {
      text-align: left;
      font-size: 16px;
      padding: 8px 0;
      font-weight: 500;
      letter-spacing: 0px;
      color: #424242;
      opacity: 1;
    }
    .divider {
      width: 100%;
      height: 1px;
      background-color: #00000029;
      margin: 10px 0;
    }
  }
`;

export const CustomModal: React.FC<{
  success: Function;
  cancel: Function;
  id: string;
  divider?: boolean;
  data?: undefined | TableDataType;
}> = ({ success, cancel, id, divider = true, data }) => {
  return (
    <ModalWrapper id={id}>
      <CustomColumn className="modal-content" justify="left">
        <div className="title">
          <b>Question: </b>
          {data?.title}
        </div>
        <div className="title">
          <b>Author: </b>
          {data?.owner.display_name}
        </div>
        <div className="title">
          <b>Visit site: </b>
          <a href={data?.link} rel="noreferrer" target="_blank">
            link
          </a>
        </div>
        <div className="body-html-parser">
          <b>Body: </b>
          {data?.body && ReactHtmlParser(data?.body)}
        </div>

        {divider && <div className="divider"></div>}
        <CustomRow justify="center">
          <NormalButton
            width="48%"
            background="#4B7BFF"
            onClick={() => success()}
          >
            CLOSE
          </NormalButton>
        </CustomRow>
      </CustomColumn>
    </ModalWrapper>
  );
};

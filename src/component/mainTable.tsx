import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LoaderIcon from "../svgCompnent/loaderIcon";
import { TableDataType } from "../utils/types";
import { HeaderRow } from "./headerRow";
import { CustomModal } from "./modal";
import { TableDataRow } from "./tableRow";

const MainTableWrapper = styled.div`
  margin: 30px auto;
  border: 1px solid #243342;
  border-radius: 5px;
  background: #34495e;
  width: 90%;
  margin-bottom: 0;

  .loading-data {
    color: white;
    text-align: center;
    background: rgba(31, 45, 58, 0.3);
  }
  tr:hover {
    background: rgba(31, 45, 58, 0.3);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    overflow: scroll;
    border-radius: 5px;
    height: 500px;
  }

  table td,
  table th {
    padding: 12px 16px;
    cursor: pointer;
  }

  table .middleAlign {
    display: flex;
    align-items: center;
  }

  table th {
    font-weight: bold;
    user-select: none;
    cursor: pointer;
    height: 50px;
  }

  table th:hover {
    background: #425d78;
  }

  table thead tr,
  table tr:not(:last-child) {
    border-bottom: 1px solid #2e4155;
  }
`;

export const MainTable: React.FC<{}> = () => {
  const [data, setData] = useState<TableDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<TableDataType | undefined>(
    undefined
  );
  const [pageCount, setPageCount] = useState<number>(1);

  useEffect(() => {
    if (pageCount > 1) {
      setLoading(true);
      let response = axios.get(
        `https://api.stackexchange.com/2.2/questions?page=${pageCount}&pagesize=50&order=desc&sort=activity&site=stackoverflow&filter=!GjCqwCMIq7tZmaZn3681-ucQupkeQ1iziaUSpct*Zu2nm2_JxQpPdslWwaUR..fe)Vb4q4foWLcmrkb._i`
      );
      response
        .then((res) => {
          setData([...data, ...res.data.items]);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }, [pageCount]);

  useEffect(() => {
    setLoading(true);
    let response = axios.get(
      `https://api.stackexchange.com/2.2/questions?page=${pageCount}&pagesize=50&order=desc&sort=activity&site=stackoverflow&filter=!GjCqwCMIq7tZmaZn3681-ucQupkeQ1iziaUSpct*Zu2nm2_JxQpPdslWwaUR..fe)Vb4q4foWLcmrkb._i`
    );
    console.log(pageCount, "mount call");
    response
      .then((res) => {
        // console.log(res, "res");
        setData(res.data.items);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  const handleModalClick = (id: string) => {
    let element = document.getElementById(id);
    if (element) {
      element.style.display = "block";
    }
  };
  const handleModalCancel = (id: string) => {
    let element = document.getElementById(id);
    if (element) {
      element.style.display = "none";
    }
  };

  return (
    <>
      <div className="main-title">Stackoverflow questions list</div>
      <MainTableWrapper>
        <table>
          <thead>
            <HeaderRow />
          </thead>
          {data.map((el, k) => {
            let isSecondLast = false;
            if (k === data.length - 2) {
              isSecondLast = true;
            }
            return (
              <TableDataRow
                onCellClick={() => {
                  setSelectedData(el);
                  handleModalClick("question_detail_modal");
                }}
                data={el}
                isSecondLast={isSecondLast}
                fetchPaginated={() => setPageCount(pageCount + 1)}
              />
            );
          })}
        </table>
        {loading && pageCount === 1 && (
          <div className="loading-data">
            <LoaderIcon />
          </div>
        )}
        {loading && pageCount > 1 && (
          <div className="loading-data">
            <LoaderIcon />
          </div>
        )}
        <CustomModal
          success={() => handleModalCancel("question_detail_modal")}
          cancel={() => handleModalCancel("question_detail_modal")}
          data={selectedData}
          id="question_detail_modal"
        />
      </MainTableWrapper>
    </>
  );
};

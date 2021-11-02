import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import styled from "styled-components";

const DataTable = styled.table`
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-collapse: separate;
  border: 1px solid #ddd;
  border-radius: 10px 10px 0px 0px;
  margin: 10px 0;
  font-size: 1em;
  font-family: sans-serif;
  width: 100%;
  border-spacing: 0px;
  overflow: hidden;

  tr {
    td {
      border-top: 1px solid #ddd;
      height: 50px;
      padding: 20px;
      border-left: 1px solid #ddd;
      :first-child {
        border-left: none;
        width: 100px;
      }
    }
    thead {
    }

    th {
      text-align: left;
      height: 50px;
      padding: 20px;
      border-left: 1px solid #ddd;
      background-color: #f3f3f3;
      background-color: #f3f3f3;
      border-top: none;
      :first-child {
        border-left: none;
        width: 100px;
      }
    }
  }
`;

const Ellipses = styled.div`
  font-size: 20px;
`;

export default function Table({ columns, data }) {
  const renderTable = () => {};
  return (
    <>
      <DataTable>
        <thead>
          <tr>
            <th>n</th>
            {columns.map((i, key) => (
              <th key={key}> Sample</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slice(0, 5).map((datapoint, key) => (
            <tr key={key}>
              <td>{key}</td>
              {columns.map((i, key) => (
                <td key={key}>
                  {" "}
                  {columns.length > 1 ? datapoint[key] : datapoint}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td>...</td>
            {columns.map((i, key) => (
              <td key={key}>...</td>
            ))}
          </tr>
          {data.slice(data.length - 5, data.length).map((datapoint, key) => (
            <tr key={key}>
              <td>{data.length - 5 + key}</td>
              {columns.map((i, key) => (
                <td key={key}>
                  {" "}
                  {columns.length > 1 ? datapoint[key] : datapoint}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </DataTable>
    </>
  );
}

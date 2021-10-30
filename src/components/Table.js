import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import styled from "styled-components";

const DataTable = styled.table`
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-collapse: separate;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin: 10px 0;
  font-size: 1em;
  font-family: sans-serif;
  width: 100%;
  border-spacing: 0px;

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
      border-top: none;
      :first-child {
        border-left: none;
        width: 100px;
      }
    }
  }
`;

export default function Table({ columns, data }) {
  return (
    <DataTable>
      <thead>
        <tr>
          <th>n</th>
          <th>Sample</th>
        </tr>
      </thead>
      <tbody>
        {data.map((i, key) => (
          <tr key={key}>
            <td>{key}</td>
            <td> {i}</td>
          </tr>
        ))}
      </tbody>
    </DataTable>
  );
}

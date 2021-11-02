import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import d3, { select } from "d3";
import styled from "styled-components";
import Table from "./Table";
import Graph from "../components/Graph";

const DashMain = styled.div`
  // margin-left: 8vw;
  display: flex;
  justify-content: center;
`;

const DataCard = styled.div`
  box-sizing: border-box;
  height: 95vh;
  overflow: auto;
  width: 55vw;
  margin: 1vw;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  position: relative;
  border-radius: 10px;
  background-color: white;
  ::-webkit-scrollbar {
    width: 0 !important;
  }
`;

const ValuesDiv = styled.div`
  //background-color: #eee;
  padding: 30px;
  font-size: 20px;
`;

const ControlCard = styled.div`
  height: 95vh;
  width: 25vw;
  background-color: white;
  margin: 1vw 1vw 1vw 0vw;
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
`;

const Line = styled.div`
  height: 1px;
  position: relative;
  background-color: #ddd;
`;
const Header = styled.div`
  position: relative;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
`;

const HeaderText = styled.div`
  font-family: sans-serif;
  font-size: 20px;
  text-transform: uppercase;
  margin-left: 40px;
  font-weight: bold;
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  // background-color: #eee;
  display: flex;
  justify-content: center;
  padding: 10px 50px 50px 50px;
`;

const GraphOuter = styled.div`
  width: 100%;
  // background-color: #fee;
  display: grid;
  grid-template-columns: 6fr 2fr;
`;

const DataOuter = styled.div`
  width: 100%;
`;

const GraphDiv = styled.div`
  background-color: #fafafa;
  padding: 30px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border: 1px solid #eee;
`;

const ControlsDiv = styled.div`
  padding: 50px;
`;

export default function Home({ graph, controls, data, columns, title }) {
  return (
    <DashMain>
      <DataCard>
        <Header>
          <HeaderText>{title}</HeaderText>
        </Header>
        <Content>
          <GraphOuter>
            <GraphDiv>
              <Graph graph={graph}></Graph>
            </GraphDiv>
            <ValuesDiv>Values</ValuesDiv>
          </GraphOuter>
        </Content>
        <Line></Line>
        <Header>
          <HeaderText>Data Tables</HeaderText>
        </Header>
        <Content>
          <DataOuter>
            <Table columns={columns} data={data} />
          </DataOuter>
        </Content>
      </DataCard>
      <ControlCard>
        <ControlsDiv>{controls}</ControlsDiv>
      </ControlCard>
    </DashMain>
  );
}

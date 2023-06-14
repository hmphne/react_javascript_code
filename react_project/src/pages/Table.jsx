import { Await, defer, useLoaderData } from "react-router-dom";
import { getUserInfo } from "../assets/api";
import { Suspense, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import styled from "styled-components";

export const tableLoader = async () => {
  const tableData = await getUserInfo();
  return defer({ tableData });
};

const Table = () => {
  const { tableData } = useLoaderData();

  const [sortingColumn, setSortingColumn] = useState("");
  const [sortingOrder, setSortingOrder] = useState("asc");

  const handleSorting = (column) => {
    if (sortingColumn === column) {
      setSortingOrder(sortingOrder === "asc" ? "desc" : "asc");
    } else {
      setSortingColumn(column);
      setSortingOrder("asc");
    }
  };

  const sortedData = [...tableData.users].sort((a, b) => {
    if (sortingColumn === "id") {
      return sortingOrder === "asc" ? a.id - b.id : b.id - a.id;
    } else if (sortingColumn === "firstName") {
      return sortingOrder === "asc"
        ? a.firstName.localeCompare(b.firstName)
        : b.firstName.localeCompare(a.firstName);
    } else if (sortingColumn === "ssn") {
      return sortingOrder === "asc"
        ? a.ssn.localeCompare(b.ssn)
        : b.ssn.localeCompare(a.ssn);
    } else if (sortingColumn === "birthDate") {
      return sortingOrder === "asc"
        ? new Date(a.birthDate) - new Date(b.birthDate)
        : new Date(b.birthDate) - new Date(a.birthDate);
    } else if (sortingColumn === "age") {
      return sortingOrder === "asc" ? a.age - b.age : b.age - a.age;
    }
    return 0;
  });

  const StyledTable = styled.table`
    table-layout: fixed;
    font-size: 12px;
    margin: 32px auto;
    width: 60%;
    box-shadow: 0px 5px 15px 0px #00000036;
  `;

  const StyledTh = styled.th`
    padding: 12px;
  `;

  const StyledTd = styled.td`
    padding: 12px;
    background: #0000000a;
  `;
  return (
    <Suspense fallback={<p className="text-7xl">Fetching...</p>}>
      <Await
        resolve={tableData.users}
        errorElement={<div>Error Loading data.</div>}
      >
        <StyledTable dir="rtl">
          <thead className="#0000001a text-2xl">
            <tr>
              <StyledTh onClick={() => handleSorting("id")}>
                ردیف
                {sortingOrder === "desc" ? (
                  <ExpandMoreIcon color="primary" />
                ) : (
                  <ExpandLessIcon color="primary" />
                )}
              </StyledTh>
              <StyledTh onClick={() => handleSorting("firstName")}>
                نام و نام خانوادگی
                {sortingOrder === "desc" ? (
                  <ExpandMoreIcon color="primary" />
                ) : (
                  <ExpandLessIcon color="primary" />
                )}
              </StyledTh>
              <StyledTh onClick={() => handleSorting("ssn")}>
                شماره پرسنلی
                {sortingOrder === "desc" ? (
                  <ExpandMoreIcon color="primary" />
                ) : (
                  <ExpandLessIcon color="primary" />
                )}
              </StyledTh>
              <StyledTh onClick={() => handleSorting("birStyledThDate")}>
                تاریخ استخدام
                {sortingOrder === "desc" ? (
                  <ExpandMoreIcon color="primary" />
                ) : (
                  <ExpandLessIcon color="primary" />
                )}
              </StyledTh>
              <StyledTh onClick={() => handleSorting("age")}>
                سابقه خدمت
                {sortingOrder === "desc" ? (
                  <ExpandMoreIcon color="primary" />
                ) : (
                  <ExpandLessIcon color="primary" />
                )}
              </StyledTh>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((user) => (
              <tr key={user.id} className="text-center">
                <StyledTd>{user.id}</StyledTd>
                <StyledTd>{user.firstName}</StyledTd>
                <StyledTd>{user.ssn}</StyledTd>
                <StyledTd>{user.birthDate}</StyledTd>
                <StyledTd>{user.age}</StyledTd>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </Await>
    </Suspense>
  );
};

export default Table;

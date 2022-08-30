import { foodCategory } from "../types/FoodCategory";
import styled from "styled-components";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { Button, Input, Row, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

const Container = styled("div")`
  margin-right: 34px;
  background-color: #000000;
  border-bottom-right-radius: 16px;
  padding: 0 10%;

  @media screen and (max-width: 480px) {
    margin-right: 0px;
  }

  .ant-row {
    width: 100%;
  }

  .wrapper {
    width: 100%;
    display: flex;
    border-bottom-right-radius: 36px;

    .ant-input-group {
      top: 24px;
      border-radius: 16px;
      z-index: 1111;

      .button-container {
        background-color: #ffffff;
        border-top-right-radius: 16px;
        border-bottom-right-radius: 16px;
      }
    }

    .search-wrapper {
      background-color: #ffffff;
      border-radius: 16px;
    }
  }
`;

const MenuItem = styled("a")`
  color: #ffffff;
  margin: 0 8px;
  margin-bottom: 16px;
  text-decoration: none;
  text-align: center;
  justify-content: center;
  display: flex;
  align-items: center;
  border-radius: 18px;
  padding: 24px 0;
  padding-bottom: 16px;
  top: -16px;
  width: 90px;

  &.active {
    color: #18191c;
    background-color: #f4cbdf;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
  }
`;

const SearchButton = styled(Button)`
  height: 39px;
  background: #f4cbdf;
  border-radius: 10px !important;
  box-shadow: none;
  text-shadow: none;
  border: none;
  margin: 12px !important;

  &:hover {
    background: #ffffff;
    border: 1px solid #f4cbdf;
  }

  &:focus {
    background: #f4cbdf;
    border: none;
  }
`;

const StyledInput = styled(Input)`
  height: 62px;
  background: #ffffff;
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.05);
  border: none;
  max-width: 596px;
  width: 500px;
  text-align: start;
  border-top-left-radius: 16px !important;
  border-bottom-left-radius: 16px !important;

  @media screen and (max-width: 480px) {
    max-width: 150px;
    width: 100px;
  }

  .ant-input-prefix {
    font-size: 16px;
  }
`;

const StyledSelect = styled(Select)`
  height: 62px;
  background: #ffffff;
  border-left: 1px solid rgba(0, 0, 0, 0.05);
  max-width: 596px;
  width: 500px;

  @media screen and (max-width: 480px) {
    max-width: 150px;
    width: 80px;
  }

  .ant-select-selector {
    height: 62px !important;
    border: none !important;
  }
`;

interface NavigationInterface {
  setSearchQuery: Dispatch<SetStateAction<{searchQuery: string | null, type: string | null}>>;
}

export const NavigationMenu: FC<NavigationInterface> = ({ setSearchQuery }) => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");

  function search() {
    setSearchQuery({ searchQuery: query, type: filter });
  }

  return (
    <Container>
      <Row>
        <MenuItem href="/" className="active">
          Home
        </MenuItem>
        <MenuItem href="/map">Map</MenuItem>
      </Row>
      <div className="wrapper">
        <Input.Group compact>
          <StyledInput
            prefix={<SearchOutlined />}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <StyledSelect
            showArrow={false}
            value={filter}
            onSelect={(e: any) => setFilter(e)}
          >
            {foodCategory.map((item) => (
              <Option key={item.key} value={item.key}>{item.name}</Option>
            ))}
          </StyledSelect>
          <div className="button-container">
            <SearchButton type="primary" onClick={(e) => search()}>
              Search
            </SearchButton>
          </div>
        </Input.Group>
      </div>
    </Container>
  );
};

import {
  CloseCircleFilled,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Carousel, Modal } from "antd";
import { FC, useState } from "react";
import styled from "styled-components";
import { foodCategory } from "../types/FoodCategory";

import OrderIcon from "../assets/icons/multiple-documents-files.svg";
import { Menu } from "../interfaces/MenuItemInterface";

const Container = styled("div")`
  margin: 0 16px;
  margin-top: 10px;
  display: flex;
  border-radius: 8px;
  padding: 16px;
  max-width: 380.36px;

  background-color: #ffffff;
  cursor: pointer;

  &.active {
    border: 1px solid #fceff5;
    box-shadow: 0px 7px 24px #dcdfe4;
  }
`;

const CategoryContainer = styled("div")`
  margin: 0 16px;
  text-align: start;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;

  span {
    font-size: 21px;
    color: #000000;
    align-items: baseline;
  }

  @media screen and (max-width: 480px) {
    span {
      font-size: 16px;
    }
  }

  p {
    font-size: 14px;
    color: #1e1e1e;
    opacity: 0.5;
  }
`;

const ImageContainer = styled("div")`
  height: 139px;
  width: 139px;
  display: flex;

  img {
    border-radius: 16px;
  }

  @media screen and (max-width: 480px) {
    height: 100px;
    width: 100px;

    img {
      height: 100px;
      width: 100px;
    }
  }
`;

const CounterPriceContainer = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  &.modal-counter {
    justify-content: end;

    .ant-btn-icon-only {
      margin: 0 12px;
    }
    span {
      margin: 4px;
    }
    p {
      margin-right: 16px;
    }
  }

  .ant-btn-group {
    display: contents;
  }

  .ant-btn-icon-only {
    background-color: #f4cbdf;
    border: #f4cbdf;
    border-radius: 8px !important;

    &:hover,
    &:focus {
      svg {
        color: #000000;
      }
    }

    @media screen and (max-width: 480px) {
      &.ant-btn {
        width: 24px;
        height: 24px;
        padding: 0;
      }
    }
  }

  p {
    font-weight: 500 !important;
    font-size: 22.0254px !important;
    color: #f4cbdf !important;
  }

  @media screen and (max-width: 480px) {
    p {
      font-weight: 500 !important;
      font-size: 16px !important;
      color: #f4cbdf !important;
    }

    span {
      font-size: 12px;
    }
  }
`;

const ModalContainer = styled(Modal)`
  .ant-modal-content {
    border-radius: 28px;
  }

  p {
    font-weight: 500;
    font-size: 24.6801px;
    line-height: 30px;
    color: #1e1e1e;
    margin-bottom: 8px;
    display: inline-block;
  }

  .description {
    font-weight: 500;
    font-size: 13.18px;
    line-height: 16px;
    color: #000000;
    opacity: 0.3;
    margin-bottom: 24px;
  }

  .calories {
    font-weight: 500;
    font-size: 15.7953px;
    line-height: 19px;
    color: #1e1e1e;
    opacity: 0.5;
    margin-bottom: 24px;
  }

  .ant-modal-footer {
    border: none;
    span {
      color: #000000;
      align-items: baseline;
    }
  }
`;

const TypeCategoryContainer = styled("div")`
  margin: 0 16px;
  margin-top: 10px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 10px;
  padding: 8px 0;
  background-color: #ffffff;

  span {
    color: #000000;
  }

  &.active {
    border: 1px solid #fceff5;
    box-shadow: 0px 7px 24px #dcdfe4;
  }
`;

const TypeImageContainer = styled("div")<{ color: string }>`
  background-color: ${(props) => (props.color ? props.color : "#f4cbdf")};
  border-radius: 15px;
  height: 51px;
  width: 53px;
  padding: 12px 16px;
`;

const StyledHeader = styled("h2")`
  position: relative;
  margin: 24px 0;

  &:after {
    position: absolute;
    content: "";
    height: 1px;
    background-color: #000000;
    color: #21467e;
    opacity: 0.1;
    width: 50%;
    margin-left: 15px;
    top: 60%;
  }
`;

const StyledLabel = styled("span")`
  white-space: nowrap;
  width: 78.78px;
  height: 20.33px;
  background: #d0eae3;
  border-radius: 5.08277px;
  font-weight: 500;
  font-size: 11.8598px;
  line-height: 14px;
  color: #599887;
  margin: 0 8px;
  padding: 2px 10px;

  @media screen and (max-width: 480px) {
    margin: 43px -20% 49px;
  }
`;

interface MenuInterface {
  menuList: Menu[];
  selectedType: string;
}
export const Home: FC<MenuInterface> = ({ menuList, selectedType }) => {
  const [percent, setPercent] = useState(0);
  const [activeCard, setActiveCard] = useState("");

  const handleClose = () => {
    setActiveCard("");
  };
  const handleShow = (id: string) => {
    setActiveCard(id);
  };

  const increaseQuantity = (menuItem: Menu) => {
    let newPercent = percent + 1;
    let quantity = menuItem.quantity + 1;
    menuItem.quantity = quantity;
    setPercent(newPercent);
  };

  const decreaseQuantity = (menuItem: Menu) => {
    let newPercent = percent - 1;
    let quantity = menuItem.quantity - 1;
    menuItem.quantity = quantity;

    if (newPercent < 0) {
      newPercent = 0;
    }
    if (quantity < 0) {
      menuItem.quantity = 0;
    }

    setPercent(newPercent);
  };

  const getTotalCount = (categoryName: string): number => {
    if (categoryName === "Breakfast") {
      return menuList.filter((item: Menu) => item.type === "breakfast").length;
    } else if (categoryName === "Sushi") {
      return menuList.filter((item: Menu) => item.type === "sushi").length;
    } else if (categoryName === "Drinks") {
      return menuList.filter((item: Menu) => item.type === "drink").length;
    } else if (categoryName === "Soups") {
      return menuList.filter((item: Menu) => item.type === "soup").length;
    } else {
      return 0;
    }
  };

  return (
    <>
      <div className="row" style={{ marginTop: "64px", padding: "0 10%" }}>
        {foodCategory.map((category, index) => {
          return (
            <TypeCategoryContainer
              key={index}
              className={`col-lg-2 col-md-3 col-sm-5 ${
                selectedType === category.key ? "active" : ""
              }`}
            >
              <TypeImageContainer color={category.color}>
                <img
                  src={category.icon}
                  height={24}
                  width={24}
                  alt={category.name}
                />
              </TypeImageContainer>
              <span>{category.name}</span>
              <span>{getTotalCount(category.name)}</span>
            </TypeCategoryContainer>
          );
        })}
        <TypeCategoryContainer
          key="order"
          className="col-lg-2 col-md-3 col-sm-5"
        >
          <TypeImageContainer color={"#D0EAE3"}>
            <img src={OrderIcon} height={24} width={24} alt="order-img" />
          </TypeImageContainer>
          <span>Orders</span>
          <span>{percent}</span>
        </TypeCategoryContainer>
      </div>
      <div className="row" style={{ padding: "0 10%" }}>
        <StyledHeader>{selectedType}</StyledHeader>
        {menuList &&
          menuList.map((menuItem: Menu) => {
            return (
              <>
                <Container
                  className="col-lg-4 col-sm-12 col-md-10"
                  key={menuItem._id}
                >
                  <ImageContainer>
                    <img
                      src={menuItem.images[1]}
                      height={139}
                      width={139}
                      alt={menuItem.menuname}
                    />
                    {(menuList[0]._id === menuItem._id || menuList[1]._id === menuItem._id || menuList[2]._id === menuItem._id )&& (
                        <StyledLabel style={{ margin: "63px -20%", marginBottom: "49px" }}>Best sale</StyledLabel>
                    )}
                    
                  </ImageContainer>
                  <CategoryContainer>
                    <div onClick={() => handleShow(menuItem._id)}>
                      <span>{menuItem.menuname}</span>
                      <p>200 Cal</p>
                    </div>
                    <CounterPriceContainer>
                      <p>80 SAR</p>
                      <Button.Group>
                        <Button
                          disabled={menuItem.quantity === 0}
                          onClick={() => decreaseQuantity(menuItem)}
                          icon={<MinusOutlined />}
                        />
                        <span>{menuItem.quantity}</span>
                        <Button
                          onClick={() => increaseQuantity(menuItem)}
                          icon={<PlusOutlined />}
                        />
                      </Button.Group>
                    </CounterPriceContainer>
                  </CategoryContainer>
                  <ModalContainer
                    visible={activeCard === menuItem._id}
                    footer={
                      <CounterPriceContainer className="modal-counter">
                        <p>80 SAR</p>
                        <Button.Group>
                          <Button
                            onClick={() => decreaseQuantity(menuItem)}
                            icon={<MinusOutlined />}
                          />
                          <span>{menuItem.quantity}</span>
                          <Button
                            onClick={() => increaseQuantity(menuItem)}
                            icon={<PlusOutlined />}
                          />
                        </Button.Group>
                      </CounterPriceContainer>
                    }
                    closeIcon={
                      <CloseCircleFilled
                        onClick={handleClose}
                        style={{
                          color: "rgb(117, 117, 117, 0.5)",
                          fontSize: "25px",
                        }}
                      />
                    }
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <p>{menuItem.menuname}</p>
                      {(menuList[0]._id === menuItem._id || menuList[1]._id === menuItem._id || menuList[2]._id === menuItem._id )&& (
                      <StyledLabel>Best sale</StyledLabel>
                      )}
                    </div>
                    <p className="calories">200 Cal</p>
                    <p className="description">{menuItem.description}</p>
                    <Carousel>
                      {menuItem.images.map((image: string) => {
                        return (
                          <div>
                            <img
                              src={image}
                              width={"513px"}
                              height={"310px"}
                              alt={menuItem.menuname}
                            />
                          </div>
                        );
                      })}
                    </Carousel>
                  </ModalContainer>
                </Container>
              </>
            );
          })}
      </div>
    </>
  );
};

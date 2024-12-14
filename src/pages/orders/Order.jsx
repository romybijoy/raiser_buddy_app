import { Box, Grid } from "@mui/material";
import React, { useEffect, useSyncExternalStore } from "react";
import OrderCard from "./OrderCard";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistory } from "../../redux/slices/OrderSlice";
import { breakpoints, defaultTheme } from "../../styles/themes/default";

import { Container } from "../../styles/styles";
import Breadcrumb from "../../components/common/Breadcrumb";
import { UserContent, UserDashboardWrapper } from "../../styles/user";
import UserMenu from "../../components/user/UserMenu";
import styled from "styled-components";

const OrderListScreenWrapper = styled.div`
  .order-tabs-contents {
    margin-top: 40px;
  }
  .order-tabs-head {
    min-width: 170px;
    padding: 12px 0;
    border-bottom: 3px solid ${defaultTheme.color_whitesmoke};

    &.order-tabs-head-active {
      border-bottom-color: ${defaultTheme.color_outerspace};
    }

    @media (max-width: ${breakpoints.lg}) {
      min-width: 120px;
    }

    @media (max-width: ${breakpoints.xs}) {
      min-width: 80px;
    }
  }
`;

const orderStatus = [
  { label: "On The Way", value: "onTheWay" },
  { label: "Delivered", value: "delevered" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Returned", vlue: "returned" },
];

const breadcrumbItems = [
  { label: "Home", link: "/" },
  { label: "Orders", link: "/account/order" },
];
const Order = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrderHistory());
  }, []);
  return (
    <OrderListScreenWrapper className="page-py-spacing">
      <Container>
        <Breadcrumb items={breadcrumbItems} />
        <UserDashboardWrapper>
          <UserMenu />
          <UserContent>
            <Box className="px-10">
              <Grid
                container
                spacing={0}
                sx={{ justifyContent: "space-between" }}
              >
                <Grid item xs={2.5} className="">
                  <div className="h-auto shadow-lg bg-white border p-5 sticky top-5">
                    <h1 className="font-bold text-lg">Filters</h1>
                    <div className="space-y-4 mt-10">
                      <h1 className="font-semibold">ORDER STATUS</h1>
                      {orderStatus.map((option, optionIdx) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            //   id={`filter-${section.id}-${optionIdx}`}
                            //   name={`${section.id}[]`}
                            defaultValue={option.value}
                            type="checkbox"
                            defaultChecked={option.checked}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            //   htmlFor={`filter-${section.id}-${optionIdx}`}
                            className="ml-3 text-sm text-gray-600"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </Grid>
                <Grid item xs={9}>
                  <Box className="space-y-5 ">
                    {orders?.length > 0 &&
                      orders.flatMap((order) =>
                        order?.orderItems?.map((item, i) => (
                          <OrderCard item={item} order={order} key={i} />
                        ))
                      )}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </UserContent>
        </UserDashboardWrapper>
      </Container>
    </OrderListScreenWrapper>
  );
};

export default Order;

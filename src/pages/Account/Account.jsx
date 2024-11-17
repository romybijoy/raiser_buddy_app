import styled from "styled-components";
import { Container } from "../../styles/styles";
import Breadcrumb from "../../components/common/Breadcrumb";
import { UserContent, UserDashboardWrapper } from "../../styles/user";
import UserMenu from "../../components/user/UserMenu";
import Title from "../../components/common/Title";
import { FormElement, Input } from "../../styles/form";
import { BaseLinkGreen } from "../../styles/button";
import { Link } from "react-router-dom";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import { useSelector } from "react-redux";
import AccountAddressCard from "../../components/address/AccountAdressCard";

const AccountScreenWrapper = styled.main`
  .address-list {
    margin-top: 20px;
    grid-template-columns: repeat(2, 1fr);
    gap: 25px;

    @media (max-width: ${breakpoints.lg}) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  .address-item {
    border-radius: 12px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 25px;
    row-gap: 8px;
  }

  .address-tags {
    gap: 12px;

    li {
      height: 28px;
      border-radius: 8px;
      padding: 2px 12px;
      background-color: ${defaultTheme.color_whitesmoke};
    }
  }

  .address-btns {
    margin-top: 12px;
    .btn-separator {
      width: 1px;
      border-radius: 50px;
      background: ${defaultTheme.color_platinum};
      margin: 0 10px;
    }
  }

  .wallet {
    border: 1px solid #ddd;
    padding: 20px;
    border-radius: 10px;
    max-width: 300px;
    margin: auto;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .balance {
    font-size: 2em;
    color: #333;
    margin-top: 10px;
  }
`;

const breadcrumbItems = [
  {
    label: "Home",
    link: "/home",
  },
  { label: "Account", link: "/account" },
];

const Account = () => {
  const { currentUser } = useSelector((state) => state.app);

  return (
    <AccountScreenWrapper className="page-py-spacing">
      <Container>
        <Breadcrumb items={breadcrumbItems} />
        <UserDashboardWrapper>
          <UserMenu />
          <UserContent>
            <Title titleText={"My Account"} />

            <div className="wallet ">
              <h2>Wallet Balance</h2>
              <div className="balance">
                <span>
                  ₹
                  {currentUser && currentUser?.walletBalance === null
                    ? 0
                    : currentUser?.walletBalance}
                </span>
              </div>
            </div>

            <div className="m-2 mt-4">
              <h3 className="title-lg">Contact Details</h3>
            </div>
            <form>
              <div className="form-wrapper">
                <FormElement className="form-elem">
                  <label
                    htmlFor=""
                    className="form-label font-semibold text-base"
                  >
                    Your Name
                  </label>
                  <div className="form-input-wrapper flex items-center">
                    <Input
                      type="text"
                      className="form-elem-control text-outerspace font-semibold"
                      value={currentUser && currentUser?.name}
                      readOnly
                    />
                    {/* <button type="button" className="form-control-change-btn">
                      Change
                    </button> */}
                  </div>
                </FormElement>
                <FormElement className="form-elem">
                  <label
                    htmlFor=""
                    className="form-label font-semibold text-base"
                  >
                    Email Address
                  </label>
                  <div className="form-input-wrapper flex items-center">
                    <Input
                      type="email"
                      className="form-elem-control text-outerspace font-semibold"
                      value={currentUser && currentUser?.email}
                      readOnly
                    />
                    {/* <button type="button" className="form-control-change-btn">
                      Change
                    </button> */}
                  </div>
                </FormElement>
                <FormElement className="form-elem">
                  <label
                    htmlFor=""
                    className="form-label font-semibold text-base"
                  >
                    Phone Number
                  </label>
                  <div className="form-input-wrapper flex items-center">
                    <Input
                      type="text"
                      className="form-elem-control text-outerspace font-semibold"
                      value={currentUser && currentUser?.mobile_number}
                      readOnly
                    />
                    {/* <button type="button" className="form-control-change-btn">
                      Change
                    </button> */}
                  </div>
                </FormElement>
                <FormElement className="form-elem">
                  <label
                    htmlFor=""
                    className="form-label font-semibold text-base"
                  >
                    Password
                  </label>
                  <div className="form-input-wrapper flex items-center">
                    <Input
                      type="password"
                      className="form-elem-control text-outerspace font-semibold"
                      value="Pass Key"
                      readOnly
                    />
                    {/* <button type="button" className="form-control-change-btn">
                      Change
                    </button> */}
                  </div>
                </FormElement>
              </div>
            </form>
            <div>
              <h3 className="font-weight-bold">My Contact Addresss</h3>

              <div className="m-2">
                <BaseLinkGreen to="/account/add">Add Address</BaseLinkGreen>
              </div>
              <div className="row">
                {currentUser &&
                  currentUser?.addresses.length !== 0 &&
                  currentUser?.addresses.map((item, key) => (
                    <div className="col-md-4 p-3" key={key}>
                      <div className="p-3" key={key}>
                        <AccountAddressCard address={item} />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </UserContent>
        </UserDashboardWrapper>
      </Container>
    </AccountScreenWrapper>
  );
};

export default Account;

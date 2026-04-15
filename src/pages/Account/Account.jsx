import styled from "styled-components";
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

const Account = () => {
  const { currentUser } = useSelector((state) => state.app);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">My Account</h2>

      {/* WALLET */}
      <div className="border rounded-lg p-5 w-64 shadow-sm">
        <h3 className="font-medium">Wallet Balance</h3>
        <p className="text-2xl font-semibold mt-2">
          ₹{currentUser?.walletBalance ?? 0}
        </p>
      </div>

      {/* CONTACT DETAILS */}
      <div>
        <h3 className="font-semibold mb-4">Contact Details</h3>

        <div className="space-y-4">
          <input className="input" value={currentUser?.name || ""} readOnly />
          <input className="input" value={currentUser?.email || ""} readOnly />
          <input
            className="input"
            value={currentUser?.mobile_number || ""}
            readOnly
          />
          <input className="input" value="********" readOnly />
        </div>
      </div>

      {/* ADDRESS */}
      <div>
        <h3 className="font-semibold mb-2">My Contact Address</h3>

        <div className="mb-3">
          <Link to="/account/add" className="text-blue-600">
            Add Address
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentUser?.addresses?.map((item, key) => (
            <AccountAddressCard key={key} address={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Account;

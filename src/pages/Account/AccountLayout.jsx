import { Outlet, useLocation } from "react-router-dom";
import Breadcrumb from "../../components/common/Breadcrumb";
import UserMenu from "../../components/user/UserMenu";

const AccountLayout = () => {
  const location = useLocation();

  const getBreadcrumb = () => {
    const path = location.pathname;

    if (path.includes("/account/order"))
      return [
        { label: "Home", link: "/" },
        { label: "Account", link: "/account" },
        { label: "Orders" },
      ];

    if (path.includes("/account/wishlist"))
      return [
        { label: "Home", link: "/" },
        { label: "Account", link: "/account" },
        { label: "Wishlist" },
      ];

    if (path.includes("/account/coupons"))
      return [
        { label: "Home", link: "/" },
        { label: "Account", link: "/account" },
        { label: "Coupons" },
      ];

    if (path.includes("/account/add"))
      return [
        { label: "Home", link: "/" },
        { label: "Account", link: "/account" },
        { label: "Address" },
      ];

    return [
      { label: "Home", link: "/" },
      { label: "Account", link: "/account" },
    ];
  };

  return (
    <>
      {/* 🔹 BREADCRUMB */}
      <div className="sticky top-[70px] z-40 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <Breadcrumb items={getBreadcrumb()} />
        </div>
      </div>

      {/* 🔹 MAIN */}
      <div className="bg-gray-50 px-4 lg:px-10 py-8 min-h-[calc(100vh+200px)]">
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 items-start">
          {/* ✅ SIDEBAR */}
          <div className="col-span-12 lg:col-span-3">
            <div className="sticky top-[140px] h-fit">
              <UserMenu />
            </div>
          </div>

          {/* ✅ CONTENT */}
          <div className="col-span-12 lg:col-span-9">
            <div className="min-h-[60vh]">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountLayout;

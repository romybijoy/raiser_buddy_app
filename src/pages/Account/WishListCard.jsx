import React from "react";
import styled from "styled-components";
import "../../styles/coupon.css";

import { BaseLinkBlack } from "../../styles/button";
import { breakpoints, defaultTheme } from "../../styles/themes/default";

import { useDispatch, useSelector } from "react-redux";
import { deleteWishlist } from "../../redux/slices/WishlistSlice";

const WishItemWrapper = styled.div`
  gap: 30px;
  max-width: 900px;
  position: relative;

  @media (max-width: ${breakpoints.xl}) {
    column-gap: 20px;
  }

  @media (max-width: ${breakpoints.lg}) {
    column-gap: 16px;
  }

  @media (max-width: ${breakpoints.xs}) {
    flex-direction: column;
    gap: 12px;
  }

  .wish-item-img {
    column-gap: 30px;

    @media (max-width: ${breakpoints.xl}) {
      column-gap: 20px;
    }

    @media (max-width: ${breakpoints.lg}) {
      column-gap: 16px;
    }

    &-wrapper {
      min-width: 110px;
      width: 110px;
      border-radius: 4px;
      overflow: hidden;

      @media (max-width: ${breakpoints.xs}) {
        min-width: 100%;
        height: 180px;

        img {
          object-position: top;
        }
      }
    }

    .wish-remove-btn {
      // width: 5px;
      // min-width: 10px;
      // height: 20px;
      border: 1px solid ${defaultTheme.color_outerspace};
      border-radius: 50%;
      background-color: black;
      font-size: 10px;
      margin-top: auto;
      margin-bottom: auto;

      &:hover {
        background-color: ${defaultTheme.color_gray};
        color: ${defaultTheme.color_white};
        border-color: ${defaultTheme.color_gray};
      }

      @media (max-width: ${breakpoints.sm}) {
        position: absolute;
        right: -10px;
        top: -10px;
      }

      @media (max-width: ${breakpoints.xs}) {
        right: 6px;
        top: 6px;
        background-color: ${defaultTheme.color_jet};
        color: ${defaultTheme.color_white};
      }
    }
  }

  .wish-item-info {
    flex: 1;

    @media (max-width: ${breakpoints.sm}) {
      flex-direction: column;
      row-gap: 8px;
    }

    &-l {
      row-gap: 4px;

      ul {
        row-gap: 4px;
        li {
          span {
            &:last-child {
              margin-left: 4px;
            }
          }
        }
      }
    }

    &-r {
      column-gap: 40px;

      @media (max-width: ${breakpoints.xl}) {
        column-gap: 20px;
      }

      @media (max-width: ${breakpoints.lg}) {
        flex-direction: column;
        align-items: flex-end;
        row-gap: 8px;
      }

      @media (max-width: ${breakpoints.sm}) {
        flex-direction: row;
        align-items: center;
      }

      .wish-item-price {
        @media (max-width: ${breakpoints.sm}) {
          order: 2;
        }
      }

      .wish-cart-btn {
        @media (max-width: ${breakpoints.sm}) {
          order: 1;
        }
      }
    }
  }
`;

const WishlistCard = ({ wishlist }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    const data = { productId: wishlist.productId };
    dispatch(deleteWishlist(data));
  };

  return (
    <WishItemWrapper className="wish-item flex" key={wishlist.productId}>
      <div className="wish-item-img flex items-stretch">
        <button
          type="button"
          className="wish-remove-btn"
          onClick={handleDelete}
        >
          <i class="fa fa-times" aria-hidden="true"></i>
        </button>
        <div className="wish-item-img-wrapper">
          <img src={wishlist.images[0]} className="object-fit-cover" alt="" />
        </div>
      </div>
      <div className="wish-item-info flex justify-between">
        <div className="wish-item-info-l flex flex-col">
          <p className="wish-item-title text-xl font-bold text-outerspace">
            {wishlist.name}
          </p>
          <ul className="flex flex-col">
            <li>
              <span className="text-lg font-bold">Category:</span>
              <span className="text-lg text-gray font-medium capitalize">
                {wishlist.category.name}
              </span>
            </li>
            <li>
              <span className="text-lg font-bold">Quantity:</span>
              <span className="text-lg text-gray font-medium capitalize">
                {wishlist.quantity}
              </span>
            </li>
          </ul>
        </div>
        <div className="wish-item-info-r flex items-center">
          <span className="wish-item-price text-xl text-gray font-bold">
            ₹{wishlist.price}
          </span>
          <BaseLinkBlack to="/cart" className="wish-cart-btn">
            Add to cart
          </BaseLinkBlack>
        </div>
      </div>
    </WishItemWrapper>
  );
};
export default WishlistCard;

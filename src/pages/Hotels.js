import React, { useState, useEffect } from "react";
import "../styles/HotelStyle.css";
import User from "../images/kishan.jpg";
import data from "../data/data.json";
import RestaurantCard from "../components/RestaurantCard";
import Orders from "./Orders";

class Hotels extends React.Component {
  constructor() {
    super();
    this.state = {
      list: data,
    };
  }

  sortMenu = (e) => {
    if (e.target.value === "rating") {
      this.setState({
        list: data.sort(function (a, b) {
          return b.rating - a.rating;
        }),
      });
    } else if (e.target.value === "price") {
      this.setState({
        list: data.sort(function (a, b) {
          return b.price - a.price;
        }),
      });
    } else if (e.target.value === "name") {
      function compareName(a, b) {
        // case-insensitive comparison
        a = a.toLowerCase();
        b = b.toLowerCase();

        return a < b ? -1 : a > b ? 1 : 0;
      }
      this.setState({
        list: data.sort(function (a, b) {
          return compareName(a.name, b.name);
        }),
      });
    } else if (e.target.value === "veg") {
      this.setState({
        list: data.filter(function (a, b) {
          return a.isVeg == true ? a : b;
        }),
      });
    } else if (e.target.value === "non-veg") {
      this.setState({
        list: data.filter(function (a, b) {
          return a.isVeg == false ? a.isVeg : b;
        }),
      });
    }
  };

  render() {
    return (
      <div>
        <div className="nav">
          <div id="logo">
            <h2>FOODIE</h2>
          </div>

          <div id="user">
            <div className="name">Hello, Kishan</div>
            <div className="profile">
              <img src={User} alt="profile" id="img" height="45" width="45" />
            </div>
          </div>
        </div>

        <div className="maincart">
          <div id="menubar">
            <h2 id="menu-title">Choose Your Favourite One</h2>
            <p id="sort">
              {" "}
              Sort by &nbsp; &nbsp;
              <select
                id="sort-metrics"
                defaultValue={"none"}
                onChange={(e) => this.sortMenu(e)}
              >
                <option value="none" disabled hidden>
                  None
                </option>
                <option className="sort-option" value="name">
                  name{" "}
                </option>
                <option className="sort-option" value="veg">
                  vegetarian
                </option>
                <option className="sort-option" value="non-veg">
                  non-vegetarian{" "}
                </option>
                <option className="sort-option" value="price">
                  Price{" "}
                </option>
                <option className="sort-option" value="rating">
                  Rating{" "}
                </option>
              </select>
            </p>
          </div>
          {this.state.list.map((x, key) => (
            <RestaurantCard
              key={key}
              thumbnail_image={x.img_url}
              name={x.name}
              rating={x.rating}
              price={x.price}
              description={x.description}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Hotels;

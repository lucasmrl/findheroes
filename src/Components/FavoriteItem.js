import React from "react";
import "./../styles.css";

const FavoriteItem = props => {
  return (
    <div className="hide">
      <p>{props.name}</p>
      <hr />
    </div>
  );
};

export default FavoriteItem;

import React from "react";
import StarRating from "react-star-ratings";

const Star = ({ starClick, numberOfStars }) => (
  <>
    <StarRating
      changeRating={() => starClick(numberOfStars)}
      numberOfStars={numberOfStars}
      starDimension="23px"
      starSpacing="1px"
      starHoverColor="red"
      starEmptyColor="red"
    />
    <br/>
  </>
);

export default Star;

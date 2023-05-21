import React from "react";
import StarActiveIcon from "../Images/icon/star-active.svg";
import StarInactiveIcon from "../Images/icon/star-inactive.svg";

const FiveStarRating = ({ ratingNumber = 3 }) => {
  let starsActive = [];
  let starsInactive = [];
  for (let i = 0; i < ratingNumber; i++) {
    starsActive.push(<img src={StarActiveIcon} alt="star icon" key={i} />);
  }

  for (let j = 0; j < 5 - ratingNumber; j++) {
    starsInactive.push(<img src={StarInactiveIcon} alt="star icon" key={j} />);
  }
  return (
    <div className="flex items-center">
      {starsActive}
      {starsInactive}
    </div>
  );
};

export default FiveStarRating;

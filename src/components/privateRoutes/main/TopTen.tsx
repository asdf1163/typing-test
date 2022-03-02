import React from "react";
import Avatar from '../media/images/avatar.webp'

const TopTen = () => {
  const data = [
    {
      nickname: "Jan Kowlaski 1",
      avatar: null, 
      record: 130,
    },
    {
      nickname: "Jan Kowlaski 2",
      avatar: null,
      record: 130,
    },
    {
      nickname: "Jan Kowlaski 3",
      avatar: null,
      record: 130,
    },
  ];

  return (
    <div className="tile__topten">
      <p className="tile__title">Top 10 of a month:</p>
      <div className="places">
        {data.map((user) => (
          <div className="user" key={user.nickname}>
            <div className="user__avatar"><img src={Avatar} className="user__avatar--img" alt="profile_picture"/>{user.avatar}</div>
            <div className="user__name">{user.nickname}</div>
            <div className="user__record">
              <span className="user__record--value">{user.record}</span>
              <span className="user__record--unit">WPM</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TopTen;

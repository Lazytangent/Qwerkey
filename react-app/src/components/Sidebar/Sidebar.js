import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getPopularCommunities } from "../../store/sidebar";

const Sidebar = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPopularCommunities());
  })

  return (
    <div>
      <h3>Placeholder for sidebar</h3>
    </div>
  );
};

export default Sidebar;

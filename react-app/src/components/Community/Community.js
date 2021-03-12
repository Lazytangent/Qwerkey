import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import EditButton from "../parts/EditButton";
import DeleteButton from "../parts/DeleteButton";
import EditCommunityModal from "../EditCommunityForm";
import DeleteConfirmationModal from "../parts/DeleteConfirmation";

const Community = ({ community }) => {
  const user = useSelector((state) => state.session.user);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const editBtnHandler = () => {
    setShowEditModal(true);
  };

  const deleteBtnHandler = () => {
    setShowDeleteModal(true);
  };

  return (
    <div className="p-2 mb-2 rounded shadow-sm hover:shadow-lg dark:bg-gray-800 dark:hover:shadow-light-lg dark:shadow-light transform duration-100 ease-in-out">
      <h2 className="p-2">
        <NavLink to={`/q/${community.name}`}>
          <span className="hover:underline">{community.name}</span>
        </NavLink>
      </h2>
      <p className="p-2">{community.description}</p>
    </div>
  );
};

export default Community;

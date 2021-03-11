import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import EditButton from "../parts/EditButton";
import DeleteButton from "../parts/DeleteButton";
import EditCommunityModal from "../EditCommunityForm";
import DeleteConfirmationModal from "../parts/DeleteConfirmation";

const Community = ({ community }) => {
  const user = useSelector(state => state.session.user);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const editBtnHandler = () => {
    setShowEditModal(true);
  };

  const deleteBtnHandler = () => {
    setShowDeleteModal(true);
  };

  return (
    <>
      <h3>Placeholder for Community</h3>
    </>
  );
};

export default Community;

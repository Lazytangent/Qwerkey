import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import EditButton from "../parts/EditButton";
import DeleteButton from "../parts/DeleteButton";
import DeleteConfirmationModal from "../parts/DeleteConfirmation";
import EditMeetupModal from "../EditMeetupForm";
import DivCard from "../parts/DivCard";
import UserName from "../parts/UserName";
import options from "../../utils/localeDateString";

const Meetup = ({ meetup }) => {
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
    <DivCard>
      <h3 className="p-2">
        <NavLink to={`/meetups/${meetup.id}`}>
          <span className="hover:underline">
            {meetup.name}
          </span>
        </NavLink>
      </h3>
      <p className="p-2">{meetup.description}</p>
      <hr />
      <p className="p-2">
        Organized by <UserName link={`/users/${meetup.user.id}`} username={meetup.user.username} />
      </p>
      <p className="p-2">
        Scheduled for {new Date(meetup.date).toLocaleString(...options())} in {meetup.city}, {meetup.state}
      </p>
      {user && meetup.user.id === user.id && (
        <div className="p-2 flex justify-end">
          <EditButton label="Edit Meetup" onClick={editBtnHandler}>
            <EditMeetupModal
              showEditModal={showEditModal}
              setShowEditModal={setShowEditModal}
              meetupId={meetup.id}
            />
          </EditButton>
          <DeleteButton label="Delete Meetup" onClick={deleteBtnHandler}>
            <DeleteConfirmationModal
              showDeleteModal={showDeleteModal}
              setShowDeleteModal={setShowDeleteModal}
              id={meetup.id}
              type="meetup"
            />
          </DeleteButton>
        </div>
      )}
    </DivCard>
  );
};

export default Meetup;

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getCommunities } from "../../store/communities";
import Community from "../Community";

const CommunitiesContainer = () => {
  const dispatch = useDispatch();
  const communities = useSelector(state => state.communities);

  const [currentMax, setCurrentMax] = useState(20);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getCommunities());
  }, [dispatch]);

  useEffect(() => {
    if (communities) {
      setIsLoaded(true);
    }
  }, [communities]);

  useEffect(() => {
    const scrollListener = () => {
      const scroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (scroll / height);
      if (scrolled > 0.9) {
        setCurrentMax(prev => prev + 20);
      }
    }

    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  }, []);

  if (!isLoaded) {
    return null;
  }

  return (
    <>
      <h3>Placeholder for CommunitiesContainer</h3>
      {Object.values(communities).slice(0, currentMax).map(community => (
        <Community community={community} key={community.id} />
      ))}
    </>
  );
};

export default CommunitiesContainer;

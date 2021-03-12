import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { getCommunities } from "../../store/communities";
import Community from "../Community";

const CommunitiesContainer = () => {
  const dispatch = useDispatch();
  const communities = useSelector(state => state.communities);

  const [currentCommunities, setCurrentCommunities] = useState([]);
  const [currentMax, setCurrentMax] = useState(20);
  const [max, setMax] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getCommunities());
  }, [dispatch]);

  useEffect(() => {
    if (communities) {
      setIsLoaded(true);
      setMax(Object.values(communities).length);
    }
  }, [communities]);

  useEffect(() => {
    if (currentMax < max) {
      setCurrentCommunities(Object.values(communities).slice(0, currentMax));
    } else if (currentMax % max < 20) {
      setCurrentCommunities(Object.values(communities));
    } else {
      setCurrentCommunities(prev => prev.concat(Object.values(communities).slice(0, currentMax % max)));
    }
  }, [currentMax, max, communities]);

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
      {currentCommunities.map(community => (
        <Community community={community} key={uuidv4()} />
      ))}
    </>
  );
};

export default CommunitiesContainer;

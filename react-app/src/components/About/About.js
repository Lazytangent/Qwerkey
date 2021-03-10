import { GitHub, Code, LinkedIn } from "@material-ui/icons";

const About = () => {
  return (
    <div className="p-2 mt-2 border border-gray-600 rounded">
      <div className="text-center">
        <h5>Created by Peter Mai &copy; 2021</h5>
      </div>
      <div className="flex justify-around p-2">
        <a href="https://github.com/Lazytangent"><GitHub /></a>
        <a href="https://github.com/Lazytangent/Qwerkey"><Code /></a>
        <a href="https://www.linkedin.com/in/petertnmai/"><LinkedIn /></a>
      </div>
    </div>
  );
};

export default About;

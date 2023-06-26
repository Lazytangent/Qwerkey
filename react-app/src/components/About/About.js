import { GitHub, Code, LinkedIn, FolderShared } from '@mui/icons-material';

import logo from '../../images/logo.png';

const About = () => {
  return (
    <div className="p-2 mt-2 border border-gray-600 rounded">
      <div className="text-center">
        <h5>Created by Peter Mai &copy; 2021</h5>
      </div>
      <div className="flex justify-around p-2">
        <a className="hover:text-green" href="https://github.com/Lazytangent">
          <GitHub />
        </a>
        <a
          className="hover:text-green"
          href="https://github.com/Lazytangent/Qwerkey"
        >
          <Code />
        </a>
        <a
          className="hover:text-green"
          href="https://www.linkedin.com/in/petertnmai/"
        >
          <LinkedIn />
        </a>
        <a className="hover:text-green" href="https://lazytangent.github.io">
          <FolderShared />
        </a>
      </div>
      <div>
        <img src={logo} alt="Logo" />
      </div>
    </div>
  );
};

export default About;

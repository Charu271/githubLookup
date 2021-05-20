import React from "react";
import "./Repo.scss";
import fork from "../../../Assets/fork.svg";
import StarIcon from "@material-ui/icons/Star";
import { colors } from "../../../Assets/colors";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { useSpring, animated, config } from 'react-spring';


   

    const calc = (x, y) => [-(y - window.innerHeight / 2) / 40, (x - window.innerWidth / 2) / 40, 1]
    const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`
    const Repo = (props) => {

      const [p, set] = useSpring(() => ({ xys: [0, 0, 1] , config: config.default}))
    const repo = props.repo;
    
    return (
      <animated.div className="card" 
        onMouseMove={({clientX: x, clientY: y}) => (set({xys: calc(x, y)}))}
            onMouseLeave={() => set({xys:[0,0,1]})}
            style={{
                transform: p.xys.interpolate(trans)
            }}
      >
        <div className="repoName">{repo.name}</div>
        {/* <div className="description">{repo.description}</div> */}
        <div className="content row ">
          <div className="language col-12">
            <FiberManualRecordIcon
              style={{
                color: `${colors[repo.language]}`,
              }}
            />
            &nbsp;
            {repo.language}
          </div>
          <div className="forks col-4">
            <div className="internal">
              <div>
                <img src={fork} />
              </div>
              <div>&nbsp;&nbsp;{repo.forks}</div>
            </div>
          </div>
          <div className="stars col-4">
            <div className="internal">
              <div>
                <StarIcon />
              </div>
              <div>&nbsp;&nbsp;{repo.stargazers_count}</div>
            </div>
          </div>
          <div className="size col-4">
            {repo.size > 1000
              ? `${Math.round(repo.size / 1000)} KB`
              : `${repo.size} B`}
          </div>
        </div>
      </animated.div>
    );
}
  

export default Repo;
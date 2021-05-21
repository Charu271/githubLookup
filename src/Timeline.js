import "./Timeline.css";
import { ReactComponent as WorkIcon } from "./work.svg";
import { ReactComponent as SchoolIcon } from "./school.svg";
import Typical from 'react-typical'
import timelineElements from "./timelineElements";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

function App() {
  let workIconStyles = { background: "blue" };
  let schoolIconStyles = { background: "#4f7af1" };
  
  return (
    
    <div >
      
      <h1 className="title">TIMELINE</h1>
      <h3 className="second-heading">Contribution Activity - 
      <Typical
        steps={[' Commits',1000,' Issues',1000,' Pull Requests',1000]}
        loop={Infinity}
        wrapper="b"
      />
      </h3>
      
      <VerticalTimeline>
      
        {timelineElements.map((element) => {
          let isWorkIcon = element.icon === "work";
          let showButton =
            element.buttonText !== undefined &&
            element.buttonText !== null &&
            element.buttonText !== "";
            
          return (
              <>
            <VerticalTimelineElement
              key={element.key}
              date={element.date}
              dateClassName="date"
              iconStyle={isWorkIcon ? workIconStyles : schoolIconStyles}
              icon={isWorkIcon ? <WorkIcon /> : <SchoolIcon />}
              contentArrowStyle={{ borderRight: '7px solid rgb(33, 150, 243) ' }}
              contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              
            >
              <h3 className="vertical-timeline-element-title">
                {element.title}
              </h3>
              <h5 className="vertical-timeline-element-subtitle">
                {element.location}
              </h5>
              <p id="description">{element.description}</p>
              {showButton && (
                <a
                  className={`button ${
                    isWorkIcon ? "workButton" : "schoolButton"
                  }`}
                  href="/"
                >
                  {element.buttonText}
                </a>
              )}
            </VerticalTimelineElement>
            </>
          );
        })}
      </VerticalTimeline>
    
    </div>

  );
}

export default App;




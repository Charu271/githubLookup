import { useState, useEffect } from "react";
import "./Timeline.css";
import { ReactComponent as WorkIcon } from "../../Assets/work.svg";
import Typical from "react-typical";
import Moment from "react-moment";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import axios from "axios";

function TimelineComponent() {
  let workIconStyles = { background: "blue" };
  const [activity, setactivity] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const res = await axios.get(
          `https://api.github.com/users/${user.login}/received_events?page=1`
        );
        setactivity(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="col-12">
        <h3 className="second-heading" style={{ marginTop: "20px" }}>
          Contribution Activity -
          <Typical
            steps={[" Commits", 1000, " Issues", 1000, " Pull Requests", 1000]}
            loop={Infinity}
            wrapper="b"
          />
        </h3>
      </div>
      <div className="col-12">
        <VerticalTimeline>
          {activity != null &&
            activity.map((element, i) => {
              let event;
              switch (element.type) {
                case "WatchEvent":
                  event = "starred";
                  break;
                case "ForkEvent":
                  event = "forked";
                  break;
                case "PublicEvent":
                  event = "made public";
                  break;
                case "CreateEvent":
                  event = "created a repository";
                  break;
                case "PullRequestEvent":
                  event = "opened a pull request in";
                  break;
                case "PushEvent":
                  event = "pushed a commit";
                  break;
                default:
                  event = "";
              }
              return (
                <VerticalTimelineElement
                  key={i}
                  iconStyle={workIconStyles}
                  icon={<WorkIcon />}
                  contentArrowStyle={{
                    borderRight: "7px solid rgb(33, 150, 243) ",
                  }}
                  contentStyle={{
                    background: " #728af4",
                    color: "#fff",
                  }}
                >
                  <div className="row secondary">
                    <div className="col-3">
                      <div>
                        <img
                          src={element.actor.avatar_url}
                          className="actorImage"
                          alt="UserImage"
                        />
                      </div>
                    </div>
                    <div className="col-9">
                      <div className="content">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`https://github.com/${element.actor.display_login}`}
                          className="actorName"
                        >
                          {element.actor.display_login}
                        </a>{" "}
                        <span className="event">
                          {event === "forked" ? " forked " : null}
                          {event === "forked" ? (
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href={element.payload.forkee.html_url}
                              className="actorlink"
                            >
                              {element.payload.forkee.full_name}
                            </a>
                          ) : (
                            ` ${event} `
                          )}
                          {event === "forked" ? " from " : null}
                        </span>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`https://github.com/${element.repo.name}`}
                          className="actorRepo"
                        >
                          {element.repo.name}
                        </a>
                      </div>
                    </div>
                  </div>
                  <p id="description">
                    <Moment fromNow>{element.created_at}</Moment>
                  </p>
                </VerticalTimelineElement>
              );
            })}
        </VerticalTimeline>
      </div>
    </div>
  );
}

export default TimelineComponent;

import { useState, useEffect } from "react";
import "./Timeline.css";
import { ReactComponent as WorkIcon } from "../../Assets/work.svg";
import Typical from "react-typical";
import Moment from "react-moment";
import Particles from "react-particles-js";
import { particles } from "../../Assets/particlesjs-config";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Timeline } from "@material-ui/lab";
import axios from "axios";

function TimelineComponent() {
  let workIconStyles = { background: "blue" };
  const [activity, setactivity] = useState(null);
  useEffect(async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(user);
      const res = await axios.get(
        `https://api.github.com/users/${user.login}/received_events?page=1`
      );
      setactivity(res.data);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div>
      {/* <Particles className="particles4" params={particles} />
      <div className="timelineComponent row"> */}
      {/* <div className="col-12">
        <h1 className="title">TIMELINE</h1>
      </div> */}
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
            activity.map((element) => {
              let showButton =
                element.buttonText !== undefined &&
                element.buttonText !== null &&
                element.buttonText !== "";
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
              console.log(event);
              return (
                <>
                  <VerticalTimelineElement
                    key={element.actor.id}
                    iconStyle={workIconStyles}
                    icon={<WorkIcon />}
                    contentArrowStyle={{
                      borderRight: "7px solid rgb(33, 150, 243) ",
                    }}
                    contentStyle={{
                      background: "#25bfb6",
                      color: "#fff",
                    }}
                  >
                    {/* <h3 className="vertical-timeline-element-title">
                  {element.actor.display_login}
                </h3> */}
                    <div className="row">
                      <div className="col-3">
                        <div>
                          <img
                            src={element.actor.avatar_url}
                            className="actorImage"
                          />
                        </div>
                      </div>
                      <div className="col-9">
                        <div>
                          <a
                            href={`https://github.com/${element.actor.display_login}`}
                            className="actorName"
                          >
                            {element.actor.display_login}
                          </a>{" "}
                          <span className="event">
                            {event == "forked" ? " forked " : null}
                            {event == "forked" ? (
                              <a
                                href={element.payload.forkee.html_url}
                                class="actorlink"
                              >
                                {element.payload.forkee.full_name}
                              </a>
                            ) : (
                              ` ${event} `
                            )}
                            {event == "forked" ? " from " : null}
                          </span>
                          <a
                            href={`https://github.com/${element.repo.name}`}
                            className="actorRepo"
                          >
                            {element.repo.name}
                          </a>
                        </div>
                      </div>
                    </div>
                    <h5
                      className="vertical-timeline-element-subtitle"
                      style={{ display: "flex" }}
                    ></h5>
                    <p id="description">
                      <Moment fromNow>{element.created_at}</Moment>
                    </p>
                  </VerticalTimelineElement>
                </>
              );
            })}
        </VerticalTimeline>
      </div>
    </div>
    // </div>
  );
}

export default TimelineComponent;

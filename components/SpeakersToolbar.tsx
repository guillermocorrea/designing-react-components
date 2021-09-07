import { useSpeakerFilterContext } from "../context/SpeakerFilterContext";
import { Theme, useThemeContext } from "../context/ThemeContext";

function SpeakersToolbar() {
  const { theme, setTheme } = useThemeContext();
  const {
    eventYear,
    setEventYear,
    setSearchQuery,
    EVENT_YEARS,
    showSessions,
    setShowSessions,
  } = useSpeakerFilterContext();

  return (
    <section className="toolbar dark-theme-header">
      <div className="container">
        <div className="justify-content-between">
          <ul className="toolrow d-flex flex-column flex-lg-row">
            <li className="d-flex flex-column flex-md-row">
              <b>Show Sessions&nbsp;&nbsp;</b>
              <label className="fav">
                <input
                  type="checkbox"
                  checked={showSessions}
                  onChange={() => setShowSessions((prev) => !prev)}
                />
                <span className="switch"></span>
              </label>
            </li>
            <li className="d-flex flex-column flex-md-row ml-sm-5 ml-0">
              <strong>Theme</strong>
              <label className="dropdown">
                <select
                  className="form-control theme"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value as Theme)}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </label>
            </li>
            <li>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  onChange={(event) => {
                    setSearchQuery(event.target.value);
                  }}
                />
                <div className="input-group-append">
                  <button className="btn btn-secondary" type="button">
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </li>
            <li className="d-flex flex-column flex-md-row">
              <strong>Year</strong>
              <label className="dropmenu">
                <select
                  className="form-control"
                  value={eventYear}
                  onChange={({ currentTarget }) => {
                    setEventYear(currentTarget.value);
                  }}
                >
                  {EVENT_YEARS.map(function (year) {
                    return (
                      <option value={year} key={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default SpeakersToolbar;

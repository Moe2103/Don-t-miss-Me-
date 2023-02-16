import { useState } from "react";
import moment from "moment";
import reactLogo from "./assets/react.svg";
import "./App.css";
import DropdownWithSearch from "./DropdownWithSearch";
import { stations } from "./stations";

function App() {
    const [count, setCount] = useState(0);
    const [departs, setDeparts] = useState(null);

    function handleSelect(event) {
        fetch(`/api/route?from=${event.target.value}`)
            .then((res) => res.json())
            .then((data) => {
                setDeparts(data.departures);
            });
    }

    function renderDate(date) {
        const dat = moment(date).diff(new Date(), "minutes");
        if (dat < 0) return null;
        return `in ${dat} mins`;
    }

    return (
        <div>
            <div>
                {" "}
                <img src="bvg.png" alt="BVG-Logo" />
            </div>
            <div className="dropdown-container">
                <DropdownWithSearch
                    onChange={handleSelect}
                    options={stations}
                />
            </div>
            {departs && (
                <div className="departures">
                    {departs.map((dep) => {
                        const next = renderDate(dep.plannedWhen);
                        if (!next) return null;
                        return (
                            <div className="departure">
                                <p>
                                    <span className="line-name">
                                        {dep.line.name}
                                    </span>{" "}
                                    {dep.line.mode} nach{" "}
                                    <span className="direction">
                                        {dep.direction}
                                    </span>
                                    <span className="planned-time">{next}</span>
                                </p>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default App;

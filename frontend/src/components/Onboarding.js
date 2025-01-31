import React, { useState } from "react";
import Joyride from "react-joyride";

const Onboarding = () => {
    const [tour, setTour] = useState([
        { target: "#dashboard", content: "Qui trovi il riepilogo dei tuoi dati" },
        { target: "#sector-select", content: "Seleziona il tuo settore di business" },
        { target: "#chart", content: "Visualizza i tuoi KPI" },
    ]);

    return <Joyride steps={tour} continuous showProgress showSkipButton />;
};

export default Onboarding;
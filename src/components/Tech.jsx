import React from "react";

import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import LogoShowcase from "./LogoShowcase";

const Tech = () => {
  return (
    <div className='flex flex-row flex-wrap justify-center gap-10'>

        <LogoShowcase speed={15}  />
        <LogoShowcase direction="right" speed={10} />
        <LogoShowcase direction="left" speed={20} />
      {technologies.map((technology) => (
        <div className='w-28 h-28' key={technology.name}>
          <BallCanvas icon={technology.icon} />
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "");

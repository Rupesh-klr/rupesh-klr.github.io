import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

// import { Section, SectionDivider, SectionTitle } from '../../styles/GlobalComponents';
import { Box, Boxes, BoxNum, BoxText ,Section, SectionDivider, SectionTitle } from './AcomplishmentsStyles';

const data = [
  { number: 20, text: 'Open Source Projects' },
  { number: 1000, text: 'Students' },
  { number: 1900, text: 'Github Followers' },
  { number: 5000, text: 'Github Stars' }
];

const Acomplishments = () => {
  // 1. Setup the Intersection Observer
  // triggerOnce: true ensures the animation happens only the first time you scroll to it.
  // threshold: 0.1 means the animation starts when 10% of the component is visible.
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1, 
  });

  return (
    // 2. Attach the 'ref' to the Section so we know when it's on screen
    <Section ref={ref}>
      <SectionTitle>Personal Achievements</SectionTitle>
      <Boxes>
        {data.map((card, index) => (
          <Box key={index}>
            <BoxNum>
              {/* 3. Render CountUp ONLY if 'inView' is true */}
              {inView ? (
                <CountUp 
                  start={0} 
                  end={card.number} 
                  duration={2.5} // Animation lasts 2.5 seconds
                  separator="," // Adds commas (e.g., 1,000)
                  suffix="+"    // Adds the + sign at the end
                />
              ) : (
                // Optional: Show 0 before the animation starts
                "0+" 
              )}
            </BoxNum>
            <BoxText>{card.text}</BoxText>
          </Box>
        ))}
      </Boxes>
      <SectionDivider />
    </Section>
  );
};

export default Acomplishments;
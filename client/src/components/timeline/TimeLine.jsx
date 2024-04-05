import * as React from 'react';

import Popover from '@mui/material/Popover';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';

const ColoredTimeline = (props) => {

  const {
    isPopoverOpen,
    anchorEl,
    handlePopoverClose,
  } = props;

  return (
    <div>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={isPopoverOpen}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus        
      >
        <Timeline
          sx={{
            minWidth: '500px'
          }}
        >
          <TimelineItem>
            <TimelineOppositeContent color="textSecondary">
              2022-02-01 09:30 am
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color='secondary'/>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>New</TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineOppositeContent color="textSecondary">
            2022-02-01 11:30 am
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary"/>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>In Progress</TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineOppositeContent color="textSecondary">
            2022-02-02 09:00 am
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="success"/>
            </TimelineSeparator>
            <TimelineContent>Completed</TimelineContent>
          </TimelineItem>

        </Timeline>
      </Popover>
    </div>
  );
}

export default ColoredTimeline;
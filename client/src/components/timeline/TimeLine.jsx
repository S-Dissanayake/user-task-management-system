import * as React from 'react';

import Popover from '@mui/material/Popover';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

const ColoredTimeline = (props) => {

  const {
    isPopoverOpen,
    anchorEl,
    handlePopoverClose,
    statusHistory,
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
    
          { statusHistory["New"] &&
            <TimelineItem>
              <TimelineOppositeContent color="textSecondary">
                {statusHistory["New"]}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color='secondary'/>
                {(statusHistory["In Progress"] || statusHistory["Completed"]) && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>New</TimelineContent>
            </TimelineItem>
          }

          { statusHistory["In Progress"] &&
            <TimelineItem>
              <TimelineOppositeContent color="textSecondary">
                {statusHistory["In Progress"]}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="primary"/>
                {statusHistory["Completed"] && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>In Progress</TimelineContent>
            </TimelineItem>
          }
          { statusHistory["Completed"] &&
            <TimelineItem>
              <TimelineOppositeContent color="textSecondary">
                {statusHistory["Completed"]}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="success"/>
              </TimelineSeparator>
              <TimelineContent>Completed</TimelineContent>
            </TimelineItem>
          }
        </Timeline>
      </Popover>
    </div>
  );
}

export default ColoredTimeline;
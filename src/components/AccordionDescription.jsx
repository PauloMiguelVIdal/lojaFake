import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AccordionDescription({description}) {
    return (
        <div>
           
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <Typography component="span">Description</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                   {description}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
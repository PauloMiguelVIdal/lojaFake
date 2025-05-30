import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AccordionDescription({ description }) {
  return (
<Accordion
  elevation={0}
  sx={{
    borderRadius: 2,
    backgroundColor: '#9a6ef0',
    boxShadow: 'none',
    '&:before': { display: 'none' },
  }}
>
  <AccordionSummary
    expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
    aria-controls="panel2-content"
    id="panel2-header"
    sx={{
      borderRadius: '8px 8px 0 0',
      backgroundColor: '#6411D9',
      border: 'none',
      color: 'white',
      '&:hover': { backgroundColor: '#350973' },
    }}
  >
    <Typography
      component="span"
      sx={{
        fontWeight: 'bold',
        letterSpacing: 0.8,
        fontSize: '1rem',
      }}
    >
      Descrição
    </Typography>
  </AccordionSummary>
  <AccordionDetails
    sx={{
      borderRadius: '0 0 8px 8px',
      border: 'none',
      paddingX: 3,
      color: 'white',
      fontSize: '0.95rem',
      fontWeight: 400,
      whiteSpace: 'pre-line',
    }}
  >
    <Typography component="div">{description}</Typography>
  </AccordionDetails>
</Accordion>

  );
}

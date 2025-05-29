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
        backgroundColor: '#9a6ef0',  // roxo claro no fundo todo
        boxShadow: 'none',           // tira sombra padrão
        '&:before': { display: 'none' }, // tira a linha fina do topo
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
        aria-controls="panel2-content"
        id="panel2-header"
        sx={{
          borderRadius: 2,
          backgroundColor: '#6411D9',  // roxo escuro do botão
          border: 'none',             // tira borda branca do botão
          color: 'white',
          '&:hover': {
            backgroundColor: '#350973',
          },
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
          Description
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          border: 'none',             // tira borda branca no conteúdo
          paddingX: 3,
          color: 'white',
          fontSize: '0.95rem',
          fontWeight: 400,
          whiteSpace: 'pre-line',
        }}
      >
        <Typography component="div">
          {description}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}

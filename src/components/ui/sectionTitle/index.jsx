// src/components/ui/SectionTitle/index.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box, useTheme } from '@mui/material';

const SectionTitle = ({ children, align, withUnderline, ...props }) => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        mb: 4,
        width: '100%',
        textAlign: align,
        position: 'relative',
        ...(withUnderline && align === 'left' && {
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: '-8px',
            left: 0,
            width: '60px',
            height: '3px',
            backgroundColor: 'primary.main'
          }
        }),
        ...(withUnderline && align === 'center' && {
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: '-8px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60px',
            height: '3px',
            backgroundColor: 'primary.main'
          }
        })
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        align={align}
        {...props}
      >
        {children}
      </Typography>
    </Box>
  );
};

SectionTitle.propTypes = {
  children: PropTypes.node.isRequired,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  withUnderline: PropTypes.bool
};

SectionTitle.defaultProps = {
  align: 'left',
  withUnderline: true
};

export default SectionTitle;

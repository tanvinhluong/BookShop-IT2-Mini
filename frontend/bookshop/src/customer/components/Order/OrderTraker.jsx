import { Step, StepLabel, Stepper } from '@mui/material';
import React from 'react';
import CheckIcon from '@mui/icons-material/Check';  // Dấu tích
import CancelIcon from '@mui/icons-material/Cancel';  // Dấu X

const steps = [
  'Đang chờ duyệt đơn',
  'Đang đợi nhận đơn',
  'Đang giao',
  'Đã giao hoàn tất',
  'Đã hủy',
];

const OrderTracker = ({ activeStep, orderStatus }) => {
  let filteredSteps = steps.filter((step, index) => {
    if (orderStatus === 2 && index === 4) return false;
    if (orderStatus === 5 && index === 3) return false;
    return true;
  });

 
  if (orderStatus !== 2 && orderStatus !== 5) {

    filteredSteps = filteredSteps.filter(step => step !== 'Đã hủy');

    if (!filteredSteps.includes('Đã giao hoàn tất')) {
      filteredSteps.push('Đã giao hoàn tất');
    }
  }

  return (
    <div className="w-full">
      <Stepper activeStep={activeStep} alternativeLabel>
        {filteredSteps.map((label, index) => {
          let stepStyle = {}; 
          let stepIcon = null;

         
          if (orderStatus === 5 && index === filteredSteps.length - 1) {
            stepStyle = { color: 'red', fontWeight: 'bold' };
            stepIcon = <CancelIcon sx={{ color: 'red' }} />;
          }


          if (orderStatus === 2 && index === filteredSteps.length - 1) {
            stepStyle = { color: 'green', fontWeight: 'bold' };
            stepIcon = <CheckIcon sx={{ color: 'green' }} />;
          }

 
          if (orderStatus !== 2 && orderStatus !== 5 && index === filteredSteps.length - 1) {
            stepStyle = { color: 'gray', opacity: 0.5 };
          }

          return (
            <Step key={index}>
              <StepLabel
                style={stepStyle}
                icon={stepIcon}
              >
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
};

export default OrderTracker;

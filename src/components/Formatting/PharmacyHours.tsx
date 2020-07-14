import React, { useState, useEffect, FC } from 'react';
import { Text, View } from 'react-native';

import styles from './styles';
import { IPharmacyFormatProps } from '.';
import moment from 'moment';

const PharmacyHours: FC<IPharmacyFormatProps> = ({ pharmacy }) => {
  let hoursText;

  if (pharmacy.is24Hour) {
    hoursText = '24 hours';
  } else {
    const hours = pharmacy.hours.find(
      (h: any) => h.day === new Date().getDay()
    );
    const formatWithMinutes = 'h:mma';
    const formatWithOutMinutes = 'ha';

    const beforeTime = moment(hours.hoursStart, formatWithOutMinutes),
      afterTime = moment(hours.hoursEnd, formatWithOutMinutes);

    hoursText =
      beforeTime.format(
        hours.hoursStart.slice(3, 5) === '00'
          ? formatWithOutMinutes
          : formatWithMinutes
      ) +
      '-' +
      afterTime.format(
        hours.hoursEnd.slice(3, 5) === '00'
          ? formatWithOutMinutes
          : formatWithMinutes
      );
  }

  return (
    <Text
      style={{
        fontWeight: 'bold',
      }}
    >
      {hoursText}
    </Text>
  );
};
export default PharmacyHours;

import React, { useState, useEffect, FC } from 'react';
import { Text, View } from 'react-native';

import styles from './styles';
import { IPharmacyFormatProps } from '.';
import moment from 'moment';

const PharmacyOpen: FC<IPharmacyFormatProps> = ({ pharmacy }) => {
  let status = 'CLOSED';

  if (pharmacy.is24Hour) {
    status = 'OPEN';
  } else {
    const hours = pharmacy.hours.find(
      (h: any) => h.day === new Date().getDay()
    );
    const usaTimeString = new Date().toLocaleString('en-US', {
      timeZone: pharmacy.timeZone,
      hour12: false,
    });
    const usaTime = new Date(usaTimeString);
    const _24HourTime = usaTime.getHours() + ':' + usaTime.getMinutes() + ':00';
    const format = 'hh:mm:ss';

    const time = moment(_24HourTime, format),
      beforeTime = moment(hours.hoursStart, format),
      afterTime = moment(hours.hoursEnd, format);

    status = time.isBetween(beforeTime, afterTime) ? 'OPEN' : 'CLOSED';
  }
  return (
    <Text
      style={{
        fontWeight: 'bold',
        color: status.toUpperCase() === 'OPEN' ? 'green' : 'red',
      }}
    >
      {status.toUpperCase()}
    </Text>
  );
};
export default PharmacyOpen;

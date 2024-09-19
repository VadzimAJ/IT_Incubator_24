import React, { useState } from "react";
import { Button } from "./Button";

type SettingsType = {
  startValue: number;
  maxValue: number;
  clickOnCounterOrSettings: boolean;
  settingsValuesIsTrue: boolean;
  setSettings: (startValue: number, maxValue: number) => void;
  handleComponentClick: (clickOnCounterOrSettings: boolean) => void;
};

export const Settings = (props: SettingsType) => {
  const {
    startValue,
    maxValue,
    clickOnCounterOrSettings,
    setSettings,
    handleComponentClick,
  } = props;

  const [localStartValue, setLocalStartValue] = useState(startValue);
  const [localMaxValue, setLocalMaxValue] = useState(maxValue);

  const focusDisabler = () => {
    if (!clickOnCounterOrSettings) {
      handleComponentClick(true);
    }
  };

  const handleStartValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalStartValue(Number(event.target.value));
  };

  const handleMaxValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalMaxValue(Number(event.target.value));
  };

  const getFromMaxValue = () => {
    console.log("Start Value:", localStartValue);
    console.log("Max Value:", localMaxValue);
  };

  const handleSetClick = () => {
    setSettings(localStartValue, localMaxValue);
    console.log("Settings Set:", { localStartValue, localMaxValue });
  };

  return (
    <div
      className="counter-container counter-container_settings"
      onClick={focusDisabler}
    >
      <div className="counter-container_vue_settings">
        <div>
          <span>start value:</span>{" "}
          <input
            type="number"
            value={localStartValue}
            onChange={handleStartValueChange}
          />
        </div>
        <div>
          <span>max value:</span>{" "}
          <input
            type="number"
            value={localMaxValue}
            onChange={handleMaxValueChange}
          />
        </div>
      </div>
      <div className="counter-container_button">
        <Button
          title="set"
          onClick={handleSetClick}
          isDisabled={!clickOnCounterOrSettings}
        />
        <Button
          title="get"
          onClick={getFromMaxValue}
          isDisabled={!clickOnCounterOrSettings}
        />
      </div>
    </div>
  );
};
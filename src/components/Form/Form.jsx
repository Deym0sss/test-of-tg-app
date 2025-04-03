import React, { useCallback, useEffect, useState } from "react";
import "./Form.css";
import { useTelegram } from "../../hooks/useTelegram";

const Form = () => {
  const [country, setCountry] = useState();
  const [address, setAddress] = useState();
  const [delivery, setDelivery] = useState();
  const { tg } = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      country,
      address,
      delivery,
    };
    tg.sendData(JSON.stringify(data));
  }, [address, country, delivery, tg]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);

    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData, tg]);

  useEffect(() => {
    tg.MainButton.setParams({
      text: "Send data",
    });
  }, [tg.MainButton]);

  useEffect(() => {
    if (!country || !address || !delivery) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [country, address, delivery, tg.MainButton]);

  const handleCountryChange = (value) => {
    setCountry(value);
  };
  const handleAddressChange = (value) => {
    setAddress(value);
  };
  const handleDeliveryChange = (value) => {
    setDelivery(value);
  };

  return (
    <div className="form">
      <h3>Enter data</h3>
      <input
        className="input"
        onChange={(e) => handleCountryChange(e.target.value)}
        type="text"
        placeholder="Country"
        value={country}
      />
      <input
        className="input"
        onChange={(e) => handleAddressChange(e.target.value)}
        type="text"
        placeholder="Address"
        value={address}
      />
      <select
        name="delivery"
        className="select"
        onChange={(e) => handleDeliveryChange(e.target.value)}
        value={delivery}
      >
        <option value="">Select delivery</option>
        <option value="Nova post">Nova post</option>
        <option value="Self delivery">Self delivery</option>
      </select>
    </div>
  );
};

export default Form;

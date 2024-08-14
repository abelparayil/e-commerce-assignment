'use client';

import React, { useState, useEffect } from 'react';

type NotificationProps = {
  message: string;
  visible: boolean;
  onDismiss: () => void;
};

const Notification: React.FC<NotificationProps> = ({
  message,
  visible,
  onDismiss,
}) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 3000); // Hide after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [visible, onDismiss]);

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-md transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {message}
    </div>
  );
};

export default Notification;
